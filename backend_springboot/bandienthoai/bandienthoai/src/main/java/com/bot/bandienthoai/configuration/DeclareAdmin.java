package com.bot.bandienthoai.configuration;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.bot.bandienthoai.entity.Admin;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.repository.AdminRepository;

@Component
public class DeclareAdmin implements CommandLineRunner{
	@Autowired
	AdminRepository adminRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public void run(String... args){
		Optional<Admin> admin_ = adminRepository.findByUserName("admin123");
		if(admin_.isEmpty()) {
			try {
				Admin ad = new Admin();
				ad.setUserName("admin123");
				String password = passwordEncoder.encode("11111111");
				ad.setPassword(password);
				ad = adminRepository.save(ad);
				System.out.println(passwordEncoder.encode("11111111"));
			} catch (Exception e) {
				e.printStackTrace();
				throw new RunException(ErrorCode.Admin_Not_Declare);
			}
		}
	}
}
