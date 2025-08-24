package com.bot.bandienthoai.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.DanhGiaReponse;
import com.bot.bandienthoai.entity.DanhGia;

@Mapper(componentModel = "spring")
public interface DanhGiaMapper {
	@Mapping(source = "khachHang.maKhachHang", target = "maKhachHang")
	@Mapping(source = "phienBanDienThoai.maPhienBan", target = "maPhienBan")
	@Mapping(source = "khachHang.hoTen", target = "hoTen")
	DanhGiaReponse toDanhGiaReponse(DanhGia danhGia);
}
