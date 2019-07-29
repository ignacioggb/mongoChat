import axios from "axios";

export default {

  // Gets saved Books
  getSavedChats: function() {
    return axios.get("/api/chats/");
  },
  // Deletes the Book with the given id
  deleteChat: function(id) {
    return axios.delete("/api/chats/" + id);
  },
  // Saves a Book to the database
  saveChat: function(chatData) {
    console.log(chatData);
    return axios.post("/api/chats", chatData);
  }
};