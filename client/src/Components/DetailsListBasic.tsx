import React from 'react';
import { DetailsList, DetailsListLayoutMode } from '@fluentui/react/lib/DetailsList';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const detaillistChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
});
type ObjectPair = { [index: string]: any };
export interface IDetailsListBasicItem {
    key: number;
    name: string;
    value: number;
}

export interface DetailsListBasicState {
    items: IDetailsListBasicItem[]
}

export interface DefailtsListProps {
    name: string,
    data: ObjectPair
}

export const DetailsListBasic: React.FC<DefailtsListProps> = ({ name = "", data = {} }) => {

    const configureData = (objProperties: ObjectPair) => {

        let generatedItems = [];

        const itemNames = Object.keys(objProperties);

        for (let i = 0; i < itemNames.length; i++) {
            generatedItems.push({
                key: i + 1,
                name: itemNames[i],
                value: objProperties[itemNames[i]]
            });
        }

        return generatedItems;
    }

    const _columns = [
        { key: 'column0', name: '#', fieldName: 'key', minWidth: 10, maxWidth: 30, isResizable: true },
        { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    const list = configureData(data);

    return (
        <div>
            <div className={detaillistChildClass}>{name} ({list.length})</div>
            <DetailsList
                items={list}
                columns={_columns}
                layoutMode={DetailsListLayoutMode.justified}
            />
        </div>
    );
}



