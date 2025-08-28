package com.bot.bandienthoai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bot.bandienthoai.entity.KhachHang;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
	Optional<KhachHang> findByUserName(String UserName);

	Optional<KhachHang> findBySoDienThoai(String soDienThoai);

	Optional<KhachHang> findByEmail(String email);

	@Query("""
			Select Count(kh.maKhachHang),
			 	Sum(Case When kh.trangThai = 1 Then 1 Else 0 End),
			 	Sum(Case When kh.trangThai = 0 Then 1 Else 0 End),
			 	IsNull(Sum(Case When Cast(kh.ngayDangKy as Date) = Cast(GetDate() as Date) Then 1 Else 0 End), 0)
			From KhachHang kh
			where kh.trangThai <> -1
			""")
	Optional<Object> thongKeKhachHang();

	@Query("""
			Select kh
			From KhachHang kh
			Where kh.trangThai <> -1 AND ( (:keyword IS NULL Or :keyword = '')
			   Or (Lower(kh.hoTen) Like %:keyword%
			       Or Lower(kh.userName) Like %:keyword%
			       Or Lower(kh.email) Like %:keyword%
			       Or Lower(kh.soDienThoai) Like %:keyword%))
			""")
	List<KhachHang> search(@Param("keyword") String keyword);

	@Query("""
			Select kh
			From KhachHang kh
			Where kh.trangThai <> -1 AND (:trangThai IS NULL  OR kh.trangThai = :trangThai)
			""")
	List<KhachHang> getDSKhachHang(@Param("trangThai") Integer trangThai);
	
}
