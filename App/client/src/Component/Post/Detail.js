import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { BtnDiv, PostDetailDiv } from "../../Style/PostDetailCss";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ko";

function Detail(props) {
  let navigate = useNavigate();
  let params = useParams();
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh시 mm분") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh시 mm분");
    }
  };

  const user = useSelector((state) => state.user);

  const DeleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("삭제에 실패하였습니다.");
        });
    } else {
      alert("취소되었습니다.");
    }
  };
  return (
    <>
      <PostDetailDiv>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2 className="title">{props.PostInfo.title}</h2>
            <p>{SetTime(props.PostInfo.createdAt, props.PostInfo.updatedAt)}</p>
          </div>

          <p
            className="author"
            style={{
              color: "gray",
            }}
          >
            <Avatar
              size="40"
              round={true}
              src={props.PostInfo.author.photoURL}
              style={{ border: "1px solid #c6c6c6" }}
            />
            {props.PostInfo.author.displayName}
          </p>
        </div>
        {props.PostInfo.image ? (
          <img
            src={props.PostInfo.image}
            alt="img"
            style={{ width: "100%", height: "auto" }}
          />
        ) : null}

        <p>{props.PostInfo.content}</p>
      </PostDetailDiv>
      {user.uid === props.PostInfo.author.uid && (
        <BtnDiv>
          <Link to={`/edit/${props.PostInfo.postNum}`}>
            <button className="edit">수정</button>
          </Link>
          <button
            className="delete"
            onClick={() => {
              DeleteHandler();
            }}
          >
            삭제
          </button>
        </BtnDiv>
      )}
    </>
  );
}
export default Detail;
