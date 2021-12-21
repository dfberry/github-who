import React from 'react';

type Props = {
    children?: React.ReactNode
};
const Home: React.FC<Props> = ({ children }) => {
    return (
        <div className="Home">
            <h2>Home View 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
        </div>
    )
}

export default Home;