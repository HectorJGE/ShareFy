const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/message.controllers');

router.post("/message/add", controllers.createMessage);
router.post("/message/get", controllers.getMessages);

module.exports = router;