import React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens, Link} from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
/*
Fluent UI: Stack with horizontal gap between items
*/

type Props = {
    title?: string
};

const stackStyles: IStackStyles = {
    root: {
      background: DefaultPalette.neutralLight,
    },
  };
  
  // Tokens definition
const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};


const NavigationBar: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate()

    return (
        <Stack horizontal disableShrink styles={stackStyles} tokens={horizontalGapStackTokens}>
            <span><Link onClick={() => navigate('/')}>Home</Link></span>
            <span><Link onClick={() => navigate('/login')}>Login</Link></span>
            <span><Link onClick={() => navigate('/status')}>Status</Link></span>
        </Stack>
    )
}

export default NavigationBar;