import '../deldanhmuc/DelDanhMuc.css'

function DelDanhMuc({ menubar, maDanhMuc, clickCancelDeleteDanhMuc, clickSaveDeleteDanhMuc}) {
    return (
        <>
            {
                menubar === 2 && (
                    <div className="delete-danh-muc">
                        <div className="main-delete-danh-muc">
                            <h2 id="title-delete-danh-muc">Xóa danh mục</h2>
                            <p id="content-delete-danh-muc">Bạn có chắn chắn muốn xóa danh mục này không?</p>
                            <div className="main-btn-delete-danh-muc">
                                <button onClick={clickCancelDeleteDanhMuc} id="cancel-delete-danh-muc">Hủy</button>
                                <button onClick={() => clickSaveDeleteDanhMuc(maDanhMuc)} id="active-delete-danh-muc">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default DelDanhMuc;