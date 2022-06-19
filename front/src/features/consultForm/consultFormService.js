import axios from "axios";

const API_URL = "http://localhost:3080/api/consultForm/";

const createConsultForm = async (consultFormData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, consultFormData, config);
  return response.data;
};

const consultFormService = { createConsultForm };
export default consultFormService;
