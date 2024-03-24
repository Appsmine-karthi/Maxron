const Common = require("../../common/common");
const Bind_State = require("../../models/bind/Bind_State");
// Insert Row
const bindStateRegister = async (req, res) => {   
    const common = new Common();
    try {    
       
        const {         
            stateName
        } = req.body;
      
      let bind_state = await Bind_State.findOne({ stateName:stateName  });
         
      if (bind_state != null) { 

          return res.status(400).send(common.commonStatus([], false , "State Already Exits"))     

        }else{    

          let gender = new Bind_State({ stateName})            
          
          let data = await gender.save();

          if(data){
              return res.status(200).send(common.commonStatus(data, true , "State Created Successfully")) 
          }
        }     
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }

};
// Update Column Name
const updatebindStateRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const {  
            _id,       
            stateName
        } = req.body;
      
      let bind_state = await Bind_State.findOne({ _id: _id });
         
      if (bind_state != null) { 

        bind_state.stateName = stateName;           
         
        let data = await bind_state.save();

            if(data){
                return res.status(200).send(common.commonStatus(data, true , "State Updated Successfully"))   ;
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
const getbindStateRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const common = new Common();
        const bind_state = await Bind_State.find().sort({ rfId: 1 }); 
        if(bind_state?.length > 0)
        {
            return res.status(200).send(common.commonStatus(bind_state, true , "State Details")) 
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
const getSingleStateRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const language = await Bind_State.findById(req.params.id);

        if (!language) {
            return res.status(400).send(common.commonStatus([], false , "State not Founted"))  
          }else{
            return res.status(200).send(common.commonStatus(language, true , "State Details")) 
          }   
      
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }

};

// Delete By ID
const deletebindStateRegister = async (req, res) => {   
    const common = new Common();
    try {     
     
        const language = await Bind_State.findById(req.params.id);

        if (!language) {
        return res.status(400).send(common.commonStatus([], false , "State not Founted"))       
        }else{
            await Bind_State.deleteOne({ _id : req.params.id });
            return res.status(200).send(common.commonStatus(language, true , "State Details Removed"));
        }
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }
};

module.exports = {
    bindStateRegister,updatebindStateRegister,getbindStateRegister,getSingleStateRegister,deletebindStateRegister
};
