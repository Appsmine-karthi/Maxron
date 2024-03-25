const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Common = require("../../common/common");
const Member = require("../../models/member/Member");
Date.prototype.addTimeInMinutes = function (date, minutes) {
  const modified = new Date(date.getTime() + minutes*60*1000);
  return modified;
} 
const memberOtpSentMobileNumber = async (req, res) => {
    const common = new Common();
    try {
        const {         
         
          mobileNo,         
          memberType
        } = req.body;
      
      let data = await Member.findOne({ mobileNo :mobileNo , memberType : memberType });
         
      if (data != null) {       
          let OtpCreate =  (Math.floor(Math.random() * 999999) + 1) ;
          let otp = OtpCreate > 99999 ? OtpCreate : 895623 ;
          // await common.sms(mobileNumber, otp, appId);
          const memberOtp =  await Member.updateOne({ mobileNo : mobileNo , memberType : memberType }, { otp : otp }); 

            return res.status(200).send(common.commonStatus({otp : otp}, true , "Member Login Successfully")) ;      

        }else{             
            return res.status(400).send(common.commonStatus([], false , "Mobile Number and Password wrong."))  
         
        }     
    
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(common.commonStatus([], false , "Server Error"))
      }
};
const tempOtpValidate = async (req, res) => {
   
  const common = new Common();
  try {
      const {
        mobileNo, otp, memberType
      } = req.body;    
        let memberData = await Member.findOne({ mobileNo : mobileNo , otp : otp , memberType: memberType});
        if(memberData == null){        
            return res.status(400).send(common.commonStatus([], false , "User Otp Wrong"));       
        }else{
          return res.status(200).send(common.commonStatus(memberData, true , "Login Verified Successfully"));  
        }
  
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(common.commonStatus([], false , "Server Error"))
  }

};

const forgetPassword = async (req, res) => {
    const common = new Common();
    try {
        const {         
         
          mobileNo,         
          memberType
        } = req.body;
      
      let data = await Member.findOne({ mobileNo :mobileNo , memberType : memberType });
         
      if (data != null) {       
            return res.status(200).send(common.commonStatus(data, true , "Member Login Successfully")) ;      

        }else{             
            return res.status(400).send(common.commonStatus([], false , "Mobile Number and Password wrong."))  
         
        }     
    
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(common.commonStatus([], false , "Server Error"))
      }
};

module.exports = {
  memberOtpSentMobileNumber , tempOtpValidate
};
