const createUserController = (req, res) => {
    console.log({ ...req.body, ...req.files })
    res.status(200).json({
        message: "user created successfully",
        data: { ...req.body, ...req.files }
    })
}

module.exports = createUserController