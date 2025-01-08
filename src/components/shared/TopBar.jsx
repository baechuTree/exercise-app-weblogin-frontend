import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { TbSettings, TbArrowLeft } from "react-icons/tb";
import { Header } from "../../styles/SharedStyleComponents";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const TopBar = (props) => {
    const {children, isBackNeeded} = props;
    const navigate = new useNavigate();
    const auth = useContext(AuthContext);

    const back = () => {
        navigate("/");
    }

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            auth.logout();
            alert("로그아웃!");
            navigate("/login");
        }
    }

    return (
        <Header>
            {
                isBackNeeded &&
                <TbArrowLeft className="back-btn" onClick={back} />
            }
            <h1>{children}</h1>
            {auth.user ? (
                <div className="login-btn">
                    <h5 onClick={handleLogout} style={{ cursor: "pointer" }}>로그아웃</h5>
                </div>
            ) : 
                <div className="login-btn">
                    <Link to="/login" style={{ textDecoration: "none"}}>
                        <h5>로그인</h5>
                    </Link>
                    <h5> | </h5>
                    <Link to="/register" style={{ textDecoration: "none"}}>
                        <h5>회원가입</h5>
                    </Link>
                </div>
            }
            <Link to="/settings">
                <TbSettings className="settings-btn" />
            </Link>
        </Header>
    );
};

export default TopBar;