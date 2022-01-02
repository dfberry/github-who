import React from 'react';
type Props = {
    children?: React.ReactNode
};
const MainCenter: React.FC<Props> = ({ children }) => {
    return (
        <>
            <div className="MainCenter">
                Main
            </div>
        </>
    )
}

export default MainCenter;