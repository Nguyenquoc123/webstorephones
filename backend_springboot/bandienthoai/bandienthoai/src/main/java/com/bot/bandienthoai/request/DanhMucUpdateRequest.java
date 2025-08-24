package com.bot.bandienthoai.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DanhMucUpdateRequest {
	
	private Integer maDanhMuc;
	@NotBlank(message = "TenDanhMuc_Not_Null")
	private String tenDanhMuc;
	@NotBlank(message = "MoTa_Not_Null")
	private String moTa;
}
