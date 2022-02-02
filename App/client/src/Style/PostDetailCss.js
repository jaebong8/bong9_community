import styled from "@emotion/styled";

const PostDetailDiv = styled.div`
  max-width: 756px;
  height: auto;
  margin: 5vh auto !important;
  @media (max-width: 756px) {
    width: 90%;
  }
  background: $ffffff;
  padding: 20px;
  box-shadow: 0px 19px 38px rgba(193, 191, 193, 0.9),
    0px 15px 12px rgba(0, 0, 0, 0.5);
`;

const BtnDiv = styled.div`
  max-width: 756px;
  height: auto;
  margin: 5vh auto !important;

  display: flex;
  justify-content: flex-end;
  .edit {
    margin-right: 10px;
    width: 100px;
    height: 45px;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: #a8d7fd;
      box-shadow: 0px 15px 20px rgba(168, 215, 253, 0.4);
      color: #fff;
      transform: translateY(-7px);
    }
  }
  .delete {
    width: 100px;
    height: 45px;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: #fc8787;
      box-shadow: 0px 15px 20px rgba(252, 135, 135, 0.4);
      color: #fff;
      transform: translateY(-7px);
    }
  }
`;

const SpinnerDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { PostDetailDiv, BtnDiv, SpinnerDiv };
