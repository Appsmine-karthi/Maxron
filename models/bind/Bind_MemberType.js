
const mongoose = require('mongoose');

const BindMemberShema = new mongoose.Schema({  
    rfId:{
        type:Number, // 1 => Admin 2=> Dealer 3 => users
        require:true
    },
    dataName: {
        type: String,   
        required: true       
    },    
    isActive: {
        type: Boolean,   
        default: true       
    },  
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Bind_MemberType = mongoose.model('Bind_MemberType',BindMemberShema);