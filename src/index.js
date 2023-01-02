const express =require('express')
const bodyParser=require('body-parser');
const route=require("./route/route")
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://gaurav:Grv20072000@cluster0.3fqqw8s.mongodb.net/gaurav", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});