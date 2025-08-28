package com.bot.bandienthoai.service;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.dto.reponse.DSKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.DashBoardReponse;
import com.bot.bandienthoai.dto.reponse.DoanhThuReponse;
import com.bot.bandienthoai.dto.reponse.KhachHangInQuanLyReponse;
import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiKhuyenMaiReponse;
import com.bot.bandienthoai.dto.reponse.SanPhamBanChayReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeDanhMucReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeTaiKhoanReponse;
import com.bot.bandienthoai.entity.KhuyenMai_DienThoai;
import com.bot.bandienthoai.entity.PhienBanDienThoai;
import com.bot.bandienthoai.mapper.ImagesMapper;
import com.bot.bandienthoai.mapper.KhuyenMaiDienThoaiMapper;
import com.bot.bandienthoai.mapper.ThongKeMapper;
import com.bot.bandienthoai.request.SearchAndFilterRequest;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;

@Service
public class EntityManagerService {
	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	ImagesMapper imagesMapper;

	@Autowired
	KhuyenMaiDienThoaiMapper khuyenMaiMapper;

	@Autowired
	ThongKeMapper thongKeMapper;

	public List<PhienBanDienThoai> search(List<String> keywords) {
		StringBuilder sql = new StringBuilder("Select pb From PhienBanDienThoai pb JOIN pb.dienThoai dt where");
		for (int i = 0; i < keywords.size(); i++) {
			if (i > 0) {
				sql.append(" OR ");
			}
			sql.append(" (LOWER(pb.mauSac) LIKE :kw" + i + " OR LOWER(pb.ram) LIKE :kw" + i
					+ " OR LOWER(pb.rom) LIKE :kw" + i + " OR LOWER(pb.moTa) LIKE :kw" + i
					+ " OR LOWER(dt.tenDienThoai) LIKE :kw" + i + " OR LOWER(dt.hangSanXuat) LIKE :kw" + i + ")");
		}

		TypedQuery<PhienBanDienThoai> query = entityManager.createQuery(sql.toString(), PhienBanDienThoai.class);
		for (int i = 0; i < keywords.size(); i++) {
			query.setParameter("kw" + i, "%" + keywords.get(i) + "%");
		}

		List<PhienBanDienThoai> lst = query.getResultList();
		lst.sort((item1, item2) -> {
			int scoreItem1 = tinhDiemKetQua(item1, keywords);
			int scoreItem2 = tinhDiemKetQua(item2, keywords);
			return Integer.compare(scoreItem2, scoreItem1);
		});
		return lst;
	}

	public int tinhDiemKetQua(PhienBanDienThoai pb, List<String> keywords) {
		int score = 0;
		String mauSac = kyTuThuong(pb.getMauSac());
		String ram = kyTuThuong(pb.getRam());
		String rom = kyTuThuong(pb.getRom());
		String moTa = kyTuThuong(pb.getMoTa());
		String ten = kyTuThuong(pb.getDienThoai().getTenDienThoai());
		String hang = kyTuThuong(pb.getDienThoai().getHangSanXuat());

		for (String key : keywords) {
			if (mauSac.contains(key))
				score++;
			if (ram.contains(key))
				score++;
			if (rom.contains(key))
				score++;
			if (moTa.contains(key))
				score++;
			if (ten.contains(key))
				score += 2;
			if (hang.contains(key))
				score++;
		}
		return score;
	}

