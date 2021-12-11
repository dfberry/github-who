import React from 'react';
import Container from 'react-bootstrap/Container';
type Props = {
    children?: React.ReactNode
};
const MainCenter: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Container className="MainCenter">
                Main
            </Container>
        </>
    )
}

export default MainCenter;