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
    const Coorlat = req.body.Coorlat || 0
    const Coorlon = req.body.Coorlon || 0
    const Sensors = req.body.Sensors || 0
    
    const CO = req.body.CO || Sensors.CO || 0 
    const CO2 = req.body.CO2 || Sensors.CO2 || 0
    const CH4 = req.body.CH4 || Sensors.CH4 || 0
    const O3 = req.body.O3 || Sensors.O3 || 0
    const TEMP = req.body.TEMP || Sensors.TEMP || 0
    const HUM = req.body.HUM || Sensors.HUM || 0
    
    dbConnection().query(`INSERT INTO Sensors VALUES(null, ${CO}, ${CO2}, ${CH4}, ${O3}, ${TEMP}, ${HUM}, ${Coorlat}, ${Coorlon})`)
    
    res.send('<h1>H</h1>')
})

app.listen(app.get('port'), () => console.log(`port ${app.get('port')}`))