import React, { useContext, useState } from "react";
import { requestRegister } from "../api/userApi";
import { Background, Card, Title, InputField, Button, BackButton } from "../styles/LoginAndRegister";
import { TbArrowLeft, TbLock, TbMoodSmile, TbMail } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const navigate = new useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const nickname = ""; //나중에 추가
  const auth = useContext(AuthContext);

  const onIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }
  const onEmailHandler = (e) => {
    setemail(e.currentTarget.value);
  }
  //const onNicknameHandler = (e) => {
  //  setNickname(e.currentTarget.value);
  //}

  const handleToLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await requestRegister(nickname, email, userId, password);
      const { token } = response;
  
      localStorage.setItem("token", token); // 토큰 저장
  
      alert("회원가입 완료!");
  
      if (token) {
        // 토큰으로 사용자 로그인 정보 설정
        const userInfo = JSON.parse(atob(token.split(".")[1])); // JWT의 payload 확인
        auth.setUser(userInfo);
      }

      navigate("/");
    } catch(e) {
      console.error("로그인 실패:", e.response.data.message);
    }
    

  };

  return (
    <Background>
      <Card>
        <BackButton onClick={handleToLogin}>
          <TbArrowLeft />
          돌아가기
        </BackButton>
        <Title>회원가입</Title>
        <form onSubmit={handleRegister}>
          <InputField>
            <TbMoodSmile />
            <input type="text" placeholder="아이디" onChange={onIdHandler} value={userId} />
          </InputField>
          <InputField>
            <TbLock />
            <input type="password" placeholder="비밀번호" onChange={onPasswordHandler} value={password} />
          </InputField>
          <InputField>
            <TbMail />
            <input type="email" placeholder="이메일" onChange={onEmailHandler} value={email} />
          </InputField>
          <div>
            *메일은 <b>꼭 쓸 필요는 없습니다.</b> (아이디 찾을 때 이용, 개발중)
          </div>
          <div>
            이 앱은 시험용이므로 <b>보안이 강하지 않습니다. </b>
            그러니 <b>다른 사이트에서 사용하는 아이디와 비밀번호를
            입력하지 않는 것을 강력 추천</b>드립니다.
          </div>
          <div>
            비밀번호는 암호화되어 아이디, 이메일과 함께 MongoDB
            Atlas에 저장되며, 로그인할 때와 당신이 제작한
            폴더와 기록을 찾을 때 사용됩니다.
          </div>
          <div>계정을 삭제하고 싶다면, <b>jt54133417@gmail.com</b>으로 아이디를 적어 메일을 보내 주세요.
            비밀번호는 암호화되어 있으므로 사이트 관리자가 비밀번호를 확인하지는 못합니다.
          </div>
          
          <Button type="submit">회원가입</Button>
        </form>
      </Card>
    </Background>
  );
};

export default Register;