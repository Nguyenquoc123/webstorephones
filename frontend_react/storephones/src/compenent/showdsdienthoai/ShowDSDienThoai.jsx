import React from "react";

import '../showdsdienthoai/ShowDSDienThoai.css'

function ShowDSDienThoai({ dsPhienBan, clickXemChiTiet }) {
    return (
        <div className="content">
            <div className="fill-menu">
                <div className="select-menu">
                    <div className="hang">
                        <h3>Hãng</h3>
                        <button>Iphone</button>
                        <button>SamSung</button>
                        <button>ViVo</button>
                        <button>Iphone</button>
                        <button>SamSung</button>
                        <button>ViVo</button>
                        <button>Iphone</button>
                        <button>SamSung</button>
                        <button>ViVo</button>
                        <button>ViVo</button>
                    </div>
                    <div className="gia">
                        <h3>Giá bán</h3>
                        <button>dưới 1 triệu</button>
                        <button>dưới 1 triệu</button>
                        <button>dưới 1 triệu</button>
                        <button>dưới 1 triệu</button>
                        <button>dưới 1 triệu</button>
                        <button>dưới 1 triệu</button>
                        <button>dưới 1 triệu</button>
                        <button>dưới 1 triệu</button>
                        <button>dưới 1 triệu</button>
                        <button>dưới 1 triệu</button>

                    </div>
                    <div className="bo-nho">
                        <h3>Cấu hình</h3>
                        <button>8GB</button>
                        <button>8GB</button>
                        <button>8GB</button>
                        <button>8GB</button>
                        <button>8GB</button>
                        <button>8GB</button>
                        <button>8GB</button>
                        <button>512GB</button>
                        <button>8GB</button>
                        <button>8GB</button>
                    </div>
                </div>

                <div className="loc">
                    <button>Lọc</button>
                </div>
            </div>
            <div className="ds-san-pham">
                {
                    dsPhienBan.length === 0 ? (
                        <h1>Loading...</h1>
                    ) : (
                        dsPhienBan.map(
                            (phienban, stt) => (
                                <div key={phienban.maPhienBan} onClick={() => clickXemChiTiet(`${phienban.maPhienBan}-${phienban.maDienThoai}`)} className="san-pham">
                                    <img src={phienban.image[0].url} />
                                    <p id="name-san-pham">{phienban.tenDienThoai + ' ' + phienban.rom + ' ' + phienban.ram}</p>
                                    <p id="gia">{phienban.giaBan.toLocaleString('vi-VN')} đ</p>
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