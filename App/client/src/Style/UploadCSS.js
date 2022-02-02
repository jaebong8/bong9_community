import styled from "@emotion/styled";

const UploadDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;

  #title {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    margin-bottom: 10px;
    &:active,
    &:focus {
      outline: none;
    }
  }
  textarea {
    min-height: 350px;
    resize: none;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #c6c6c6;
      border-radius: 15px;
      background-clip: padding-box;
      border: 2px solid transparent;
      &:hover {
        background-color: #928f92;
      }
    }
    &::-webkit-scrollbar-track {
      background-color: #fefefe;
      border-radius: 15px;
      box-shadow: inset 0px 0px 5px whitesmoke;
    }
  }
  label {
    font-weight: bold;
    margin-top: 10px;
  }
`;

const UploadButtonDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    width: 100px;
    height: 45px;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
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
    &.cancel {
      margin-right: 10px;
      background-color: #fc8787;
      box-shadow: 0px 15px 20px rgba(252, 135, 135, 0.4);
    }
  }
`;

export { UploadDiv, UploadForm, UploadButtonDiv };
