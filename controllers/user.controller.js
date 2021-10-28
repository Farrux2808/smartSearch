'use strict';
const User = require('../models/user.model');
exports.findAll = function(req, res) {
    User.findAll(function(err, user) {
        console.log('controller')
        if (err)
        res.send(err);
        console.log('res', user);
        res.send(user);
    });
};
exports.create = function(req, res) {
    const new_user_data = new User(req.body);
    const new_user = {
        fio: new_user_data.fio,
        otdel: new_user_data.otdel,
        lavozim: new_user_data.lavozim
    }
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    } 
    else {
        User.create(new_user, function(err, user) {
            if (err)
            res.send(err);
            for(let ad of new_user_data.address){
                let user_address = {
                    address: ad,
                    user_id: user
                }
                User.addAddress(user_address, function(err, user_) {
                    if (err)
                    res.send(err);
                });
            }
            res.json({error:false,message:"User added successfully!",data:user});
        });
    }
};
exports.smartSearch = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    } 
    else{
        let data = req.body.data.split(" ")
        User.smartSearch(data, function(err, user) {
            if (err)
            res.send(err);
            res.json(user);
        });
    }
};

exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err)
        res.send(err);
        res.json(user);
    });
};
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.update(req.params.id, new User(req.body), function(err, user) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'User successfully updated' });
        });
    }
};
exports.delete = function(req, res) {
    User.delete( req.params.id, function(err, user) {
        if (err)
        res.send(err);
        res.json({ error:false, message: 'User successfully deleted' });
    });
};