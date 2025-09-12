// import loginApi from "../api/LoginRelatedApi.js";
import axios from "axios";

const Login = ({
  userUid,
  setUserUid,
  password,
  setPassword,
  isItLogined,
  setBeingLogined,
  setModalTitle,
  setModalContent,
  openModal,
}) => {
  const onclickForLogin = async () => {
    // loginApi(userUid, password);
    console.log("userUid", userUid);
    console.log("password", password);
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        { userUid, password },
        { withCredentials: true } // 세션 쿠키 브라우저에 저장
      );
      if (
        response.statusText === "OK" &&
        response.data.message === "로그인 성공"
      ) {
        setBeingLogined(true);
        setPassword("");
        setModalTitle("로그인 성공");
        openModal();
        console.log("response", response);
      } else {
        setBeingLogined(false);
        setModalTitle("로그인 실패");
        openModal();
      }
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
  if (isItLogined === false) {
    return (
      <>
        <p>로그인</p>
        <p>로그인이 필요합니다</p>
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
        <button onClick={onclickForLogin}>로그인</button>
      </>
    );
  } else {
    return (
      <>
        <p>로그인 성공상태</p>
      </>
    );
  }
};

export default Login;
