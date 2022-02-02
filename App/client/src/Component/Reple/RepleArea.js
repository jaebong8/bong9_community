import React from "react";
import { useSelector } from "react-redux";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";
import { RepleAreaDiv } from "../../Style/RepleCss.js";

function RepleArea(props) {
  const user = useSelector((state) => state.user);
  return (
    <RepleAreaDiv>
      {user.accessToken && <RepleUpload postId={props.postId} />}
      <RepleList postId={props.postId} />
    </RepleAreaDiv>
  );
}

export default RepleArea;
