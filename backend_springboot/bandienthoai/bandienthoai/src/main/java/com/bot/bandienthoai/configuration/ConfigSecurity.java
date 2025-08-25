package com.bot.bandienthoai.configuration;

import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import io.jsonwebtoken.security.Keys;

@Configuration
@EnableWebSecurity
public class ConfigSecurity {
	private static final String secret = "Nn38Dah72js9vcn43KSjdoPzKJr93kjsWl01kcnmv81=";
	private static final SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes());
	
	@Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(secretKey).build();
    }
	
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http

            .csrf(csrf -> csrf.disable()) 
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/signup", "/checkfile", "/uploads/**", "/thanhtoan").permitAll()// cho phép truy cập không cần auth
                .requestMatchers("/adddanhmuc").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/adddienthoai").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/updatedienthoai").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/getdsdienthoai").hasAnyAuthority("ROLE_ADMIN", "ROLE_KHACHHANG")
                .requestMatchers("/getdsdienthoaiphantrang/*").hasAnyAuthority("ROLE_ADMIN")
                .requestMatchers("/getdsphienbanbydienthoai/*").hasAnyAuthority("ROLE_ADMIN", "ROLE_KHACHHANG")
                .requestMatchers("/deletedienthoai/*").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/updatedanhmuc").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/deletedanhmuc/*").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/getdsdanhmuc").hasAnyAuthority("ROLE_ADMIN", "ROLE_KHACHHANG")
                .requestMatchers("/getdsphienban/*").hasAnyAuthority("ROLE_ADMIN", "ROLE_KHACHHANG")
                .requestMatchers("/getdsphienbanandkhuyenmai").hasAnyAuthority("ROLE_ADMIN", "ROLE_KHACHHANG")
                .requestMatchers("/getdsphienbanphantrang/*").hasAnyAuthority("ROLE_ADMIN")
                .requestMatchers("/addphienban").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/updatephienban").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/deletephienban/*").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/getdsdanhgia/*").hasAnyAuthority("ROLE_ADMIN", "ROLE_KHACHHANG")
                .requestMatchers("/adddanhgia/").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/timkiemvaloc").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/themvaogiohang").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/xoakhoigiohang/*").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/getdsgiohang").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/getdsdonhang/*").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/getindonhang").hasAnyAuthority("ROLE_ADMIN", "ROLE_KHACHHANG")
                .requestMatchers("/updatetrangthai").hasAnyAuthority("ROLE_ADMIN", "ROLE_KHACHHANG")
                .requestMatchers("/getdskhuyenmai").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/addkhuyenmai").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/updatekhuyenmai").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/deletekhuyenmai/*").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/thongketaikhoan").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/dstaikhoan").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/searchkhachhang").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/checksoluong").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/getinfo").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/adddonhang").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/updateinfo").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/changepassword").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/dsdonhangkhachhang").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/dsdonhangkhachhanghientai").hasAuthority("ROLE_KHACHHANG")
                .requestMatchers("/dsdonhangkhachhanglichsu").hasAuthority("ROLE_KHACHHANG")
                .anyRequest().authenticated()
            );
            http.oauth2ResourceServer(oauth2 -> oauth2
                    .jwt(jwt -> jwt
                        .decoder(jwtDecoder()) 
                        .jwtAuthenticationConverter(jwtAuthenticationConverter())
                    )
                )
            .formLogin(form -> form.disable()) 
            .httpBasic(httpBasic -> httpBasic.disable()); 
//        http.addFilterBefore(new LoggingTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        System.out.println("Con vitk");
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
    	return new BCryptPasswordEncoder();
    }
    
    
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthorityPrefix("ROLE_");
        converter.setAuthoritiesClaimName("roles"); 
        
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtConverter;
    }
    
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); 
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
