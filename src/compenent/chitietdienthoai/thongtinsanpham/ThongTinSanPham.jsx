import '../thongtinsanpham/ThongTinSanPham.css'

function ThongTinSanPham({ selectNow }) {
    return (
          <div className="thong-tin-chi-tiet">
            <h2>Thông tin sản phẩm</h2>
            <table className='table-thong-tin'>
                <tbody border={1}>
                    <tr>
                        <td className='name-thong-tin'>Rom</td>
                        <td className='value-thong-tin'>{selectNow?.rom}</td>
                    </tr>
                    <tr>
                        <td className='name-thong-tin'>Ram</td>
                        <td className='value-thong-tin'>{selectNow?.ram}</td>
                    </tr>
                    <tr>
                        <td className='name-thong-tin'>Hãng sản xuất</td>
                        <td className='value-thong-tin'>{selectNow?.hangSanXuat}</td>
                    </tr>
                    <tr>
                        <td className='name-thong-tin'>Kích thước màn hình</td>
                        <td className='value-thong-tin'>{selectNow?.manHinh} inch</td>
                    </tr>
                    <tr>
                        <td className='name-thong-tin'>Camera</td>
                        <td className='value-thong-tin'>{selectNow?.camera} MPx</td>
                    </tr>
                    <tr>
                        <td className='name-thong-tin'>Dung lượng pin</td>
                        <td className='value-thong-tin'>{selectNow?.pin} MAh</td>
                    </tr>
                    <tr>
                        <td className='name-thong-tin'>Mô tả thêm</td>
                        <td className='value-thong-tin'>{selectNow?.moTa}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
export default ThongTinSanPham;