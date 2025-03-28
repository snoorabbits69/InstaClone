import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutRoute } from "../../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
  withCredentials: true,
});

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const apiRequest = async (method, endpoint, data = null) => {
  console.log(data)
  try {
    const config = {
      method,
      url: endpoint,
      headers: {}, 
    };
     console.log(data instanceof FormData)
    if (data instanceof FormData) {
      config.data = data;
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (data) {
      config.data = data;
      config.headers["Content-Type"] = "application/json";
    }

    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error, toastOptions);

    } else {
      toast.error("An error occurred", toastOptions);
    }

    throw error;
  }
};

export default apiRequest;
