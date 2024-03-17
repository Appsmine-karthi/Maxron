const {
  loginUser,
  loginAstrologer,
  recoverUserAccount,
  forgotPassword,
  emailUpdate,
  mobileUpdate,
  resetPassword,
  verifyOTP,
} = require("../controllers/common/AuthUser");

module.exports = (router) => {
  // AstroCounselling APIs
  router.post("/auth/login-user", loginUser);
  router.post("/auth/login-astrologer", loginAstrologer);
  router.post("/auth/recover-user-account", recoverUserAccount);
  router.post("/auth/forgot-password", forgotPassword);
  router.post("/auth/reset-password", resetPassword);
  router.post("/auth/verify-OTP", verifyOTP);
  router.post("/auth/email-update", emailUpdate);
  router.post("/auth/mobile-update", mobileUpdate);
};
