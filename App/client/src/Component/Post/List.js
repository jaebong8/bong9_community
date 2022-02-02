import React from "react";
import { ListDiv, ListItem } from "../../Style/ListCSS";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import moment from "moment";
import "moment/locale/ko";
function List(props) {
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh시 mm분") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh시 mm분");
    }
  };
  return (
    <div>
      {props.PostList.map((post, i) => {
        return (
          <ListDiv key={i}>
            <ListItem key={i}>
              <Link to={`/post/${post.postNum}`}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 className="title">{post.title}</h2>
                  <p
                    className="author"
                    style={{
                      color: "gray",
                      marginBottom: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      size="40"
                      round={true}
                      src={post.author.photoURL}
                      style={{ border: "1px solid #c6c6c6" }}
                    />
                    {post.author.displayName}
                  </p>
                </div>

                <p>{post.content}</p>
                <p>{SetTime(post.createdAt, post.updatedAt)}</p>
              </Link>
            </ListItem>
          </ListDiv>
        );
      })}
    </div>
  );
}

export default List;
