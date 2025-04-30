import React from "react";
import "./App.css";

const Card = ({ children }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "25px",
        margin: "0px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

const App = () => {
  return (
    <>
      <div
        className="cards"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Some cards</h2>
        <div
          className="cardSection"
          style={{
            display: "flex",
            width: "90%",
            textAlign: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Card>
            <h2>Card Title as children prop</h2>
            <p>This is some content inside the card as children prop</p>
          </Card>
          <Card>
            <h2>Another Card title as children prop</h2>
            <p>
              This card has different content! Any component or element wrapped
              between custom React components are received by the React
              component as a special prop called children.
            </p>
          </Card>
          <Card>
            <h2>Another Card title as children prop</h2>
            <p>
              This card has different content! Any component or element wrapped
              between custom React components are received by the React
              component as a special prop called children.
            </p>
          </Card>
          <Card>
            <h2>Another Card title as children prop</h2>
            <p>
              This card has different content! Any component or element wrapped
              between custom React components are received by the React
              component as a special prop called children.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default App;
