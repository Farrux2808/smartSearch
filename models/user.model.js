'use strict';
let dbConn = require('./../config/db.config');

let User = function(user) {
    this.fio = user.fio;
    this.otdel = user.otdel;
    this.lavozim = user.lavozim;
    this.address = user.address;
};


User.create = function (newUser, result) {
    dbConn.query("INSERT INTO user set ?", newUser, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

User.addAddress = function (address, result) {
    dbConn.query("INSERT INTO address set ?", address, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

User.smartSearch = function (data, result) {
    let searchQuery = `SELECT u.fio, u.lavozim FROM user u RIGHT JOIN address a ON u.id = a.user_id WHERE`
    let tmp = ""
    for(let item of data) {
        tmp += `AND (u.fio LIKE '${item}%' OR u.lavozim LIKE '${item}%' OR a.address LIKE '${item}%')`
    }
    searchQuery +=tmp.slice(3)
    dbConn.query(searchQuery, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

User.findById = function (id, result) {
    dbConn.query("Select * from user where id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
User.findAll = function (result) {
    dbConn.query("Select * from user", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('user : ', res);
            result(null, res);
        }
    });
};
User.update = function(id, user, result){
    dbConn.query("UPDATE user SET fio=?,otdel=?,lavozim=? WHERE id = ?", [user.fio,user.otdel,user.lavozim, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
User.delete = function(id, result){
    dbConn.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports= User;