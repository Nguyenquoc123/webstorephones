
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import MenuKhachHang from '../menukhachhang/MenuKhachHang'
import ShowDSDienThoai from "../showdsdienthoai/ShowDSDienThoai";

import { fetchGetDSPhienBan } from "../../api/dienthoai";

function HomeKhachHang() {
    const { makhachhang } = useParams();
    const navigate = useNavigate();
    const [dsPhienBan, setDSPhienBan] = useState([]);
    const clickXemChiTiet = (value) => {
        value = `${value}-${makhachhang}`
        console.log(value);
        navigate(`/chitietdienthoai/${value}`)

    }
    // load danh sách điện thoại
    useEffect(() => {
        const response = async () => {
            const result = await fetchGetDSPhienBan();
            if (result.code === 200) {
                console.log(result.result)
                if (result.result.length > 0) {
                    setDSPhienBan(result.result);
                }

                console.log("load ds hoàn thành.")
            }
        }
        response();
    }, [])

    return (
        <>
            <MenuKhachHang />
            <ShowDSDienThoai dsPhienBan={dsPhienBan} clickXemChiTiet={clickXemChiTiet} />
        </>

    )
}
export default HomeKhachHang;