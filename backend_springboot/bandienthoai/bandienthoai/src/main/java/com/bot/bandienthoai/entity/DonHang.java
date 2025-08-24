package com.bot.bandienthoai.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DonHang")

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DonHang {
    @Id
    @Column(name = "MaDonHang")
    private String maDonHang;

    @Column(name = "NgayTao")
    private Date ngayTao;
    @Column(name = "TongTien")
    private Double tongTien;
    @Column(name = "TrangThai")
    private Integer trangThai;
    @Column(name = "DiaChiGiaoHang")
    private String diaChiGiaoHang;
    @Column(name = "GhiChu")
    private String ghiChu;
    
    @Column(name = "PhuongThucThanhToan")
    private Integer phuongThucThanhToan;
    
    @Column(name = "TrangThaiThanhToan")
    private Integer trangThaiThanhToan;
    
    @ManyToOne
    @JoinColumn(name = "maKhachHang")
    private KhachHang khachHang;
    
    @OneToMany(mappedBy = "donHang", fetch = FetchType.LAZY)
    private List<ChiTietDonHang> chiTietDonHang;
    
}
