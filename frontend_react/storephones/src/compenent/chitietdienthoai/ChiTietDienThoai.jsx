import { useParams } from "react-router-dom";
import MenuKhachHang from "../menukhachhang/MenuKhachHang";
import ChiTietSanPham from "./chitietsanpham/ChiTietSanPham";
import { useEffect, useState } from "react";
import { fetchGetDSPhienBanByDienThoai } from "../../api/dienthoai";
import ThongTinSanPham from "./thongtinsanpham/ThongTinSanPham";
import DanhGia from "../danhgia/DanhGia";
import { fetchAddDanhGia,  fetchDSDanhGiaByMaPhienBan } from "../../api/danhgia";

function ChiTietDienThoai() {
    const { value } = useParams();
    const [maPhienBan, maDienThoai, maKhachHang] = value.split('-')
    const [dsPhienBan, setDSPhienBan] = useState(new Map())
    const [dsDanhGia, setDSDanhGia] = useState([]);
    const [selectNow, setSelectNow] = useState(null);
    const [star, setStar] = useState(0);
    const [showDanhGia, setShowDanhGia] = useState(-1)
    const [formAddDanhGia, setFormAddDanhGia] = useState({maKhachHang: '', maPhienBan: '', soSao: 0, noiDung: ''})


    useEffect(() => {
        const response = async () => {
            const result = await fetchGetDSPhienBanByDienThoai(maDienThoai);
            if (result.code === 200) {
                console.log("Đang load data")
                console.log(result.result)
                setDSPhienBan(groupByRamRom(result.result))
            }
        }
        response();
    }, [])
    useEffect(() => {
        if(selectNow)
            setFormAddDanhGia({...formAddDanhGia, maKhachHang: Number(maKhachHang), maPhienBan: selectNow.maPhienBan })
    }, [selectNow])

    useEffect(()=>{
        loadDanhGia(maPhienBan);
    }, [])
    const loadDanhGia = async (maPhienBan) =>{
        const result = await fetchDSDanhGiaByMaPhienBan(maPhienBan);
        if(result.code === 200){
            setDSDanhGia(result.result)
        }
    }

    const groupByRamRom = (ds) => {
        const lst = new Map();
        ds.forEach(item => {
            const key_ = `${item.ram}-${item.rom}`;
            if (!lst.has(key_)) {
                lst.set(key_, [])
            }
            lst.get(key_).push(item)
            console.log(item.maPhienBan)
            if (item.maPhienBan == maPhienBan) {
                setSelectNow(item)
                console.log(item)
            }
        });
        return lst;
    }

    const clickChangeCauHinh = (key_) => {
        const ds = dsPhienBan.get(key_);
        setSelectNow(ds[0])
    }
    const clickChangeMauSac = (key_, maPhienBan) =>{
        const ds = dsPhienBan.get(key_);
        const result = ds.find(item => item.maPhienBan === maPhienBan)
        setSelectNow(result)
    }
    const inputData = (key, value) =>{
        setFormAddDanhGia({...formAddDanhGia, [key]: value})
    }
    const resetFormAddDanhGia = () =>{
        setFormAddDanhGia({maKhachHang: '', maPhienBan: '', soSao: 0, noiDung: ''})
    }
    const saveDanhGia = async () =>{
        const data= {
            "maKhachHang": formAddDanhGia.maKhachHang,
            "maPhienBan": formAddDanhGia.maPhienBan,
            "soSao": formAddDanhGia.soSao,
            "noiDung": formAddDanhGia.noiDung
        }
        console.log(formAddDanhGia)
        console.log(selectNow)
        const response = await fetchAddDanhGia(data)
        if(response.code === 200){
            console.log("add thành công")
            loadDanhGia(selectNow.maPhienBan);
            console.log(response.result)
        }
        
    }
    return (
        <>
            <MenuKhachHang />
            <ChiTietSanPham
                dsPhienBan={dsPhienBan}
                selectNow={selectNow}
                clickChangeCauHinh={clickChangeCauHinh}
                clickChangeMauSac={clickChangeMauSac}
            />
            <ThongTinSanPham 
                selectNow={selectNow}
            />
            <DanhGia 
                formAddDanhGia={formAddDanhGia}
                dsDanhGia={dsDanhGia}
                inputData={inputData}
                resetFormAddDanhGia={resetFormAddDanhGia}
                saveDanhGia={saveDanhGia}
            />

        </>
    )
}

export default ChiTietDienThoai;