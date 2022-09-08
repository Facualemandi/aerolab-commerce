import React from "react";
import styled from "styled-components";
import "./Loader.css";

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const LoaderProducts = () => {
  return (
    <Main>
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Main>
  );
};

export default LoaderProducts;
