import { useParams } from "react-router-dom";
import MenuAdmin from "../../menuadmin/MenuAdmin";
import ChiTietDonHang from "./ChiTietDonHang";
import { fetchGetChiTietDonHang, fetchUpdateTrangThaiDonHang } from "../../../api/donhang";
import { useEffect, useState } from "react";

function PageChiTietDonHang() {
    const {maDonHang} = useParams();
    const btnTrangThai = {
        '1': [{ name: 'Hủy đơn', trangThai: 6 }, { name: 'Duyệt đơn', trangThai: 2 }],
        '2': [{ name: 'Giao hàng', trangThai: 3 }],
        '3': [{ name: 'Giao hàng thất bại', trangThai: 5 }, { name: 'Giao hàng thành công', trangThai: 4 }]
    }
    const [chiTietDonHang, setChiTietDonHang] = useState(null);
    useEffect(() => {
        loadChiTietDonHang(maDonHang)
    }, [])
    const loadChiTietDonHang = async (maDonHang) => {
        const response = await fetchGetChiTietDonHang(maDonHang);
        console.log("Chi tiết đơn hàng", response)
        setChiTietDonHang(response.result)
    }
    const updateTrangThai = async (trangThai) =>{
        console.log("Update thành trạng thái ", trangThai)
        const data= {
            'maDonHang': maDonHang,
            'trangThai': trangThai
        }
        
        const response = await fetchUpdateTrangThaiDonHang(data);
        if(response.code === 200){
            loadChiTietDonHang(maDonHang)
        }
    }

    return (
        <>
            <MenuAdmin />
            <ChiTietDonHang 
                dataChiTiet={chiTietDonHang}
                btnTrangThai={btnTrangThai}
                updateTrangThai={updateTrangThai}
            />
        </>
    )
}

export default PageChiTietDonHang;