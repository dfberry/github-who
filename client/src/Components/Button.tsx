import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
type Props = {
    name?: string,
    url: string
};
const AppButton: React.FC<Props> = ({ name, url }) => {
    return (
        <>
            <Container className="MainCenterGitHubLogin">
                <Button href={url} variant="primary">{name || "submit"}</Button>
            </Container>
        </>
    )
}

export default AppButton;