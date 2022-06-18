import axios from "axios";

const API_URL = "http://localhost:3080/api/user/";

const register = async (registerInfo) => {
  console.log(registerInfo);
  const response = await axios.post(API_URL, registerInfo);
  response.data && localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};

const login = async (loginInfo) => {
  const response = await axios.post(`${API_URL}login`, loginInfo);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;
