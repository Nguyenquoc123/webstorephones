package com.bot.bandienthoai.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationReponse {
	private Integer id;
	private String token;
	private String role;
}
