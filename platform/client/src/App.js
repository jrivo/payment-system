import "./App.css";
import Transactions from "./components/Transactions";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Payments from "./pages/Payments";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Context from "./Context";
import { useMemo, useState } from "react";
import Payment from "./pages/Payment";

function App() {
  const [user, setUser] = useState({
    firstName: "default",
    lastName: "poo",
    token: "",
  });
  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );
  return (
    <Context.Provider value={value}>
      <Router>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/payments" element={<Payments />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
