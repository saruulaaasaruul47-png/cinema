const express = require('express');
const { 
    getHallsController,
    addHallController,
    updateHallController,
    deleteHallController
} = require("../controllers/halls.controller");
const hallsRouter = express.Router();

hallsRouter.get("/hallslist", getHallsController);
hallsRouter.post("/newhall", addHallController);
hallsRouter.put("/:id", updateHallController);
hallsRouter.delete("/:id", deleteHallController)

module.exports = hallsRouter;