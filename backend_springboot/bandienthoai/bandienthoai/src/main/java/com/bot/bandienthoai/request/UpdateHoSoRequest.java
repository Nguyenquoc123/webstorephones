package com.bot.bandienthoai.request;

import java.time.LocalDate;
import java.util.Date;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateHoSoRequest {
	@NotNull(message = "HoTen_Not_Null")
	private String hoTen;
	
	
	private Integer gioiTinh;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
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
