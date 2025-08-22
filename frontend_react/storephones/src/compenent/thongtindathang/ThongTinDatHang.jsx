import { useContext, useEffect, useState } from 'react';
import '../thongtindathang/ThongTinDatHang.css'
import { fetchGetInfo } from '../../api/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAddDonHang } from '../../api/donhang';


function ThongTinDatHang() {
    const navigate = useNavigate();
    const location = useLocation();
    const [thongTin, setThongTin] = useState({
        hoTen: '',
        email: '',
        soDienThoai: '',
        diaChi: '',
        phuongThucThanhToan: 1,
        ghiChu: ''
    })
    const dsMua = location.state ? location.state.dsMua : JSON.parse(localStorage.getItem("dsMua"))
    useEffect(() => {
        loadInfo()
    }, [])
    const inputData = (key, value) => {
        setThongTin({ ...thongTin, [key]: value })
    }
    const loadInfo = async () => {
        const response = await fetchGetInfo();
        if (response.code === 200) {
            setThongTin({
                ...thongTin, hoTen: response.result.hoTen,
                email: response.result.email,
                soDienThoai: response.result.soDienThoai,
                diaChi: response.result.diaChi
            })
        }
    }
    const xacNhanDatHang = async () => {
        let tongTien = 0;
        dsMua.forEach(item => tongTien += item.soLuong * item.giaBan)
        const data = {
            'hoTen': thongTin.hoTen,
            'email': thongTin.email,
            'soDienThoai': thongTin.soDienThoai,
            'diaChi': thongTin.diaChi,
            'ghiChu': thongTin.ghiChu,
            'phuongThucThanhToan': thongTin.phuongThucThanhToan,
            'trangThaiThanhToan': 0,
            'tongTien': tongTien,
            'dsMua': dsMua
        }
        const response = await fetchAddDonHang(data);
        if (response.code === 200) {
            if (thongTin.phuongThucThanhToan === 1) {
                console.log("Tạo đơn hang thành công", response)
                navigate(`/home/chitietdonhang/${response.result.maDonHang}`)
            }
            else{
                console.log(response)
                window.location.href = response.result.queryUrl
            }
        }
    }
    return (
        <div className='container-info-dat-hang'>
            <h1 className='title-info-dat-hang'>Thông tin nhận hàng</h1>
            <h3>Thông tin khách hàng</h3>
            <div className="info-khach-hang">
                <div className="ho-ten-info">
                    <input type="text" value={thongTin.hoTen} placeholder='Họ và tên' onChange={(e) => inputData("hoTen", e.target.value)} />
                </div>
                <div className="sdt-info">
                    <input type="text" value={thongTin.soDienThoai} placeholder='Số điện thoại' onChange={(e) => inputData("soDienThoai", e.target.value)} />
                </div>
                <div className="email-info">
                    <input type="text" placeholder='Email' value={thongTin.email} onChange={(e) => inputData("email", e.target.value)} />
                </div>
            </div>
            <h3>Địa chỉ giao hàng</h3>
            <div className="info-dia-chi">
                <input type="text" placeholder='Địa chỉ' value={thongTin.diaChi} onChange={(e) => inputData("diaChi", e.target.value)} />
            </div>
            <h3 className='pt-thanh-toan'>Phương thức thanh toán</h3>
            <div className="info-thanh-toan">
                <div className="phuong-thuc">
                    <input type="radio" value={1} checked={thongTin.phuongThucThanhToan === 1} onChange={(e) => inputData("phuongThucThanhToan", 1)} />
                    <span>Thanh toán khi nhận hàng</span>
                </div>
                <div className="phuong-thuc">
                    <input type="radio" value={2} checked={thongTin.phuongThucThanhToan === 2} onChange={(e) => inputData("phuongThucThanhToan", 2)} />
                    <span>Thanh toán online</span>
                </div>
            </div>
            <h3>Ghi chú đơn hàng</h3>
            <div className="info-ghi-chu">
                <textarea name="" value={thongTin.ghiChu} id="" onChange={(e) => inputData("ghiChu", e.target.value)}>{thongTin.ghiChu}</textarea>
            </div>

            <div className="btn-info-dat-hang">
                <button className='btn-back-gio-hang' onClick={() => navigate(-1)}>🡠 Quay lại</button>
                <button className='active-dat-hang' onClick={xacNhanDatHang}>Xác nhận đặt hàng</button>
            </div>
        </div>
    )
}
export default ThongTinDatHang;