import React from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#AA46BE", "#FF6699", "#33CC99", "#FFCC00"
]

const BieuDoTron = ({ data, name }) => {
    return (
        <div className="chart-container">
            <h3>{name}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"   // dữ liệu lấy từ key "value"
                        nameKey="name"   // nhãn lấy từ key "name"
                        cx="50%"         // vị trí ngang
                        cy="50%"         // vị trí dọc
                        outerRadius={100} // bán kính vòng tròn
                        fill="#8884d8"
                        label            // hiện label trên biểu đồ
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BieuDoTron;
