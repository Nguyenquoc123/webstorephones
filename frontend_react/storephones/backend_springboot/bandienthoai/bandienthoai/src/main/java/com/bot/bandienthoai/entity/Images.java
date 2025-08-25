package com.bot.bandienthoai.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Images")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Images {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Id")
	private Integer id;
	
	@Column(name = "Url")
	private String url;
	
	@ManyToOne
	@JoinColumn(name = "maPhienBan")
	private PhienBanDienThoai phienBanDienThoai;
}
