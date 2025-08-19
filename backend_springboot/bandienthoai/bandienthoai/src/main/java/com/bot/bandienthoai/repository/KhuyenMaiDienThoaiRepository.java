package com.bot.bandienthoai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.KhuyenMai_DienThoai;
import com.bot.bandienthoai.entity.KhuyenMai_DienThoaiId;

@Repository
public interface KhuyenMaiDienThoaiRepository extends JpaRepository<KhuyenMai_DienThoai, KhuyenMai_DienThoaiId>{

}
