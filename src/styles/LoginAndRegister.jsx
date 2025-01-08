import styled from "styled-components";

// 화면의 전체 배경
export const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

// 카드 형태의 중앙 컨테이너
export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  text-align: center;

  div {
    text-align: left;
    color: #777;
    font-size: 0.8rem;
    padding-bottom: 1rem;
  }

  .login-failure {
    text-align: center;
    color: #e33;
    font-size: 0.9rem;
  }

  .register-text {
    font-size: 1.05rem;
    cursor: pointer;
    text-align: center;
    
    &:hover {
      color: #333;
      text-decoration: underline;
    }
  }
`;

// 타이틀
export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

// 입력 필드 스타일
export const InputField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;

  svg {
    font-size: 1.2rem;
    color: #555;
    margin-right: 10px;
  }

  input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 1rem;
    color: #333;

    &::placeholder {
      color: #aaa;
    }
  }
`;

// 버튼
export const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: #333;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #555;
  }
`;

// 뒤로가기 버튼
export const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;

  svg {
    font-size: 18px;
    margin-right: 8px;
    color: #555;
  }

  &:hover {
    text-decoration: underline;
    color: #333;
  }
`;
