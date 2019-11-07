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
    const { Coorlat, Coorlon } = req.body
    dbConnection().query(`INSERT INTO Sensors VALUES(${Coorlat}, ${Coorlon}, ${CO}, ${CO2}, ${CH4}, ${O3}, ${Temp}, ${Press})`)
    res.send('<h1>H</h1>')
    if(CO && CO2 && CH4 && O3 && Temp && Hum && Press)
    {
        dbConnection().query(`INSERT INTO Sensors VALUES(${Coorlat}, ${Coorlon}, ${CO}, ${CO2}, ${CH4}, ${O3}, ${Temp}, ${Press})`)
        res.send(`CO=${CO}, CO2=${CO2}, CH4=${CH4}, O3=${O3}, Temp=${Temp}, Hum=${Hum}, Press=${Press}`)
    }
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))