	public String kyTuThuong(String value) {
		return value == null ? "" : value.toLowerCase();
	}

//	public List<PhienBanDienThoai> filterPhienBan(List<PhienBanDienThoai> dsPhienBan, SearchAndFilterRequest request) {
//		List<String> boNho = request.getBoNho().stream().map(item -> kyTuThuong(item)).collect(Collectors.toList());
//		return dsPhienBan.stream().filter(pb -> {
//			if (request.getHang() != null && !request.getHang().isEmpty()) {
//				String hangSX = kyTuThuong(pb.getDienThoai().getHangSanXuat());
//				if (hangSX == null || !request.getHang().contains(hangSX)) {
//					return false;
//				}
//			}
//			
//			if (request.getMinGia() != null && pb.getGiaBan() < request.getMinGia()) {
//                return false;
//            }
//            if (request.getMaxGia() != null && pb.getGiaBan() > request.getMaxGia()) {
//                return false;
//            }
//            
//            if (boNho != null && !boNho.isEmpty()) {
//                if (!(boNho.contains(kyTuThuong(pb.getRam()))  || boNho.contains(kyTuThuong( pb.getRom())))) {
//                	return false;
//                }
//            }
//			return true;
//		}).collect(Collectors.toList());
//
//	}
	public Page<PhienBanDienThoaiKhuyenMaiReponse> filterPhienBan(List<PhienBanDienThoai> dsPhienBan,
			SearchAndFilterRequest request, Integer page, Integer size) {
		List<PhienBanDienThoaiKhuyenMaiReponse> lst = dsPhienBan.stream().map(item -> {
			Date now = new Date();
			List<KhuyenMai_DienThoai> km = item.getDienThoai().getKhuyenMaiDienThoai();
			PhienBanDienThoaiKhuyenMaiReponse t = new PhienBanDienThoaiKhuyenMaiReponse();
			Double giaBan = item.getGiaBan();
			KhuyenMai_DienThoai valueTmp = null;
			if (km != null && km.size() > 0) {

				valueTmp = km.get(0);
				for (KhuyenMai_DienThoai value : km) {
					if (value.getKhuyenMai().getNgayBatDau().after(now)
							|| value.getKhuyenMai().getNgayKetThuc().before(now))
						continue;

					Double giam = valueTmp.getKhuyenMai().getLoaiKhuyenMai().equals("Fixed")
							? valueTmp.getKhuyenMai().getGiaTriGiam()
							: valueTmp.getKhuyenMai().getGiaTriGiam() * 0.01 * giaBan;
					if (value.getKhuyenMai().getLoaiKhuyenMai().equals("Fixed")
							&& value.getKhuyenMai().getGiaTriGiam() > giam) {
						valueTmp = value;
					} else if (value.getKhuyenMai().getLoaiKhuyenMai().equals("Value")) {
						Double pt = value.getKhuyenMai().getGiaTriGiam() * 0.01 * giaBan;
						if (pt > giam) {
							valueTmp = value;
						}
					}
				}
			}
			if (valueTmp == null || (valueTmp.getKhuyenMai().getNgayBatDau().after(now)
					|| valueTmp.getKhuyenMai().getNgayKetThuc().before(now))) {
				valueTmp = new KhuyenMai_DienThoai();
			}

			t.setMaDienThoai(item.getDienThoai().getMaDienThoai());
			t.setMaPhienBan(item.getMaPhienBan());
			t.setCamera(item.getCamera());
			t.setGiaBan(item.getGiaBan());
			t.setHangSanXuat(item.getDienThoai().getHangSanXuat());
			t.setTenDienThoai(item.getDienThoai().getTenDienThoai());
			t.setManHinh(item.getManHinh());
			t.setMauSac(item.getMauSac());
			t.setPin(item.getPin());
			t.setRam(item.getRam());
			t.setRom(item.getRom());
			t.setSoLuong(item.getSoLuong());
			t.setMoTa(item.getMoTa());
			t.setImage(imagesMapper.toImagesDTOList(item.getImages()));
			t.setKm(khuyenMaiMapper.toKhuyenMaiDienThoai(valueTmp));
			return t;
		}).collect(Collectors.toList());

		List<String> boNho = request.getBoNho().stream().map(item -> kyTuThuong(item)).collect(Collectors.toList());

		lst = lst.stream().filter(pb -> {
			if (request.getHang() != null && !request.getHang().isEmpty()) {
				String hangSX = kyTuThuong(pb.getHangSanXuat());
				if (hangSX == null || !request.getHang().contains(hangSX)) {
					return false;
				}
			}

			if (pb.getKm().getMaKhuyenMai() == null && request.getMinGia() != null
					&& pb.getGiaBan() < request.getMinGia()) {
				return false;
			} else if (pb.getKm().getMaKhuyenMai() != null && request.getMinGia() != null) {
				if (pb.getKm().getLoaiKhuyenMai().equals("Fixed")
						&& pb.getGiaBan() - pb.getKm().getGiaTriGiam() < request.getMinGia()) {
					return false;
				} else if (pb.getKm().getLoaiKhuyenMai().equals("Percent")
						&& pb.getGiaBan() - pb.getKm().getGiaTriGiam() * 0.01 * pb.getGiaBan() < request.getMinGia()) {
					return false;
				}
			}
			if (pb.getKm().getMaKhuyenMai() == null && request.getMaxGia() != null
					&& pb.getGiaBan() > request.getMaxGia()) {
				return false;
			} else if (pb.getKm().getMaKhuyenMai() != null && request.getMaxGia() != null) {
				if (pb.getKm().getLoaiKhuyenMai().equals("Fixed")
						&& pb.getGiaBan() - pb.getKm().getGiaTriGiam() > request.getMaxGia()) {
					return false;
				} else if (pb.getKm().getLoaiKhuyenMai().equals("Percent")
						&& pb.getGiaBan() - pb.getKm().getGiaTriGiam() * 0.01 * pb.getGiaBan() > request.getMaxGia()) {
					return false;
				}
			}

			if (boNho != null && !boNho.isEmpty()) {
				if (!(boNho.contains(kyTuThuong(pb.getRam())) || boNho.contains(kyTuThuong(pb.getRom())))) {
					return false;
				}
			}
			return true;
		}).collect(Collectors.toList());

		Pageable pageable = PageRequest.of(page, size);
		int from = page * size;
		int to = Math.min(from + size, lst.size());
		List<PhienBanDienThoaiKhuyenMaiReponse> ds = from > lst.size() ? Collections.emptyList()
				: lst.subList(from, to);
		return new PageImpl<>(ds, pageable, lst.size());
	}

