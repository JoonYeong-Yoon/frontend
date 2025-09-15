// import loginApi from "../api/LoginRelatedApi.js";
import axios from "axios";
import { useState } from "react";
import Signup from "./Signup";

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
  const [showSignup, setShowSignup] = useState(false);
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
      // 🔹 수정 부분: 백엔드에서 전달하는 메시지와 status 활용
      if (response.status === 200) {
        // 백엔드가 보낸 message 그대로 사용
        setBeingLogined(true);
        setPassword("");
        setModalTitle(response.data.message); // 🔹 수정: "로그인 성공" 대신 백엔드 메시지
        setModalContent("");
        openModal();
        console.log("response", response);
      }
    } catch (error) {
      console.log("error", error);
      setBeingLogined(false);

      // 🔹 수정: error.message 또는 response.data.error만 표시
      if (error.response) {
        setModalTitle(error.response.data.error || "로그인 실패");
      } else {
        setModalTitle(error.message);
      }
      setModalContent("");
      openModal();
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
        {!showSignup ? (
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
            <button onClick={() => setShowSignup(true)}>회원가입</button>
          </>
        ) : (
          <>
            <Signup
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
              openModal={openModal}
              onSignupSuccess={() => setShowSignup(false)} // 회원가입 성공 시 로그인 화면으로 복귀
            />
            {/* 회원가입 폼일 때만 취소 버튼 보이기 */}
            <button onClick={() => setShowSignup(false)}>취소</button>
          </>
        )}
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
