import axios from "axios";
import { store } from "../store/store";
import { expiredToken } from "../store/authActions";

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

let isAlertDisplayed = false;

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 && !isAlertDisplayed) {
      store.dispatch(expiredToken());
      isAlertDisplayed = true;
      alert("Votre session a expiré. Veuillez vous reconnecter.");
    }
    return Promise.reject(error);
  }
);

export default instance;
