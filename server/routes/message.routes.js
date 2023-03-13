const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/message.controllers');

router.post("/message/add", controllers.createMessage);
router.post("/message/get", controllers.getMessages);
router.post("/message/getSenders", controllers.getSenders);

module.exports = router;