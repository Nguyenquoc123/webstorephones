package com.bot.bandienthoai.mapper;

import java.util.List;

import org.mapstruct.Mapper;


import com.bot.bandienthoai.dto.reponse.DienThoaiAdminReponse;
import com.bot.bandienthoai.dto.reponse.DienThoaiUseKhuyenMaiReponse;
import com.bot.bandienthoai.entity.DienThoai;

@Mapper(componentModel = "spring")
public interface DienThoaiMapper {

	default DienThoaiAdminReponse toDienThoaiReponse(DienThoai dienThoai) {
		if (dienThoai == null)
			return null;

		DienThoaiAdminReponse res = new DienThoaiAdminReponse();
		res.setMaDanhMuc(dienThoai.getDanhMuc().getMaDanhMuc());
		res.setTenDanhMuc(dienThoai.getDanhMuc().getTenDanhMuc());
		res.setTenDienThoai(dienThoai.getTenDienThoai());
		res.setMaDienThoai(dienThoai.getMaDienThoai());
		res.setHangSanXuat(dienThoai.getHangSanXuat());
		res.setMoTa(dienThoai.getMoTa());
		res.setImage("http://localhost:8080/storephones/uploads/" + dienThoai.getImage());
		return res;

	}
	
	

}
