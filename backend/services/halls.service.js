const {
    findHall,
    hallList,
    createHall,
    updateHall,
    findHallById,
    deleteHall
} = require("../repositories/halls.repository");

const asyncHandler = require("express-async-handler");

const getHalls = asyncHandler(async () => {
    const halls = await hallList();
    return halls;
})

const normalizeHallPayload = (data) => {
    const hallName = String(data.hall_name || data.hallName || data.name || "").trim();
    const seatCount = Number(data.seat_count || data.seatCount || data.capacity || 0);

    if (!hallName) {
        const err = new Error("Hall name is required");
        err.statusCode = 400;
        throw err;
    }

    if (!Number.isInteger(seatCount) || seatCount <= 0) {
        const err = new Error("Seat count must be a positive number");
        err.statusCode = 400;
        throw err;
    }

    return { hall_name: hallName, seat_count: seatCount };
}

const addHall = asyncHandler(async (data) => {
    const hall = normalizeHallPayload(data);
    const check = await findHall(hall.hall_name);
    if (check) {
        const err = new Error("Hall already exists");
        err.statusCode = 409;
        throw err;
    }
    const created = await createHall(hall.hall_name, hall.seat_count);
    return await findHallById(created.insertId);

})

const updateHallService = asyncHandler(
    async (id, data) => {
    const hall = await findHallById(id);
    if (!hall) {
        const err = new Error("Hall not found");
        err.statusCode = 404;
        throw err;
    }
    const payload = normalizeHallPayload(data);
    const sameNameHall = await findHall(payload.hall_name);
    if (sameNameHall && String(sameNameHall.id) !== String(id)) {
        const err = new Error("Hall already exists");
        err.statusCode = 409;
        throw err;
    }

    await updateHall(id, payload.hall_name, payload.seat_count);
    return await findHallById(id);
})

const deleteHallService = asyncHandler(
    async (id) => {
        const hall = await findHallById(id);
        if (!hall) {
            const err = new Error("Hall not found");
            err.statusCode = 404;
            throw err;
        }
        await deleteHall(id);
        return hall;
    }
)

module.exports = {
    getHalls,
    addHall,
    updateHallService,
    deleteHallService
};
