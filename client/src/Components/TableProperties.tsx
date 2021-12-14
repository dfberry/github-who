import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

type KeyValuePair = {
    [name: string]: any
}
type ObjectPair = {[index: string]:any};

type Props = {
    data: ObjectPair,
    style?: React.CSSProperties
};

const TableProperties: React.FC<Props> = ({ data={}, style = {} }) => {

    return (
        <>
            <Container className="Table">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            {
                                Object.keys(data).map(columnName => {
                                    <th>columnName</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                    Object.keys(data).map((key: string, i: number) => {

                        const name: any = key;                    
                        const val: any = data[name];

                        return (
                        <tr>
                            <td>{i}</td>
                            <td>{key}</td>
                            <td>{val}</td>
                        </tr>
                        )

                    })
                    }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default TableProperties;