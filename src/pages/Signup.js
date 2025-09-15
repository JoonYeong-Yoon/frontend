import axios from "axios";
import { useState } from "react";

const Signup = ({
  onSignupSuccess,
  setModalTitle,
  setModalContent,
  openModal,
}) => {
  const [userUid, setUserUid] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onChangeForUserUid = (e) => setUserUid(e.target.value);
  const onChangeForPassword = (e) => setPassword(e.target.value);
  const onChangeForName = (e) => setName(e.target.value);
  const onChangeForPhoneNumber = (e) => setPhoneNumber(e.target.value);

  const onclickForSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users/signup", {
        userUid,
        password,
        name,
        mobile: phoneNumber,
      });

      if (response.status === 201) {
        setModalTitle("회원가입 성공");
        setModalContent("");
        openModal();

        // 회원가입 성공 후 로그인 화면으로 돌아가도록
        onSignupSuccess();

        setUserUid("");
        setPassword("");
        setName("");
        setPhoneNumber("");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      if (error.response) {
        setModalTitle(error.response.data.error || "회원가입 실패");
      } else {
        setModalTitle("네트워크 오류");
      }
      setModalContent("");
      openModal();
    }
  };

  return (
    <div>
      <p>회원가입</p>
      <p>아이디(이메일)</p>
      <input
        type="text"
        value={userUid}
        onChange={onChangeForUserUid}
        placeholder="이메일 형식 아이디"
      />
      <p>비밀번호</p>
      <input
        type="password"
        value={password}
        onChange={onChangeForPassword}
        placeholder="비밀번호"
      />
      <p>사용자 이름</p>
      <input
        type="text"
        value={name}
        onChange={onChangeForName}
        placeholder="사용자 이름"
      />
      <p>전화번호</p>
      <input
        type="text"
        value={phoneNumber}
        onChange={onChangeForPhoneNumber}
        placeholder="전화번호"
      />
      <button onClick={onclickForSignup}>회원가입</button>
    </div>
  );
};

export default Signup;
