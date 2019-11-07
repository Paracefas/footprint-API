const express = require('express')
const path = require('path')
const dbConnection = require('./dbConnection')
const cors = require('cors')

const app = express()

app.set('port', process.env.PORT || 27015)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs');

app.get('/', (req, res) =>
{
    res.render('pages/index')
})

app.get('/api/get-data', (req, res) =>
{
    dbConnection().query('SELECT * FROM Sensors', (err, result) =>
    {
        res.json({result})
    })
})

app.post('/api/data', (req, res) => 
{
    if(req.body.Sensores)
    {    
        const { Coorlat, Coorlon, Sensores } = req.body
        const { CO, CO2, CH4, O3, TEMP, HUM, PRESS } = Sensores
    }
    else 
        const { Coorlat, Coorlon, CO, CO2, CH4, O3, TEMP, HUM, PRESS } = req.body
    dbConnection().query(`INSERT INTO Sensors VALUES(${CO}, ${CO2}, ${CH4}, ${O3}, ${TEMP}, ${HUM}, ${PRESS}, ${Coorlat}, ${Coorlon})`)
    res.send('<h1>H</h1>')
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))