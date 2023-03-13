const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/chat.controllers');

router.post("/chat/add", controllers.createChat);
router.post("/chat/get", controllers.getNonFollowedChat);

module.exports = router;