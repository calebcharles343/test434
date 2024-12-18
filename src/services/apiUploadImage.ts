import axios from "axios";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // Initial delay in milliseconds

const retryRequest = async (error: any, retries: number = 0): Promise<any> => {
  if (retries >= MAX_RETRIES) {
    return Promise.reject(error);
  }

  const delay = RETRY_DELAY * Math.pow(2, retries); // Exponential backoff
  await new Promise((resolve) => setTimeout(resolve, delay));

  return axios
    .request(error.config)
    .catch((err) => retryRequest(err, retries + 1));
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 429) {
      return retryRequest(error);
    }
    return Promise.reject(error);
  }
);

export const uploadImageApi = async (
  formData: FormData,
  headers: Record<string, string>
) => {
  const response = await axios.put(
    `https://tia-backend-final.onrender.com/api/v1/e-commerce/images`,
    formData,
    {
      headers,
    }
  );
  return response.data;
};
