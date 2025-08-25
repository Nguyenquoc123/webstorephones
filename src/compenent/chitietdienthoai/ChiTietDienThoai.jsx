import { useParams } from "react-router-dom";
import MenuKhachHang from "../menukhachhang/MenuKhachHang";
import ChiTietSanPham from "./chitietsanpham/ChiTietSanPham";
import { useEffect, useState } from "react";
import {fetchGetDSPhienBanByDienThoai } from "../../api/dienthoai";
import ThongTinSanPham from "./thongtinsanpham/ThongTinSanPham";
import DanhGia from "../danhgia/DanhGia";
import { fetchAddDanhGia, fetchDSDanhGiaByMaPhienBan } from "../../api/danhgia";
import { fetchAddVaoGioHang } from "../../api/giohang";
import Loading from "../loading/Loading";
import Popup from "../popup/Popup";
import DanhSachMua from "../danhsachmua/DanhSachMua";




function ChiTietDienThoai() {
    const [loading, setLoading] = useState(false)
    const { value } = useParams();
    const [maPhienBan, maDienThoai] = value.split('-')
    const [dsPhienBan, setDSPhienBan] = useState(new Map())
    const [dsDanhGia, setDSDanhGia] = useState([]);
    const [selectNow, setSelectNow] = useState(null);
    const [star, setStar] = useState(0);
    const [showDanhGia, setShowDanhGia] = useState(-1)
    const [soLuong, setSoLuong] = useState(1);
    const [formAddDanhGia, setFormAddDanhGia] = useState({ maPhienBan: '', soSao: 0, noiDung: '' })
    const [showPopup, setShowPopup] = useState({show: false, type: '', message: ''})
    const [soluongaddnew, setSoLuongAddNew] = useState(localStorage.getItem("soluongaddnew"))
    const [showFormMuaHang, setShowFormMuaHang] = useState(false)
    const [formMuaHang, setFormMuaHang] = useState(null)
    useEffect(() => {
        const response = async () => {
            setLoading(true)
            const result = await fetchGetDSPhienBanByDienThoai(maDienThoai);
            setLoading(false)
            if (result.code === 200) {
                console.log("Đang load data")
                console.log(result.result)
                setDSPhienBan(groupByRamRom(result.result))
            }
        }
        response();
    }, [])
    useEffect(() => {
        if (selectNow)
            setFormAddDanhGia({ ...formAddDanhGia, maPhienBan: selectNow.maPhienBan })
    }, [selectNow])

    useEffect(() => {
        loadDanhGia(maPhienBan);
    }, [])
    const loadDanhGia = async (maPhienBan) => {
        setLoading(true)
        const result = await fetchDSDanhGiaByMaPhienBan(maPhienBan);
        setLoading(false)
        if (result.code === 200) {
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
    const clickChangeMauSac = (key_, maPhienBan) => {
        const ds = dsPhienBan.get(key_);
        const result = ds.find(item => item.maPhienBan === maPhienBan)
        setSelectNow(result)
    }
    const inputData = (key, value) => {
        setFormAddDanhGia({ ...formAddDanhGia, [key]: value })
    }
    const resetFormAddDanhGia = () => {
        setFormAddDanhGia({ maPhienBan: '', soSao: 0, noiDung: '' })
    }
    const saveDanhGia = async () => {
        if(formAddDanhGia.soSao <= 0){
            setShowPopup({show: true, type: false, message: 'Vui lòng chọn số sao.'})
            return;
        }
        if(!formAddDanhGia.noiDung.trim()){
            setShowPopup({show: true, type: false, message: "Vui lòng nhập nội dung đánh giá"})
            return;
        }
        const data = {
            "maPhienBan": selectNow.maPhienBan,
            "soSao": formAddDanhGia.soSao,
            "noiDung": formAddDanhGia.noiDung
        }
        console.log(formAddDanhGia)
        console.log(selectNow)

        setLoading(true)
        const response = await fetchAddDanhGia(data)
        setLoading(false)
        if (response.code === 200) {
            setShowPopup({show: true, type: true, message: "Đã thêm."})
            console.log("add thành công")
            loadDanhGia(selectNow.maPhienBan);
            console.log(response.result)
        }

    }
    const themVaoGioHang = async () => {
        const data = {
            "soLuong": soLuong,
            "maPhienBan": selectNow.maPhienBan
        }
        console.log(data)
        setLoading(true)
        const response = await fetchAddVaoGioHang(data);
        setLoading(false)
        if (response.code === 200) {
            const tmp = localStorage.getItem("soluongaddnew")
            if(tmp){
                localStorage.setItem("soluongaddnew", response.result.length)
                // setSoLuongAddNew(Number.parseInt(tmp)+1)
                console.log("Nó có chạy đâu", response.result.length)
            }
            else{
                localStorage.setItem("soluongaddnew", response.result.length)
                // setSoLuongAddNew(1)
            }
            setShowPopup({show: true, type: true, message: 'Đã thêm vào giỏ hàng'})
            console.log(response.result)
        }
        else if(response.code === 30){
            setShowPopup({show: true, type: false, message: 'Đã có trong giỏ hàng'})
        }
    }
    const resetShowPopup = () => {
        setShowPopup({show: false, type : '', message: ''})
    }
    const changeSoLuong = (value) => {
        if (typeof value === "string") {
            console.log(value)
            value = value.replace(/[^0-9]/g, "");
        }
        setSoLuong(value)
    }
    const calGiaBan = (item) => {
        if(!item.km) return item.giaBan;
        if(item.km.loaiKhuyenMai === "Fixed")
            return item.giaBan - item.km.giaTriGiam;
        return item.giaBan - (item.giaBan*0.01*item.km.giaTriGiam)
    }
    const clickMuaHang = () => {
        setFormMuaHang([{maPhienBan: selectNow.maPhienBan,
            tenDienThoai: selectNow.tenDienThoai,
            image: selectNow.image[0].url,
            rom: selectNow.rom,
            ram: selectNow.ram,
            mauSac: selectNow.mauSac,
            soLuong: soLuong,
            giaBan: calGiaBan(selectNow)
        }])
        setShowFormMuaHang(true)
    }
    return (
        <>
            <MenuKhachHang />
            <ChiTietSanPham
                dsPhienBan={dsPhienBan}
                selectNow={selectNow}
                clickChangeCauHinh={clickChangeCauHinh}
                clickChangeMauSac={clickChangeMauSac}
                soLuong={soLuong}
                changeSoLuong={changeSoLuong}
                themVaoGioHang={themVaoGioHang}
                clickMuaHang={clickMuaHang}
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
            {showFormMuaHang && <DanhSachMua lstSanPham={formMuaHang}
                onClose={setShowFormMuaHang}

            />}
            <Loading show={loading}/>
            {showPopup.show && <Popup type={showPopup.type} message={showPopup.message} onclose={resetShowPopup}/>}
        </>
    )
}

export default ChiTietDienThoai;