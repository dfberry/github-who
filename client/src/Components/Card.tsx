import React from 'react';

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
            <div className="MainCenterGitHubLogin text-left">
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
            </div>
        </>
    )
}

export default AppCard;