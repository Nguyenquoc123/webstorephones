import { useEffect, useState } from "react";
import DSDanhMuc from "./dsdanhmuc/DSDanhMuc";
import { fetchAddDanhMuc, fetchDeleteDanhMuc, fetchGetDSDanhMucPhanTrang, fetchUpdateDanhMuc } from "../../api/danhmuc";
import DelDanhMuc from "./deldanhmuc/DelDanhMuc";
import EditDanhMuc from "./editdanhmuc/EditDanhMuc";
import ThemDanhMuc from "./themdanhmuc/ThemDanhMuc";
import MenuAdmin from "../menuadmin/MenuAdmin";

function DanhMuc() {
    const [formDanhMuc, setFormDanhMuc] = useState({
        maDanhMuc: '',
        tenDanhMuc: '',
        moTa: ''
    })
    const [dataPage, setDataPage] = useState({
        page:0,
        totalPage:1
    })
    const [menubar, setMenu] = useState(1);
    const [action, setAction] = useState(-1);
    const [dsDanhMuc, setDSDanhMuc] = useState([]);
    const [showPopup, setShowPopup] = useState(null)
    const showpopup = (type, message) => {
        setShowPopup({ type: type, message: message })
    }
    useEffect(() => {
        
        loadDSDanhMuc(dataPage.page)
    }, [dataPage.page])
    const loadDSDanhMuc = async (page) => {
            console.log(dataPage)
            const result = await fetchGetDSDanhMucPhanTrang(page);
            if (result.code === 200) {
                setDSDanhMuc(result.result)
                setDataPage({...dataPage, totalPage: result.result.totalPages})
                console.log("Kkhongo chạy")
                console.log(result.result)
            }
        }
    const resetFormDanhMuc = () => {
        setFormDanhMuc({
            maDanhMuc: '',
            tenDanhMuc: '',
            moTa: ''
        })
    }

    const inputData = (key, value) => {
        setFormDanhMuc({ ...formDanhMuc, [key]: value })
    }
    const clickShowEditDanhMuc = (maDanhMuc) => {
        const danhmuc = dsDanhMuc.content.find(item => item.maDanhMuc === maDanhMuc)
        setFormDanhMuc({maDanhMuc: danhmuc.maDanhMuc, tenDanhMuc: danhmuc.tenDanhMuc, moTa: danhmuc.moTa})
        setAction(1);
    }
    const clickShowDeleteDanhMuc = (maDanhMuc) => {
        setFormDanhMuc({ ...formDanhMuc, maDanhMuc: maDanhMuc })
        setAction(2);
    }
    const clickCancelDeleteDanhMuc = () => {
        resetFormDanhMuc();
        setAction(-1)
    }
    const clickCancelEditDanhMuc = () => {
        resetFormDanhMuc();
        setAction(-1)
    }
    const clickSaveDeleteDanhMuc = async (maDanhMuc) => {

        console.log("Xóa danh mục có mã ", maDanhMuc)
        const result = await fetchDeleteDanhMuc(maDanhMuc);
        if (result.code === 200) {
            console.log(result.result)
            if((dsDanhMuc.totalElements-1) % dsDanhMuc.size === 0){
                console.log("quần qued lỗi", dataPage)
                setDataPage({...dataPage, page: dataPage.page-1});
            }
            else{
                loadDSDanhMuc(dataPage.page);
            }
            
            showpopup(true, result.message)
        }
        else {
            showpopup(false, result.message)
        }
        clickCancelDeleteDanhMuc();
    }
    const clickSaveEditDanhMuc = async (maDanhMuc) => {
        console.log(maDanhMuc)

        const data = {
            "maDanhMuc": formDanhMuc.maDanhMuc,
            "tenDanhMuc": formDanhMuc.tenDanhMuc,
            "moTa": formDanhMuc.moTa
        }
        const result = await fetchUpdateDanhMuc(data);
        if (result.code === 200) {
            console.log(result.result)
            loadDSDanhMuc(dataPage.page);
            showpopup(true, result.message)
            clickCancelEditDanhMuc();
        }
        else {
            showpopup(false, result.message)
        }
    }
    const clickCancelAddDanhMuc = () => {
        resetFormDanhMuc();
        setMenu(1);
    }

    const clicksave = async () => {

        const data = {
            "tenDanhMuc": formDanhMuc.tenDanhMuc,
            "moTa": formDanhMuc.moTa
        }
        console.log(localStorage.getItem("token"))
        const result = await fetchAddDanhMuc(data, localStorage.getItem("token"));
        if (result.code === 200) {
            console.log("Add danh muc Succesful.")
            loadDSDanhMuc(dataPage.page);
            resetFormDanhMuc()
            showpopup(true, result.message)
        }
        else {
            console.log(result.message);
            showpopup(false, result.message)
        }
    }
    const clickChangePage = (value) =>{
        if(value < 0 && dataPage.page > 0){
            setDataPage({...dataPage, page: dataPage.page-1})
        }
        else if(value > 0 && dataPage.page < dataPage.totalPage-1){
            setDataPage({...dataPage, page: dataPage.page+1})
        }
    }
    return (
        <>
            <MenuAdmin />
            <DSDanhMuc menubar={menubar}
                dsDanhMuc={dsDanhMuc.content}
                showFormAddDanhMuc={setMenu}
                clickShowEditDanhMuc={clickShowEditDanhMuc}
                clickShowDeleteDanhMuc={clickShowDeleteDanhMuc}
                page={dataPage.page}
                totalPage={dataPage.totalPage}
                clickChangePage={clickChangePage}
            />
            <DelDanhMuc menubar={action}
                maDanhMuc={formDanhMuc.maDanhMuc}
                clickCancelDeleteDanhMuc={clickCancelDeleteDanhMuc}
                clickSaveDeleteDanhMuc={clickSaveDeleteDanhMuc}
            />
            <EditDanhMuc menubar={action}
                formDanhMuc={formDanhMuc}
                inputData={inputData}
                clickCancelEditDanhMuc={clickCancelEditDanhMuc}
                clickSaveEditDanhMuc={clickSaveEditDanhMuc}
            />
            <ThemDanhMuc menubar={menubar}
                formDanhMuc={formDanhMuc}
                inputData={inputData}
                clickCancelAddDanhMuc={clickCancelAddDanhMuc}
                clickSave={clicksave}
            />
        </>
    )
}

export default DanhMuc;