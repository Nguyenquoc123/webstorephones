import '../dsdanhgia/DSDanhGia.css'

function DSDanhGia({ dsDanhGia }) {
    return (
        <div className="ds-danh-gia">
            {
                dsDanhGia && (
                    dsDanhGia.map(item => (
                        <div key={item.maDanhGia} className="child-danh-gia">
                            <span className='line'></span>
                            <div className="thong-tin-danh-gia">
                                <img className='avatar' src="/images/ip.png" alt="" />
                                <div className="main-thong-tin-danh-gia">
                                    <div className="thong-tin-danh-gia-right">
                                        <label >{item.hoTen}</label>
                                        <div className="thong-tin-danh-gia-right-child">
                                            <label >{item.ngayDanhGia}</label>
                                            <div className="star-danh-gia">
                                                <span style={{color: item.soSao >= 1? "yellow": "black" }}>★</span>
                                                <span style={{color: item.soSao >= 2? "yellow": "black" }} >★</span>
                                                <span style={{color: item.soSao >= 3? "yellow": "black" }} >★</span>
                                                <span style={{color: item.soSao >= 4? "yellow": "black" }}  >★</span>
                                                <span style={{color: item.soSao >= 5? "yellow": "black" }} >★</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className='noi-dung-danh-gia'>{item.noiDung}</p>
                                </div>

                            </div>
                        </div>
                    ))

                )
            }
        </div>
    )
}
export default DSDanhGia;