
const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({  
    scanQR: {
        type: String,     
        required: true,  
    }, 
    controllerName:{
        type: Number,
        required: true,
    },
    controllerMobileNumber:{
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

module.exports = trans_Device = mongoose.model('trans_Device',DeviceSchemaeviceShema);