	// dashboarh thống kê theo năm
	public DashBoardReponse getDashBoardTheoNam(int year) {
		String sql = """
					SELECT
				    SUM(CASE WHEN YEAR(d.ngayTao) = :nam THEN d.tongtien ELSE 0 END) AS doanhThu,
				    COUNT(CASE WHEN YEAR(d.ngaytao) = :nam THEN 1 END) AS tongDonHang,
				    COUNT(DISTINCT CASE WHEN YEAR(d.ngaytao) = :nam THEN d.makhachhang END) AS soKhachHang,
				    ROUND(
				        (
				            SUM(CASE WHEN YEAR(d.ngaytao) = :nam THEN d.tongtien ELSE 0 END) -
				            SUM(CASE WHEN YEAR(d.ngaytao) = :nam - 1 THEN d.tongtien ELSE 0 END)
				        ) * 100.0 /
				        NULLIF(SUM(CASE WHEN YEAR(d.ngaytao) = :nam - 1 THEN d.tongtien ELSE 0 END), 0),
				        2
				    ) AS tangTruong
				FROM donhang d
				WHERE d.trangthai = 4;
								""";

		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		Object[] result = (Object[]) query.getSingleResult();

		return thongKeMapper.toDashBoardReponse(result);
	}

	public DashBoardReponse getDashBoardTheoThang(int year, int month) {
		// Xử lý tháng trước
		int prevMonth = (month == 1) ? 12 : month - 1;
		int prevYear = (month == 1) ? year - 1 : year;

		String sql = """
					SELECT
				    -- Tổng doanh thu trong tháng này
				    SUM(CASE WHEN YEAR(d.ngaytao) = :nam AND MONTH(d.ngaytao) = :thang THEN d.tongtien ELSE 0 END) AS doanhThu,

				    -- Số đơn hàng trong tháng này
				    COUNT(CASE WHEN YEAR(d.ngaytao) = :nam AND MONTH(d.ngaytao) = :thang THEN 1 END) AS tongDonHang,

				    -- Số khách hàng duy nhất trong tháng này
				    COUNT(DISTINCT CASE WHEN YEAR(d.ngaytao) = :nam AND MONTH(d.ngaytao) = :thang THEN d.makhachhang END) AS soKhachHang,

				    -- % tăng trưởng so với tháng trước
				    ROUND(
				        (
				            SUM(CASE WHEN YEAR(d.ngaytao) = :nam AND MONTH(d.ngaytao) = :thang THEN d.tongtien ELSE 0 END) -
				            SUM(CASE WHEN YEAR(d.ngaytao) = :prevYear AND MONTH(d.ngaytao) = :prevMonth THEN d.tongtien ELSE 0 END)
				        ) * 100.0 /
				        NULLIF(
				            SUM(CASE WHEN YEAR(d.ngaytao) = :prevYear AND MONTH(d.ngaytao) = :prevMonth THEN d.tongtien ELSE 0 END),
				            0
				        ),
				        2
				    ) AS tangTruong
				FROM DonHang d
				WHERE d.trangthai = 4;

								    """;

		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		query.setParameter("thang", month);
		query.setParameter("prevYear", prevYear);
		query.setParameter("prevMonth", prevMonth);

		Object[] result = (Object[]) query.getSingleResult();

		return thongKeMapper.toDashBoardReponse(result);
	}

