const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({  
    scanQR: {
        type: String,     
        required: true,  
    }, 
    controllerName:{
        type: String,
        required: true,
    },
    masterMobileNo:{
        type: String,
        required: true,
    }, 
    ownerName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: trans_Member,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    IMEI: {
        type: String,
    },
    fixedDate: {
        type: Date,
        default: null
    },
    totalServices:{
        type: Number,
        default:0
    },
    replaced:{
        type: Number,
        default :0
    },
    batteryLevel:{
       type: Number,
       default : 40
    },
    signalStrength: {
        type: Number,
       default : 40
    },
    motorState:{
        type : Boolean, 
        default : false // Off Device
    },
    RYVolt:{
        type: Number,
        default :430
    },
    ampR: {
        type: Number,
        default : 10.5
    },
    YBVolt:{
        type: Number,
        default: 440
    },
    ampY: {
        type: Number,
        default:  0.5
    },
    BRVolt: {
        type: Number,
        default: 410
    },
    ampB:{
        type: Number,
        default:  11.5
    },
    level:{ 
        type : String,
        default : 'High'
    },
    autoMode: {
        type : Boolean, 
        default : true
    },
    twoPhase: {
        type : Boolean, 
        default : false
    },
    lastOnDateTime:{ 
        type: Date,
        default: Date.now
    },
    lastOffDateTime:{ 
        type: Date,
        default: Date.now
    },
    //Voltage Settings
    threeLowVolt:{
        type: Number,
        default:  15
    },
    threeHighVolt: {
        type: Number,
        default: 20
    },
    threeImbalanceVolt:{
        type: Number,
        default: 45
    },
    twoLowVolt:{ 
        type: Number,
        default:  10
    },
    twoHighVolt:{
        type: Number,
        default:  60
    },
    //Current Settings
    dryRunScan: {
        type : Boolean, 
        default : true
    },
    dryRunScanTime: { 
        hours:{
            type:Number,
            default: 0
        },
        minutes: {
            type:Number,
            default: 0
        },
        seconds:{
            type:Number,
            default: 55
        },
    },
    threeDryAmps: {
        type: Number,
        default: 15
    },
    twoDryAmps:{
        type: Number,
        default:  12
    },
    overLoadScan: {
        type : Boolean, 
        default : false
    },
    overLoadScanTime: { 
            hours:{
            type:Number,
            default: 0
            },
        minutes:{
            type:Number,
            default: 0
            },
        seconds: {
            type:Number,
            default: 40
            },
    },
    onRelayTime: { 
    hours:{
        type:Number,
        default: 0
    },
     minutes:{
        type:Number,
        default: 0
    },
     seconds: {
        type:Number,
        default: 5
    }, },
    offRelayTime: { 
        hours:{
        type:Number,
        default: 0
        },
        minutes:{
            type:Number,
            default: 0
        },
        seconds: {
            type:Number,
            default: 15
        },
    },
    starToDeltaTime: { 
        hours:{
            type:Number,
            default: 0
        },
        minutes:{
            type:Number,
            default: 0
        },
        seconds: {
            type:Number,
            default: 25
        },
    },
    onDelayTime: { 
        hours:{
            type:Number,
            default: 0
        },
        minutes:{
            type:Number,
            default: 0
        },
        seconds: {
            type:Number,
            default: 51
        },
    },
    powerOnDelayTime: { 
        hours:{
            type:Number,
            default: 0
        },
        minutes:{
            type:Number,
            default: 0
        },
        seconds: {
            type:Number,
            default: 53
        } 
    },
    iotOrsms: { 
        type : String,
        default : 'SMS'
    },
    smsFeedback: {
        type : Boolean, 
        default : true
    },
    pushNotifications: {
        type : Boolean, 
        default : false
    },
    autoOrManual:{ 
        type : String,
        default : 'Auto'
    },
    //Timer Settings
    cyclicTimer:  {
        type : Boolean, 
        default : true
    },
    onCyclicTimer: { 
            hours: {
                type:Number,
                default: 2
            }, 
            minutes: {
                type:Number,
                default: 0
            },
            seconds: {
                type:Number,
                default: 0
            }
    },
    offCyclicTimer: { 
        hours: {
            type:Number,
            default: 1
        }, minutes:{
            type:Number,
            default: 42
        }, seconds:{
            type:Number,
            default: 2
        } 
    },
    dryRunRestart: {
        type : Boolean, 
        default : true
    },
    dryRunRestartTime: { 
        hours:{
            type:Number,
            default: 0
        },
        minutes: {
            type:Number,
            default: 40
        }, seconds: {
            type:Number,
            default: 0
        },
    },
    overloadRestart: {
        type : Boolean, 
        default : true
    },
    overloadRestartTime: { 
        hours:{
            type:Number,
            default: 0
        },
        minutes: {
            type:Number,
            default: 40
        }, 
        seconds: {
            type:Number,
            default: 0
        },
    },
    maxRun: {
        type : Boolean, 
        default : true
    },
    maxRunTime: { hours:{
            type:Number,
            default: 0
        },
        minutes: {
            type:Number,
            default: 40
        },
        seconds: {
            type:Number,
            default: 0
        },
    },
    roomLight: {
        type : Boolean, 
        default : true
    },
    onRoomLightTime: { 
        hours:{
        type:Number,
        default: 0
        },
        minutes: {
            type:Number,
            default: 40
        }, seconds: {
            type:Number,
            default: 0
        },
    },
    offRoomLightTime: { hours:{
            type:Number,
            default: 0
        },
        minutes: {
            type:Number,
            default: 40
        }, seconds: {
            type:Number,
            default: 0
        }, 
    },
    rtc: {
        type : Boolean, 
        default : true
    },
    rtcOnTime: { hours:{
            type:Number,
            default: 0
        },
        minutes: {
            type:Number,
            default: 0
        },
        seconds: {
            type:Number,
            default: 0
        },
    },
    rtcOffTime: { hours:{
            type:Number,
            default: 0
        },
        minutes: {
            type:Number,
            default: 0
        },
        seconds: {
            type:Number,
            default: 0
        },
    },
    //Mode Settings
    float: {
        type : Boolean, 
        default : true
    },
    numbers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: trans_Member,
        required: true,
    }],
    isActive: {
        type: Boolean,   
        default: true       
    },  
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("trans_Device",DeviceSchema);