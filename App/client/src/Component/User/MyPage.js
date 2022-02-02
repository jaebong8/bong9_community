import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";
import firebase from "../../firebase.js";
import { MyPageBtnDiv } from "../../Style/MyPageCSS.js";
function MyPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [CurrentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      navigate("/login");
    } else {
      setCurrentImage(user.photoURL);
    }
  }, [user]);

  const ImageUpload = (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/api/user/profile/img", formData).then((response) => {
      setCurrentImage(response.data.filePath);
    });
  };

  const SaveProfile = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: CurrentImage,
      });
    } catch (error) {
      return alert("프로필 저장에 실패하였습니다.");
    }
    let body = {
      photoURL: CurrentImage,
      uid: user.uid,
    };
    axios.post("/api/user/profile/update", body).then((response) => {
      if (response.data.success) {
        alert("프로필이 저장되었습니다.");
        window.location.reload();
      } else {
        return alert("프로필 저장에 실패하였습니다.");
      }
    });
  };
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <form
        style={{
          width: "50%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <h3>{user.displayName}</h3>
        <label>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              ImageUpload(e);
            }}
          />
          <Avatar
            size="100"
            round={true}
            src={CurrentImage}
            style={{ border: "1px solid #c6c6c6", cursor: "pointer" }}
          />
        </label>
        <MyPageBtnDiv>
          <button
            onClick={(e) => {
              SaveProfile(e);
            }}
          >
            SAVE
          </button>
        </MyPageBtnDiv>
      </form>
    </div>
  );
}

export default MyPage;
