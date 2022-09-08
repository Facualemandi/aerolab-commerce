import React from "react";
import styled from "styled-components";
import NoSearchFound from "../../images/notSearchFound.png";

const Img = styled.img`
  width: 100%;
  height: 350px;
  margin: auto;

  @media (min-width: 780px) {
    width: 30vw;
    height: 450px;
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;

  p {
    font-family: "Roboto", sans-serif;
    font-weight: lighter;
    font-size: 36px;
    margin-bottom: 100px;
  }
`;

const DivContainer = styled.div``;

const NoSearchProduct = () => {
  return (
    <>
      <Div>
        <Img alt="" src={NoSearchFound} />
        <p>Ups, no encontramos lo que buscas.</p>
      </Div>
    </>
  );
};

export default NoSearchProduct;
