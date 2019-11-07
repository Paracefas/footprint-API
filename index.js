const express = require('express')
const path = require('path')
const dbConnection = require('./dbConnection')

const app = express()

app.set('port', process.env.PORT || 27015)

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs');

app.get('/', (req, res) =>
{
    res.render('pages/index')
})

app.post('/api/data', (req, res) => 
{
    const { CO, CO2, CH4, O3, Temp, Hum, Press, Lat, Lon } = req.body
    if(CO && CO2 && CH4 && O3 && Temp && Hum && Press)
    {
        dbConnection().query(`INSERT INTO Sensors VALUES(${CO}, ${CO2}, ${CH4}, ${O3}, ${Temp}, ${Press}, ${Lat}, ${Lon})`)
        res.send(`CO=${CO}, CO2=${CO2}, CH4=${CH4}, O3=${O3}, Temp=${Temp}, Hum=${Hum}, Press=${Press}`)
    }
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))