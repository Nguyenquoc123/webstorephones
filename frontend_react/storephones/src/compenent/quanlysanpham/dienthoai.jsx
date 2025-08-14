import React, { useEffect, useState } from "react";
import ThemDienThoai from "../quanlysanpham/themdienthoai/themdienthoai";
import {
  fetchAddDienThoai,
  fetchAddPhienBan,
  fetchDeteleDienThoai,
  fetchDetelePhienBan,
  fetchGetDSDienThoai,
  fetchGetDSPhienBan,
  fetchUpdateDienThoai,
  fetchUpdatePhienBan,
} from "../../api/dienthoai";
import MenuAdmin from "../menuadmin/MenuAdmin";
import Menu from "../quanlysanpham/menu/Menu";
import ThemPhienBan from "./themphienban/ThemPhienBan";
import SuaDienThoai from "./suadienthoai/SuaDienThoai";
import DSDienThoai from "./dsdienthoai/DSDienThoai";
import DSPhienBan from "./dsphienban/DSPhienBan";
import DelDienThoai from "./deldienthoai/DelDienThoai";
import SuaPhienBan from "./suaphienban/SuaPhienBan";
import DelPhienBan from "./delphienban/DelPhienBan";
function DienThoai() {
  const [menubar, setMenu] = useState(1);
  const [dsDienThoai, setDSDienThoai] = useState([]);
  const [showPopup, setShowPopup] = useState(null);
  const [dsPhienBan, setDSPhienBan] = useState([]);
  const [showAction, setShowAction] = useState(-1);
  const [lstImgDelete, setLstImgDelete] = useState([]);
  const [formAddDienThoai, setFormAddDienThoai] = useState({
    maDienThoai: "",
    tenDienThoai: "",
    hangSanXuat: "",
    moTa: "",
    maDanhMuc: "",
    image: null,
  });
  const [formAddPhienBan, setFormAddPhienBan] = useState({
    maPhienBan: "",
    maDienThoai: "",
    rom: "",
    ram: "",
    soLuong: "",
    giaBan: "",
    pin: "",
    manHinh: "",
    camera: "",
    moTa: "",
    mauSac: "",
    image: [],
  });

  useEffect(() => {
    const result = async () => {
      const lstdienthoai = await fetchGetDSDienThoai();
      if (lstdienthoai.code === 200) {
        setDSDienThoai(lstdienthoai.result);
        console.log(lstdienthoai.result);
      }
    };
    result();
  }, []);

  useEffect(() => {
    if (dsPhienBan.length === 0 && menubar === 4) {
      loadDSPhienBan();
    }
  }, [menubar, dsPhienBan]);
  const inputData = (key, value) => {
    setFormAddDienThoai({ ...formAddDienThoai, [key]: value });
  };
  const inputDataPhienBan = (key, value) => {
    setFormAddPhienBan({ ...formAddPhienBan, [key]: value });
  };
  const loadDSPhienBan = async () => {
    const result = await fetchGetDSPhienBan();
    if (result.code === 200) {
      console.log(result.result);
      if (result.result.length > 0) {
        setDSPhienBan(result.result);
      }

      console.log("load ds hoàn thành.");
    }
  };
  const selectImgEdit = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("déo cháy");
      const preview = document.getElementsByClassName("img-selected-edit")[0];
      console.log(URL.createObjectURL(file));
      preview.src = URL.createObjectURL(file);
    }
  };

  const selectImg = (e, idImg) => {
    const file = e.target.files[0];
    if (file) {
      const preview = document.getElementsByClassName(idImg)[0];
      console.log(URL.createObjectURL(file));
      preview.src = URL.createObjectURL(file);
      console.log("không chạy");
    }
  };
  const showpopup = (type, message) => {
    setShowPopup({ type: type, message: message });
  };

  const delImage = () => {
    setFormAddDienThoai({ ...formAddDienThoai, image: null });
  };

  const delImage2 = (index) => {
    const lst = [...formAddPhienBan.image];
    console.log("mày có chạy không thì bảo");
    console.log(showAction);
    console.log(typeof lst[index]);
    if (showAction === 3) {
      if (!(lst[index] instanceof File)) {
        setLstImgDelete([...lstImgDelete, lst[index].id]);
      }
    }

    lst.splice(index, 1);
    setFormAddPhienBan({ ...formAddPhienBan, image: lst });
  };

  const resetFormAddDienThoai = () => {
    setFormAddDienThoai({
      maDienThoai: "",
      tenDienThoai: "",
      hangSanXuat: "",
      moTa: "",
      maDanhMuc: "",
      image: null,
    });
  };
  const clickSaveDienThoai = async (e) => {
    e.preventDefault();
    console.log(formAddDienThoai);
    const data = new FormData();
    // const tenDienThoai = document.getElementById('name-dien-thoai').value
    // const hangSanXuat = document.getElementById('name-hang-san-xuat').value
    // const maDanhMuc = document.getElementById('select-danh-muc').value
    // const fileinput = document.getElementById('select-image');
    // const moTa = document.getElementById('mo-ta').value;
    // const image = fileinput.files[0];
    data.append("tenDienThoai", formAddDienThoai.tenDienThoai);
    data.append("hangSanXuat", formAddDienThoai.hangSanXuat);
    data.append("maDanhMuc", formAddDienThoai.maDanhMuc);
    data.append("moTa", formAddDienThoai.moTa);
    data.append("image", formAddDienThoai.image);
    const result = await fetchAddDienThoai(data);
    if (result.code === 200) {
      setDSDienThoai([...dsDienThoai, result.result]);
      showpopup(true, result.message);
      resetFormAddDienThoai();
    } else {
      showpopup(false, result.message);
    }
    console.log(result);
  };

  // thêm phiên bản mới
  const clickSavePhienBanDienThoai = async () => {
    // const maDienThoai = document.getElementById('dien-thoai').value;
    // const mauSac = document.getElementById('mau-sac').value;
    // const rom = document.getElementById('rom').value;
    // const ram = document.getElementById('ram').value;
    // const soLuong = document.getElementById('so-luong').value;
    // const giaBan = document.getElementById('gia-ban').value;
    // const pin = document.getElementById('pin').value;
    // const manHinh = document.getElementById('man-hinh').value;
    // const camera = document.getElementById('camera').value;
    // const moTa = document.getElementById('mo-ta-san-pham').value;
    // const fileInput = document.getElementById('select-image2');
    // if (fileInput.files.length === 0) {
    //     console.log("Chọn ảnh");
    //     return;
    // }
    // const image = fileInput.files[0];

    console.log(formAddPhienBan);
    console.log(JSON.stringify(formAddPhienBan.image));
    const data = new FormData();
    data.append("maDienThoai", formAddPhienBan.maDienThoai);
    data.append("mauSac", formAddPhienBan.mauSac);
    data.append("rom", formAddPhienBan.rom);
    data.append("ram", formAddPhienBan.ram);
    data.append("soLuong", formAddPhienBan.soLuong);
    data.append("donGia", formAddPhienBan.giaBan);
    data.append("pin", formAddPhienBan.pin);
    data.append("manHinh", formAddPhienBan.manHinh);
    data.append("camera", formAddPhienBan.camera);
    data.append("moTa", formAddPhienBan.moTa);
    // data.append("image", formAddPhienBan.image);
    formAddPhienBan.image.forEach((item) => data.append("image", item));
    console.log("con gà");
    console.log(formAddPhienBan.image);
    const result = await fetchAddPhienBan(data);
    if (result.code === 200) {
      console.log("Thêm thành công.");
      setDSPhienBan([...dsPhienBan, result.result]);
      resetFormAddPhienBan();
      showpopup(true, result.message);
    } else {
      showpopup(false, result.message);
    }
  };

  const resetFormAddPhienBan = () => {
    setFormAddPhienBan({
      maPhienBan: "",
      maDienThoai: "",
      rom: "",
      ram: "",
      soLuong: "",
      giaBan: "",
      pin: "",
      manHinh: "",
      camera: "",
      moTa: "",
      mauSac: "",
      image: [],
    });
  };
  const clickCancelThemDienThoai = () => {
    resetFormAddDienThoai();
    setMenu(3);
  };
  const clickCancelThemPhienBan = () => {
    resetFormAddPhienBan();
    setMenu(4);
  };
  const clickCancelEdit = () => {
    console.log("run");
    resetFormAddDienThoai();
    setShowAction(-1);
  };
  const clickCancelEditPhienBan = () => {
    resetFormAddPhienBan();
    setShowAction(-1);
  };

  const clickSaveEditDienThoai = async (e) => {
    const data = new FormData();
    // const tenDienThoai = document.getElementById('name-dien-thoai-edit').value
    // const hangSanXuat = document.getElementById('name-hang-san-xuat-edit').value
    // const maDanhMuc = document.getElementById('select-danh-muc-edit').value
    // const fileinput = document.getElementById('select-image-edit');
    // const moTa = document.getElementById('mo-ta-edit').value;
    // const image = fileinput.files.length === 0 ? null : fileinput.files[0];

    data.append("maDienThoai", formAddDienThoai.maDienThoai);
    data.append("tenDienThoai", formAddDienThoai.tenDienThoai);
    data.append("hangSanXuat", formAddDienThoai.hangSanXuat);
    data.append("maDanhMuc", formAddDienThoai.maDanhMuc);
    data.append("image", formAddDienThoai.image);
    data.append("moTa", formAddDienThoai.moTa);
    console.log(data);
    const result = await fetchUpdateDienThoai(data);
    if (result.code === 200) {
      setDSDienThoai((dsDienThoai) =>
        dsDienThoai.map((dienthoai) =>
          dienthoai.maDienThoai === formAddDienThoai.maDienThoai
            ? {
                ...dienthoai,
                tenDienThoai: result.result.tenDienThoai,
                hangSanXuat: result.result.hangSanXuat,
                maDanhMuc: result.result.maDanhMuc,
                image: result.result.image,
                moTa: result.result.moTa,
              }
            : dienthoai
        )
      );
      clickCancelEdit();
      showpopup(true, result.message);
    } else {
      showpopup(false, result.message);
    }
    console.log(result);
  };

  const showFormEditDienThoai = (maDienThoai) => {
    const dt = dsDienThoai.find((item) => item.maDienThoai === maDienThoai);
    console.log(dt);
    setFormAddDienThoai({
      maDienThoai: dt.maDienThoai,
      tenDienThoai: dt.tenDienThoai,
      hangSanXuat: dt.hangSanXuat,
      maDanhMuc: dt.maDanhMuc,
      moTa: dt.moTa,
      image: dt.image,
    });
    setShowAction(1);
  };
  const showDeleteDienThoai = (maDienThoai) => {
    setFormAddDienThoai({
      ...formAddDienThoai,
      maDienThoai: maDienThoai,
    });
    console.log("Xoa dien thoai có mã ", maDienThoai);
    console.log(showAction);
    setShowAction(2);
  };
  const clickCancelDelete = () => {
    resetFormAddDienThoai();
    setShowAction(-1);
    console.log("ẩn");
  };
  const clickSaveDelete = async (maDienThoai) => {
    console.log("đang xóa điện thoại có mã ", maDienThoai);
    const result = await fetchDeteleDienThoai(maDienThoai);
    if (result.code === 200) {
      console.log("Xóa thành công");
      clickCancelDelete();
      setDSDienThoai((dsDienThoai) =>
        dsDienThoai.filter((dienthoai) => dienthoai.maDienThoai !== maDienThoai)
      );
      showpopup(true, result.message);
    } else {
      showpopup(false, result.message);
    }
  };
  const clickUpdatePhienBan = (maPhienBan) => {
    console.log("update phien ban", maPhienBan);
    const pb = dsPhienBan.find(
      (phienban) => phienban.maPhienBan === maPhienBan
    );
    console.log(pb);
    setFormAddPhienBan({
      maPhienBan: pb.maPhienBan,
      maDienThoai: pb.maDienThoai,
      rom: pb.rom,
      ram: pb.ram,
      soLuong: pb.soLuong,
      giaBan: pb.giaBan,
      pin: pb.pin,
      manHinh: pb.manHinh,
      camera: pb.camera,
      moTa: pb.moTa,
      mauSac: pb.mauSac,
      image: pb.image,
    });
    setShowAction(3);
  };
  const clickDeletePhienBan = (maPhienBan) => {
    console.log("Xóa mã phien ban", maPhienBan);
    setFormAddPhienBan({ ...formAddPhienBan, maPhienBan: maPhienBan });
    setShowAction(4);
  };
  const clickCancelUpdatePhienBan = () => {
    resetFormAddPhienBan();
    setShowAction(-1);
  };

  const clickSaveUpdatePhienBan = async (maPhienBan) => {
    // const maDienThoai = document.getElementById('dien-thoai-edit').value;
    // const mauSac = document.getElementById('mau-sac-edit').value;
    // const rom = document.getElementById('rom-edit').value;
    // const ram = document.getElementById('ram-edit').value;
    // const soLuong = document.getElementById('so-luong-edit').value;
    // const giaBan = document.getElementById('gia-ban-edit').value;
    // const pin = document.getElementById('pin-edit').value;
    // const manHinh = document.getElementById('man-hinh-edit').value;
    // const camera = document.getElementById('camera-edit').value;
    // const moTa = document.getElementById('mo-ta-san-pham-edit').value;
    // const fileInput = document.getElementById('select-image-edit2');
    // const image = fileInput.files.length === 0 ? null : fileInput.files[0];
    console.log(formAddPhienBan);
    const data = new FormData();
    data.append("maPhienBan", formAddPhienBan.maPhienBan);
    data.append("maDienThoai", formAddPhienBan.maDienThoai);
    data.append("mauSac", formAddPhienBan.mauSac);
    data.append("rom", formAddPhienBan.rom);
    data.append("ram", formAddPhienBan.ram);
    data.append("soLuong", formAddPhienBan.soLuong);
    data.append("donGia", formAddPhienBan.giaBan);
    data.append("pin", formAddPhienBan.pin);
    data.append("manHinh", formAddPhienBan.manHinh);
    data.append("camera", formAddPhienBan.camera);
    data.append("moTa", formAddPhienBan.moTa);
    formAddPhienBan.image.forEach((item) => {
      if (item instanceof File) {
        data.append("image", item);
      }
    });
    lstImgDelete.forEach((item) => data.append("imageDelete", item));
    console.log(data);
    console.log("danh sách bị xóa", lstImgDelete);
    const result = await fetchUpdatePhienBan(data);
    if (result.code === 200) {
      console.log("Update thành công.");
      loadDSPhienBan();
      showpopup(true, result.message);
      clickCancelUpdatePhienBan();
    } else {
      showpopup(false, result.message);
    }
  };

  const clickCancelDeletePhienBan = () => {
    resetFormAddPhienBan();
    setShowAction(-1);
  };
  const clickSaveDeletePhienBan = async (maPhienBan) => {
    console.log("Đang xóa phiên bản có mã ", maPhienBan);
    const result = await fetchDetelePhienBan(maPhienBan);
    if (result.code === 200) {
      console.log("Xoa thanh công");
      setDSPhienBan((dsPhienBan) =>
        dsPhienBan.filter((item) => item.maPhienBan !== maPhienBan)
      );
      showpopup(true, result.message);
      clickCancelDeletePhienBan();
    } else {
      showpopup(false, result.message);
    }
  };
  return (
    <>
      {/* <MenuAdmin /> */}
      <Menu menubar={menubar} setMenu={setMenu} />
      <ThemDienThoai
        menubar={menubar}
        formAddDienThoai={formAddDienThoai}
        inputData={inputData}
        clickSaveDienThoai={clickSaveDienThoai}
        clickCancelThemDienThoai={clickCancelThemDienThoai}
        delImage={delImage}
      />
      <ThemPhienBan
        menubar={menubar}
        formAddPhienBan={formAddPhienBan}
        dsDienThoai={dsDienThoai}
        inputData={inputDataPhienBan}
        clickSavePhienBanDienThoai={clickSavePhienBanDienThoai}
        delImage={delImage2}
        clickCancelThemPhienBan={clickCancelThemPhienBan}
      />
      <SuaDienThoai
        menubar={showAction}
        formUpdateDienThoai={formAddDienThoai}
        inputData={inputData}
        clickCancelEdit={clickCancelEdit}
        clickSaveEditDienThoai={clickSaveEditDienThoai}
      />
      <DelDienThoai
        menubar={showAction}
        maDienThoai={formAddDienThoai.maDienThoai}
        clickSaveDelete={clickSaveDelete}
        clickCancelDelete={clickCancelDelete}
      />
      <DSDienThoai
        menubar={menubar}
        dsDienThoai={dsDienThoai}
        showEdit={showFormEditDienThoai}
        showDelete={showDeleteDienThoai}
      />
      <DSPhienBan
        menubar={menubar}
        dsPhienBan={dsPhienBan}
        delImage={delImage2}
        clickUpdatePhienBan={clickUpdatePhienBan}
        clickDeletePhienBan={clickDeletePhienBan}
      />
      <SuaPhienBan
        menubar={showAction}
        formUpdatePhienBan={formAddPhienBan}
        inputData={inputDataPhienBan}
        delImage={delImage2}
        dsDienThoai={dsDienThoai}
        clickCancelUpdatePhienBan={clickCancelUpdatePhienBan}
        clickSaveUpdatePhienBan={clickSaveUpdatePhienBan}
      />
      <DelPhienBan
        menubar={showAction}
        maPhienBan={formAddPhienBan.maPhienBan}
        clickCancelDeletePhienBan={clickCancelDeletePhienBan}
        clickSaveDeletePhienBan={clickSaveDeletePhienBan}
      />
    </>
  );
}

export default DienThoai;
