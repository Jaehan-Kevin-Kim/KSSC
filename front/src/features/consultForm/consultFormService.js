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

const editConsultForm = async (consultFormData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(consultFormData);
  const response = await axios.put(
    `${API_URL}/${consultFormData._id}`,
    consultFormData,
    config,
  );
  return response.data;
};

const getForms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getFormById = async (formId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${formId}`, config);
  // console.log("response: ", response.data);
  return response.data;
};

const deleteForm = async (formId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${formId}`, config);
  console.log("response: ", response.data);
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

const consultFormService = {
  createConsultForm,
  editConsultForm,
  postFile,
  getForms,
  deleteForm,
  getFormById,
};
export default consultFormService;
