const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Common = require("../../common/common");
const FeedBack = require("../../models/member/CeoFeedback");
Date.prototype.addTimeInMinutes = function (date, minutes) {
  const modified = new Date(date.getTime() + minutes*60*1000);
  return modified;
} 
const ceoFeedBackRegister = async (req, res) => {
    const common = new Common();
    try {
        const {         
            userId,
            rating,
            dataName
        } = req.body;
      
      let feedback = await FeedBack.findOne({ userId :userId , rating : rating  });
         
      if (feedback != null) { 

          return res.status(400).send(common.commonStatus([], false , "FeedBack Already Exits"))     

        }else{    

          let userFeedBack = new FeedBack({       userId,
                                                rating,
                                                dataName
                                  })            
          
          let data = await userFeedBack.save();

          if(data){
              return res.status(200).send(common.commonStatus(data, true , "User FeedBack Added Successfully")) 
          }
        }     
    
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(common.commonStatus([], false , "Server Error"))
      }
};
const ceoFeedBackRegisterUpdate = async (req, res) =>{
  const common = new Common();
  try {        
    let data = req.body;       
    
    let feedBack = await FeedBack.findOne({ _id: data._id });
       
    if (feedBack != null) { 
            feedBack.userId                        = data.userId;
            feedBack.rating                        = data.rating;
            feedBack.dataName                      = data.dataName;
         
            const result = await feedBack.save();         

          if(result){
              return res.status(200).send(common.commonStatus(result, true , "User Feedback Updated Successfully"))   ;
          }        

      }else{       
              return res.status(400).send(common.commonStatus([], false , "Please Check id"));     
        }        
  
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(common.commonStatus([], false , "Server Error"))
  }
}
// CEO Reply
const ceoFeedBackReplyUpdate = async (req, res) =>{
  const common = new Common();
  try {        
    let data = req.body;       
    
    let feedBack = await FeedBack.findOne({ _id: data._id });
       
    if (feedBack != null) { 
           
            feedBack.reply                      = data.reply;
         
            const result = await feedBack.save();         

          if(result){
              return res.status(200).send(common.commonStatus(result, true , "CEO Feedback Reply Successfully"))   ;
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
const ceoGetFeedBackRegister = async (req, res) => {   
  const common = new Common();
  try {     
   
      const common = new Common();
      const feedBack = await FeedBack.find().populate({ path: "userId" }).sort(); 
      if(feedBack?.length > 0)
      {
          return res.status(200).send(common.commonStatus(feedBack, true , "User Feedback Details")) 
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
const ceoGetFilterFeedBackRegister = async (req, res) => {   
  const common = new Common();
  try {     
   
      const common = new Common();

      const { _id, rating, fromDate, toDate } = req.body;

      let filter = {}; 
      
      if(rating){
         filter.rating = rating;
      }
      if(fromDate && toDate){
         filter.date = {$gte: fromDate , $lt: toDate };
      }   
  
      const feedBack = await FeedBack.find(filter).populate({ path: "userId" }).sort(); 
      if(feedBack?.length > 0)
      {
          return res.status(200).send(common.commonStatus(feedBack, true , "User Feedback Details")) 
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
const ceoGetSingleFeedBackRegister = async (req, res) => {   
  const common = new Common();
  try {     
   
      const feedBack = await FeedBack.findById(req.params.id).populate({ path: "userId" });

      if (!feedBack) {
          return res.status(400).send(common.commonStatus([], false , "User Feedback not Founted"))  
        }else{
          return res.status(200).send(common.commonStatus(feedBack, true , "User Feedback Details")) 
        }   
    
  
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(common.commonStatus([], false , "Server Error"))
  }

};

// Delete By ID
const ceoFeedBackDeleteRegister = async (req, res) => {   
  const common = new Common();
  try {     
   
      const feedback = await FeedBack.findById(req.params.id);

      if (!feedback) {
      return res.status(400).send(common.commonStatus([], false , "User Feedback not Founted"))       
      }else{
          await FeedBack.deleteOne({ _id : req.params.id });
          return res.status(200).send(common.commonStatus(feedback, true , "User Feedback Details Removed"));
      }
  
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(common.commonStatus([], false , "Server Error"))
  }
};
module.exports = {
    ceoFeedBackRegister,ceoFeedBackRegisterUpdate, ceoFeedBackReplyUpdate, ceoGetFeedBackRegister, ceoGetFilterFeedBackRegister, ceoGetSingleFeedBackRegister , ceoFeedBackDeleteRegister
};
