package com.bot.bandienthoai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.KhuyenMai;

import jakarta.transaction.Transactional;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, Integer>{
	@Modifying
	@Transactional
	@Query("Delete From KhuyenMai km Where km.maKhuyenMai = :maKhuyenMai")
	void deleteKhuyenMai(@Param("maKhuyenMai") Integer maKhuyenMai);
}
