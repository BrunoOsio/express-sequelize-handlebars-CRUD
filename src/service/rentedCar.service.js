const RentedCar = require("../model/rentedCar.model");
const fs = require("fs");
const appRoot = require('app-root-path');

exports.findAll = async () => {
    try {
        const data = await RentedCar.findAll();

        if (!data) {
            return {message: `FIND ALL: No cars found`};
        }

        return data;

    } catch (error) {
        console.error("Error: ", error);
    }
}

exports.create = (manufacturer, model, nameImage, description) => {
    try {        
        RentedCar.create({
            manufacturer: manufacturer,
            model: model,
            image: nameImage,
            description: description
        })

    } catch (err) {
        console.error("error: ", err);
    }
}

exports.findOne = async (id) => {
    try {
        const data = await RentedCar.findOne({where: {id}});
    
        return data;

    } catch (error) {
        console.error("Error: ", error);
    }
}

exports.delete = async (id) => {

    try {
        const data = await this.findOne(id);

        if (!data) {
            return {message: `DELETE: Car with id: ${id} not found`};
        }
        
        const imagePath = `${appRoot.path}/public/images/${data.image}`;
        
        fs.unlink(imagePath, (err) => {
            if (err) throw err;
            console.log(`the image on directory: <${imagePath}> was deleted`);
        });

        await RentedCar.destroy({where: {id}});

        return {message: `Sucessfully deleted the car with id: ${id}`};       
    } catch (error) {
        console.error("Error: ", error);
    }
}

exports.update = async (oldRentedCarId, manufacturer, model, nameImage, description) => {
    try {
        const isCarExist = await this.findOne(oldRentedCarId);

        if (!isCarExist) {
            return null;
        }

        await RentedCar.update({
            manufacturer: manufacturer,
            model: model,
            image: nameImage,
            description: description
        }, {where: {id: oldRentedCarId}});

        return {message: `Sucessfully updated the car with id: ${oldRentedCarId}`};

    } catch (error) {
        console.error("Error: ", error);
    }
}
