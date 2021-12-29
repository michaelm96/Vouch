const router = require('express').Router()
const ChatController = require("../controller/ChatController")

router.post('/', ChatController.chatEnter)
router.post('/chat', ChatController.chatPost)
router.get('/chat/:roomname', ChatController.chatGetAll)


module.exports = router