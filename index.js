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
    res.send('<h1>Works!</h1>')
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))