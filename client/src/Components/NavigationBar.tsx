import React from 'react';
import { Link } from '@fluentui/react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens } from '@fluentui/react';

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
    return (
        <Stack horizontal disableShrink styles={stackStyles} tokens={horizontalGapStackTokens}>
            <span><Link href="/">Home</Link></span>
            <span><Link href="/login">Login</Link></span>
        </Stack>
    )
}

export default NavigationBar;