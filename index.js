const express = require('express')
const app = express()

app.set('port', process.env.PORT || 27015)

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>
{
    res.send('<h1>Index</h1>')
})

app.post('/api/data', (req, res) => 
{
    const { CO, CO2, CH4, O3, Temp, Hum, Press } = req.body
    if(CO && CO2 && CH4 && O3 && Temp && Hum && Press)
    {
        res.send(`CO=${CO}, CO2=${CO2}, CH4=${CH4}, O3=${O3}, Temp=${Temp}, Hum=${Hum}, Press=${Press},`)
    }
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))