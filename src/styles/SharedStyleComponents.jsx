import styled from "styled-components";

//배경, 폰트
export const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: #fff; //배경색을 나중에 설정할 수 있게 만들자
  z-index: -100;
`;

//전체를 감싸주는 컨테이너: 가로 최대 1024px
export const Container = styled.div` 
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 15px;
  font-family: Arial, sans-serif;

  @media (min-width: 768px) { //PC버전
    padding: 20px;
  }
`;

//추가, 수정 창 Overlay, Modal
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 8px;
  padding: 10px 30px 35px 30px;
  width: 90%;
  max-width: 400px;

  .btn-layout {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
`;

//헤더(제목, 설정, 뒤로가기)
export const Header = styled.div`
  display: flex;
  justify-content: center; /* 정가운데 배치 */
  align-items: center;
  margin-bottom: 15px;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }

  .settings-btn {
    position: absolute; /* 상단 오른쪽에 고정 */
    right: 15px;
    top: 15px;
    font-size: 1.9rem;
    cursor: pointer;
    color: #555;
  }

  .back-btn {
    position: absolute; /* 상단 왼쪽에 고정 */
    left: 15px;
    top: 15px;
    font-size: 1.9rem;
    cursor: pointer;
    color: #555;
  }

  .login-btn {
    position: absolute; /* 상단 오른쪽에 고정 */
    right: 3.4rem;
    top: 0;
    display: flex;

    h5 {
      padding-left: 5px;
      color: #777;
      text-decoration: none;
    }
  }

  @media (min-width: 768px) { //PC버전
    margin-bottom: 20px;
  }
`;