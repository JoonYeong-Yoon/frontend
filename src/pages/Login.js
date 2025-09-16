// import loginApi from "../api/LoginRelatedApi.js";
import axios from "axios";
import "../css/Login.css";

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
    setBeingLogined(true);
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/users/login",
    //     { userUid, password },
    //     { withCredentials: true } // 세션 쿠키 브라우저에 저장
    //   );
    //   // 🔹 수정 부분: 백엔드에서 전달하는 메시지와 status 활용
    //   if (response.status === 200) {
    //     // 백엔드가 보낸 message 그대로 사용
    //     setBeingLogined(true);
    //     setPassword("");
    //     setModalTitle(response.data.message); // 🔹 수정: "로그인 성공" 대신 백엔드 메시지
    //     setModalContent("");
    //     openModal();
    //     console.log("response", response);
    //   }
    // } catch (error) {
    //   console.log("error", error);
    //   setBeingLogined(false);

    //   // 🔹 수정: error.message 또는 response.data.error만 표시
    //   if (error.response) {
    //     setModalTitle(error.response.data.error || "로그인 실패");
    //   } else {
    //     setModalTitle(error.message);
    //   }
    //   setModalContent("");
    //   openModal();
    // }
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
        <div className="login">
          <p className="title">로그인</p>
          <p className="header">이메일 형식 아이디</p>
          <div className="input-box">
            <input
              className="input"
              type="text"
              value={userUid}
              onChange={onChangeForUserUid}
              placeholder="이메일 형식 아이디"
            />
          </div>

          <p className="header">비밀번호</p>
          <div className="input-box">
            <input
              className="input"
              type="text"
              value={password}
              onChange={onChangeForPassword}
              placeholder="비밀번호"
            />
          </div>
          <div className="button-box">
            <button className="button" onClick={onclickForLogin}>
              로그인
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="login-complete">
          <p>로그인 성공상태</p>
        </div>
      </>
    );
  }
};

export default Login;
