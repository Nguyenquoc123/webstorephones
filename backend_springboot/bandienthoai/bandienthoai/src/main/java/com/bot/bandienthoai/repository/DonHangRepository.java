package com.bot.bandienthoai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.DonHang;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer>{
	List<DonHang> findByTrangThai(Integer trangThai);
	Optional<DonHang> findByMaDonHang(String maDonHang);
}
