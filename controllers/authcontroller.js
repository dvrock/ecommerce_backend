
const { createCustomError } = require("../utils/error");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { CredentialsModel } = require("../schemas")
module.exports = {
    SignUp: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            console.log("request body:", req.body);
            const encryptedPassword = await bcrypt.hash(password, 10);

            console.log("request body", encryptedPassword);
            const login_data = await CredentialsModel.create({
                user_name: username,
                email,
                password: encryptedPassword,

            });
            console.log("login data===>", login_data)

            if (login_data) {
                res.json({
                    status: 200,
                    login_data
                });
            } else {
                res.json({ message: "error while inserting data in db", status: 500 });
                //406 not acceptable
                throw new createCustomError("error while inserting data in db", 406);
            }
        } catch (err) {
            res.json({ message: err.message, status: 500 });
            throw new createCustomError(err.message, 500);
        }
    },
    Login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("consoling email and password:", email, password);
            if (email && password) {
                const getUsers = await User.findOne({ email });
                console.log("user", getUsers);
                if (getUsers) {
                    const verify = await bcrypt.compare(password, getUsers.password);
                    console.log("verification:", verify);
                    if (verify) {
                        const token = jwt.sign({ id: getUsers._id }, "user", {
                            expiresIn: "90d",
                        });
                        res.json({
                            status: "successfull",
                            user: getUsers,
                            token: token,
                            status: 201,
                        });
                    } else {
                        const error = new Error("Cannot get data from database");
                        res.json({
                            message: error.message,
                            stack: error.stack,
                            status: 502,
                        });
                    }
                } else {
                    const error = new Error("Fields are empty");
                    res.json({
                        message: error.message,
                        stack: error.stack,
                        status: 502,
                    });
                }
            } else {
                res.json({
                    status: 500,
                    data: "bad request",
                });
            }
        } catch (err) {
            res.json({ message: err.message });
        }
    },

};