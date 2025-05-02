import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const emailBox = useRef(null);

  useEffect(() => {
    if (emailBox) {
      emailBox.current.focus();
    } else {
      return;
    }
  }, []);

  return (
    <>
      <div className="form">
        {" "}
        <form
          action="#"
          style={{
            background: "#403E3E",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            padding: "40px",
            paddingTop: "0",
            gap: "30px",
            marginBottom: "50px",
          }}
        >
          <h2
            style={{
              color: "#fff",
              width: "100%",
              textAlign: "center",
              padding: "10px 0px",
            }}
          >
            Sign In
          </h2>
          <input
            type="email"
            name="email"
            ref={emailBox}
            id="email"
            style={{
              padding: "12px",
              backgroundColor: "transparent",
              border: "2px solid grey",
              color: "white",
              fontSize: "1.2rem",
            }}
            placeholder="E-Mail"
          ></input>
          <input
            type="password"
            name="pwd"
            id="pwd"
            style={{
              padding: "12px",
              backgroundColor: "transparent",
              border: "2px solid grey",
              color: "white",
              fontSize: "1.2rem",
            }}
            placeholder="Password"
          ></input>
        </form>
      </div>

      <ChatBox />
    </>
  );
}

const ChatBox = () => {
  const [messages, setMessages] = useState([""]);
  const ChatBoxRef = useRef(null);
  const newMsgRef = useRef(null);

  const addMsg = () => {
    const newMessage = newMsgRef.current.value;
    if (newMessage.trim() !== "") {
      console.log(newMessage); // newMessage is the latest message to be added to
      // messages array and it does not need to wait for re-render to update the value.
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(messages); // newMessage will not be a part of the messages array here
      // as useState updates the actual content only after using the new value in the
      // upcoming re-render. This is how useState works !!
    } else {
      alert("Please Enter a message !");
    }
  };

  useEffect(() => {
    ChatBoxRef.current.scrollTop = ChatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <div>
        <input
          type="text"
          name="newMsg"
          id="newMsg"
          ref={newMsgRef}
          style={{ padding: "15px", fontSize: "1.2rem", background: "#D6E7D7" }}
        ></input>
        <button
          onClick={addMsg}
          style={{
            marginBottom: "30px",
            marginLeft: "15px",
            padding: "15px",
            fontWeight: "bold",
            color: "white",
            fontSize: "1.2rem",
            backgroundColor: "#4DAA50",
            cursor: "pointer",
          }}
        >
          Add Message
        </button>
        <div
          ref={ChatBoxRef}
          style={{
            height: "200px",
            overflowY: "scroll",
            border: "1px solid black",
          }}
        >
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
