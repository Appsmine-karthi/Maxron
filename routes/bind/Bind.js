const {
    bindCityRegister,updatebindCityRegister,getbindCityRegister,getSingleCityRegister,deletebindCityRegister
} = require("../../controllers/bind/Bind_City");

const {
    bindStateRegister,updatebindStateRegister,getbindStateRegister,getSingleStateRegister,deletebindStateRegister
} = require("../../controllers/bind/Bind_State");
const {
    bindMemberTypeRegister,getBindMemberType
} = require("../../controllers/bind/bind_MemberType");

module.exports = (router) => {

//Bind Member Type
 router.post("/bind-member-type", bindMemberTypeRegister);
 router.get("/bind-member-type", getBindMemberType);

 //Bind State
 router.post("/bind-state", bindStateRegister);
 router.put("/bind-state", updatebindStateRegister);
 router.get("/bind-state", getbindStateRegister);
 router.get("/bind-state/:id", getSingleStateRegister);
 router.delete("/bind-state/:id", deletebindStateRegister);

 //Bind City
 router.post("/bind-city", bindCityRegister);
 router.put("/bind-city", updatebindCityRegister);
 router.get("/bind-city", getbindCityRegister);
 router.get("/bind-city/:id", getSingleCityRegister);
 router.delete("/bind-city/:id", deletebindCityRegister);


};
