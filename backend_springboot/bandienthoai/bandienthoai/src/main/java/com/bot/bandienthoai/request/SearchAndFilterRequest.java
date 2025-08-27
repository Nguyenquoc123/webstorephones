package com.bot.bandienthoai.request;

import java.util.List;

import lombok.Data;

@Data
public class SearchAndFilterRequest {
	private String search;
	private List<String> hang;
	private Double minGia;
	private Double maxGia;
	private List<String> boNho;
	private boolean filter;
	private Integer page;
	private Integer size;
}
