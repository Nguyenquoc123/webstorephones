package com.bot.bandienthoai.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.DanhMucReponse;
import com.bot.bandienthoai.entity.DanhMuc;

@Mapper(componentModel = "spring")
public interface DanhMucMapper {
	DanhMucReponse toDanhMucReponse(DanhMuc danhMuc);
}
