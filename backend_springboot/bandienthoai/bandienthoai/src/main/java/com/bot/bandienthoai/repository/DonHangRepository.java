package com.bot.bandienthoai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.dto.reponse.ThongTinGiaoDichReponse;
import com.bot.bandienthoai.entity.DonHang;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer>{
	List<DonHang> findByTrangThai(Integer trangThai);
	Optional<DonHang> findByMaDonHang(String maDonHang);
	List<DonHang> findByKhachHang_maKhachHang(Integer maKhachHang);
	
	@Query(""" 
			Select SUM(d.tongTien), Count(d), Max(d.ngayTao) from DonHang d
			where d.khachHang.maKhachHang = :maKhachHang
			""")
	Optional<Object> getThongTinGiaoDich(@Param("maKhachHang") Integer maKhachHang);
}
