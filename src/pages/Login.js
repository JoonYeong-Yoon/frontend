// import loginApi from "../api/LoginRelatedApi.js";
import axios from "axios";

const Login = ({ userUid, setUserUid, password, setPassword }) => {
  const onclickForLogin = () => {
    // loginApi(userUid, password);
    console.log("userUid", userUid);
    console.log("password", password);
    try {
      const response = axios.post("http://localhost:5000/users/login/", {
        userUid: { userUid },
        password: { password },
      });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  const onChangeForUserUid = (event) => {
    setUserUid(event.target.value);
  };
  const onChangeForPassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <>
      <p>로그인</p>
      <p>이메일 형식 아이디</p>
      <input
        type="text"
        value={userUid}
        onChange={onChangeForUserUid}
        placeholder="이메일 형식 아이디"
      />
      <p>비밀번호</p>
      <input
        type="text"
        value={password}
        onChange={onChangeForPassword}
        placeholder="비밀번호"
      />
      <p>{userUid}</p>
      <button onClick={onclickForLogin}>로그인</button>
    </>
  );
};

export default Login;
