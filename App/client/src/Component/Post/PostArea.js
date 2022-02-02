import React, { useEffect, useState } from "react";
import Detail from "./Detail";
import { Spinner } from "react-bootstrap";
import { SpinnerDiv } from "../../Style/PostDetailCss";
import { useParams } from "react-router-dom";
import axios from "axios";
import RepleArea from "../Reple/RepleArea";
function PostArea() {
  let params = useParams();
  const [PostInfo, setPostInfo] = useState([]);
  const [Flag, setFlag] = useState(false);
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
  return (
    <div>
      {Flag ? (
        <>
          <Detail PostInfo={PostInfo} />
          <RepleArea postId={PostInfo._id} />
        </>
      ) : (
        <SpinnerDiv>
          <Spinner
            animation="border"
            role="status"
            style={{ fontSize: "300px" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
    </div>
  );
}

export default PostArea;
