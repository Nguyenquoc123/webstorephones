import '../phantrang/PhanTrang.css'
function PhanTrang({page, totalPage, clickChangePage}) {
    return (
        <div className="main-page">
            <img src="/images/icon-edit.png" onClick={() => clickChangePage(-1)} />
            <span>Trang {page + 1}/{totalPage}</span>
            <img src="/images/icon-edit.png" onClick={() => clickChangePage(1)} />
        </div>
    )
}
export default PhanTrang;