import styled from "@emotion/styled";

const ListDiv = styled.div`
  padding-top: 1rem;
  padding-bottm: 1rem;
  max-width: 756px;
  margin: 0 auto !important;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const ListItem = styled.div`
  width: 100%;
  height: auto;
  min-height: 120px;
  background: $ffffff;
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 20px;
  box-shadow: 0px 19px 38px rgba(193, 191, 193, 0.9),
    0px 15px 12px rgba(0, 0, 0, 0.5);
  .title {
    font-weight: bold;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

export { ListDiv, ListItem };
