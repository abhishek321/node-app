const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema({
    firstName:{type:String,required:[true,'Name is required.'],min:6,get:capitalizeFirstLetter},
    lastName:{type:String,min:6,default:'',get:capitalizeFirstLetter},
    maidenName:{type:String,required:[true,'Name is required.'],min:6,get:capitalizeFirstLetter},
    email:{type:String,validate: {
        validator: function(v) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: [true, 'Email is required']
    ,unique:true},
    password:{type:String,required:[true,'Password is required.'],min:6},
    age:Number,
    status:{type: String,enum: {
        values: ['0', '1'],
        message: '{VALUE} is not supported'
      },default:'1'}

})
userSchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.maidenName} ${this.lastName}`;
})
function capitalizeFirstLetter(v) {
  // Convert 'bob' -> 'Bob'
  return v.charAt(0).toUpperCase() + v.substring(1);
}
exports.User = mongoose.model('user',userSchema);