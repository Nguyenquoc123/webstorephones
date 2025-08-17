package com.bot.bandienthoai.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.PhienBanDienThoai;

@Repository
public interface PhienBanDienThoaiRepository extends JpaRepository<PhienBanDienThoai, Integer>{
	List<PhienBanDienThoai> findByDienThoai_MaDienThoai(Integer maDienThoai);
	
	@Query("select pb from PhienBanDienThoai pb JOIN pb.dienThoai JOIN pb.images where pb.trangThai <>-1")
	List<PhienBanDienThoai> getAllPhienBan();
	
	Page<PhienBanDienThoai> findByTrangThaiNot(Integer trangThai, Pageable pageable);
}
