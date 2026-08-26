const healthController = (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Server is running'
    })
}

const filehandlingAPI = (req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send("image(s) recieved successfully")
}

module.exports = {healthController, filehandlingAPI}