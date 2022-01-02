import React from 'react';
import NavigationBar from './NavigationBar';
import MainCenter from './MainCenter';
type Props = {
    title?: string,
    children?: React.ReactNode
};
const Layout: React.FC<Props> = ({ title, children }) => {
    return (
        <>
            <div className="Layout">
                <NavigationBar title={title}></NavigationBar>
                <MainCenter children={children}></MainCenter>
            </div>
        </>
    )
}

export default Layout;