import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState(false); // State for form error
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      // Check if username or password is empty
      setFormError(true);
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND}/admin/login`, {
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        const token = response.data.token;
        // Store the token in state or local storage
        localStorage.setItem("jwtToken", token);
        Navigate("/admin/reservations");
      })
      .catch((error) => {
        console.error(error);
        setFormError(true); // Set form error for invalid credentials
      });
  };

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-login text-center">
                <div className="bg-login-overlay"></div>
                <div className="position-relative">
                  <h5 className="text-white font-size-20">Welcome Admin !</h5>
                </div>
              </div>
              <div className="card-body pt-5">
                <div className="p-2">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className="font-size-13"
                      >
                        E-Mail
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`custom-form-control ${
                          formError && !formData.username ? "is-invalid" : ""
                        }`}
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="password"
                        className="font-size-13"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`custom-form-control ${
                          formError && !formData.password ? "is-invalid" : ""
                        }`}
                        required
                      />
                    </div>
                    {formError && !formData.username && (
                      <div className="text-danger">Username is required.</div>
                    )}
                    {formError && !formData.password && (
                      <div className="text-danger">Password is required.</div>
                    )}
                    <div className="mt-3">
                      <button
                        className="btn btn-success btn-block font-size-15"
                        style={{ height: "45px" }}
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
