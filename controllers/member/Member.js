const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Common = require("../../common/common");
const Member = require("../../models/member/Member");
Date.prototype.addTimeInMinutes = function (date, minutes) {
  const modified = new Date(date.getTime() + minutes*60*1000);
  return modified;
} 
const memberRegister = async (req, res) => {
    const common = new Common();
    try {
        const {         
          customerName,
          mobileNo,
          location,
          joinedDate,
          customerStatus,
          totalPurchased,
          soldDevices,
          replacedDevices,
          unsoldDevices,
          bussinessName,
          alternateMobile,
          address,
          district,
          Pincode,
          GSTNo,
          mailId,
          password,
          memberType
        } = req.body;
      
      let Members = await Member.findOne({ mobileNo :mobileNo , memberType : memberType  });
         
      if (Members != null) { 

          return res.status(400).send(common.commonStatus([], false , "Members Already Exits"))     

        }else{   
          const date = common.commonDateGet() ;

          let userMembers = new Member({       customerName,
                                                mobileNo,
                                                location,
                                                joinedDate,
                                                customerStatus,
                                                totalPurchased,
                                                soldDevices,
                                                replacedDevices,
                                                unsoldDevices,
                                                bussinessName,
                                                alternateMobile,
                                                address,
                                                district,
                                                Pincode,
                                                GSTNo,
                                                mailId,
                                                password,
                                                memberType,
                                                date                                             
                                  })            
          
          let data = await userMembers.save();

          if(data){
              return res.status(200).send(common.commonStatus(data, true , "User Members Added Successfully")) 
          }
        }     
    
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(common.commonStatus([], false , "Server Error"))
      }
};
const memberRegisterUpdate = async (req, res) =>{
  const common = new Common();
  try {        
    let data = req.body;       
    
    let Members = await Member.findOne({ _id: data._id });
       
    if (Members != null) { 
      Members.customerName      = data.customerName;
      Members.location          = data.location;
      Members.joinedDate        = data.joinedDate;
      Members.customerStatus    = data.customerStatus;
      Members.totalPurchased    = data.totalPurchased;
      Members.soldDevices       = data.soldDevices;
      Members.replacedDevices   = data.replacedDevices;
      Members.unsoldDevices     = data.unsoldDevices;
      Members.bussinessName     = data.bussinessName;
      Members.alternateMobile   = data.alternateMobile;
      Members.address           = data.address;
      Members.district          = data.district;
      Members.Pincode           = data.Pincode;
      Members.GSTNo             = data.GSTNo;
      Members.mailId            = data.mailId;
      Members.password          = data.password;
      Members.memberType        = data.memberType;
         
            const result = await Members.save();         

          if(result){
              return res.status(200).send(common.commonStatus(result, true , "User Members Updated Successfully"))   ;
          }        

      }else{       
              return res.status(400).send(common.commonStatus([], false , "Please Check id"));     
        }        
  
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(common.commonStatus([], false , "Server Error"))
  }
}
// Get Full View
const getMemberRegister = async (req, res) => {   
  const common = new Common();
  try {     
   
      const common = new Common();
      const Members = await Member.find().populate({ path: "district" }).populate({ path: "memberType" }).sort(); 
      if(Members?.length > 0)
      {
          return res.status(200).send(common.commonStatus(Members, true , "User Members Details")) 
      }
      else
      {
          return res.status(400).send(common.commonStatus([], false , "No More Data in User"))     
      }
  
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(common.commonStatus([], false , "Server Error"))
  }
};

// CEO filter option
const filterMembersRegister = async (req, res) => {   
  const common = new Common();
  try {     
   
      const common = new Common();

      const { _id, fromDate, toDate } = req.body;

      let filter = {}; 
      
      if(fromDate && toDate){
         filter.date = {$gte: fromDate , $lt: toDate };
      }   
  
      const Members = await Member.find(filter).populate({ path: "memberType" }).populate({ path: "district" }).sort(); 
      if(Members?.length > 0)
      {
          return res.status(200).send(common.commonStatus(Members, true , "User Members Details")) 
      }
      else
      {
          return res.status(400).send(common.commonStatus([], false , "No More Data in User"))     
      }
  
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(common.commonStatus([], false , "Server Error"))
  }
};
// Get Single View
const getSingleMembersRegister = async (req, res) => {   
  const common = new Common();
  try {     
   
      const Members = await Member.findById(req.params.id).populate({ path: "memberType" }).populate({ path: "district" }).sort(); 

      if (!Members) {
          return res.status(400).send(common.commonStatus([], false , "User Members not Founted"))  
        }else{
          return res.status(200).send(common.commonStatus(Members, true , "User Members Details")) 
        }   
    
  
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(common.commonStatus([], false , "Server Error"))
  }

};

// Delete By ID
const memberDeleteRegister = async (req, res) => {   
  const common = new Common();
  try {     
   
      const Members = await Member.findById(req.params.id);

      if (!Members) {
      return res.status(400).send(common.commonStatus([], false , "User Members not Founted"))       
      }else{
          await Member.deleteOne({ _id : req.params.id });
          return res.status(200).send(common.commonStatus(Members, true , "User Members Details Removed"));
      }
  
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(common.commonStatus([], false , "Server Error"))
  }
};
module.exports = {
    memberRegister,memberRegisterUpdate,  getMemberRegister, filterMembersRegister, getSingleMembersRegister , memberDeleteRegister
};
