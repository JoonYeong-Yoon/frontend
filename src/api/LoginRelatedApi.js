import axios from "axios";
import URL_LOGIN from "../constants/Url";

function loginApi(userUid, password) {
  console.log("userUid", userUid);
  console.log("password", password);
  try {
    const response = axios.post(URL_LOGIN, {
      userUid: { userUid },
      password: { password },
    });
    console.log("response", response);
  } catch (error) {
    console.log("error", error);
  }
}

export { loginApi };
