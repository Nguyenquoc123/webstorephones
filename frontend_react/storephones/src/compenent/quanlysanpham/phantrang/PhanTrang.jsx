import '../phantrang/PhanTrang.css'
function PhanTrang({page, totalPage, clickChangePage}) {
    return (
        <div className="main-page">
            <img src="/images/left.png" onClick={() => clickChangePage(-1)} />
            <span>Trang {page + 1}/{totalPage !== 0? totalPage: 1}</span>
            <img src="/images/icon-right.png" onClick={() => clickChangePage(1)} />
        </div>
    )
}
export default PhanTrang;