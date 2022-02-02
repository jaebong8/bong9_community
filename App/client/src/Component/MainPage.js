import React, { useEffect, useState } from "react";
import List from "./Post/List";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { SortDiv } from "../Style/SortCSS";
import { FaSearch } from "react-icons/fa";
import { MainPageBtnDiv } from "../Style/MainPageCSS";

function MainPage() {
  const [PostList, setPostList] = useState([]);
  const [Sort, setSort] = useState("최신순");
  const [SearchTerm, setSearchTerm] = useState("");
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);
  const getLoadMore = () => {
    let body = {
      sort: Sort,
      SearchTerm: SearchTerm,
      skip: Skip,
    };
    axios
      .post("/api/post/list", body)
      .then((response) => {
        if (response.data.success) {
          setPostList([...PostList, ...response.data.postList]);
          setSkip(Skip + response.data.postList.length);
          if (response.data.postList.length < 5) {
            setLoadMore(false);
          }
          if (response.data.postList.length == 0) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPostList = () => {
    setSkip(0);
    let body = {
      sort: Sort,
      SearchTerm: SearchTerm,
      skip: 0,
    };
    axios
      .post("/api/post/list", body)
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
          setSkip(response.data.postList.length);
          if (response.data.postList.length < 5) {
            setLoadMore(false);
          }
          if (response.data.postList.length == 0) {
            setLoadMore(false);
          }
          if (response.data.postList.length == 5) {
            setLoadMore(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostList();
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
  };
  return (
    <div>
      <SortDiv>
        <div>
          <input
            type="text"
            value={SearchTerm}
            onChange={(e) => {
              setSearchTerm(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                SearchHandler();
              }
            }}
          />
          <button
            onClick={() => {
              SearchHandler();
            }}
          >
            <FaSearch />
          </button>
        </div>

        <DropdownButton variant="outline-secondary" title={Sort}>
          <Dropdown.Item
            onClick={() => {
              setSort("최신순");
            }}
          >
            최신순
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setSort("인기순");
            }}
          >
            인기순(리플 갯수)
          </Dropdown.Item>
        </DropdownButton>
      </SortDiv>

      <List PostList={PostList} />
      {LoadMore && (
        <MainPageBtnDiv>
          <button
            onClick={() => {
              getLoadMore();
            }}
          >
            Load More
          </button>
        </MainPageBtnDiv>
      )}
    </div>
  );
}

export default MainPage;
