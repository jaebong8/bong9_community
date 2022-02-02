import React, { useEffect, useState } from "react";
import { LoginDiv } from "../../Style/UserCSS";
import firebase from "../../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");
  const user = useSelector((state) => state.user);

  let navigate = useNavigate();

  useEffect(() => {
    if (user.accessToken) {
      alert("로그아웃을 해주세요");
      navigate("/");
    }
  }, []);

  const NameCheckFunc = (e) => {
    e.preventDefault();
    if (!Name) {
      return alert("닉네임을 입력해주세요");
    }
    let body = {
      displayName: Name,
    };
    axios.post("/api/user/namecheck", body).then((response) => {
      if (response.data.success) {
        if (response.data.check) {
          setNameCheck(true);
          setNameInfo("사용가능한 닉네임입니다.");
        } else {
          setNameInfo("사용 불가능한 닉네임입니다.");
        }
      }
    });
  };
  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(Name && Email && PW && PWConfirm)) {
      return alert("모든 값을 채워주세요");
    }
    if (PW !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인 값은 같아야합니다.");
    }
    if (!NameCheck) {
      alert("닉네임 중복 검사를 해주세요");
    }

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);

    await createdUser.user.updateProfile({
      displayName: Name,
      photoURL:
        "https://kr.object.ncloudstorage.com/react-community/user/profile.png",
    });
    console.log(createdUser.user);
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      photoURL:
        "https://kr.object.ncloudstorage.com/react-community/user/profile.png",
    };
    axios.post("/api/user/register", body).then((response) => {
      setFlag(false);
      if (response.data.success) {
        navigate("/login");
      } else {
        return alert("회원가입이 실패하였습니다.");
      }
    });
  };
  return (
    <LoginDiv>
      <form action="">
        <label htmlFor="name">닉네임</label>
        <input
          type="name"
          value={Name}
          disabled={NameCheck}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        {NameInfo}
        <button
          onClick={(e) => {
            NameCheckFunc(e);
          }}
        >
          닉네임 중복검사
        </button>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          value={Email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          value={PW}
          minLength={8}
          onChange={(e) => {
            setPW(e.currentTarget.value);
          }}
        />
        <label htmlFor="password">비밀번호 확인</label>
        <input
          type="password"
          value={PWConfirm}
          minLength={8}
          onChange={(e) => {
            setPWConfirm(e.currentTarget.value);
          }}
        />
        <button
          disabled={Flag}
          onClick={(e) => {
            RegisterFunc(e);
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
