package com.bot.bandienthoai.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bot.bandienthoai.entity.DanhMuc;

public interface DanhMucRepository extends JpaRepository<DanhMuc, Integer>{
	Page<DanhMuc> findByTrangThaiNot(Integer trangThai, Pageable pageable);
}