	public DashBoardReponse getDashBoardTheoNgay(LocalDate day) {
		String sql = """
					SELECT
				    -- Tổng doanh thu trong ngày này
				    SUM(CASE WHEN CAST(d.ngaytao AS DATE) = :ngayHienTai THEN d.tongtien ELSE 0 END) AS doanhThu,

				    -- Số đơn hàng trong ngày này
				    COUNT(CASE WHEN CAST(d.ngaytao AS DATE) = :ngayHienTai THEN 1 END) AS tongDonHang,

				    -- Số khách hàng duy nhất trong ngày này
				    COUNT(DISTINCT CASE WHEN CAST(d.ngaytao AS DATE) = :ngayHienTai THEN d.makhachhang END) AS soKhachHang,

				    -- % tăng trưởng so với ngày hôm trước
				    ROUND(
				        (
				            SUM(CASE WHEN CAST(d.ngaytao AS DATE) = :ngayHienTai THEN d.tongtien ELSE 0 END) -
				            SUM(CASE WHEN CAST(d.ngaytao AS DATE) = :ngayTruoc THEN d.tongtien ELSE 0 END)
				        ) * 100.0 /
				        NULLIF(SUM(CASE WHEN CAST(d.ngaytao AS DATE) = :ngayTruoc THEN d.tongtien ELSE 0 END), 0),
				        2
				    ) AS tangTruong
				FROM DonHang d
				WHERE d.trangthai = 4;

								""";
		java.sql.Date sqlDay = java.sql.Date.valueOf(day);
		java.sql.Date sqlYesterday = java.sql.Date.valueOf(day.minusDays(1));
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("ngayTruoc", sqlYesterday);
		query.setParameter("ngayHienTai", sqlDay);
		Object[] result = (Object[]) query.getSingleResult();
		return thongKeMapper.toDashBoardReponse(result);
	}

