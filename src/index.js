const express =require('express')
//const bodyParser=require('body-parser');
const route=require("./route/route")
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://AmritaSingh:AAsingh1627@cluster016.jdmspyj.mongodb.net/amrita1627", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});