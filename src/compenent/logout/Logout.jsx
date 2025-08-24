import '../logout/Logout.css'
function Logout({ show, clickCancel, clickActive}) {

    return (
        <>
            {
                show && (
                    <div className="popup-logout">
                        <div className="popup-child">
                            <h2>Bạn chắn chắn muốn đăng xuất</h2>
                            <div className="btn-popup-active">
                                <button onClick={clickCancel} id='cancel-popup'>Hủy</button>
                                <button onClick={clickActive} id='active-popup'>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>


    )
}
export default Logout;