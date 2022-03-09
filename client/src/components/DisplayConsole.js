import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  flex: 2;

  border: solid lightgray 1px;

  overflow-y: auto;
`;

const Li = styled.li`
  padding: 5px;
`;

const DisplayConsole = () => {
  const capsules = useSelector((state) => state.capsules);
  console.log(capsules[0]);

  return (
    <Container>
      {!capsules ? (
        <div>No capsules</div>
      ) : (
        <div>
          {capsules[0]?.map((item, index) => (
            <Li key={index}>
              Id: {item.capsule_id}, Serial: {item.capsule_serial}, Status:
              {item.status}, Original launch: {item.original_launch}, Landings:
              {item.landings}
            </Li>
          ))}
        </div>
      )}
    </Container>
  );
};

export default DisplayConsole;
