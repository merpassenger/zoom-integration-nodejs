require('dotenv').config()
const express = require('express')
const app = express()


const cors = require('cors')
app.use(cors({origin: '*'}))


const {json} = require('body-parser')
app.use(json({limit: '50kb'}))

app.use('/api', require('./routes'))


app.listen(8000, () => {
    console.log('---------------------------------------------------------------------------------')
    console.log(`App Backend Running! Port: 8000`)
    console.log(`Start Time: ${new Date()}`)
    console.log('---------------------------------------------------------------------------------')
})

