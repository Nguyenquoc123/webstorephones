import { useParams } from "react-router-dom"
import ChiTietDonHangKhachHang from "../chitietdonhangkhachhang/ChiTietDonHangKhachHang"
import MenuKhachHang from "../menukhachhang/MenuKhachHang"
import { useEffect, useState } from "react";
import { fetchGetChiTietDonHang, fetchUpdateTrangThaiDonHang } from "../../api/donhang";

function PageChiTietDonHangKhachHang() {
    const {maDonHang} = useParams();
    const [ChiTietDonHang, setChiTietDonHang] = useState(null)
    useEffect(() => {
        loadChiTietDonHang(maDonHang)
    }, [])
    const loadChiTietDonHang = async (maDonHang) => {
        const response = await fetchGetChiTietDonHang(maDonHang)
        if(response.code === 200){
            setChiTietDonHang(response.result)
            console.log("chi tiết đơn hàng", response.result)
        }
    }

    const huyDonHang = async (maDonHang) => {
        const data = {
            'maDonHang': maDonHang,
            'trangThai': 6
        }
        const response = await fetchUpdateTrangThaiDonHang(data)
        if(response.code === 200){
            loadChiTietDonHang(maDonHang)
        }
    }
    return (
        <>
            <MenuKhachHang />
            <ChiTietDonHangKhachHang ChiTietDonHang={ChiTietDonHang}
                huyDonHang={huyDonHang}
            />
        </>
    )
}

export default PageChiTietDonHangKhachHang