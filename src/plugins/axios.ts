import axios from 'axios';

const instance = axios.create({
  baseURL: "http://eclo.uz:8080/"
});

// Interceptors for handling common scenarios
instance.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status == 400) {
      return error.response;
    }
    if (error.response.status === 401) {
      // Redirect to unauthorized page
      // You can use Vue Router to navigate
      console.log("401 error handled")
    } else if (error.response.status === 404) {
      // Redirect to not found page
      // You can use Vue Router to navigate
      console.log("404 error handled")
    }
    else if (error.response.status == 500){
      console.log("500 error handled");
    }
    else return Promise.reject(error);
  }
);

export default instance;