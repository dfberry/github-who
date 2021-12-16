import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import CSS from 'csstype';

type KeyValuePair = {
    [name: string]: any
}
type ObjectPair = {[index: string]:any};

type Props = {
    data: ObjectPair,
    style?: React.CSSProperties
};

const TableProperties: React.FC<Props> = ({ data={}, style = {} }) => {

    const leftAlignedColumn: CSS.Properties = {
        justifyContent:'left'
      };

    return (
        <>
                <Table striped bordered hover size="sm">
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
                        <tr 
                        key={i.toString()}>
                            <td>{i}</td>
                            <td style={leftAlignedColumn}>{key}</td>
                            <td>{val}</td>
                        </tr>
                        )

                    })
                    }
                    </tbody>
                </Table>
        </>
    )
}

export default TableProperties;