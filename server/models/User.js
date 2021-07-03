const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let readingListSchema = new Schema({
   title:{
      type: String,
      "index": { "sparse": true }
   },
   urlToImage: {
      type: String,
   },
   author: {
      type: String,
   },
   description:{
       type:String,
   },
   newsUrl:{
       type:String,
   },
   sourceName:{
       type:String,
   }
},{
   timestamps: true,
})

let userSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true
   },
   readingList:[readingListSchema]
},{
   timestamps: true,
   collection: 'users'
})
module.exports = mongoose.model('User', userSchema);