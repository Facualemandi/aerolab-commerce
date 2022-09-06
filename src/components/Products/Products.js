import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { helpHttp } from "../../Helper/helpHttp";

const Img = styled.img`
  @media (max-width: 480px) {
    width: 100%;
  }
  @media (min-width: 480px) {
    width: 200px;
    height: 170px;
    display: flex;
    margin: auto;
  }
`;
const DivClick = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(48, 216, 250, 0.85);
  margin: 0;
  padding: 0;
  display: ${({ value }) => (!value ? "none" : "block")};
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100vw;
  margin-top: 15px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 880px) {
    grid-template-columns: repeat(3, 1fr);
    width: 880px;
    margin: auto;
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
    width: 1100px;
  }
  @media (min-width: 1350px) {
    grid-template-columns: repeat(5, 1fr);
    width: 1350px;
  }
  @media (min-width: 1550px) {
    grid-template-columns: repeat(6, 1fr);
    width: 1550px;
  }
`;

const SectionProduct = styled.section`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.13);
  position: relative;

  @media (max-width: 480px) {
    margin: 20px;
    padding: 20px;
    border-radius: 15px;
  }

  @media (min-width: 480px) {
    width: 90%;
    border-radius: 10px;
    margin: auto;
    margin: 10px;
  }

  @media (min-width: 780px) {
    cursor: pointer;
    &:hover ${DivClick} {
      display: block;
    }
  }
`;

const Name = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 20px;
  margin-top: 3px;
  padding: 5px;
`;
const Category = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 18px;
  margin-top: 3px;
  padding: 5px;
`;
const Cost = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: lighter;
  font-size: 14px;
  margin-top: 3px;
  color: green;
  padding: 5px;
`;

const Products = () => {
  const API_URL = "https://coding-challenge-api.aerolab.co/products";
  const [openDiv, setOpenDiv] = useState(false);


  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
  };

  const getProducts = async () => {
    const response = await Promise.all([helpHttp().get(API_URL, options)]);
    return response[0];
  };

  const { data, status } = useQuery(["products"], getProducts);

  if (status === "loading") {
    return <p>cargando</p>;
  } else {
    console.log(data);
  }

  const openMenu = (el) => {
    const findIndex = data.findIndex((obj) => obj._id === el._id);
    let newData = [...data];
    newData[findIndex].newOpt = true;
    setOpenDiv(true)
  };

  return (
    <>
      <main>
        <Container>
          {data.map((el) => (
            <SectionProduct key={el._id} onClick={() => openMenu(el)}>
              <Img alt="" src={el.img.hdUrl} />
              <Name>{el.name}</Name>
              <Category>{el.category}</Category>
              <Cost>$ {el.cost}</Cost>
              {el.newOpt === true && <DivClick value={openDiv}></DivClick>}
            </SectionProduct>
          ))}
        </Container>
      </main>
    </>
  );
};

export default Products;
