import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadButtonDiv, UploadDiv, UploadForm } from "../../Style/UploadCSS";
import axios from "axios";

function Edit() {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  let navigate = useNavigate();
  let params = useParams();
  const [PostInfo, setPostInfo] = useState([]);
  const [Flag, setFlag] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      alert("모든 항목을 채워주세요!");
    }
    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum,
    };
    axios
      .post("/api/post/edit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("글 수정에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
  }, [PostInfo]);
  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        {Title && (
          <input
            id="title"
            value={Title}
            type="text"
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
        )}

        <label htmlFor="content">내용</label>
        {Content && (
          <textarea
            name="content"
            id="content"
            value={Content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          ></textarea>
        )}

        <UploadButtonDiv>
          <button
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            수정하기
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Edit;
