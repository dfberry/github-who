import React from 'react';
import AppButton from './Components/Button'
import {getUriForOauthLogin} from './Utilties/github'
import { useAppSelector } from './Redux/hooks';
import {
    selectEnvironment,
  } from './features/environment/environmentSlice';
  import { Stack, IStackStyles, IStackTokens, IStackItemStyles } from '@fluentui/react/lib/Stack';
  import { DefaultPalette } from '@fluentui/react/lib/Styling';

type Props = {
    children?: React.ReactNode
};
const Login: React.FC<Props> = ({ children }) => {

    const environment = useAppSelector(selectEnvironment);

    const stackStyles: IStackStyles = {
        root: {
          background: DefaultPalette.themeTertiary,
        },
      };
      const stackItemStyles: IStackItemStyles = {
        root: {
          background: DefaultPalette.themePrimary,
          color: DefaultPalette.white,
          padding: 5,
        },
      };

    const itemAlignmentsStackTokens: IStackTokens = {
        childrenGap: 5,
        padding: 40,
      };

    return (
        <div className="Login">
            <Stack styles={stackStyles} tokens={itemAlignmentsStackTokens}>
        <Stack.Item align="center" styles={stackItemStyles}>
          <span><AppButton name="GitHub Login" url={getUriForOauthLogin(environment)}></AppButton></span>
        </Stack.Item>
        </Stack>
            
        </div>
        
    )
}

export default Login;