const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

//__________________________ Validations : Name ___________________________________________

const isValidName = function (name) {
    const fnameRegex = /^[a-zA-Z]+$/;
    return fnameRegex.test(name);
};

//__________________________ Validations : Email  ___________________________________________

const isValidEmail = function (email) {
    const emailRegex =
        /^@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$"/;
    return emailRegex.test(email);
};

//__________________________ Validations : Password  ___________________________________________

const isValidPassword = function (password) {
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
};

//__________________________ Validations : Values ___________________________________________

const isValidvalue = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value == "string" && value.trim().length === 0) return false;
    return true;
};

//__________________________ Validations :  ObjectId ___________________________________________

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

//__________________________ Export : Modules  ___________________________________________

module.exports.isValidName = isValidName;
module.exports.isValidEmail = isValidEmail;
module.exports.isValidPassword = isValidPassword;
module.exports.isValidvalue = isValidvalue;
module.exports.isValidObjectId = isValidObjectId;
