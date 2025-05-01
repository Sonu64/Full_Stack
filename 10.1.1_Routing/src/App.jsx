import { useState } from "react";
// import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/test-series" element={<TestSeries />} />
            <Route path="/study-materials" element={<StudyMaterials />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Header = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">ALLEN</Link>
          </li>
          <li>
            <Link to="/exams">Exams</Link>
          </li>
          <li>
            <Link to="/programs">Programs</Link>
          </li>
          <li>
            <Link to="/scholarships">Programs</Link>
          </li>
          <li>
            <Link to="/test-series">Test Series</Link>
          </li>
          <li>
            <Link to="/study-materials">Study Materials</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

const Home = () => {
  return (
    <>
      <div>
        <h3>HOME Content goes here</h3>
      </div>
    </>
  );
};

const Exams = () => {
  return (
    <>
      <div>
        <h3>EXAMS Content goes here</h3>
      </div>
    </>
  );
};

const Programs = () => {
  return (
    <>
      <div>
        <h3>PROGRAMS Content goes here</h3>
      </div>
    </>
  );
};

const Scholarships = () => {
  return (
    <>
      <div>
        <h3>SCHOLARSHIP Content goes here</h3>
      </div>
    </>
  );
};

const TestSeries = () => {
  return (
    <>
      <div>
        <h3>TEST-SERIES Content goes here</h3>
      </div>
    </>
  );
};

const StudyMaterials = () => {
  return (
    <>
      <div>
        <h3>STUDY-MATERIALS Content goes here</h3>
      </div>
    </>
  );
};

const NoPage = () => {
  return (
    <>
      <div>
        <h3>404 - Page not found !</h3>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <div>
        <h3>Footer Content goes here</h3>
      </div>
    </>
  );
};

const Layout = () => {
  // The "layout route" is a shared
  // component that inserts common content on all pages, such as a navigation menu.
  return (
    <div>
      <Header />;
      <Outlet />
      <Footer />;
    </div>
  );
};

export default App;
