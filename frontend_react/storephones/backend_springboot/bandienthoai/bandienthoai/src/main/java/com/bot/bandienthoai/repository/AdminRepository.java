package com.bot.bandienthoai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.Admin;
@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{
	Optional<Admin> findByUserName(String UserName);
}
