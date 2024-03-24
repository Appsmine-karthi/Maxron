
const mongoose = require('mongoose');

const BindCityShema = new mongoose.Schema({    
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bind_State',
        required: true,
    },  
    cityName: {
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

module.exports = Bind_City = mongoose.model('Bind_City',BindCityShema);