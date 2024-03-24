const Common = require("../../common/common");
const Bind_City = require("../../models/bind/Bind_City");
// Insert Row
const bindCityRegister = async (req, res) => {   
    const common = new Common();
    try {    
       
        const {  
            stateId,       
            cityName
        } = req.body;
      
      let bind_city = await Bind_City.findOne({ cityName:cityName  });
         
      if (bind_city != null) { 

          return res.status(400).send(common.commonStatus([], false , "City Already Exits"))     

        }else{    

          let city = new Bind_City({ stateId, cityName})            
          
          let data = await city.save();

          if(data){
              return res.status(200).send(common.commonStatus(data, true , "City Created Successfully")) 
          }
        }     
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }

};
// Update Column Name
const updatebindCityRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const {  
            _id,       
            stateId,
            cityName
        } = req.body;
      
      let bind_city = await Bind_City.findOne({ _id: _id });
         
      if (bind_city != null) { 

        bind_city.cityName = cityName;           
        bind_city.stateId = stateId;           
         
        let data = await bind_city.save();

            if(data){
                return res.status(200).send(common.commonStatus(data, true , "City Updated Successfully"))   ;
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
const getbindCityRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const common = new Common();
        const bind_city = await Bind_City.find().sort({ rfId: 1 }); 
        if(bind_city?.length > 0)
        {
            return res.status(200).send(common.commonStatus(bind_city, true , "City Details")) 
        }
        else
        {
            return res.status(400).send(common.commonStatus([], false , "No More Data in City"))     
        }
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }
};
// Get Single View
const getSingleCityRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const city = await Bind_City.findById(req.params.id);

        if (!city) {
            return res.status(400).send(common.commonStatus([], false , "City not Founted"))  
          }else{
            return res.status(200).send(common.commonStatus(city, true , "City Details")) 
          }   
      
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }

};

// Delete By ID
const deletebindCityRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const city = await Bind_City.findById(req.params.id);

        if (!city) {
        return res.status(400).send(common.commonStatus([], false , "City not Founted"))       
        }else{
            await Bind_City.deleteOne({ _id : req.params.id });
            return res.status(200).send(common.commonStatus(city, true , "City Details Removed"));
        }
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }
};

module.exports = {
    bindCityRegister,updatebindCityRegister,getbindCityRegister,getSingleCityRegister,deletebindCityRegister
};
