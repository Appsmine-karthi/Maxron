const {
    deviceRegister,updateDeviceRegister,getDeviceRegister,getSingleDevicesRegister,deleteDevicesRegister
} = require("../../controllers/device/Device");


module.exports = (router) => {

//Bind Member Type
 router.post("/device", deviceRegister);
 router.put("/device", updateDeviceRegister);
 router.get("/device", getDeviceRegister);

};
