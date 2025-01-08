import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // 토큰 검증 및 사용자 정보 설정
      const userInfo = JSON.parse(atob(token.split(".")[1])); // JWT의 payload 확인
      setUser(userInfo);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };



  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};