export function parseProductData(req, res, next){
        req.body.price = JSON.parse(req.body.price)
        req.body.sizes = JSON.parse(req.body.sizes)
        next()
    }