	public List<DoanhThuReponse> getDoanhThuNam(int year) {
		String sql="""
			WITH months AS (
		    SELECT 1 AS thang
		    UNION ALL
		    SELECT thang + 1 
		    FROM months 
		    WHERE thang < 12
		)
		SELECT 'Tháng ' + CAST(m.thang AS VARCHAR),
		       ISNULL(SUM(dh.tongtien), 0) AS doanh_thu
		FROM months m
		LEFT JOIN donhang dh
		       ON MONTH(dh.ngaytao) = m.thang
		      AND YEAR(dh.ngaytao) = :nam
		      AND dh.trangthai = 4
		GROUP BY m.thang
		ORDER BY m.thang
				""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		List<Object[]> lst = query.getResultList();
		return lst.stream().map(thongKeMapper::toDoanhThuReponse).collect(Collectors.toList());
	}
	
	public List<DoanhThuReponse> doanhThuThang(int year, int month){
		String sql = """
			WITH days AS (
			    SELECT 1 AS ngay
			    UNION ALL
			    SELECT ngay + 1
			    FROM days
			    WHERE ngay < DAY(EOMONTH(DATEFROMPARTS(:year, :month, 1)))
			)
			SELECT 'Ngày ' + CAST(d.ngay AS VARCHAR),
			       ISNULL(SUM(dh.tongtien), 0) AS doanh_thu
			FROM days d
			LEFT JOIN donhang dh
			       ON DAY(dh.ngaytao) = d.ngay
			      AND MONTH(dh.ngaytao) = :month
			      AND YEAR(dh.ngaytao) = :year
			      AND dh.trangthai = 4
			GROUP BY d.ngay
			ORDER BY d.ngay
				""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("year", year);
		query.setParameter("month", month);
		List<Object[]> lst = query.getResultList();
		return lst.stream().map(thongKeMapper::toDoanhThuReponse).collect(Collectors.toList());
	}
	
	public List<DoanhThuReponse> doanhThuNgay(LocalDate day){
		String sql = """
			WITH hours AS (
			    SELECT 0 AS gio
			    UNION ALL
			    SELECT gio + 1
			    FROM hours
			    WHERE gio < 23
			)
			SELECT  RIGHT('00' + CAST(h.gio AS VARCHAR(2)), 2) + ':00' AS gio_hien_thi,
			       ISNULL(SUM(dh.tongtien), 0) AS doanh_thu
			FROM hours h
			LEFT JOIN donhang dh
			       ON DATEPART(HOUR, dh.ngaytao) = h.gio
			      AND CAST(dh.ngaytao AS DATE) = :ngay
			      AND dh.trangthai = 4
			GROUP BY h.gio
			ORDER BY h.gio

				""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("ngay", day);
		List<Object[]> lst = query.getResultList();
		return lst.stream().map(thongKeMapper::toDoanhThuReponse).collect(Collectors.toList());
	}
	
	public List<ThongKeDanhMucReponse> thongKeDanhMucNam(int year){
		String sql = 
		"""
			SELECT TOP 5 dm.TenDanhMuc, COUNT(DISTINCT dh.MaDonHang) AS SoLuongDonHang
			FROM DanhMuc dm
			LEFT JOIN DienThoai dt ON dm.MaDanhMuc = dt.MaDanhMuc 
			LEFT JOIN PhienBanDienThoai pb ON dt.MaDienThoai = pb.MaDienThoai
			Left JOIN ChiTietDonHang ct ON pb.MaPhienBan = ct.MaPhienBan
			Left JOIN DonHang dh ON ct.MaDonHang = dh.MaDonHang and dh.TrangThai = 4
			AND year(dh.ngaytao) = :nam
			GROUP BY dm.TenDanhMuc
			ORDER BY SoLuongDonHang DESC;

				""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		List<Object[]> lst = query.getResultList();
		return lst.stream().map(thongKeMapper::tothoDanhMucReponse).collect(Collectors.toList());
	}
	public List<ThongKeDanhMucReponse> thongKeDanhMucThang(int year, int month){
		String sql = 
		"""
			SELECT TOP 5 dm.TenDanhMuc, COUNT(DISTINCT dh.MaDonHang) AS SoLuongDonHang
			FROM DanhMuc dm
			LEFT JOIN DienThoai dt ON dm.MaDanhMuc = dt.MaDanhMuc 
			LEFT JOIN PhienBanDienThoai pb ON dt.MaDienThoai = pb.MaDienThoai
			Left JOIN ChiTietDonHang ct ON pb.MaPhienBan = ct.MaPhienBan
			Left JOIN DonHang dh ON ct.MaDonHang = dh.MaDonHang and dh.TrangThai = 4
			AND year(dh.ngaytao) = :nam and Month(dh.ngayTao) = :thang
			GROUP BY dm.TenDanhMuc
			ORDER BY SoLuongDonHang DESC;

				""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		query.setParameter("thang", month);
		List<Object[]> lst = query.getResultList();
		return lst.stream().map(thongKeMapper::tothoDanhMucReponse).collect(Collectors.toList());
	}
	public List<ThongKeDanhMucReponse> thongKeDanhMucNgay(LocalDate day){
		String sql = 
		"""
			SELECT TOP 5 dm.TenDanhMuc, COUNT(DISTINCT dh.MaDonHang) AS SoLuongDonHang
			FROM DanhMuc dm
			LEFT JOIN DienThoai dt ON dm.MaDanhMuc = dt.MaDanhMuc
			LEFT JOIN PhienBanDienThoai pb ON dt.MaDienThoai = pb.MaDienThoai
			Left JOIN ChiTietDonHang ct ON pb.MaPhienBan = ct.MaPhienBan
			Left JOIN DonHang dh ON ct.MaDonHang = dh.MaDonHang AND cast(dh.ngaytao as Date) = :ngay and dh.TrangThai = 4
			GROUP BY dm.TenDanhMuc
			ORDER BY SoLuongDonHang DESC;

				""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("ngay", day);
		List<Object[]> lst = query.getResultList();
		return lst.stream().map(thongKeMapper::tothoDanhMucReponse).collect(Collectors.toList());
	}
	
