const express = require("express");
const app = express();

const path = require("path");
const session = require('express-session');

const rentedCarRouter = require("./src/route/rentedCar.routes");
const viewRouter = require("./src/route/view.routes");
const userRouter = require("./src/route/user.routes");

const rentedCarModel = require("./src/model/rentedCar.model");
const userModel = require("./src/model/user.model");

const { engine } = require("express-handlebars");

(async () => {
    try {
        await rentedCarModel.sync();
        await userModel.sync();
    } catch (error) {
        console.log(error);
    }
})();

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.use('/', viewRouter);
app.use('/api', rentedCarRouter);
app.use('/users', userRouter);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', './views');

app.listen(8080, function () {
  console.log("App listening at port 8080"); 
})