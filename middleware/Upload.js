const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('files');

module.exports = upload;