
import { useEffect, useState } from 'react';
import MenuAdmin from '../menuadmin/MenuAdmin';
import DSKhachhang from './dskhachhang/DSKhachHang';
import MenuTaiKhoan from './menutaikhoan/MenuTaiKhoan';
import ThongKeTaiKhoan from './thongketaikhoan/ThongKeTaiKhoan';
import { fetchGetDSKhachHang, fetchGetThongKeTK, fetchTimKiemKhachHang } from '../../api/khachhang';


function QuanLyUser() {

    const [dsKhachHang, setDSKhachHang] = useState([])
    const [thongke, setThongKe] = useState(null)
    
    useEffect(() => {
        loadDSKhachHang();
        loadThongKe();
    }, [])
    const loadDSKhachHang = async () => {
        const response = await fetchGetDSKhachHang();
        if(response.code === 200){
            setDSKhachHang(response.result)
            console.log(response.result)
        }
    }
    const loadThongKe = async () =>{
        const response = await fetchGetThongKeTK();
        if(response.code === 200){
            setThongKe(response.result)
            console.log(response.result)
        }
    }
    const clickSearch = async (search) => {
        console.log("Giá trị tìm kiếm ", search)
        const response = await fetchTimKiemKhachHang(search);
        if(response.code === 200){
            setDSKhachHang(response.result)
            
        }
        console.log(response)
    }
    return (
        <>
            <MenuAdmin />
            {thongke && <ThongKeTaiKhoan thongKe={thongke}/>}
            <MenuTaiKhoan
                clickSearch={clickSearch}
            />
            <DSKhachhang DSKhachhang={dsKhachHang}/>
        </>
    )
}
export default QuanLyUser;