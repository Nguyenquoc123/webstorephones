package com.bot.bandienthoai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.DanhGia;
@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGia, Integer>{
	List<DanhGia> findByPhienBanDienThoai_MaPhienBan(Integer maPhienBan);
}
