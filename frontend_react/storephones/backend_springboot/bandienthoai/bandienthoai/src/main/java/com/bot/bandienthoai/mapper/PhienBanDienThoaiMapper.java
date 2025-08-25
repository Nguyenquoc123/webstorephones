package com.bot.bandienthoai.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiAndKhuyenMaiReponse;
import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiReponse;
import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiTrongCartReponse;
import com.bot.bandienthoai.entity.PhienBanDienThoai;

@Mapper(componentModel = "spring", uses = {ImagesMapper.class, KhuyenMaiDienThoaiMapper.class})
public interface PhienBanDienThoaiMapper {

	@Mapping(source = "dienThoai.maDienThoai", target = "maDienThoai")
	@Mapping(source = "dienThoai.tenDienThoai", target = "tenDienThoai")
	@Mapping(source = "dienThoai.hangSanXuat", target = "hangSanXuat")
	@Mapping(source = "images", target = "image")
	PhienBanDienThoaiReponse toPhienBanDienThoaiReponse(PhienBanDienThoai phienBanDienThoai);

	@Mapping(source = "dienThoai.maDienThoai", target = "maDienThoai")
	@Mapping(source = "dienThoai.tenDienThoai", target = "tenDienThoai")
	@Mapping(source = "dienThoai.hangSanXuat", target = "hangSanXuat")
	@Mapping(source = "images", target = "image")
	@Mapping(source = "dienThoai.khuyenMaiDienThoai", target = "ds")
	PhienBanDienThoaiAndKhuyenMaiReponse toPhienBanDienThoaiAndKhuyenMaiReponse(PhienBanDienThoai phienBanDienThoai);
}