	public List<SanPhamBanChayReponse> getSPBanChayNam(int year){
		String sql = """
			SELECT TOP 5 dt.TenDienThoai, pb.giaBan,
				COUNT(DISTINCT dh.MaDonHang) AS SoLuongDonHang
				FROM DienThoai dt 
				JOIN PhienBanDienThoai pb On dt.MaDienThoai = pb.MaDienThoai
				JOIN ChiTietDonHang ct ON pb.MaPhienBan = ct.MaPhienBan
				JOIN DonHang dh ON ct.MaDonHang = dh.MaDonHang
				where Year(dh.NgayTao) = :nam AND dh.TrangThai = 4
				GROUP BY pb.MaPhienBan, dt.TenDienThoai, pb.giaBan
				ORDER BY SoLuongDonHang DESC;

		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		List<Object[]> lst = query.getResultList();
		return lst.stream().map(thongKeMapper::toSanPhamBanChayReponse).collect(Collectors.toList());
	}
	public List<SanPhamBanChayReponse> getSPBanChayThang(int year, int month){
		String sql = """
			SELECT TOP 5 dt.TenDienThoai, pb.giaBan,
				COUNT(DISTINCT dh.MaDonHang) AS SoLuongDonHang
				FROM DienThoai dt 
				JOIN PhienBanDienThoai pb On dt.MaDienThoai = pb.MaDienThoai
				JOIN ChiTietDonHang ct ON pb.MaPhienBan = ct.MaPhienBan
				JOIN DonHang dh ON ct.MaDonHang = dh.MaDonHang
				where Year(dh.NgayTao) = :nam And Month(dh.NgayTao) = :thang AND dh.TrangThai = 4
				GROUP BY pb.MaPhienBan, dt.TenDienThoai, pb.giaBan
				ORDER BY SoLuongDonHang DESC;

		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		query.setParameter("thang", month);
		List<Object[]> lst = query.getResultList();
		return lst.stream().map(thongKeMapper::toSanPhamBanChayReponse).collect(Collectors.toList());
	}
	public List<SanPhamBanChayReponse> getSPBanChayNgay(LocalDate day){
		String sql = """
			SELECT TOP 5 dt.TenDienThoai, pb.giaBan, 
				COUNT(DISTINCT dh.MaDonHang) AS SoLuongDonHang
				FROM DienThoai dt 
				JOIN PhienBanDienThoai pb On dt.MaDienThoai = pb.MaDienThoai
				JOIN ChiTietDonHang ct ON pb.MaPhienBan = ct.MaPhienBan
				JOIN DonHang dh ON ct.MaDonHang = dh.MaDonHang
				where Cast(dh.NgayTao as Date) = :ngay AND dh.TrangThai = 4
				GROUP BY pb.MaPhienBan, dt.TenDienThoai, pb.giaBan
				ORDER BY SoLuongDonHang DESC;

		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("ngay", day);
		List<Object[]> lst = query.getResultList();
		return lst.stream().map(thongKeMapper::toSanPhamBanChayReponse).collect(Collectors.toList());
	}
	
	public ThongKeTaiKhoanReponse getThongKeKhachHangNam(int year) {
		String sql = """
			Select ISNULL(Count(kh.maKhachHang), 0) as soluongkh,
			 	IsNULL(Sum(Case When kh.trangThai = 1 Then 1 Else 0 End), 0),
			 	IsNULL(Sum(Case When kh.trangThai = -1 Then 1 Else 0 End), 0),
			 	ISNULL(Sum(Case When Year(kh.NgayDangKy) = :nam Then 1 Else 0 End), 0)
			From KhachHang kh	
			Where Year(kh.NgayDangKy) = :nam
		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		Object[] kq = (Object[]) query.getSingleResult();
		return thongKeMapper.toThongKeTaiKhoanReponse(kq);
	}
	
