export const createProduct = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.files)
        res.status(200).json({
            ...req.body,
        })
    } catch (error) {
        console.log(error)
    }
}