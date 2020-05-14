/*заимпортили библиотеку express*/
const express = require(`express`)
/*заимпортили библиотеку nodemailer*/
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

/*вызвали ее создав приложение app*/
const app = express()
/*разрешаем cors-запросы*/
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
//parse app/json
app.use(bodyParser.json())

/*настройка нодмейлера*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anton.revta@gmail.com', // generated ethereal user
        pass: 't8e3v8i4n6.1j5' // generated ethereal password
    },
});
/*настраиваем роутер. если нам на корень сайта / придет get запрос, мы вернем hello world*/
app.get('/', function (req, res) {
    res.send('Hello world')
})
/*настраиваем запрос и реквест*/
app.post(`/sendMessage`, async function (req, res) {
    let {name, email, message} = req.body
    let info = await transporter.sendMail({
        from: 'HR',
        to: 'anton.revta@gmail.com',
        subject: 'hr wants me',
        html: `<b>Привет!</b><div>${name}</div><div>${email}</div><div>${message}</div>`
    })
})
/*здесь мы стартуем наше app*/
app.listen(3010, function () {
    console.log('Example app listening on port 3010')
})