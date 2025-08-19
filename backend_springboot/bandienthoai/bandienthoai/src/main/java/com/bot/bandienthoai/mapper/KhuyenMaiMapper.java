package com.bot.bandienthoai.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.KhuyenMaiReponse;
import com.bot.bandienthoai.entity.KhuyenMai;

@Mapper(componentModel = "spring", uses = KhuyenMaiDienThoaiMapper.class)
public interface KhuyenMaiMapper {
	
	@Mapping(source = "maKhuyenMai", target = "maKhuyenMai")
	@Mapping(source = "khuyenMaiDienThoai", target = "dsDienThoai")
	@Mapping(source = "tenKhuyenMai", target = "tenKhuyenMai")
	@Mapping(source = "loaiKhuyenMai", target = "loaiKhuyenMai")
	@Mapping(source = "giaTriGiam", target = "giaTriGiam")
	KhuyenMaiReponse toKhuyenMaiReponse(KhuyenMai khuyenMai);
}
