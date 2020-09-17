const Scheduler = require('../lib/scheduler');
const priceCalc = new Scheduler();


scheduler = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No request body!',
        })
    }

    // const movie = new Movie(body)

    // if (!movie) {
    //     return res.status(400).json({ success: false, error: err })
    // }
}



module.exports = {
    scheduler
}