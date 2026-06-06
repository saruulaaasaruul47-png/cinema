const {
    findHall,
    hallList,
    createHall,
    updateHall,
    findHallById,
    deleteHall
} = require("../repository/halls.repository");

const Hall = require("../models/hallsModel");

const asyncHandler = require("express-async-handler");

const getHalls = asyncHandler(async () => {
    const halls = await hallList();
    return halls;
})

const addHall = asyncHandler(async (data) => {
    const hall = new Hall(data.hall_name, data.seat_count)
    const check = await findHall(hall.hall_name);
    if (check) {
        throw new TypeError("Hall already exist");
    }
    const addHall = await createHall(hall.hall_name, hall.seat_count);
    return addHall;

})

const updateHallService = asyncHandler(
    async (id, data) => {
    const hall = await findHallById(id);
    if (!hall) {
        throw new Error("Hall not found");
    }
    const update = await updateHall(id, data.hall_name, data.seat_count);
    return update;
})

const deleteHallService = asyncHandler(
    async (id) => {
        const deleteHallById = await deleteHall(id);
        return deleteHallById;
    }
)

module.exports = {
    getHalls,
    addHall,
    updateHallService,
    deleteHallService
};