	public ThongKeTaiKhoanReponse getThongKeKhachHangThang(int year, int month) {
		String sql = """
			Select ISNULL(Count(kh.maKhachHang), 0),
			 	ISNULL(Sum(Case When kh.trangThai = 1 Then 1 Else 0 End), 0),
			 	ISNULL(Sum(Case When kh.trangThai = -1 Then 1 Else 0 End), 0),
			 	ISNULL(Sum(Case When Year(kh.NgayDangKy) = :nam And Month(kh.NgayDangKy) = :thang Then 1 Else 0 End), 0)
			From KhachHang kh	
			Where Year(kh.NgayDangKy) = :nam AND Month(kh.NgayDangKy) = :thang
		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		query.setParameter("thang", month);
		Object[] kq = (Object[]) query.getSingleResult();
		return thongKeMapper.toThongKeTaiKhoanReponse(kq);
	}
	public ThongKeTaiKhoanReponse getThongKeKhachHangNgay(LocalDate day) {
		String sql = """
			Select ISNULL(Count(kh.maKhachHang), 0),
			 	ISNULL(Sum(Case When kh.trangThai = 1 Then 1 Else 0 End), 0),
			 	ISNULL(Sum(Case When kh.trangThai = -1 Then 1 Else 0 End), 0),
			 	ISNULL(Sum(Case When Cast(kh.NgayDangKy as Date) = :ngay Then 1 Else 0 End), 0)
			From KhachHang kh	
			Where Cast(kh.NgayDangKy as Date) = :ngay
		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("ngay", day);
		Object[] kq = (Object[]) query.getSingleResult();
		return thongKeMapper.toThongKeTaiKhoanReponse(kq);
	}
	
