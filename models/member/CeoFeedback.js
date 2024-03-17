
const mongoose = require('mongoose');

const CeoFeedBackShema = new mongoose.Schema({  
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trans_MemberRegistration',
        required: true,  
    }, 
    rating: {
        type: Number,     
        required: true,  
    }, 
    dataName:{
        type: String,
        default: true
    },
    reply:{
        type: String,
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

module.exports = trans_ceofeedback = mongoose.model('trans_ceofeedback',CeoFeedBackShema);