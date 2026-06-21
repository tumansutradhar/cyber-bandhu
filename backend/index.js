const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");
const jwt = require('jsonwebtoken');

require('./db/config');
const User = require('./db/User');
const Admin = require('./db/Admin');
const Service = require('./db/Service');
const Expert = require('./db/Expert');
const Query = require('./db/Query');

const app = express();

// Use Environment variable for JWT, default to 'rds' for local testing if missing
const jwtkey = process.env.JWT_SECRET || 'rds';

app.use(express.json());
app.use(cors());

// User Register
app.post("/register", async (req, resp) => {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return resp.send({ result: "User Already Registered" });
    }

    let newUser = new User(req.body);
    let result = await newUser.save();
    result = result.toObject();
    delete result.password; // Note: Hiding it from response, but it's still unhashed in DB!

    resp.send(result ? result : { result: 'Enter Details' });
});

// User Login
app.post('/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) return resp.send({ result: 'Something went wrong' });
                resp.send({ user, auth: token });
            });
        } else {
            resp.send({ result: 'No user Found' });
        }
    } else {
        resp.send({ result: 'Please Enter valid email and password' });
    }
});

// One User Fetch
app.get('/user/:id', verifyToken, async (req, resp) => {
    let result = await User.findOne({ _id: req.params.id });
    resp.send(result ? result : { result: 'no record found' });
});

// One User Update
app.put('/user/:id', verifyToken, async (req, resp) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    resp.send(result);
});

// Admin Register
app.post("/admin/register", async (req, resp) => {
    let existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
        return resp.send({ result: "Admin Already Registered" });
    }

    let newAdmin = new Admin(req.body);
    let result = await newAdmin.save();
    result = result.toObject();
    delete result.password;

    resp.send(result);
});

// Admin Login
app.post('/admin/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let admin = await Admin.findOne(req.body).select("-password");
        if (admin && admin.dept == req.body.dept) {
            jwt.sign({ admin }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) return resp.send({ result: 'Something went wrong' });
                resp.send({ admin, auth: token });
            });
        } else {
            resp.send({ result: 'No user Found or Department mismatch' });
        }
    } else {
        resp.send({ result: 'Please enter valid credentials' });
    }
});

// Expert Register
app.post("/expert/register", async (req, resp) => {
    let existingExpert = await Expert.findOne({ email: req.body.email });
    if (existingExpert) {
        return resp.send({ result: "Expert Already Registered" });
    }

    let newExpert = new Expert(req.body);
    let result = await newExpert.save();
    result = result.toObject();
    delete result.password;

    resp.send(result);
});

// Expert Login
app.post('/expert/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let expert = await Expert.findOne(req.body).select("-password");
        if (expert) {
            if (expert.verified == true) {
                jwt.sign({ expert }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                    if (err) return resp.send({ result: 'Something went wrong' });
                    resp.send({ expert, auth: token });
                });
            } else {
                resp.send({ result: 'You are not Verified. Please contact our admin or mail us.' });
            }
        } else {
            resp.send({ result: 'No user Found' });
        }
    } else {
        resp.send({ result: 'Enter valid details' });
    }
});

// Book Appointment (without login or with login)
app.post('/service', async (req, resp) => {
    if (req.body) {
        let service = new Service(req.body);
        let result = await service.save();
        resp.send(result);
    } else {
        resp.send({ result: 'Please enter details' });
    }
});

// Update Service 
app.put('/service/update/:id', async (req, resp) => {
    if (req.body) {
        let result = await Service.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        resp.send(result);
    } else {
        resp.send({ result: 'Please enter details' });
    }
});

// Update Query  
app.put('/query/update/:id', async (req, resp) => {
    if (req.body) {
        let result = await Query.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        resp.send(result);
    } else {
        resp.send({ result: 'Please enter details' });
    }
});

// Query from landing page
app.post('/query', async (req, resp) => {
    if (req.body) {
        let query = new Query(req.body);
        let result = await query.save();
        resp.send(result);
    } else {
        resp.send({ result: 'Please enter details' });
    }
});

// Get all Pending Queries in Admin dashboard
app.get('/query/pending', verifyToken, async (req, resp) => {
    let result = await Query.find({ status: 'pending' });
    resp.send(result.length > 0 ? result : { result: 'no record found' });
});

// Get all Queries in Admin dashboard
app.get('/query/all', verifyToken, async (req, resp) => {
    let result = await Query.find();
    resp.send(result.length > 0 ? result : { result: 'no record found' });
});

// Get all Pending Services
app.get('/service/pending', verifyToken, async (req, resp) => {
    let result = await Service.find({ status: 'pending', expert_id: null });
    resp.send(result.length > 0 ? result : { result: 'no record found' });
});

// Get all Pending Services by expert_id
app.get('/service/pending/:id', verifyToken, async (req, resp) => {
    let result = await Service.find({ status: 'pending', expert_id: req.params.id });
    resp.send(result.length > 0 ? result : { result: 'no record found' });
});

// Get one Service details by expert_id
app.get('/expert/pending-service/:id', async (req, resp) => {
    let result = await Service.find({ status: 'pending', _id: req.params.id });
    resp.send(result.length > 0 ? result : { result: 'no record found' });
});

// Get all Services in Admin dashboard
app.get('/service/all', verifyToken, async (req, resp) => {
    let result = await Service.find();
    resp.send(result.length > 0 ? result : { result: 'no record found' });
});

// Get all active Experts
app.get('/expert/active', verifyToken, async (req, resp) => {
    let result = await Expert.find({ status: 'active' });
    resp.send(result.length > 0 ? result : { result: 'no record found' });
});

// Get all Experts
app.get('/expert/all', verifyToken, async (req, resp) => {
    let result = await Expert.find();
    resp.send(result.length > 0 ? result : { result: 'no record found' });
});

// Jwt Verification
function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ');
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: 'please provide valid token' });
            } else {
                next();
            }
        });
    } else {
        resp.status(403).send({ result: 'please add token with header' });
    }
}

app.listen(5000, () => {
    console.log("Server running on port 5000");
});