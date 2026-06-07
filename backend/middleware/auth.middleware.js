require("dotenv").config();
const jwt = require("jsonwebtoken");

// JWT шалгах
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Нэвтрэх шаардлагатай. Token олдсонгүй"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // { id, email, role }
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Token хүчингүй эсвэл хугацаа дууссан"
        });
    }
};

// Role шалгах
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return res.status(403).json({
                success: false,
                message: "Энэ үйлдэл хийх эрх байхгүй"
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
