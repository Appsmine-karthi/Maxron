const Common = require("../../common/common");
const Device = require("../../models/device/Device");
// Insert Row
const deviceRegister = async (req, res) => {   
    const common = new Common();
    try { 
        const {         
            scanQR,
            controllerName,
            masterMobileNo
        } = req.body;
      
      let device = await Device.findOne({ scanQR:scanQR  ,controllerName : controllerName,masterMobileNo : masterMobileNo  });
         
      if (device != null) { 

          return res.status(400).send(common.commonStatus([], false , "Device Already Exits"))     

        }else{    

          let deviceSave = new Device({  scanQR,
            controllerName,
            masterMobileNo })            
          
          let data = await deviceSave.save();

          if(data){
              return res.status(200).send(common.commonStatus(data, true , "Device Created Successfully")) 
          }
        }     
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }

};
// Update Column Name
const updateDeviceRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const {  
            _id,       
            stateName
        } = req.body;
      
      let device = await Device.findOne({ _id: _id });
         
      if (device != null) {
        await Object.keys(req.body).forEach(key => {
                device[key] = req.body[key];
        });         
        let data = await device.save();

            if(data){
                return res.status(200).send(common.commonStatus(data, true , "Device Updated Successfully"))   ;
            }

        }else{       
                return res.status(400).send(common.commonStatus([], false , "Please Check id"));     
          }        
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }

};
// Get Full View
const getDeviceRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const common = new Common();
        const device = await Device.find().sort({ rfId: 1 }); 
        if(device?.length > 0)
        {
            return res.status(200).send(common.commonStatus(device, true , "Device Details")) 
        }
        else
        {
            return res.status(400).send(common.commonStatus([], false , "No More Data in State"))     
        }
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }
};
// Get Single View
const getSingleDevicesRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const language = await Device.findById(req.params.id);

        if (!language) {
            return res.status(400).send(common.commonStatus([], false , "Device not Founted"))  
          }else{
            return res.status(200).send(common.commonStatus(language, true , "Device Details")) 
          }   
      
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }

};

// Delete By ID
const deleteDevicesRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const language = await Device.findById(req.params.id);

        if (!language) {
        return res.status(400).send(common.commonStatus([], false , "Device not Founted"))       
        }else{
            await Device.deleteOne({ _id : req.params.id });
            return res.status(200).send(common.commonStatus(language, true , "Device Details Removed"));
        }
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }
};

module.exports = {
    deviceRegister,updateDeviceRegister,getDeviceRegister,getSingleDevicesRegister,deleteDevicesRegister
};
