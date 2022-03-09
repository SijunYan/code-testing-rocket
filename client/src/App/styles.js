import styled from "styled-components";

const Application = styled.div`
  font-family: Roboto;
  font-weight: 300;
  font-size: 25px;
  font-style: italic;
  color: black;

  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  svg,
  span {
    padding-left: 10px;
  }
`;

const Container = styled.div`
  width: 50%;
  height: 50%;
  background-color: white;
  padding: 10px;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    flex-direction: row;
  }
`;

export { Application, Container };
