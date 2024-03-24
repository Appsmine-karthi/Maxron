
const mongoose = require('mongoose');

const BindStateShema = new mongoose.Schema({    
    stateName: {
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

module.exports = Bind_State = mongoose.model('Bind_State',BindStateShema);