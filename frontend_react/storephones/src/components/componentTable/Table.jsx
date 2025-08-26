import React from 'react'
import './Table.css';
const Table = ({ columns, data, action }) => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.id}>{column.name}</th>
                        ))}
                        {action && <th>action</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((column) => (
                                <td key={column.id}>{row[column.name]}</td>
                            ))}

                    {action &&
                        <td>
                            {action.map((action) => (
                                <button onClick={() => { action.onClick(row.id) }}>
                                    {action.name}
                                </button>))}
                        </td>
                    }
                        </tr>
                    ))}

                    {/* {users.map((users) => (
                        <tr key={users.id}>
                            <td>{users.id}</td>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>{users.phone}</td>
                            <td>{users.website}</td>
                            <td><button onClick={() => handleDelete(users.id)}>delete</button></td>
                        </tr> */}
                    {/* ))} */}
                </tbody>
            </table>
        </div>

    )
}
export default Table;
