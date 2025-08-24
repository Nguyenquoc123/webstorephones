package com.bot.bandienthoai.request;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateHoSoRequest {
	@NotNull(message = "HoTen_Not_Null")
	private String hoTen;
	
	
	private Integer gioiTinh;
	
	@NotNull(message = "NgaySinh_Not_Null")
	private Date ngaySinh;
	
	@NotNull(message = "SDT_Not_Null")
	@Length(min = 10, max = 10, message = "SDT_Not_Valid")
	private String soDienThoai;
	
	@NotNull(message = "Email_Not_Null")
	private String email;
	
	@NotBlank(message = "Dia_Chi_Not_Null")
	private String diaChi; 
	
	@NotNull(message = "UserName_Not_Null")
	@Size(min = 6, message = "UserName_Not_Valid")
	private String userName;
	
	
}
