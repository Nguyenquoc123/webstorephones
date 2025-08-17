import React from "react";

import '../showdsdienthoai/ShowDSDienThoai.css'

function ShowDSDienThoai({ dsPhienBan, clickXemChiTiet, searchAndFilter, clickTieuChi, clickFilter}) {
    const showKhuyenMai = (km) => {
        if(km === undefined)
            return '';
        console.log('Value' === 'Value')
        if(km.maKhuyenMai && km.loaiKhuyenMai == "Fixed")
            return "Giảm " + km.giaTriGiam + "đ"
        else if(km.maKhuyenMai){
            return "Giảm "+ km.giaTriGiam + "%"
        }
        else
            return ''
        console.log(km.maKhuyenMai !== null)
        return ''
    }

    const showGiaGoc = (km) => {
        if(km === undefined)
            return true
        if(!km.maKhuyenMai)
            return true
        return false
    }
    const showGiaKhuyenMai = (phienban) => {
        if(phienban === undefined)
            return '';
        if(phienban.km === undefined || !phienban.km.maKhuyenMai)
            return phienban.giaBan.toLocaleString('vi-VN')
        if(phienban.km.loaiKhuyenMai === "Fixed"){
            return (phienban.giaBan - phienban.km.giaTriGiam).toLocaleString('vi-VN')
        }
        return (phienban.giaBan - 0.01*phienban.km.giaTriGiam*phienban.giaBan).toLocaleString('vi-VN')
    }
    return (
        <div className="content">
            <div className="fill-menu">
                <div className="select-menu">
                    <div className="hang">
                        <h3>Hãng</h3>
                        <button value={"apple"} className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("apple")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>Apple</button>
                        <button value={"samsung"}  className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("samsung")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>Samsung</button>
                        <button value={"oppo"}  className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("oppo")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>Oppo</button>
                        <button value={"vivo"}  className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("vivo")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>Vivo</button>
                        <button value={"xiaomi"}  className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("xiaomi")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>Xiaomi</button>
                        <button value={"realme"}  className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("realme")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>Realme</button>
                        <button value={"huawei"}  className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("huawei")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>Huawei</button>
                        <button value={"nokia"}  className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("nokia")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>Nokia</button>
                        <button value={"asus"}  className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("asus")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>Asus</button>
                        <button value={"oneplus"}  className={searchAndFilter.hang.length > 0 && searchAndFilter.hang.includes("oneplus")?"select":""} onClick={(e) => clickTieuChi("hang", e.target.value)}>OnePlus</button>

                    </div>
                    <div className="gia">
                        <h3>Giá bán</h3>
                        <button value={"<1"} className={searchAndFilter.gia && searchAndFilter.gia==="<1"?"select":""} onClick={(e) => clickTieuChi("gia", e.target.value)}>Dưới 1 triệu</button>
                        <button value={"1-3"} className={searchAndFilter.gia && searchAndFilter.gia==="1-3"?"select":""} onClick={(e) => clickTieuChi("gia", e.target.value)}>1 - 3 triệu</button>
                        <button value={"3-5"} className={searchAndFilter.gia && searchAndFilter.gia==="3-5"?"select":""} onClick={(e) => clickTieuChi("gia", e.target.value)}>3 - 5 triệu</button>
                        <button value={"5-7"} className={searchAndFilter.gia && searchAndFilter.gia==="5-7"?"select":""} onClick={(e) => clickTieuChi("gia", e.target.value)}>5 - 7 triệu</button>
                        <button value={"7-10"} className={searchAndFilter.gia && searchAndFilter.gia==="7-10"?"select":""} onClick={(e) => clickTieuChi("gia", e.target.value)}>7 - 10 triệu</button>
                        <button value={"10-15"} className={searchAndFilter.gia && searchAndFilter.gia==="10-15"?"select":""} onClick={(e) => clickTieuChi("gia", e.target.value)}>10 - 15 triệu</button>
                        <button value={"15-20"} className={searchAndFilter.gia && searchAndFilter.gia==="15-20"?"select":""} onClick={(e) => clickTieuChi("gia", e.target.value)}>15 - 20 triệu</button>
                        <button value={"20-30"} className={searchAndFilter.gia && searchAndFilter.gia==="20-30"?"select":""} onClick={(e) => clickTieuChi("gia", e.target.value)}>20 - 30 triệu</button>
                        <button value={">30"} className={searchAndFilter.gia && searchAndFilter.gia===">30"?"select":""} onClick={(e) => clickTieuChi("gia", e.target.value)}>Trên 30 triệu</button>
                    </div>
                    <div className="bo-nho">
                        <h3>Cấu hình</h3>
                        <button value={"4Gb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("4Gb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>4GB</button>
                        <button value={"6Gb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("6Gb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>6GB</button>
                        <button value={"8Gb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("8Gb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>8GB</button>
                        <button value={"12Gb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("12Gb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>12GB</button>
                        <button value={"16Gb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("16Gb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>16GB</button>
                        <button value={"64Gb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("64Gb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>64GB</button>
                        <button value={"128Gb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("128Gb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>128GB</button>
                        <button value={"256Gb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("256Gb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>256GB</button>
                        <button value={"512Gb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("512Gb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>512GB</button>
                        <button value={"1Tb"} className={searchAndFilter.boNho.length > 0 && searchAndFilter.boNho.includes("1Tb")?"select":""} onClick={(e) => clickTieuChi("boNho", e.target.value)}>1TB</button>

                    </div>
                </div>

                <div className="loc">
                    <button onClick={clickFilter}>Lọc</button>
                </div>
            </div>
            <div className="ds-san-pham">
                {
                    dsPhienBan.length > 0 && (
                        dsPhienBan.map(
                            (phienban, stt) => (
                                <div key={phienban.maPhienBan} onClick={() => clickXemChiTiet(`${phienban.maPhienBan}-${phienban.maDienThoai}`)} className="san-pham">
                                    <img src={phienban.image[0].url} />
                                    <p id="name-san-pham">{phienban.tenDienThoai + ' ' + phienban.rom + ' ' + phienban.ram}</p>
                                    <p id="gia">{showGiaKhuyenMai(phienban)} đ   <span className="gia-ban-goc">{showGiaGoc(phienban.km)?'': phienban.giaBan.toLocaleString('vi-VN') + 'đ'}</span></p>
                                    <span className="khuyen-mai-value">{showKhuyenMai(phienban.km)}</span>
                                </div>
                            )
                        )
                    )
                }


            </div>

        </div>
    )
}
export default ShowDSDienThoai;