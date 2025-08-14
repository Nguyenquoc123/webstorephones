
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import MenuKhachHang from '../menukhachhang/MenuKhachHang'
import ShowDSDienThoai from "../showdsdienthoai/ShowDSDienThoai";

import { fetchGetDSPhienBan, fetchSearchAndFilter, fetchSearchPhienBan } from "../../api/dienthoai";

function HomeKhachHang() {
    const reloadPage = useLocation();
    const search = useLocation();
    const navigate = useNavigate();
    const [dsPhienBan, setDSPhienBan] = useState([]);
    const [searchAndFilter, setSearchAndFilter] = useState({
        search: '',
        hang: [],
        gia: '',
        minGia: null,
        maxGia: null,
        boNho: []
    })
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
        if (reloadPage.state?.reset){
            console.log("=========================")
            loadDSPhienBan()
            resetSearchAndFilter();
        }
            
    }, [reloadPage.state?.reset])

    // search
    useEffect(() => {
        clickSearchAndFilter();
        console.log("akakaaaaaaaaaaaaaaaaa")
        console.log(search.state?.searchValue)
    }, [search.state?.searchValue])
    // load danh sách điện thoại
    useEffect(() => {
        if(!search.state?.searchValue)
            loadDSPhienBan();
    }, [])
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
    const resetSearchAndFilter = () => {
        setSearchAndFilter({
            search: '',
            hang: [],
            gia: '',
            minGia: null,
            maxGia: null,
            boNho: []
        })
    }
    const inputData = (key, value) => {
        if (key === "search") {
            setSearchAndFilter({ ...searchAndFilter, [key]: value })
        }
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
        let filter_ = false;
        if (searchAndFilter.hang.length > 0 || searchAndFilter.boNho.length > 0 || searchAndFilter.gia !== "") {
            filter_ = true;
        }
        const valueSearch = search.state?.searchValue || ''
        const data = {
            "search": valueSearch,
            "hang": searchAndFilter.hang,
            "boNho": searchAndFilter.boNho,
            "minGia": searchAndFilter.minGia,
            "maxGia": searchAndFilter.maxGia,
            "filter": filter_
        }
        console.log(data)
        const response = await fetchSearchAndFilter(data);
        if (response.code === 200) {
            setDSPhienBan(response.result);
            console.log(response.result)
        }
    }
    return (
        <>
            <MenuKhachHang
                search={search.state?.searchValue ?? ''}
            />
            <ShowDSDienThoai dsPhienBan={dsPhienBan}
                clickXemChiTiet={clickXemChiTiet}
                searchAndFilter={searchAndFilter}
                clickTieuChi={inputData}
                clickFilter={clickSearchAndFilter}
            />
        </>

    )
}
export default HomeKhachHang;