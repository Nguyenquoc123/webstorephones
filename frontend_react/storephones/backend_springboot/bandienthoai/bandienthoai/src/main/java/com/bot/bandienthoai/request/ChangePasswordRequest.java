package com.bot.bandienthoai.request;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data
public class ChangePasswordRequest {
	
	@NotNull(message = "Password_Not_Null")
	@Length(min = 8, message = "Password_Not_Valid")
	private String passwordOld;
	
	@NotNull(message = "Password_Not_Null")
	@Length(min = 8, message = "Password_Not_Valid")
	private String passwordNew;
}
