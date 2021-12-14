import React from 'react';
import Container from 'react-bootstrap/Container';

type KeyValuePair = {
    [name: string]: number
}

type Props = {
    objWithProperties: KeyValuePair[]
};

/**
 * 
 * @param card {Json object of properties - 1 level deep}
 * @returns 
 */
const AppCard: React.FC<Props> = ({ objWithProperties }) => {

    return (
        <>
            <Container className="MainCenterGitHubLogin text-left">
                {
                    Object.keys(objWithProperties).map((key: string, i: number) => {

                        const name: any = key;                    
                        const val: any = objWithProperties[name];

                        return (
                            <p key={i}>
                                <span>{name}:</span>
                                <span>{val}</span>
                            </p>
                        )
                    })
                }
            </Container>
        </>
    )
}

export default AppCard;