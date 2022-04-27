/* Este controller é usado para verificação dos dados no software Insomnia*/

const crypto = require("crypto");
const path = require('path');
const fs = require("fs");
const appRoot = require('app-root-path');
const formidable = require("formidable");

const RentedCar = require("../model/rentedCar.model");
const rentedCarService = require("../service/rentedCar.service");

exports.create = async (req, res) => {
    new formidable
    .IncomingForm()
    .parse(req, (err, fields, files) => {
        const manufacturer = fields['manufacturer'];
        const model = fields['model'];
        const description = fields['description'];

        const oldpath = files.image.filepath;
        const hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
        const nameImage = `${hash}.${files.image.mimetype.split('/')[1]}`;
        const newpath = path.join(appRoot.path, 'public/images/', nameImage);

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
        });

        rentedCarService.create(manufacturer, model, nameImage, description);
    });
    
    res.redirect("/");
};

exports.findAll = async (req, res) => {
    const data = await rentedCarService.findAll();

    return res.send(data);
}

exports.findOne = async (req, res) => {
    const id = req.params.id;
    const data = await rentedCarService.findOne(id);

    res.send(data);
}

exports.delete = async (req, res) => {
    const id = req.params.id;

    const data = await rentedCarService.delete(id);
    
    res.send(data);
}

exports.update = async (req, res) => {
    new formidable
    .IncomingForm()
    .parse(req, (err, fields, files) => {
        const oldRentedCarId = fields['oldRentedCarId'];
        const manufacturer = fields['manufacturer'];
        const model = fields['model'];
        const description = fields['description'];

        const oldpath = files.image.filepath;
        const hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
        const nameImage = `${hash}.${files.image.mimetype.split('/')[1]}`;
        const newpath = path.join(appRoot.path, 'public/images/', nameImage);

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
        });

        rentedCarService.update(oldRentedCarId, manufacturer, model, nameImage, description);

        res.redirect("/");
    });
}
