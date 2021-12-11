import React from 'react';
import Container from 'react-bootstrap/Container';
import NavigationBar from './NavigationBar';
import MainCenter from './MainCenter';
type Props = {
    title?: string,
    children?: React.ReactNode
};
const Layout: React.FC<Props> = ({ title, children }) => {
    return (
        <>
            <Container className="Layout">
                <NavigationBar title={title}></NavigationBar>
                <MainCenter children={children}></MainCenter>
            </Container>
        </>
    )
}

export default Layout;