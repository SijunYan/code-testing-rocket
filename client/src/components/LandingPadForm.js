import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { actions } from "../redux";

const Container = styled.div`
  flex: 2;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  line-height: 40px;
  @media screen and (max-width: 768px) {
    flex: none;
  }
`;

const ButtonWrap = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  @media screen and (max-width: 768px) {
    flex: none;
    margin-left: 0%;
  }
`;

const Button = styled.button`
  font-size: 12px;
  width: 100%;
  padding: 20px;
  cursor: pointer;
`;

const LandingPadForm = () => {
  const [landingPadId, setLandingPadId] = useState();
  const [inputValidate, setInputValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getLandingPad = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/landingpad/${id}`);
      if (!response.ok) throw new Error("Fetching data fails");
      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      dispatch(actions.storeLandingPad(data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    // validate
    if (!landingPadId) {
      alert("Please input a landing pad id!");
      return;
    }
    const validate = landingPadId.split("").includes("#", "$", "%", "&");
    setInputValidate(validate);
    !validate && getLandingPad(landingPadId.toUpperCase());
  };

  return (
    <Container>
      <Input onChange={(event) => setLandingPadId(event.target.value)} />
      <ButtonWrap>
        <Button onClick={handleSubmit} disabled={inputValidate}>
          {isLoading ? "Loading..." : "Landing Pad"}
        </Button>
      </ButtonWrap>
    </Container>
  );
};

export default LandingPadForm;
