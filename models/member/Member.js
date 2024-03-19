
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
    location:{
        type: String,
        required: true,
    }, 
    
    joinedDate:{
        type: String,
        required: true,
    },
    customerStatus:{
        type: Boolean,
        required: true,
    }, 
    totalPurchased:{
        type: Number,
        required: true,
    }, 
    soldDevices:{
        type: Number,
        required: true,
    },
    replacedDevices:{
        type: Number,
        required: true,
    },
    unsoldDevices:{
        type: Number,
        required: true,
    },
    bussinessName:{
        type: String,
        required: true,
    },
    alternateMobile:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    District:{
        type: String,
        required: true,
    },
    Pincode:{
        type: Number,
        required: true,
    },
    GSTNo:{
        type: Number,
        required: true,
    },
    MailId:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
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