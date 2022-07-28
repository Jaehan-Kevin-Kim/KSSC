import axios from "axios";

const API_URL = "http://localhost:3080/api/consultForm";

const createConsultForm = async (consultFormData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, consultFormData, config);
  return response.data;
};

const getForms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const postFile = async (fileFormData, token) => {
  console.log("fileFormData: ", fileFormData);
  for (const value of fileFormData.values()) {
    console.log(value);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": `multipart/form-data`,
    },
  };
  const response = await axios.post(`${API_URL}/file`, fileFormData, config);
  return response.data;
};

const consultFormService = { createConsultForm, postFile, getForms };
export default consultFormService;
