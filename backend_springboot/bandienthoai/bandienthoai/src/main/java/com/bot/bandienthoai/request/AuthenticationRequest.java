package com.bot.bandienthoai.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthenticationRequest {
	@NotBlank(message = "UserName_Not_Null")
	@Size(min = 6, message = "UserName_Not_Valid")
	private String userName;
	
	@NotNull(message = "Password_Not_Null")
	@Size(min = 8, message = "Password_Not_Valid")
	private String password;
}
