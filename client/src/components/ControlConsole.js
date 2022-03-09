import React, { useState } from "react";
import styled from "styled-components";
import LandingPadForm from "./LandingPadForm";
import { ReactComponent as Rocket } from "../assets/rocket.svg";
import { useDispatch } from "react-redux";
import { actions } from "../redux";

const Container = styled.div`
  flex: 1;

  border: solid lightgray 1px;
  margin-top: 10px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 0;
    margin-left: 10px;
  }
`;

const Left = styled.div`
  flex: 1;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  font-size: 12px;
  width: 100%;
  padding: 20px;
  cursor: pointer;
`;

const Middle = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: solid lightgrey 1px;
  border-right: solid lightgrey 1px;
  @media screen and (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-top: solid lightgrey 1px;
    border-bottom: solid lightgrey 1px;
  }
`;

const ControlConsole = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const getCapsules = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/capsules");
      if (!response.ok) throw new Error("Fetching data fails");
      const data = await response.json();
      setIsLoading(false);
      dispatch(actions.storeCapsules(data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Left>
        <Button onClick={getCapsules}>
          {isLoading ? "Loading..." : "Capsules"}
        </Button>
      </Left>
      <Middle>
        <Rocket />
      </Middle>
      <LandingPadForm />
    </Container>
  );
};

export default ControlConsole;
