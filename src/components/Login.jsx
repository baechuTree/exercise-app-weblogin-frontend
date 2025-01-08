import React, { useState, useContext, useEffect } from "react";
import { requestLogin } from "../api/userApi";
import { Background, Card, Title, InputField, Button, BackButton } from "../styles/LoginAndRegister";
import { TbArrowLeft, TbLock, TbMoodSmile } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const navigate = new useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailure, setIsLoginFailure] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user !== null) {
      if (window.confirm("이미 로그인이 되어 있습니다. 로그아웃 하시겠습니까?")) {
        auth.logout();
        navigate("/login");
      } else {
        navigate("/");
      }
    }
    
    // *아래 문구로 경고문 삭제함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const handleBack = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await requestLogin(userId, password);
      const { token } = response;
      
      localStorage.setItem("token", token); // 토큰 저장

      alert("로그인!");

      if (token) {
        // 토큰으로 사용자 로그인 정보 설정
        const userInfo = JSON.parse(atob(token.split(".")[1])); // JWT의 payload 확인
        auth.setUser(userInfo);
      }

      navigate("/");
    } catch (e) {
      setIsLoginFailure(true);
      console.error("로그인 실패:", e.response.data.message);
    }
  };

  const handleToRegister = () => {
    navigate("/register");
  }

  return (
    <Background>
      <Card>
        <BackButton onClick={handleBack}>
          <TbArrowLeft />
          돌아가기
        </BackButton>
        <div onClick={handleToRegister} className="register-text">아직 계정을 만들지 않으셨다면... <b>회원가입</b></div>
        <Title>로그인</Title>
        <form onSubmit={handleLogin}>
          <InputField>
            <TbMoodSmile />
            <input type="text" placeholder="아이디" onChange={onIdHandler} value={userId} />
          </InputField>
          <InputField>
            <TbLock />
            <input type="password" placeholder="비밀번호" onChange={onPasswordHandler} value={password} />
          </InputField>
          { isLoginFailure && <div className="login-failure">로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.</div> }
          <Button type="submit">로그인</Button>
        </form>
      </Card>
    </Background>
  );
};

export default Login;
