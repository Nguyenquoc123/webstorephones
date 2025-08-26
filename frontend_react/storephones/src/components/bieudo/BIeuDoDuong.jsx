import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function BieuDoDuong({ data, name }) {
    return (
        <div className='chart-container'>
            <h3>{name}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    {/* Lưới nền */}
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* Trục X (theo "name" trong data) */}
                    <XAxis dataKey="name" />

                    {/* Trục Y (theo "khachHang") */}
                    <YAxis />

                    {/* Tooltip hiển thị khi hover */}
                    <Tooltip />

                    {/* Đường biểu đồ: dataKey = "khachHang" */}
                    <Line type="monotone" dataKey="value" stroke="#8782caff" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
