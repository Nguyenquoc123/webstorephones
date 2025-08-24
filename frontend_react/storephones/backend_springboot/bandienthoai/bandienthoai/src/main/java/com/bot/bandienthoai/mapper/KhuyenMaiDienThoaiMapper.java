package com.bot.bandienthoai.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bot.bandienthoai.dto.reponse.DienThoaiUseKhuyenMaiReponse;
import com.bot.bandienthoai.dto.reponse.KhuyenMaiDienThoaiReponse;
import com.bot.bandienthoai.entity.DienThoai;
import com.bot.bandienthoai.entity.KhuyenMai_DienThoai;

@Mapper(componentModel = "spring")
public interface KhuyenMaiDienThoaiMapper {
	@Mapping(source = "khuyenMai.maKhuyenMai", target = "maKhuyenMai")
	@Mapping(source = "khuyenMai.tenKhuyenMai", target = "tenKhuyenMai")
	@Mapping(source = "khuyenMai.loaiKhuyenMai", target = "loaiKhuyenMai")
	@Mapping(source = "khuyenMai.giaTriGiam", target = "giaTriGiam")
	KhuyenMaiDienThoaiReponse toKhuyenMaiDienThoai(KhuyenMai_DienThoai km_dt);

	List<KhuyenMaiDienThoaiReponse> toKhuyenMaiDienThoaiDTOList(List<KhuyenMai_DienThoai> km_dt);

	@Mapping(source = "dienThoai.maDienThoai", target = "maDienThoai")
	@Mapping(source = "dienThoai.tenDienThoai", target = "tenDienThoai")
	DienThoaiUseKhuyenMaiReponse toDienThoaiUseKhuyenMaiReponse(KhuyenMai_DienThoai km_dt);

	List<DienThoaiUseKhuyenMaiReponse> toDienThoaiUseKhuyenMaiReponsesList(List<KhuyenMai_DienThoai> lst_km_dt);
}
