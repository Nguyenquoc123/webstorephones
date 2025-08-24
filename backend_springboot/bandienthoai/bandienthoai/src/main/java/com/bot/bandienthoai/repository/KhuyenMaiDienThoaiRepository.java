package com.bot.bandienthoai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.KhuyenMai_DienThoai;
import com.bot.bandienthoai.entity.KhuyenMai_DienThoaiId;

import jakarta.transaction.Transactional;

@Repository
public interface KhuyenMaiDienThoaiRepository extends JpaRepository<KhuyenMai_DienThoai, KhuyenMai_DienThoaiId>{
	@Modifying
	@Transactional
	@Query("DELETE FROM KhuyenMai_DienThoai kmdt WHERE kmdt.khuyenMai.maKhuyenMai = :maKhuyenMai AND kmdt.dienThoai.maDienThoai = :maDienThoai")
	void deleteByKmAndDt(@Param("maKhuyenMai") Integer maKhuyenMai, @Param("maDienThoai") Integer maDienThoai);

	@Modifying
	@Transactional
	@Query("Delete From KhuyenMai_DienThoai kmdt Where kmdt.khuyenMai.maKhuyenMai = :maKhuyenMai")
	void deleteKhuyenMaiDienThoaiByMaKhuyenMai(@Param("maKhuyenMai") Integer maKhuyenMai);
}
