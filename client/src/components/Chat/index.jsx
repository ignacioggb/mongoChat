import React, { Component } from "react";
import io from "socket.io-client";
import Initials from "../Initials/initials";
import API from "../../utils/API";



class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        componentDidMount() {
            const data = this.props.location.data;
            if (data && data.results.length > 0) {
        
              this.setState({
                books: data.results.filter((value, index) => index < 5),
                target: "_blank"
              });
            } else {
              this.setState({
                noResults: true
              });
            }
          }
            saveChat = chat => {
                API.saveChat(chat)
                  .then(res => {
                    const currentChats = this.state.message;
                    //const filterChats = currentChats.filter(chat => chat.id !== res.data.id);
                    this.setState({
                      chats: currentChats
                    });
                  })
                  .catch(err => console.log(err));
              }

        this.socket = io('localhost:5000');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>

                                
                                {this.state.messages.map(message => {
                                        return (
                                            
                                            <div className={message.author != "Nacho" ? ("received_withd_msg") : ("outgoing_msg")}>
                                                {message.author != "Nacho" ? ( <Initials className="avatar" name={message.author} />) : ("")}                                
                                                <div className={message.author != "Nacho" ? ("received_msg") : ("sent_msg")}>

                                                
                                            <p>{message.author}: {message.message} <span className="time_date">Sent {new Date().getDate()}/{new Date().getMonth()+1} at {new Date().getHours()}:{new Date().getMinutes()}</span> </p>                                          
                                            </div>
                                            </div>
                                        )
                                    })}
                                    

                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={()=>this.saveChat({
                                author: this.state.username,
                                message: this.state.message
                                })} className="btn btn-primary form-control">Send</button>
                            
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};




export default Chat;