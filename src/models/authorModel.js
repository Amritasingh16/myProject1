const authorSchema = new mongoose.Schema({
    fname: {
       type: String,
       lowercase: true,
       uppercase: true,
       minlength: 2,
       maxlength: 20,
       required: true,
 
    },
    lname: {
       type: String,
       lowercase: true,
       uppercase: true,
       minlength: 2,
       maxlength: 20,
       required: true,
    },
    title: {
       type: String,
       required: true,
       enum: ["Mr", "Mrs", "Miss"],
    },
    email: {
 
       type: String,
       lowercase: true,
       uppercase: true,
       unique: true,
       required:true,},
      
    password: {
       type: String,
       required:true
 
    }
}, { timestamps: true });
module.exports = mongoose.model('Author',authorSchema)
