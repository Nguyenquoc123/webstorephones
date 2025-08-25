package com.bot.bandienthoai.request;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class KhachHangRequest {
	
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
	
	private String diaChi; 
	
	@NotNull(message = "UserName_Not_Null")
	@Size(min = 6, message = "UserName_Not_Valid")
	private String userName;
	
	@NotNull(message = "Password_Not_Null")
	@Size(min = 8, message = "Password_Not_Valid")
	private String password;

}
