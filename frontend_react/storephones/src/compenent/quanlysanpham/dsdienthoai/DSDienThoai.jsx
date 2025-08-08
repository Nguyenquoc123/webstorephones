import '../dsdienthoai/DSDienThoai.css'
function DSDienThoai({menubar, dsDienThoai, showEdit, showDelete}) {
    return (
        <div className="menu3" style={{ display: menubar === 3 ? 'block' : 'none' }}>
            <table className="table-dien-thoai" border={1}>
                <thead>
                    <tr>
                        <th id="stt">STT</th>
                        <th id="image">Image</th>
                        <th id="ten-dien-thoai-table">Tên điện thoại</th>
                        <th id="hang-san-xuat-table">Hãng sản xuất</th>
                        <th id="danh-muc-table">Danh mục</th>
                        <th id="mo-ta-table">Mô tả</th>
                        <th id="edit-table">Edit</th>
                        <th id="delete-table">Delete</th>
                    </tr>
                </thead>
                <tbody className="coloum-table">
                    {
                        dsDienThoai.length === 0 ? (
                            <tr>
                                <td colSpan={8}>Loading....</td>
                            </tr>
                        ) :
                            (
                                dsDienThoai.map((dienthoai, stt) => (
                                    <tr key={dienthoai.maDienThoai}>
                                        <td>{stt + 1}</td>
                                        <td id="content-image"><img src={dienthoai.image} /></td>
                                        <td>{dienthoai.tenDienThoai}</td>
                                        <td>{dienthoai.hangSanXuat}</td>
                                        <td>{dienthoai.tenDanhMuc}</td>
                                        <td>{dienthoai.moTa}</td>
                                        <td id="content-edit" ><img onClick={() => showEdit(dienthoai.maDienThoai)} src="/images/icon-edit.png" /></td>
                                        <td id="content-delete"><img onClick={() => showDelete(dienthoai.maDienThoai)} src="/images/icon-delete.png" /></td>
                                    </tr>
                                ))


                            )
                    }


                </tbody>
            </table>
        </div>
    )
}

export default DSDienThoai;