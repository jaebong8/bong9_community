import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RepleContentDiv, RepleUploadDiv } from "../../Style/RepleCss.js";
import axios from "axios";
import Avatar from "react-avatar";
import moment from "moment";
import "moment/locale/ko";

function RepleContent(props) {
  const ref = useRef();
  const user = useSelector((state) => state.user);
  const [ModalFlag, setModalFlag] = useState(false);
  const [EditFlag, setEditFlag] = useState(false);
  const [Reple, setReple] = useState(props.reple.reple);
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh시 mm분") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh시 mm분");
    }
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      uid: user.uid,
      reple: Reple,
      postId: props.reple.postId,
      repleId: props.reple._id,
    };
    axios.post("/api/reple/edit", body).then((response) => {
      if (response.data.success) {
        alert("댓글 수정이 성공하였습니다.");
      } else {
        alert("댓글 수정이 실패하였습니다.");
      }
      return window.location.reload();
    });
  };

  const RepleDeleteHanler = (e) => {
    e.preventDefault();
    if (window.confirm("정말 삭제하시겠습니까?")) {
      let body = {
        uid: user.uid,
        reple: Reple,
        postId: props.reple.postId,
        repleId: props.reple._id,
      };
      axios.post("/api/reple/delete", body).then((response) => {
        if (response.data.success) {
          alert("댓글이 삭제되었습니다.");
        } else {
          alert("댓글 삭제에 실패하였습니다.");
        }
        return window.location.reload();
      });
    } else {
      alert("취소되었습니다.");
    }
  };
  useOnClickOutside(ref, () => setModalFlag(false));
  return (
    <RepleContentDiv>
      <div className="author">
        <div className="userInfo">
          <Avatar
            size="30"
            round={true}
            src={props.reple.author.photoURL}
            style={{ border: "1px solid #c6c6c6" }}
          />
          <p>{props.reple.author.displayName}</p>
        </div>

        {props.reple.author.uid === user.uid && (
          <div className="modalControl">
            <span
              onClick={() => {
                setModalFlag(true);
              }}
            >
              ···
            </span>
            {ModalFlag && (
              <div className="modalDiv" ref={ref}>
                <p
                  onClick={() => {
                    setEditFlag(true);
                    setModalFlag(false);
                  }}
                >
                  수정
                </p>
                <p
                  className="delete"
                  onClick={(e) => {
                    RepleDeleteHanler(e);
                  }}
                >
                  삭제
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ fontSize: "10px", marginBottom: "10px" }}>
        {SetTime(props.reple.createdAt, props.reple.updatedAt)}
      </div>

      {EditFlag ? (
        <RepleUploadDiv>
          <form>
            <input
              type="text"
              value={Reple}
              onChange={(e) => {
                setReple(e.currentTarget.value);
              }}
            />
            <button
              onClick={(e) => {
                SubmitHandler(e);
              }}
            >
              등록
            </button>
          </form>
          <div className="cancel">
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditFlag(false);
              }}
            >
              취소
            </button>
          </div>
        </RepleUploadDiv>
      ) : (
        <p>{props.reple.reple}</p>
      )}
    </RepleContentDiv>
  );

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
}

export default RepleContent;
