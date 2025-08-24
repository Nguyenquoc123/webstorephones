import { useEffect, useState } from 'react'
import MenuAdmin from '../menuadmin/MenuAdmin'
import ChiTietDonHang from './chitietdonhang/ChiTietDonHang'
import DSDonHang from './dsdonhang/DSDonHang'
import LocDonHang from './filterdonhang/LocDonHang'
import { fetchGetChiTietDonHang, fetchGetDSDonHang, fetchGetDSDonHangByTrangThai } from '../../api/donhang'
import { useNavigate } from 'react-router-dom'
function DonHang() {
    const navigate = useNavigate();

    const [dsDonHang, setDSDonHang] = useState([]);
    
    useEffect(() => {
        loadDSDonHang();
    }, [])
    const loadDSDonHang = async () => {
        const response = await fetchGetDSDonHang();
        if (response.code === 200) {
            setDSDonHang(response.result)
            console.log("ds đơn hàng", response.result)
        }
        else{
            console.log(response)
        }
    }
    
    const clickFilter = async (trangThai) => {
        console.log("Lọc trạng thái ", trangThai)
        const response = await fetchGetDSDonHangByTrangThai(trangThai);
        if(response.code === 200){
            setDSDonHang(response.result)
            console.log("ds đơn hang: ", dsDonHang)
        }
        else{
            console.log(response)
        }
    }
    
    const clickXemChiTiet = (maDonHang) => {
        console.log(maDonHang)
        navigate(`/chitietdonhang/${maDonHang}`)
    }
    return (
        <>
            <MenuAdmin />
            <LocDonHang clickFilter={clickFilter}/>
            <DSDonHang 
                dsDonHang={dsDonHang}
                clickXemChiTiet={clickXemChiTiet}
            />
            
        </>
    )
}

export default DonHang