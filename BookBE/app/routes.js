module.exports = (app) => {    
    const controller = require("./controller")
    var router = require("express").Router()
    router.post("/create", controller.createNewBook)
    router.get("/all", controller.getAllBooks)
    app.use("", router)
}