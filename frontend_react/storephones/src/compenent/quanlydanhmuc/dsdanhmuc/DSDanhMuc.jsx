import '../dsdanhmuc/DSDanhMuc.css'

function DSDanhMuc({ menubar, dsDanhMuc, showFormAddDanhMuc, clickShowEditDanhMuc, clickShowDeleteDanhMuc, page, totalPage, clickChangePage}) {
    return (
        <>
            {
                menubar === 1 && (<div className="container-quan-ly-danh-muc">
                    <div className="main-danh-sach-danh-muc">
                        <h2 id="title-quan-ly-danh-muc">Quản lý danh mục</h2>
                        <div className="table-quan-ly-danh-muc">
                            <table border={1} className="content-quan-ly-danh-muc">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên danh mục</th>
                                        <th>Mô tả</th>
                                        <th>Edit</th>
                                        <th>Deletet</th>
                                    </tr>

                                </thead>
                                <tbody className="body-quan-ly-danh-muc">
                                    {dsDanhMuc && (
                                        dsDanhMuc.map((danhmuc, stt) => (
                                            <tr key={danhmuc?.maDanhMuc}>
                                                <td>{stt + 1}</td>
                                                <td>{danhmuc?.tenDanhMuc}</td>
                                                <td>{danhmuc?.moTa}</td>
                                                <td><img onClick={() => clickShowEditDanhMuc(danhmuc.maDanhMuc)} id="img-edit-danh-muc" src="/images/icon-edit.png" /></td>
                                                <td><img onClick={() => clickShowDeleteDanhMuc(danhmuc.maDanhMuc)} id="img-delete-danh-muc" src="/images/icon-delete.png" /></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="main-phan-trang">
                            <img src="/images/left.png" onClick={() => clickChangePage(-1)}/>
                            <span>Trang {page+1}/{totalPage}</span>
                            <img src="/images/icon-right.png" onClick={() => clickChangePage(1)}/>
                        </div>

                    </div>
                    <div className="main-btn-add-danh-muc">
                        <button onClick={() => showFormAddDanhMuc(2)} id="btn-add-danh-muc">Thêm danh mục</button>
                    </div>
                </div >)
            }
        </>

    )
}

export default DSDanhMuc;