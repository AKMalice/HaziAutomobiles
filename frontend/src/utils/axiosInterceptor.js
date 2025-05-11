import axios from "axios";
import { notification } from "antd";

const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.response.use(
    (response) => {
      if (response.config?.skipInterceptor) {
        return response;
      }

      if (response.data?.message) {
        notification.success({
          message: "Success",
          description: response.data.message,
          duration: 5,
        });
      }
      return response;
    },
    (error) => {
      if (error.config?.skipInterceptor) {
        return Promise.reject(error);
      }

      if (error.response) {
        const { data } = error.response;

        if (data.error) {
          switch (data.error) {
            case "Token missing":
            case "Token expired":
            case "Invalid token":
              localStorage.setItem(
                "notification",
                JSON.stringify({
                  message: "Authentication Error",
                  description: `${data.error}. Please login again.`,
                })
              );
              localStorage.removeItem("authToken");
              navigate("/login");
              break;

            case "Forbidden: Insufficient role":
              notification.error({
                message: "Access Denied",
                description: "You do not have the required permissions to access this page.",
                duration: 5,
              });
              navigate(-1);
              break;

            default:
              notification.error({
                message: "Error",
                description: data.error,
                duration: 5,
              });
              break;
          }
        } else {
          notification.error({
            message: "Error",
            description: "An unexpected error occurred. Please try again.",
            duration: 5,
          });
        }
      } else {
        notification.error({
          message: "Network Error",
          description: "Unable to connect to the server. Please check your internet connection.",
          duration: 5,
        });
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
