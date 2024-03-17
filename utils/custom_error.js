class CustomError extends Error {

    constructor(message) {
        super(message);
        this.status_code = 400
        this.name = "CustomError"
    }
}

module.exports = CustomError;