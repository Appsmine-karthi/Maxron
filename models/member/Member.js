
const mongoose = require('mongoose');

const MemberShema = new mongoose.Schema({  
    customerName: {
        type: String,     
        required: true,  
    }, 
    mobileNo:{
        type: Number,
        required: true,
    },
    joinedDate:{
        type: String,
        required: true,
    },
    customerStatus:{
        type: Boolean,
        default: true,
    }, 
    totalPurchased:{
        type: Number,
        default: 0
    }, 
    soldDevices:{
        type: Number,
        default:0
    },
    replacedDevices:{
        type: Number,
        default:0
    },
    unsoldDevices:{
        type: Number,
        default:0
    },
    bussinessName:{
        type: String,
        default:null
    },
    alternateMobile:{
        type: Number,
        default:null
    },
    address:{
        type: String,
        default:null
    },
    district:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bind_City',
        required: true,
    },
    location:{
        type: String,        
    }, 
    Pincode:{
        type: Number,
        
    },
    GSTNo:{
        type: Number,
        
    },
    mailId:{
        type: String,
    },
    password:{
        type: String,
        default: true
    },  
    memberType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bind_MemberType',
        required: true,
    },
    otp:{
        type:Number,
    },
    otpVerifyStatus:{
        type : Boolean,
        default: false
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

module.exports = trans_Member = mongoose.model('trans_Member',MemberShema);