	public List<ThongKeKhachHangReponse> getTKKhachHangNam(int year){
		String sql = """ 
			WITH  ThangCTE AS (
			    SELECT 1 AS thang
			    UNION ALL
			    SELECT thang + 1
			    FROM ThangCTE
			    WHERE thang < 12
			)
			SELECT 
			    t.thang,
			    ISNULL(Count(kh.maKhachHang), 0) AS soLuongKhachHang
			FROM ThangCTE t
			LEFT JOIN KhachHang kh 
			    ON YEAR(kh.NgayDangKy) = :nam AND t.thang = Month(kh.NgayDangKy)
			GROUP BY t.thang
			ORDER BY t.thang;
	
		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		List<Object[]> kq = query.getResultList();
		return kq.stream().map(thongKeMapper::toKeKhachHangReponse).collect(Collectors.toList());

	}
	public List<ThongKeKhachHangReponse> getTKKhachHangThang(int year, int month){
		String sql = """ 
			WITH NgayCTE AS (
			    SELECT 1 AS ngay
			    UNION ALL
			    SELECT ngay + 1
			    FROM NgayCTE
			    WHERE ngay < DAY(EOMONTH(DATEFROMPARTS(:nam, :thang, 1)))
			)
			SELECT 
			    t.ngay,
			    ISNULL(Count(kh.maKhachHang), 0) AS soLuongKhachHang
			FROM NgayCTE t
			LEFT JOIN KhachHang kh 
			    ON MONTH(kh.NgayDangKy) = :thang
			   AND YEAR(kh.NgayDangKy) = :nam
			    AND Day(kh.NgayDangKy) = t.ngay
			GROUP BY t.ngay
			ORDER BY t.ngay
	
		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		query.setParameter("thang", month);
		List<Object[]> kq = query.getResultList();
		return kq.stream().map(thongKeMapper::toKeKhachHangReponse).collect(Collectors.toList());
	}
	public List<ThongKeKhachHangReponse> getTKKhachHangNgay(LocalDate day){
		String sql = """ 
			WITH hours AS (
			   SELECT 0 AS gio
			    UNION ALL
			    SELECT gio + 1
			    FROM hours
			    WHERE gio < 23
			)
			SELECT  RIGHT('00' + CAST(h.gio AS VARCHAR(2)), 2) + ':00' AS gio_hien_thi,
			       ISNULL(Count(kh.maKhachHang), 0) as SoLuong
			FROM hours h
			LEFT JOIN KhachHang kh 
			   ON DATEPART(HOUR, dh.ngaytao) = h.gio
			      AND CAST(dh.ngaytao AS DATE) = :ngay
			GROUP BY h.gio
			ORDER BY h.gio;
	
		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("ngay", day);
		List<Object[]> kq = query.getResultList();
		return kq.stream().map(thongKeMapper::toKeKhachHangReponse).collect(Collectors.toList());
	}
	
	public List<DSKhachHangReponse> getDSKhachHangNam(int year){
		String sql= """
			Select kh.maKhachHang, kh.hoten, kh.email,
			Case When kh.TrangThai = 1 Then N'Hoạt động' Else 'Ngưng hoạt động' End
			From KhachHang kh
			Where Year(kh.NgayDangKy) = :nam	
		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		List<Object[]> kq = query.getResultList();
		return kq.stream().map(thongKeMapper::toDSKhachHangReponse).collect(Collectors.toList());
	}
	
	public List<DSKhachHangReponse> getDSKhachHangThang(int year, int month){
		String sql= """
			Select kh.maKhachHang, kh.hoten, kh.email,
			Case When kh.TrangThai = 1 Then N'Hoạt động' Else 'Ngưng hoạt động' End
			From KhachHang kh
			Where Year(kh.NgayDangKy) = :nam AND Month(kh.NgayDangKy) = :thang
		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("nam", year);
		query.setParameter("thang", month);
		List<Object[]> kq = query.getResultList();
		return kq.stream().map(thongKeMapper::toDSKhachHangReponse).collect(Collectors.toList());
	}
	
	public List<DSKhachHangReponse> getDSKhachHangNgay(LocalDate day){
		String sql= """
			Select kh.maKhachHang, kh.hoten, kh.email,
			Case When kh.TrangThai = 1 Then N'Hoạt động' Else 'Ngưng hoạt động' End
			From KhachHang kh
			Where Cast(kh.ngaydangky as DATE) = :ngay
		""";
		Query query = entityManager.createNativeQuery(sql);
		query.setParameter("ngay", day);
		List<Object[]> kq = query.getResultList();
		return kq.stream().map(thongKeMapper::toDSKhachHangReponse).collect(Collectors.toList());
	}
	
	
	// thống kê khách hàng
//	public List<KhachHangInQuanLyReponse> getDsKhachHangInQuanLy(){
//		String sql = """
//		Select kh.maKhachHang, kh.hoTen, kh.soDienThoai, kh.Email, kh.NgayDangKy, 
//				Case when kh.TRangThai = 1 Then N'Hoạt động' Else N'Bị khóa' End,
//				Case when kh.TrangThai = 1 Then True Else False End
//			From KhachHang kh
//			
//		""";
//		Query query = entityManager.createNativeQuery(sql);
//		List<Object[]> kq = query.getResultList();
//		return kq.stream().map(thongKeMapper::toDSKhachHangReponse).collect(Collectors.toList());
//	}
}
