import '../deldienthoai/DelDienThoai.css'

function DelDienThoai({ menubar, maDienThoai, clickCancelDelete, clickSaveDelete }) {
    
    return (
        <>
            {
                menubar === 2 && (
                    <div className="container-delete">
                        <div className="main-delete-dien-thoai">
                            <h2>Xác nhận xóa</h2>
                            <div className="btn-delete-dien-thoai">
                                <button onClick={clickCancelDelete} id="cancel-delete">Hủy</button>
                                <button onClick={() => clickSaveDelete(maDienThoai)} id="save-delete">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default DelDienThoai;