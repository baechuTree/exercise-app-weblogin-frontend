import React from 'react';

//디자인 import
import { Container } from '../styles/SharedStyleComponents';
import TopBar from './shared/TopBar';

const Settings = () => {

    return (
        <Container>
            <TopBar isBackNeeded="true">
                {"환경설정"}
            </TopBar>
            <h3>To be continued...</h3>
        </Container>
    );
};

export default Settings;