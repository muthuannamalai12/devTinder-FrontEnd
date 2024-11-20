import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    // Routing with no children routes

    // <BrowserRouter basename="/">
    //   <Routes>
    //     <Route path="/" element={<Body />}></Route>
    //     <Route path="/login" element={<div>Login</div>}></Route>
    //     <Route path="/test" element={<div>Test</div>}></Route>
    //   </Routes>
    // </BrowserRouter>

    // Routing with children routes

    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
