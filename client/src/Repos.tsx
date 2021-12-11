import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
type Props = {
    children?: React.ReactNode
};
const GitHubRepos: React.FC<Props> = ({ children }) => {
    return (
        <div className="GitHubRepos">
            <Container>
                GitHub Repos
            </Container>
        </div>
    )
}

export default GitHubRepos;