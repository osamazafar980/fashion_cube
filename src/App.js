import logo from './logo.svg';
import Register from './Register';
import Login from './Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

        </Routes>
      </Router>
  );
}

export default App;
