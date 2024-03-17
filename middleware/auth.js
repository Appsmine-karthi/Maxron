const jwt = require('jsonwebtoken');
const CustomResponse = require('../utils/custom_response');

module.exports = {

    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                CustomResponse.success(res, {error: "Access denied"});
            }
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = { email: decodedToken.email, userId: decodedToken.userId };
            next();
        } catch (error) {
            throw new CustomError(err.message);
        }
    },
}