module.exports = {
    success: (res, data) => {

        return res.send({
            status: 200,
            data: data
        })

    }
}