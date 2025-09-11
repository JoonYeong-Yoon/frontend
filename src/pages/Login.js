const Login = ({ userUid, setUserUid, password, setPassword }) => {
  const onclickForLogin = () => {};
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
