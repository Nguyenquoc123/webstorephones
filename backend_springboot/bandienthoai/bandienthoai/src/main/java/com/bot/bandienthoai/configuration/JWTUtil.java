package com.bot.bandienthoai.configuration;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.List;

import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.request.AuthenticationRequest;

public class JWTUtil {
	private static final String secret = "Nn38Dah72js9vcn43KSjdoPzKJr93kjsWl01kcnmv81=";
    private static final Key secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    private static final long EXPIRATION_TIME = 60 * 60 * 1000;

    // Tạo JWT token với id và role
    public static String generateToken(Integer id, String role) {
        return Jwts.builder()
                .setSubject(String.valueOf(id))
                .claim("roles", List.of(role)) 
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }


    
}
