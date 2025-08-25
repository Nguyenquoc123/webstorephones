import { useEffect, useState } from "react";
import { fetchGetDSDonHangKhachHangLichSu } from "../../api/donhang";
import MenuKhachHang from "../menukhachhang/MenuKhachHang";
import LichSuDatHang from "./LichSuDatHang";

function PageLichSuDatHang() {
    const [dsDonHang, setDSDonHang] = useState([])

    useEffect(() => {
        loadDSDonHang();
    }, [])
    const loadDSDonHang = async () => {
        const response = await fetchGetDSDonHangKhachHangLichSu();
        if (response.code === 200) {
            setDSDonHang(response.result)
            console.log("Danh sach đơn hàng của tôi  ", response.result)
        }
    }
    return (
        <>
            <MenuKhachHang />
            <LichSuDatHang dsDonHang={dsDonHang} />
        </>
    )
}
export default PageLichSuDatHang;