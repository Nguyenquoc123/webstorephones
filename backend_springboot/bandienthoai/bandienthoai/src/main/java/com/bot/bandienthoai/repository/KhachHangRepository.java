package com.bot.bandienthoai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.KhachHang;
@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer>{
	Optional<KhachHang> findByUserName(String UserName);
	Optional<KhachHang> findBySoDienThoai(String soDienThoai);
	Optional<KhachHang> findByEmail(String email);
	
	
}
