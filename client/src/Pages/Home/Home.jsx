import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./home.css";

function Home() {
  const [Username, setUsername] = useState("");
  const [RoomId, setRoomId] = useState("");
  let history = useHistory();
  const url = process.env.REACT_APP_API_URL

  const submit = async () => {
    try {
      let result = await axios.post(url, {
        username: Username,
        roomname: RoomId,
      });

      if (result.status === 200) {
        sessionStorage.setItem("loginStatus", "loggedIn");

        // Move to path /chat
        history.push({
          pathname: "/chat",
          state: { roomId: RoomId, userId: result.data.result.userId },
        });
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="title">
        <h1>Join Chatroom</h1>
      </div>
      <div>
        <form className="form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
            defaultValue={Username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            type="text"
            name="roomId"
            placeholder="RoomID"
            className="input"
            defaultValue={RoomId}
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          ></input>
        </form>
      </div>
      <div className="join">
        <button
          className="joinBtn"
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          JOIN
        </button>
      </div>
    </div>
  );
}

export default Home;
