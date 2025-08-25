import '../menu/Menu.css'
function Menu({menubar, setMenu}) {
    return (
        <div className="menu-list">
            <p style={{ backgroundColor: menubar === 1 ? 'red' : 'greenyellow' }} onClick={() => setMenu(1)}>Thêm mẫu điện thoại mới</p>
            <p style={{ backgroundColor: menubar === 2 ? 'red' : 'greenyellow' }} onClick={() => setMenu(2)}>Thêm phiên bản mới</p>
            <p style={{ backgroundColor: menubar === 3 ? 'red' : 'greenyellow' }} onClick={() => setMenu(3)}>Danh sách điện thoại</p>
            <p style={{ backgroundColor: menubar === 4 ? 'red' : 'greenyellow' }} onClick={() => setMenu(4)}>Danh sách phiên bản</p>
        </div>
    )
}
export default Menu;