const {
    memberRegister,memberRegisterUpdate,  getMemberRegister, filterMembersRegister, getSingleMembersRegister , memberDeleteRegister
} = require("../controllers/member/Member");

module.exports = (router) => {
 //Maxorom Members
 router.post("/member", memberRegister);
 router.put("/member", memberRegisterUpdate);
 router.post("/member/filter", filterMembersRegister);
 router.get("/member", getMemberRegister);
 router.get("/member/:id", getSingleMembersRegister);
 router.delete("/member/:id", memberDeleteRegister);
};
