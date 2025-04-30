import React, { useState } from "react";
//import "./App.css";

// ErrorBoundary component can be used as a Black box, as used by many orgs, as
// Class Based components are rarely used now. ErrorBoundary component is the only
// class based component with active usage in the industry.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            margin: "auto",
            marginTop: "40px",
            border: "2px solid white",
            width: "90%",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              color: "red",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Something went wrong.
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

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

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "",
        margin: "40px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
      }}
    >
      <div
        className="collapsibleTop"
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "1000px",
          alignItems: "center",
          borderBottom: "2px solid grey",
        }}
      >
        <h3>{title}</h3>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: "7px 17px",
            display: "block",
          }}
        >
          {isOpen ? "Close" : "Open"}
        </button>
      </div>

      {isOpen ? children : null}
    </div>
  );
};

const BuggyComponent = () => {
  throw new Error("I crashed!");
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

      <ErrorBoundary>
        <BuggyComponent></BuggyComponent>
      </ErrorBoundary>

      <Collapsible title="Section 1">
        <p style={{ padding: "15px" }}>This is the content of collapsible 1.</p>
      </Collapsible>
      <Collapsible title="Section 2">
        <p style={{ padding: "15px" }}>This is the content of collapsible 2.</p>
      </Collapsible>
    </>
  );
};

export default App;
