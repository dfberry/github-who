import React from 'react';
import { Stack, IStackTokens } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';

export interface IButtonProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
    name?: string;
    url: string;
    style?: React.CSSProperties;
    onClick?: any
}


const AppButton: React.FC<IButtonProps> = (props) => {

    const stackTokens: IStackTokens = { childrenGap: 40 };

    return (

        <Stack horizontal tokens={stackTokens}>
            {
            props.url 
            ? <PrimaryButton text={props.name} href={props.url} allowDisabledFocus disabled={props.disabled} checked={props.checked} />
            : <PrimaryButton text={props.name} onClick={props.onClick} allowDisabledFocus disabled={props.disabled} checked={props.checked} />
            }
            
        </Stack>

    )
}

export default AppButton;