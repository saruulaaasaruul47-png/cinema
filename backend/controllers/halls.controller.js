const asyncHandler = require("express-async-handler");
const {
    getHalls,
    addHall,
    updateHallService,
    deleteHallService
} = require("../services/halls.service");

const getHallsController = asyncHandler(async (req, res, next) => {
    const halls = await getHalls();
    return res.json({
        status: 200,
        message: "Halls fetched successfully",
        halls
    })
})

const addHallController = asyncHandler(async (req, res, next) => {
    const hall = await addHall(req.body);
    return res.json({
        status: 200,
        message: "Hall added successfully",
        hall
    })
})

const updateHallController = asyncHandler(async (req, res, next) => {
    const hall = await updateHallService(req.params.id, req.body);
    return res.json({
        status: 200,
        message: "Hall updated successfully",
        hall
    })
})

const deleteHallController = asyncHandler(async(req, res, next)=>{
    const hall = await deleteHallService(req.params.id)
    return res.json({
        status: 200,
        message: "Hall deleted successfully",
        hall
    })
})
module.exports = {
    getHallsController,
    addHallController,
    updateHallController,
    deleteHallController
};