import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

type KeyValuePair = {
    [name: string]: any
}
type ObjectPair = { [index: string]: any };

type Props = {
    name: string,
    data: ObjectPair,
    style?: React.CSSProperties
};
/*

3 column table:
Column 1: row num
Column 2: property name
Column 3: property value (not nested)

*/
const TableProperties: React.FC<Props> = ({ name = "", data = {}, style = {} }) => {

    const columnNames = () => {

        const tempList = Object.keys(data).map(columnName => columnName);

        return tempList.map((columnName, i) => {
            <th key={i}>columnName</th>
        })

    }

    const rowData = () => {


        return (Object.keys(data).map((key: string, i: number) => {

            const name: string = key;
            const val: string = JSON.stringify(data[name]);

            return (
                <tr key={i}>
                    <td>{i}</td>
                    <td>{name}</td>
                    <td>{val}</td>
                </tr>
            )

        })
        )
    }

    return (
        <>
            <Container className="Table">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{`Property`}</th>
                            <th>{`Value`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowData()}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default TableProperties;