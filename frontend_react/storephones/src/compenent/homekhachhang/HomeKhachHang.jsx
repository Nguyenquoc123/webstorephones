
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import MenuKhachHang from '../menukhachhang/MenuKhachHang'
import ShowDSDienThoai from "../showdsdienthoai/ShowDSDienThoai";

import { fetchGetDSPhienBan, fetchGetDSPhienBanAndKhuyenMai, fetchSearchAndFilter, fetchSearchPhienBan } from "../../api/dienthoai";
import Loading from "../loading/Loading";
import { fetchGetDSInGioHang } from "../../api/giohang";

function HomeKhachHang() {
    const [loading, setLoading] = useState(false);
    const reloadPage = useLocation();
    const search = useLocation();
    const query = new URLSearchParams(search.search);
    let searchValue = query.get("search");
    const navigate = useNavigate();
    const [dsPhienBan, setDSPhienBan] = useState([]);
    // const [searchValue, setSearchValue] = useState(search.state?.searchValue ?? '');
    const [searchAndFilter, setSearchAndFilter] = useState({
        hang: [],
        gia: '',
        minGia: null,
        maxGia: null,
        boNho: []
    })
    const [dataPage, setDataPage] = useState({
        page: 0,
        totalPage: 1,
        size: 30,
        typePhanTrang: false ,
        changePhanTrang: ''
    });
    const gia = {
        "<1": [0, 1000000],
        "1-3": [1000000, 3000000],
        "3-5": [3000000, 5000000],
        "5-7": [5000000, 7000000],
        "7-10": [7000000, 10000000],
        "10-15": [10000000, 15000000],
        "15-20": [15000000, 20000000],
        "20-30": [20000000, 30000000],
        ">30": [30000000, null]
    };

    const clickXemChiTiet = (value) => {
        console.log(value);
        navigate(`/chitietdienthoai/${value}`)

    }

    // reload Page
    useEffect(() => {
        if (reloadPage.state?.reset) {
            console.log("=========================")
            resetSearchAndFilter();
            // setSearchValue('')
            setDataPage({ ...dataPage, page: 0, totalPage: 1, typePhanTrang: false, changePhanTrang: new Date() })
        }

    }, [reloadPage.state?.reset])

    // search
    useEffect(() => {
        console.log("akakaaaaaaaaaaaaaaaaa", dataPage.typePhanTrang)
        if (search.search) {
            setDataPage({ ...dataPage, page: 0, totalPage: 1, typePhanTrang: true, changePhanTrang: new Date() })
            // setSearchValue(search.state?.searchValue) // setup giá trị tìm kiếm
            console.log("akakaaaaaaaaaaaaaaaaa")
            console.log(dataPage.typePhanTrang)
        }
    }, [search.search])

    /// test 
    const loadDSPhienBanAndKhuyenMai = async () => {
        console.log("Chạy load ds", dataPage.typePhanTrang)
        const response = await fetchGetDSPhienBanAndKhuyenMai(dataPage.page, dataPage.size);
        console.log("Error ", response)
        if (response.code === 200) {
            // console.log("Danh sách phiên bản và khuyến mãi", response.result)
            setDSPhienBan(response.result.content)

            setDataPage(dataPage => {
                if (dataPage.totalPage !== response.result.totalPages) {
                    return { ...dataPage, totalPage: response.result.totalPages }
                }
                return dataPage;
            })
        }
        else {
            console.log("Error ", response)
        }
    }

    useEffect(() => {
        console.log("Phan trang..............", search?.search, dataPage.typePhanTrang)
        if (!search?.search && !dataPage.typePhanTrang) {
            loadDSPhienBanAndKhuyenMai();
            console.log("Phân tranng 1")
        }
        else {
            clickSearchAndFilter();
            console.log("Phân tranng 2")
        }
        console.log("Size ", dataPage.size)
    }, [dataPage.page, dataPage.changePhanTrang])
    // load danh sách điện thoại
    useEffect(() => {
        if (!search.search) { // nếu ko có sự kiện tìm kiếm
            loadDSPhienBanAndKhuyenMai()
            loadGioHang()
            console.log("Không có chạy")
        }
    }, [])
    const loadGioHang = async () => {
        const response = await fetchGetDSInGioHang();
        if (response.code === 200) {
            localStorage.setItem("soluongaddnew", response.result.length)
        }
    }
    const loadDSPhienBan = async () => {
        setLoading(true)
        const result = await fetchGetDSPhienBan();
        setLoading(false)
        if (result.code === 200) {
            console.log(result.result)
            if (result.result.length > 0) {
                setDSPhienBan(result.result);
            }

            console.log("load ds hoàn thành.")
        }
    }
    const resetSearchAndFilter = () => {
        setSearchAndFilter({
            hang: [],
            gia: '',
            minGia: null,
            maxGia: null,
            boNho: []
        })
    }
    const inputData = (key, value) => {

        if (key === "hang") {
            if (searchAndFilter.hang.includes(value)) {
                const lstHang = searchAndFilter.hang.filter(item => item !== value);
                setSearchAndFilter({ ...searchAndFilter, [key]: lstHang })
            }
            else {
                setSearchAndFilter(searchAndFilter => (
                    { ...searchAndFilter, [key]: [...searchAndFilter.hang, value] }
                ))

            }
        }
        if (key === "boNho") {
            if (searchAndFilter.boNho.includes(value)) {
                const lstHang = searchAndFilter.boNho.filter(item => item !== value);
                setSearchAndFilter({ ...searchAndFilter, [key]: lstHang })
            }
            else {
                setSearchAndFilter(searchAndFilter => (
                    { ...searchAndFilter, [key]: [...searchAndFilter.boNho, value] }
                ))

            }
        }
        if (key === "gia") {
            if (searchAndFilter.gia === value) {
                setSearchAndFilter({ ...searchAndFilter, [key]: '', minGia: null, maxGia: null })
            }
            else {
                setSearchAndFilter({ ...searchAndFilter, [key]: value, minGia: gia[value][0], maxGia: gia[value][1] })
            }

        }
    }

    const clickSearchAndFilter = async () => {


        console.log("Chạy tìm kiếm", dataPage.typePhanTrang)
        let filter_ = false;
        if (searchAndFilter.hang.length > 0 || searchAndFilter.boNho.length > 0 || searchAndFilter.gia !== "") {
            filter_ = true;
        }
        const valueSearch = query.get("search") || ''
        const data = {
            "search": valueSearch,
            "hang": searchAndFilter.hang,
            "boNho": searchAndFilter.boNho,
            "minGia": searchAndFilter.minGia,
            "maxGia": searchAndFilter.maxGia,
            "filter": filter_,
            "page": dataPage.page,
            "size": dataPage.size
        }
        console.log(data)
        setLoading(true)
        const response = await fetchSearchAndFilter(data);
        setLoading(false)
        if (response.code === 200) {
            setDSPhienBan(response.result.content);
            if (dataPage.totalPage !== response.result.totalPages)
                setDataPage({ ...dataPage, totalPage: response.result.totalPages })
            console.log(response.result)
        }
    }

    const clickChangePage = (value) => {
        if (value < 0 && dataPage.page > 0) {
            setDataPage({ ...dataPage, page: dataPage.page - 1 });
        } else if (value > 0 && dataPage.page < dataPage.totalPage - 1) {
            setDataPage({ ...dataPage, page: dataPage.page + 1 });
        }
    };

    const clickFilter = () => {
        setDataPage({ ...dataPage, page: 0, totalPage: 1, typePhanTrang: true, changePhanTrang: new Date() })
    }
    return (
        <>
            <MenuKhachHang
                search={searchValue}
            />
            <ShowDSDienThoai dsPhienBan={dsPhienBan}
                clickXemChiTiet={clickXemChiTiet}
                searchAndFilter={searchAndFilter}
                clickTieuChi={inputData}
                clickFilter={clickFilter}
                page={dataPage.page}
                totalPage={dataPage.totalPage}
                clickChangePage={clickChangePage}
            />
            <Loading show={loading} />
        </>

    )
}
export default HomeKhachHang;