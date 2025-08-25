package com.bot.bandienthoai.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "KhuyenMai_DienThoai")
@IdClass(KhuyenMai_DienThoaiId.class)

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KhuyenMai_DienThoai {
    @Id
    @ManyToOne
    @JoinColumn(name = "maKhuyenMai")
    private KhuyenMai khuyenMai;

    @Id
    @ManyToOne
    @JoinColumn(name = "maDienThoai")
    private DienThoai dienThoai;
}
