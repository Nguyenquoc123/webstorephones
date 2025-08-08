import '../dsphienban/DSPhienBan.css'

function DSPhienBan({menubar, dsPhienBan, clickUpdatePhienBan, clickDeletePhienBan}) {
    return (
        <div className="menu4" style={{ display: menubar === 4 ? 'block' : 'none' }}>
            <table className="table-dien-thoai" border={1}>
                <thead>
                    <tr>
                        <th id="stt">STT</th>
                        <th id="image">Image</th>
                        <th id="ten-dien-thoai-table">Tên điện thoại</th>
                        <th id="hang-san-xuat-table">Hãng sản xuất</th>
                        <th id="rom-table">Rom</th>
                        <th id="ram-table">Ram</th>
                        <th id="so-luong-table">Số lượng</th>
                        <th id="gia-ban-table">Giá bán</th>
                        <th id="camera-table">Camera(Mpx)</th>
                        <th id="man-hinh-table">Màn hình(inch)</th>
                        <th id="pin-table">Pin(Mah)</th>
                        <th id="mo-ta-phien-ban-table">Mô tả</th>
                        <th id="edit-table">Edit</th>
                        <th id="delete-table">Delete</th>
                    </tr>
                </thead>
                <tbody className="coloum-table">
                    {
                        dsPhienBan.length > 0 && (
                            dsPhienBan.map(
                                (phienban, stt) => (
                                    <tr key={phienban.maPhienBan}>
                                        <td>{stt + 1}</td>
                                        <td id="content-image"><img src={phienban.image[0].url} /></td>
                                        <td>{phienban.tenDienThoai}</td>
                                        <td>{phienban.hangSanXuat}</td>
                                        <td>{phienban.rom}</td>
                                        <td>{phienban.ram}</td>
                                        <td>{phienban.soLuong}</td>
                                        <td>{phienban.giaBan} đ</td>
                                        <td>{phienban.camera} Mpx</td>
                                        <td>{phienban.manHinh} inch</td>
                                        <td>{phienban.pin} Mah</td>
                                        <td>{phienban.moTa}</td>
                                        <td id="content-edit"><img onClick={() => clickUpdatePhienBan(phienban.maPhienBan)} src="/images/icon-edit.png" /></td>
                                        <td id="content-delete"><img onClick={() => clickDeletePhienBan(phienban.maPhienBan)} src="/images/icon-delete.png" /></td>
                                    </tr>
                                )
                            )
                        )
                    }


                </tbody>
            </table>
        </div>
    )
}

export default DSPhienBan;