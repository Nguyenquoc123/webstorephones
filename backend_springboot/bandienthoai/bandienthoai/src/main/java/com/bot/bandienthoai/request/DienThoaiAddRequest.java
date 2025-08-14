package com.bot.bandienthoai.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DienThoaiAddRequest {
	@NotBlank(message = "TenDienThoai_Not_Null")
	private String tenDienThoai;
	@NotBlank(message = "HangSanXuat_Not_Null")
	private String hangSanXuat;
	@NotNull(message = "DanhMuc_Not_Null")
	private Integer maDanhMuc;
	
	@NotBlank(message = "MoTa_Not_Null")
	private String moTa;
}
