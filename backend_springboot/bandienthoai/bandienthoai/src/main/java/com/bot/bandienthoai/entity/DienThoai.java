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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DienThoai")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DienThoai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDienThoai")
    private int maDienThoai;

    @Column(name = "tenDienThoai")
    private String tenDienThoai;
    @Column(name = "HangSanXuat")
    private String hangSanXuat;
    @Column(name = "MoTa")
    private String moTa;
    @Column(name = "Image")
    private String image;
    @Column(name = "TrangThai")
    private Integer trangThai;
    @ManyToOne
    @JoinColumn(name = "maDanhMuc")
    private DanhMuc danhMuc;
}
