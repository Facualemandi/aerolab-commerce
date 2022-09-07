import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheContext } from "../../context/context";
import { helpHttp } from "../../Helper/helpHttp";
import Buy from "../../images/buy-white.svg";
import Coin from "../../images/coin.svg";

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
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(48, 216, 250, 0.85);
  display: ${({ value }) => (value === false ? "none" : "block")};

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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

  @media (max-width: 780px) {
  }

  @media (min-width: 480px) {
    width: 90%;
    border-radius: 10px;
    margin: auto;
    margin: 10px;
  }
  &:hover ${DivClick} {
    display: block;
  }

  @media (min-width: 780px) {
    cursor: pointer;
  }
`;
const Name = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  padding-left: 5px;
  padding-bottom: 5px;
`;
const Category = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: lighter;
  font-size: 16px;
  color: grey;
  padding-left: 5px;
  padding: 5px;
`;

const ImgBuy = styled.img`
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 55px;
  height: 55px;
  z-index: 1500;
`;

const DivBuy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: 100%;
  margin: auto;
`;
const Price = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 25px;
  margin-bottom: 5px;
`;

const ImgCoin = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 5px;
`;

const PBuy = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: lighter;
`;
const PNoBuy = styled.p`
  padding: 15px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: lighter;
`;

const Products = () => {
  const { user } = useTheContext();
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
  } 


  return (
    <>
      <main>
        <Container>
          {data.map((el) => (
            <SectionProduct key={el._id}>
              <Img alt="" src={el.img.hdUrl} />
              <Category>{el.category}</Category>
              <Name>{el.name}</Name>
              <ImgBuy alt="" src={Buy} />

              <DivClick value={openDiv}>
                {el.cost < user.points ? (
                  <DivBuy>
                    <Price>${el.cost}</Price>
                    <PBuy>
                      Comprar producto
                      <ImgCoin alt="" src={Coin} />
                    </PBuy>
                  </DivBuy>
                ) : (
                  <DivBuy>
                    <PNoBuy>
                      {`Le faltan ${el.cost - user.points}  creditos`}
                    </PNoBuy>
                  </DivBuy>
                )}
              </DivClick>
            </SectionProduct>
          ))}
        </Container>
      </main>
    </>
  );
};

export default Products;
