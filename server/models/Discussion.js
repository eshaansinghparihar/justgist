const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let replySchema = new Schema({
   reply:{
      type: String,
      "index": { "sparse": true }
   },
   email: {
      type: String,
   },
   name: {
      type: String,
   }
},{
   timestamps: true,
})

let discussionSchema = new Schema({
    email:{
        type: String,
        required: true
    },
   author:{
        type: String,
        required: true
   },
   title:{
      type: String,
      required: true,
      unique:true
   },
   description: {
      type: String,
      required: true,
   },
   question: {
      type: String,
      required: true
   },
   newsUrl:{
    type:String,
    required:true
   },
    urlToImage: {
    type: String,
    required:true
   },
   replies:[replySchema]
},{
   timestamps: true,
   collection: 'discussions'
})
module.exports = mongoose.model('Discussion', discussionSchema);