import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import "./chat.css";

function Chat(props) {
  const [dataList, setDataList] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(props.location.state.userId);
  const [roomId, setRoomId] = useState(props.location.state.roomId);
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const url = "http://localhost:5000";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  socketRef.current = io.connect(url);

  const submit = async () => {
    let result = await axios.post(`${url}/chat`, {
      content: message,
      userId,
      roomId,
    });
    setMessage("");
  };

  useEffect(() => {
    (async function () {
      try {
        const data = await axios.get(`${url}/chat/${roomId}`);
        setDataList(data.data.result);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    socketRef.current.on(roomId, (msg) => {
      setDataList((dataList) => [...dataList, msg]);
    });
    scrollToBottom();
    return () => socketRef.current.disconnect();
  }, [dataList]);

  return (
    <div className="chat">
      <div className="top">
        <p>
          <Link
            to={`/`}
            className="exitLink"
            onClick={() => {
              sessionStorage.removeItem("loginStatus");
            }}
          >
            Exit
          </Link>
        </p>
        <h1>{roomId}</h1>
        <p style={{ opacity: 0 }}>Hidden</p>
      </div>
      <div>
        <div className="listChat">
          {dataList &&
            dataList.map((item) => {
              if (item.userId === userId) {
                return (
                  <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"flex-end", flexDirection:"column" }}>
                    <p className="box mine">
                      {item.content}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"flex-start", flexDirection:"column" }}>
                    <h4 style={{ paddingLeft: "1rem", marginBottom: 0, marginTop: "2rem" }}>{item.username}</h4>
                    <p className="otherBox other">{item.content}</p>
                  </div>
                );
              }
            })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div>
        <form
          className="formClass"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="input-wrapper">
            <input
              type="text"
              className="inputMsg"
              placeholder="Message here..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <i
            className="fas fa-arrow-circle-up circle"
            onClick={() => {
              submit();
            }}
          ></i>
        </form>
      </div>
    </div>
  );
}

export default Chat;
