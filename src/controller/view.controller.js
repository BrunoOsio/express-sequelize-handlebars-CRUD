const rentedCarService = require("../service/rentedCar.service");
const userController = require("../controller/user.controller");
const { isSessionExists } = require("../helper/session/sessionLogin.helper");

exports.create = async (req, res) => {
    if (!isSessionExists(req.session)) {
        res.redirect("/");
    }

    res.render("create");
}

exports.home = async (req, res) => {
    const data = await rentedCarService.findAll();
    const session = req.session;
    
    res.render("home", {rentedCars: data, session: session});
}

exports.showCar = async (req, res) => {
    const id = req.params.id;

    const data = await rentedCarService.findOne(id);
    res.render("showCar", {rentedCar: data});
}

exports.update = async (req, res) => {

    if (!isSessionExists(req.session)) {
        res.redirect("/");
    }

    const id = req.params.id;
    const data = await rentedCarService.findOne(id);

    res.render("edit", {rentedCar: data});
}

exports.delete = async (req, res) => {

    if (!isSessionExists(req.session)) {
        res.redirect("/");
    }

    const id = req.params.id;
    await rentedCarService.delete(id);

    res.redirect("/");
}

exports.register = async (req, res) => {
    res.render("register");
}

exports.login = async (req, res) => {
    res.render("login");
}

exports.logout = async (req, res) => {
    res.render("logout");
}