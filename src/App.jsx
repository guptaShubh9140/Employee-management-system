import React, { useState, useEffect, useContext } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, SetUserData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (!userData) {
      alert("Please wait, loading data...");
      return;
    }

    if (email === "admin@example.com" && password === "123") {
      setUser("admin");
      setLoggedInUserData({});
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "admin", data: {} })
      );
    } else if (userData) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
      }
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === "admin" && <AdminDashboard changeUser={setUser} />}
      {user === "employee" && (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      )}
    </>
  );
};
export default App;
