import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

type Props = {
    name?: string,
    url: string,
    style? : React.CSSProperties
};
const AppButton: React.FC<Props> = ({name="Submit", url, style={}}) => {
    return (
        <>
            <Container className="MainCenterGitHubLogin">
                <Button href={url} variant="primary" style={style}>{name}</Button>
            </Container>
        </>
    )
}

export default AppButton;