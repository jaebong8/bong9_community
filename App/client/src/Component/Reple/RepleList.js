import axios from "axios";
import React, { useEffect, useState } from "react";
import { RepleListDiv } from "../../Style/RepleCss.js";
import RepleContent from "./RepleContent.js";

function RepleList(props) {
  const [repleList, setrepleList] = useState([]);
  useEffect(() => {
    let body = {
      postId: props.postId,
    };
    axios.post("/api/reple/getReple", body).then((response) => {
      if (response.data.success) {
        setrepleList([...response.data.repleList]);
      }
    });
  }, []);
  return (
    <RepleListDiv>
      {repleList.map((reple, idx) => {
        return <RepleContent reple={reple} key={idx} />;
      })}
    </RepleListDiv>
  );
}

export default RepleList;
