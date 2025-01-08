import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @font-face {
    font-family: 'Pretendard Variable';

    //상대 경로는 나중에 앱을 배포할 때 경로가 바뀔 수 있어 위험하다
    //public 폴더(정적 파일을 보관)는 경로가 절대 바뀌지 않으므로,
    //경로를 찾아야 하는 파일은 public에 넣고 public 기준 절대 경로로 찾자
    src: url('/fonts/PretendardVariable.woff2') format('woff2'),
      url('/fonts/Pretendard-Regular.woff.woff') format('woff');
    
    font-weight: 45 920;
    font-style: normal;
  }

  div, table, input, button {
    font-family: 'Pretendard Variable', sans-serif;
  }
`;