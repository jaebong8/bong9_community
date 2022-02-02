import styled from "@emotion/styled";

const SortDiv = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
  input {
    font-family: "Roboto";
    width: 200px;
    height: 50px;
    background-color: rgba(54, 54, 54, 0.4);
    color: black;
    :hover,
    :focus {
      background-color: rgba(54, 54, 54, 0.1);
    }
    font-size: 18px;
  }
  button {
    background-color: white;
    border: none;
    font-size: 25px;
  }
`;

export { SortDiv };
