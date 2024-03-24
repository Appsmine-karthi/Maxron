
const Common = require("../../common/common");
const Bind_MemberType = require("../../models/bind/Bind_MemberType");
const bindMemberTypeRegister = async (req, res) => {   
    const common = new Common();
    try {     
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {    
        //   return res.status(400).send(common.commonStatus(errors.array(), false , "please fill mentatory fields"))
        // }
        const {
            rfId,
            dataName
        } = req.body;
      
      let tempUser = await Bind_MemberType.findOne({ rfId: rfId ,dataName:dataName  });
         
      if (tempUser != null) { 

          return res.status(400).send(common.commonStatus([], false , "Member Type Already Exits"))     

        }else{    

           let user = new Bind_MemberType({rfId, dataName})            
          
          let data = await user.save();

          if(data){
              return res.status(200).send(common.commonStatus(data, true , "Member Type Created Successfully")) 
          }
        }     
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }

};
const getBindMemberType = async (req, res) => {   
    const common = new Common();
    try {     
     
        const common = new Common()

        const memberType = await Bind_MemberType.find().sort({ rfId: 1 });  
    
        if(memberType?.length > 0)
        {
            return res.status(200).send(common.commonStatus(memberType, true , "Member Type Details")) 
        }
        else
        {
            return res.status(400).send(common.commonStatus([], false , "No More Data in Member Type"))     
        }
    
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(common.commonStatus([], false , "Server Error"))
    }

};

module.exports = {
    bindMemberTypeRegister,getBindMemberType
};
