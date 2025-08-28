import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGetDashBoardKhachHang, fetchGetTKDSKhachHang, fetchGetTKKhachHang } from "../../../api/thongke";
import MenuAdmin from "../../menuadmin/MenuAdmin";
import LoaiThongKe from "../LoaiThongKe/LoaiThongKe";
import BieuDoDuong from "../../../components/bieudo/BIeuDoDuong";
import BieuDoTron from "../../../components/bieudo/BieuDoTron";
import CardThongKe from "../../../components/cart/CardThongKe";
import Table from "../../../components/componentTable/Table";
import Loading from "../../loading/Loading";

function ThongKeKhachHangThang({type}) {
    const navigate = useNavigate();
    const today = new Date();
    const defaultMonth = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}`; // "2025-08"

    const [month, setMonth] = useState(defaultMonth);

    const [showLoading, setShowLoading] = useState(false)
    const [dataCard, setDataCard] = useState([
        { title: "Tổng số khách hàng", value: 1200, icon: "👤" },
        { title: "Khách hàng đang hoạt động", value: 1050, icon: "✅" },
        { title: "Khách hàng mới", value: 120, icon: "🆕" },
        { title: "Khách hàng không còn hoạt động", value: 150, icon: "❌" },
    ]);


    const [databieudoduong, setDataBieuDoDuong] = useState([])



    const [databieudotron, setDataBieuDoTron] = useState([
        { name: "New", value: 20 },
        { name: "Regular", value: 65 },
        { name: "Inactive", value: 15 },
    ])
    const columns = [
        { name: 'id' },
        { name: 'name' },
        { name: 'email' },
        { name: 'status' }
    ]




    const [dsKhachHang, setDSKhachHang] = useState([])
    // const options = {
    //     responsive: true,
    //     plugins: { legend: { display: false } },
    // };

    const loadDashBoardKhachHangThang = async () => {
        setShowLoading(true)

        loadTkKhachHang();
        loadDSKhachHang();
        const [nam, thang] = month.split('-')
        const params = new URLSearchParams();
        params.append("type", 'month')
        params.append('nam', nam);
        params.append('month', thang);
        const response = await fetchGetDashBoardKhachHang(params);
        if (response.code === 200) {
            console.log("DashBoard khách hàng Theo Năm: ", response.result)
            setDataCard([
                { title: "Tổng số khách hàng", value: response.result.tongTaiKhoan, icon: "👤" },
                { title: "Khách hàng đang hoạt động", value: response.result.hoatDong, icon: "✅" },
                { title: "Khách hàng mới", value: response.result.moiDangKy, icon: "🆕" },
                { title: "Khách hàng không còn hoạt động", value: response.result.biKhoa, icon: "❌" },
            ])
            setDataBieuDoTron([
                {
                    name: "New",
                    value: response.result.tongTaiKhoan === 0
                        ? 0
                        : parseFloat(((response.result.moiDangKy / response.result.tongTaiKhoan) * 100).toFixed(1))
                },
                {
                    name: "Regular",
                    value: response.result.tongTaiKhoan === 0
                        ? 0
                        : parseFloat(((response.result.hoatDong / response.result.tongTaiKhoan) * 100).toFixed(1))
                },
                {
                    name: "Inactive",
                    value: response.result.tongTaiKhoan === 0
                        ? 0
                        : parseFloat(((response.result.biKhoa / response.result.tongTaiKhoan) * 100).toFixed(1))
                },
            ]);

        }

        setShowLoading(false)
    }

    const loadTkKhachHang = async () => {
        const [nam, thang] = month.split('-')
        const params = new URLSearchParams();
        params.append("type", 'month')
        params.append('nam', nam);
        params.append('month', thang);
        const response = await fetchGetTKKhachHang(params);
        if (response.code === 200) {
            console.log("Thống kê khách hàng theo thags", response.result)
            setDataBieuDoDuong(response.result)
        }
    }

    const loadDSKhachHang = async () => {
        const [nam, thang] = month.split('-')
        const params = new URLSearchParams();
        params.append("type", 'month')
        params.append('nam', nam);
        params.append('month', thang);
        const response = await fetchGetTKDSKhachHang(params)

        if (response.code === 200) {
            setDSKhachHang(response.result)
        }
    }

    useEffect(() => {
        loadDashBoardKhachHangThang();
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        if (value === "Theo tháng") {
            navigate("/Thongkekhachhangthang");
        } else if (value === "Theo năm") {
            navigate("/Thongkekhachhang");
        }
    };
    return (
        <>
            <MenuAdmin />
            <div className="dashboard">
                {/* Header */}
                <div className="dashboard-header">
                    <h2>Thống kê khách hàng</h2>
                    <select onChange={handleChange}>
                        <option value="Theo tháng">Theo tháng</option>
                        <option value="Theo năm">Theo năm</option>
                    </select>
                </div>
                <LoaiThongKe type={'month'} value={month} inputData={setMonth} clickThongKe={loadDashBoardKhachHangThang} />
                {/* Thống kê */}
                <div className="stats">
                    {dataCard.map((item, index) => (
                        <CardThongKe key={index} {...item} />
                    ))}
                </div>
                {/* Biểu đồ */}
                <BieuDoDuong data={databieudoduong} name='Khách hàng theo thời gian' />
                <BieuDoTron data={databieudotron} name='Phân loại khách hàng' />
                {/* Bảng sản phẩm */}
                <div className="top-products">
                    <h3>Danh sách khách hàng </h3>
                    <Table columns={columns} data={dsKhachHang} />
                </div>
            </div>

            <Loading show={showLoading}/>
        </>
    )
}
export default ThongKeKhachHangThang;