package com.bot.bandienthoai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bot.bandienthoai.entity.Images;

public interface ImagesRepository extends JpaRepository<Images, Integer>{
	void deleteAllByIdIn(List<Integer> ds);
}
