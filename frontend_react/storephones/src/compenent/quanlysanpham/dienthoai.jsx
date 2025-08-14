import React, { useEffect, useState } from "react";
import ThemDienThoai from '../quanlysanpham/themdienthoai/themdienthoai'
import { fetchAddDienThoai, fetchAddPhienBan, fetchDeteleDienThoai, fetchDetelePhienBan, fetchGetDSDienThoai, fetchGetDSDienThoaiPhanTrang, fetchGetDSPhienBan, fetchGetDSPhienBanPhanTrang, fetchUpdateDienThoai, fetchUpdatePhienBan } from "../../api/dienthoai";
import MenuAdmin from '../menuadmin/MenuAdmin';
import Menu from "../quanlysanpham/menu/Menu"
import ThemPhienBan from "./themphienban/ThemPhienBan";
import SuaDienThoai from "./suadienthoai/SuaDienThoai";
import DSDienThoai from "./dsdienthoai/DSDienThoai";
import DSPhienBan from "./dsphienban/DSPhienBan";
import DelDienThoai from "./deldienthoai/DelDienThoai"
import SuaPhienBan from "./suaphienban/SuaPhienBan";
import DelPhienBan from "./delphienban/DelPhienBan";
function DienThoai() {
    const [menubar, setMenu] = useState(1);
    const [dsDienThoai, setDSDienThoai] = useState([]);
    const [showPopup, setShowPopup] = useState(null)
    const [dsPhienBan, setDSPhienBan] = useState([]);
    const [showAction, setShowAction] = useState(-1);
    const [lstImgDelete, setLstImgDelete] = useState([]);
    const [formAddDienThoai, setFormAddDienThoai] = useState({
        maDienThoai: '',
        tenDienThoai: '',
        hangSanXuat: '',
        moTa: '',
        maDanhMuc: '',
        image: null
    })
    const [formAddPhienBan, setFormAddPhienBan] = useState({
        maPhienBan: '',
        maDienThoai: '',
        rom: '',
        ram: '',
        soLuong: '',
        giaBan: '',
        pin: '',
        manHinh: '',
        camera: '',
        moTa: '',
        mauSac: '',
        image: []
    })

    
    const [dataPage, setDataPage] = useState({
        page: 0,
        totalPage: 1,
        totalElements: 0,
        size: 10
    })

    const [reload, setReload] = useState(false);


    // useEffect(() => {
    //     loadDSDienThoaiPhanTrang();
    // }, [])

    // useEffect(() => {
    //     if (dsPhienBan.length === 0 && menubar === 4) {
    //         loadDSPhienBan();
    //     }
    // }, [menubar, dsPhienBan])

    useEffect(() => {
        console.log("CHuyener trang", menubar, "   ", dataPage.page)
        if (menubar === 3 || menubar === 4) {
            console.log("không chạy =======================")
            setDataPage({ ...dataPage, page : 0 })
            setReload(!reload)
        }
    }, [menubar])

    useEffect(() => {
        console.log("run==================")
        if (menubar === 3)
            loadDSDienThoaiPhanTrang();
        else if (menubar === 4)
            loadDSPhienBanPhanTrang();
    }, [reload, dataPage.page])


    const inputData = (key, value) => {

        setFormAddDienThoai({ ...formAddDienThoai, [key]: value })
    }
    const inputDataPhienBan = (key, value) => {
        setFormAddPhienBan({ ...formAddPhienBan, [key]: value })
    }
    const loadDSPhienBan = async () => {
        const result = await fetchGetDSPhienBan();
        if (result.code === 200) {
            console.log(result.result)
            if (result.result.length > 0) {
                setDSPhienBan(result.result);
            }

            console.log("load ds hoàn thành.")
        }
    }




    const loadDSPhienBanPhanTrang = async () => {
        const response = await fetchGetDSPhienBanPhanTrang(dataPage.page)
        if (response.code === 200) {
            console.log("Phien ban ", response.result)
            setDSPhienBan(response.result.content)
            setDataPage({
                ...dataPage, totalPage: response.result.totalPages,
                totalElements: response.result.totalElements,
                size: response.result.size
            })
        }
    }
    const loadDSDienThoaiPhanTrang = async () => {
        console.log(dataPage.page)
        const response = await fetchGetDSDienThoaiPhanTrang(dataPage.page);
        if (response.code === 200) {
            console.log("Phân trang điện thoại", response)
            setDSDienThoai(response.result.content)
            setDataPage({
                ...dataPage, totalPage: response.result.totalPages, totalElements: response.result.totalElements,
                size: response.result.size
            })
        }
    }

    const selectImgEdit = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("déo cháy")
            const preview = document.getElementsByClassName('img-selected-edit')[0];
            console.log(URL.createObjectURL(file));
            preview.src = URL.createObjectURL(file);

        }
    }

    const selectImg = (e, idImg) => {
        const file = e.target.files[0];
        if (file) {
            const preview = document.getElementsByClassName(idImg)[0];
            console.log(URL.createObjectURL(file));
            preview.src = URL.createObjectURL(file);
            console.log("không chạy")
        }
    }
    const showpopup = (type, message) => {
        setShowPopup({ type: type, message: message })
    }

    const delImage = () => {
        setFormAddDienThoai({ ...formAddDienThoai, image: null })
    }

    const delImage2 = (index) => {
        const lst = [...formAddPhienBan.image]
        console.log("mày có chạy không thì bảo")
        console.log(showAction)
        console.log(typeof lst[index])
        if (showAction === 3) {
            if (!(lst[index] instanceof File)) {
                setLstImgDelete([...lstImgDelete, lst[index].id])
            }
        }

        lst.splice(index, 1);
        setFormAddPhienBan({ ...formAddPhienBan, image: lst })
        console.log("gì gì đó=====")
    }

    const resetFormAddDienThoai = () => {
        setFormAddDienThoai({
            maDienThoai: '',
            tenDienThoai: '',
            hangSanXuat: '',
            moTa: '',
            maDanhMuc: '',
            image: null
        })
    }
    const clickSaveDienThoai = async (e) => {
        e.preventDefault();
        if (formAddDienThoai.image === null) {
            console.log("Vui lòng chọn 1 tấm ảnh")
            return;
        }
        console.log(formAddDienThoai)
        const data = new FormData();

        data.append("tenDienThoai", formAddDienThoai.tenDienThoai);
        data.append("hangSanXuat", formAddDienThoai.hangSanXuat);
        data.append("maDanhMuc", formAddDienThoai.maDanhMuc);
        data.append("moTa", formAddDienThoai.moTa);
        data.append("image", formAddDienThoai.image)
        const result = await fetchAddDienThoai(data);
        if (result.code === 200) {
            setDSDienThoai([...dsDienThoai, result.result]);
            showpopup(true, result.message)
            resetFormAddDienThoai();
        }
        else {
            showpopup(false, result.message)
        }
        console.log(result)

    }

    // thêm phiên bản mới
    const clickSavePhienBanDienThoai = async () => {
        if (formAddPhienBan.image.length <= 0) {
            console.log("Vui lòng chọn ít nhất 1 tấm ảnh")
            return;
        }

        console.log(formAddPhienBan)
        console.log(JSON.stringify(formAddPhienBan.image))
        const data = new FormData();
        data.append("maDienThoai", formAddPhienBan.maDienThoai);
        data.append("mauSac", formAddPhienBan.mauSac);
        data.append("rom", formAddPhienBan.rom);
        data.append("ram", formAddPhienBan.ram);
        data.append("soLuong", formAddPhienBan.soLuong);
        data.append("donGia", formAddPhienBan.giaBan);
        data.append("pin", formAddPhienBan.pin);
        data.append("manHinh", formAddPhienBan.manHinh);
        data.append("camera", formAddPhienBan.camera);
        data.append("moTa", formAddPhienBan.moTa);

        formAddPhienBan.image.forEach(item => data.append("image", item));
        console.log("con gà")
        console.log(formAddPhienBan.image)
        const result = await fetchAddPhienBan(data);
        if (result.code === 200) {
            console.log("Thêm thành công.")
            setDSPhienBan([...dsPhienBan, result.result]);
            resetFormAddPhienBan();
            showpopup(true, result.message)
        }
        else {
            showpopup(false, result.message)
        }
    }

    const resetFormAddPhienBan = () => {
        setFormAddPhienBan({
            maPhienBan: '',
            maDienThoai: '',
            rom: '',
            ram: '',
            soLuong: '',
            giaBan: '',
            pin: '',
            manHinh: '',
            camera: '',
            moTa: '',
            mauSac: '',
            image: []
        })
    }
    const clickCancelThemDienThoai = () => {
        resetFormAddDienThoai();
        setMenu(3);
    }
    const clickCancelThemPhienBan = () => {
        resetFormAddPhienBan();
        setMenu(4);
    }
    const clickCancelEdit = () => {
        console.log('run')
        resetFormAddDienThoai();
        setShowAction(-1);
    }
    const clickCancelEditPhienBan = () => {
        resetFormAddPhienBan();
        setShowAction(-1);
    }

    const clickSaveEditDienThoai = async (e) => {

        const data = new FormData();

        data.append("maDienThoai", formAddDienThoai.maDienThoai);
        data.append("tenDienThoai", formAddDienThoai.tenDienThoai);
        data.append("hangSanXuat", formAddDienThoai.hangSanXuat);
        data.append("maDanhMuc", formAddDienThoai.maDanhMuc);
        data.append("image", formAddDienThoai.image)
        data.append("moTa", formAddDienThoai.moTa)
        console.log(data)
        const result = await fetchUpdateDienThoai(data);
        if (result.code === 200) {
            setDSDienThoai(dsDienThoai => dsDienThoai.map(
                dienthoai => dienthoai.maDienThoai === formAddDienThoai.maDienThoai ? {
                    ...dienthoai, tenDienThoai: result.result.tenDienThoai,
                    hangSanXuat: result.result.hangSanXuat, maDanhMuc: result.result.maDanhMuc, image: result.result.image,
                    moTa: result.result.moTa
                } : dienthoai
            ))
            clickCancelEdit();
            showpopup(true, result.message)
        }
        else {
            showpopup(false, result.message)
        }
        console.log(result)
    }

    const showFormEditDienThoai = (maDienThoai) => {
        const dt = dsDienThoai.find(item => item.maDienThoai === maDienThoai);
        console.log(dt)
        setFormAddDienThoai({
            maDienThoai: dt.maDienThoai,
            tenDienThoai: dt.tenDienThoai,
            hangSanXuat: dt.hangSanXuat,
            maDanhMuc: dt.maDanhMuc,
            moTa: dt.moTa,
            image: dt.image
        })
        setShowAction(1)
    }
    const showDeleteDienThoai = (maDienThoai) => {
        setFormAddDienThoai({
            ...formAddDienThoai, maDienThoai: maDienThoai
        })
        console.log('Xoa dien thoai có mã ', maDienThoai)
        console.log(showAction)
        setShowAction(2);
    }
    const clickCancelDelete = () => {
        resetFormAddDienThoai();
        setShowAction(-1);
        console.log('ẩn')
    }
    const clickSaveDelete = async (maDienThoai) => {
        console.log("đang xóa điện thoại có mã ", maDienThoai)
        const result = await fetchDeteleDienThoai(maDienThoai);
        if (result.code === 200) {
            console.log("Xóa thành công")
            if ((dataPage.totalElements - 1) % dataPage.size === 0) {
                console.log("quần qued lỗi", dataPage)
                setDataPage({ ...dataPage, page: dataPage.page - 1 });
            }
            else {
                loadDSDienThoaiPhanTrang();
            }
            clickCancelDelete();
            setDSDienThoai(dsDienThoai => dsDienThoai.filter(dienthoai => dienthoai.maDienThoai !== maDienThoai))
            showpopup(true, result.message)
        }
        else {
            showpopup(false, result.message)
        }
    }
    const clickUpdatePhienBan = (maPhienBan) => {
        console.log("update phien ban", maPhienBan)
        const pb = dsPhienBan.find(phienban => phienban.maPhienBan === maPhienBan);
        console.log(pb)
        setFormAddPhienBan({
            maPhienBan: pb.maPhienBan,
            maDienThoai: pb.maDienThoai,
            rom: pb.rom,
            ram: pb.ram,
            soLuong: pb.soLuong,
            giaBan: pb.giaBan,
            pin: pb.pin,
            manHinh: pb.manHinh,
            camera: pb.camera,
            moTa: pb.moTa,
            mauSac: pb.mauSac,
            image: pb.image
        });
        setShowAction(3);
    }
    const clickDeletePhienBan = (maPhienBan) => {
        console.log("Xóa mã phien ban", maPhienBan)
        setFormAddPhienBan({ ...formAddPhienBan, maPhienBan: maPhienBan })
        setShowAction(4)
    }
    const clickCancelUpdatePhienBan = () => {
        resetFormAddPhienBan();
        setShowAction(-1);
        setLstImgDelete([])
    }

    const clickSaveUpdatePhienBan = async (maPhienBan) => {
        if (formAddPhienBan.image.length <= 0) {
            console.log("vui lòng chọn ít nhất 1 tấm ảnh")
            return;
        }

        console.log(formAddPhienBan)
        const data = new FormData();
        data.append("maPhienBan", formAddPhienBan.maPhienBan)
        data.append("maDienThoai", formAddPhienBan.maDienThoai);
        data.append("mauSac", formAddPhienBan.mauSac);
        data.append("rom", formAddPhienBan.rom);
        data.append("ram", formAddPhienBan.ram);
        data.append("soLuong", formAddPhienBan.soLuong);
        data.append("donGia", formAddPhienBan.giaBan);
        data.append("pin", formAddPhienBan.pin);
        data.append("manHinh", formAddPhienBan.manHinh);
        data.append("camera", formAddPhienBan.camera);
        data.append("moTa", formAddPhienBan.moTa);
        formAddPhienBan.image.forEach(item => {
            if (item instanceof File) {
                data.append("image", item);
            }
        })
        lstImgDelete.forEach(item => data.append("imageDelete", item));
        console.log(data)
        console.log("danh sách bị xóa", lstImgDelete)
        const result = await fetchUpdatePhienBan(data);
        if (result.code === 200) {
            console.log("Update thành công.")
            loadDSPhienBan();
            showpopup(true, result.message)
            clickCancelUpdatePhienBan();
        }
        else {
            showpopup(false, result.message)
        }
        setLstImgDelete([])
    }

    const clickCancelDeletePhienBan = () => {
        resetFormAddPhienBan();
        setShowAction(-1);
    }
    const clickSaveDeletePhienBan = async (maPhienBan) => {
        console.log('Đang xóa phiên bản có mã ', maPhienBan)
        const result = await fetchDetelePhienBan(maPhienBan);
        if (result.code === 200) {
            console.log("Xoa thanh công")
            if ((dataPage.totalElements - 1) % dataPage.size === 0) {
                console.log("quần qued lỗi", dataPage)
                setDataPage({ ...dataPage, page: dataPage.page - 1 });
            }
            else {
                loadDSPhienBanPhanTrang();
            }
            setDSPhienBan(dsPhienBan => dsPhienBan.filter(item => item.maPhienBan !== maPhienBan))
            showpopup(true, result.message)
            clickCancelDeletePhienBan();
        }
        else {
            showpopup(false, result.message)
        }
    }


    const clickChangePage = (value) => {
        if (value < 0 && dataPage.page > 0) {
            setDataPage({ ...dataPage, page: dataPage.page - 1 })
        }
        else if (value > 0 && dataPage.page < dataPage.totalPage - 1) {
            setDataPage({ ...dataPage, page: dataPage.page + 1 })
        }
    }
    return (
        <>
            <MenuAdmin />
            <Menu menubar={menubar}
                setMenu={setMenu}
            />
            <ThemDienThoai menubar={menubar}
                formAddDienThoai={formAddDienThoai}
                inputData={inputData}
                clickSaveDienThoai={clickSaveDienThoai}
                clickCancelThemDienThoai={clickCancelThemDienThoai}
                delImage={delImage}
            />
            <ThemPhienBan menubar={menubar}
                formAddPhienBan={formAddPhienBan}
                dsDienThoai={dsDienThoai}
                inputData={inputDataPhienBan}
                clickSavePhienBanDienThoai={clickSavePhienBanDienThoai}
                delImage={delImage2}
                clickCancelThemPhienBan={clickCancelThemPhienBan}
            />
            <SuaDienThoai menubar={showAction}
                formUpdateDienThoai={formAddDienThoai}
                inputData={inputData}
                clickCancelEdit={clickCancelEdit}
                clickSaveEditDienThoai={clickSaveEditDienThoai}
            />
            <DelDienThoai menubar={showAction}
                maDienThoai={formAddDienThoai.maDienThoai}
                clickSaveDelete={clickSaveDelete}
                clickCancelDelete={clickCancelDelete}
            />
            <DSDienThoai menubar={menubar}
                dsDienThoai={dsDienThoai}
                showEdit={showFormEditDienThoai}
                showDelete={showDeleteDienThoai}
                page={dataPage.page}
                totalPage={dataPage.totalPage}
                clickChangePage={clickChangePage}
            />
            <DSPhienBan menubar={menubar}
                dsPhienBan={dsPhienBan}
                delImage={delImage2}
                clickUpdatePhienBan={clickUpdatePhienBan}
                clickDeletePhienBan={clickDeletePhienBan}
                page={dataPage.page}
                totalPage={dataPage.totalPage}
                clickChangePage={clickChangePage}
            />
            <SuaPhienBan menubar={showAction}
                formUpdatePhienBan={formAddPhienBan}
                inputData={inputDataPhienBan}
                delImage={delImage2}
                dsDienThoai={dsDienThoai}
                clickCancelUpdatePhienBan={clickCancelUpdatePhienBan}
                clickSaveUpdatePhienBan={clickSaveUpdatePhienBan}
            />
            <DelPhienBan menubar={showAction}
                maPhienBan={formAddPhienBan.maPhienBan}
                clickCancelDeletePhienBan={clickCancelDeletePhienBan}
                clickSaveDeletePhienBan={clickSaveDeletePhienBan}
            />
        </>
    )
}

export default DienThoai;