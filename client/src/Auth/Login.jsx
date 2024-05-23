import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginData = (e) => {
    e.preventDefault();

    console.log(formData);
    axios
      .post("http://localhost:8000/api/auth/login", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user.name);
        navigate("/profile");
      });
  };

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="form" onSubmit={loginData}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={togglePasswordVisibility}
                className="password-icon"
              />
            ) : (
              <FaEye
                onClick={togglePasswordVisibility}
                className="password-icon"
              />
            )}
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
