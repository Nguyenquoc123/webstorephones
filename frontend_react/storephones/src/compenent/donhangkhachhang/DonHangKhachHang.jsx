import { useEffect, useState } from "react";
import DSDonHangKhachHang from "../dsdonhangkhachhang/DSDonHangKhachHang";
import MenuKhachHang from "../menukhachhang/MenuKhachHang";
import { fetchGetDSDonHangKhachHang } from "../../api/donhang";

function DonHangKhachHang(){
    const [dsDonHang, setDSDonHang] = useState([])

    useEffect(() => {
        loadDSDonHang();
    }, [])
    const loadDSDonHang = async () => {
        const response = await fetchGetDSDonHangKhachHang();
        if(response.code === 200){
            setDSDonHang(response.result)
            console.log("Danh sach đơn hàng của tôi  ", response.result)
        }
    }
    return (
        <>
            <MenuKhachHang />
            <DSDonHangKhachHang dsDonHang={dsDonHang}/>
        </>
    )
}
export default DonHangKhachHang;