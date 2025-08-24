package com.bot.bandienthoai.configuration;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class LoggingTokenFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        System.out.println("🧾 Token nhận được trong filter: " + token);
//        if(token != null)
//        	System.out.println(JWTUtil.extractUserNameFromToken(token));
        filterChain.doFilter(request, response); // tiếp tục xử lý
    }
}
