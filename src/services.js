const {createZoomMeeting} = require('./helper/zoomHelper')
const moment = require('moment')


const sZoom = {
    getLinkService: async (req,res) => {
        const {body} = req
        try{
            const start = moment(body.start_time);
            const meet = await createZoomMeeting(
                body.topic,
                body.duration,
                start,
                body.password
            )

            res.status(200).json(meet)

        }catch (e) {
            res.status(400).json(e)
        }
    }
}

module.exports = {
    sZoom
}