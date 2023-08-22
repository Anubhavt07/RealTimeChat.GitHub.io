const mongoose = require('mongoose');
const Chat = require('./models/chat');
// Replace <YOUR_CONNECTION_STRING> with your actual MongoDB Atlas connection string
mongoose.connect('mongodb+srv://anu052:Anurag2023@cluster0.ocuv7ec.mongodb.net/chat?retryWrites=true&w=majority/chats', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


function saveChatMessage(data) {
    const newChat = new Chat({
      sender: data.sender,
      message: data.message,
    });
  
    newChat.save()
      .then(() => {
        console.log('Chat message saved successfully');
      })
      .catch((err) => {
        console.error('Error saving chat message:', err);
      });
  }
  
  module.exports = {
    saveChatMessage,
  };
