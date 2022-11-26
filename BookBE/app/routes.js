module.exports = (app) => {    
    const controller = require("./controller")
    var router = require("express").Router()
    router.post("/create", controller.createNewBook)
    router.get("/all", controller.getAllBooks)
    router.put("/update/:id", controller.updateBook)
    router.delete("/delete/:id", controller.deleteBook)
    app.use("/", router)
}