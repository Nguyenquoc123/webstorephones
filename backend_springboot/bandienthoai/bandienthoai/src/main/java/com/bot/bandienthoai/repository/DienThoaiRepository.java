package com.bot.bandienthoai.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.DienThoai;

@Repository
public interface DienThoaiRepository extends JpaRepository<DienThoai, Integer>{
		
		@Query("SELECT dt FROM DienThoai dt JOIN dt.danhMuc dm WHERE dt.trangThai <> -1")
		List<DienThoai> getDSDienThoai();
		
		Page<DienThoai> findByTrangThaiNot(Integer trangThai, Pageable pageable);


}
