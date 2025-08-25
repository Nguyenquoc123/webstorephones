import '../delphienban/DelPhienBan.css'

function DelPhienBan({ menubar, maPhienBan, clickCancelDeletePhienBan, clickSaveDeletePhienBan }) {
    return (
        <>
            {menubar === 4 && (

                <div className="container-delete-phien-ban">
                    <div className="main-delete-dien-thoai">
                        <h2>Xác nhận xóa</h2>
                        <div className="btn-delete-dien-thoai">
                            <button onClick={clickCancelDeletePhienBan} id="cancel-delete">Hủy</button>
                            <button onClick={() => clickSaveDeletePhienBan(maPhienBan)} id="save-delete">Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default DelPhienBan;