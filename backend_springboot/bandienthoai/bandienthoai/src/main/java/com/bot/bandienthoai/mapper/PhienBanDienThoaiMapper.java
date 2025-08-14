package com.bot.bandienthoai.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiReponse;
import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiTrongCartReponse;
import com.bot.bandienthoai.entity.PhienBanDienThoai;

@Mapper(componentModel = "spring", uses = {ImagesMapper.class})
public interface PhienBanDienThoaiMapper {

	@Mapping(source = "dienThoai.maDienThoai", target = "maDienThoai")
	@Mapping(source = "dienThoai.tenDienThoai", target = "tenDienThoai")
	@Mapping(source = "dienThoai.hangSanXuat", target = "hangSanXuat")
	@Mapping(source = "images", target = "image")
	PhienBanDienThoaiReponse toPhienBanDienThoaiReponse(PhienBanDienThoai phienBanDienThoai);

}
