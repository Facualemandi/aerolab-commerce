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
  width: 100vw;
  margin-top: 5px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 480px) and (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 780px;
  }
  @media screen and (min-width: 780px) and (max-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1080px;
  }
  @media screen and (min-width: 1080px) and (max-width: 1380px) {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1380px;
  }
  @media screen and (min-width: 1380px) {
    grid-template-columns: repeat(5, 1fr);
    max-width: 1500px;
    margin: auto;
  }
`;
const SectionProduct = styled.section`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.13);
  position: relative;
  filter: ${({ value }) => (!value ? "blur(0px)" : "blur(6px)")};
  margin: 10px;
  border-radius: 15px;
  &:hover ${DivClick} {
    display: block;
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
const WatchProdcut = styled.section`
  position: fixed;
  width: 100vw;
  height: auto;
  min-height: 100vh;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 90vw;
    border-radius: 15px;
    background-color: white;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.561);
  }
`;

const CenterProduct = styled.div`
  margin-bottom: 150px;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    :nth-child(1) {
      font-size: 20px;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      padding: 10px;
    }
    :nth-child(2) {
      font-size: 16px;
      font-family: "Roboto", sans-serif;
      font-weight: lighter;
    }
    :nth-child(3) {
      font-size: 20px;
      font-family: "Roboto", sans-serif;
      font-weight: lighter;
      margin-top: 5px;
    }
  }
  section {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    button {
      width: 45%;
      padding: 15px;
      margin: 5px;
      border-radius: 10px;
      border: none;
      background: #0ed2f7;
      background: -webkit-linear-gradient(to left, #0ed2f7, #b2fefa);
      background: linear-gradient(to left, #0ed2f7, #b2fefa);
      font-size: 20px;
      font-family: "Roboto", sans-serif;
    }
  }
`;
const ImgModal = styled.img`
  width: 250px;
  height: 150px;
  display: flex;
  margin: auto;
`;

const SectionFilter = styled.section`
  @media (max-width: 780px) {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 780px) {
    display: flex;
    margin: auto;
    width: 780px;
  }
  @media (min-width: 1080px) {
    display: flex;
    margin: auto;
    width: 1080px;
  }
  @media (min-width: 1380px) {
    display: flex;
    margin: auto;
    width: 1500px;
  }
`;

const Input = styled.input`
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  width: 9%;
  border: none;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.271);
  display: flex;
  margin: auto;
  outline-color: aqua;

  @media screen and (max-width: 780px) {
    width: 95%;
    margin-top: 15px;
  }
  @media screen and (min-width: 780px) and (max-width: 1080px) {
    width: 50%;
    margin: 10px;
  }
  @media screen and (min-width: 1080px) and (max-width: 1380px) {
    width: 50%;
    margin: 10px;
  }
  @media screen and (min-width: 1380px) {
    width: 50%;
    margin: 10px;
  }
`;

const Select = styled.select`
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  width: 9%;
  border: none;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.271);
  display: flex;
  margin: auto;

  @media screen and (max-width: 780px) {
    width: 95%;
    margin-top: 15px;
  }
  @media screen and (min-width: 780px) and (max-width: 1080px) {
    width: 50%;
    margin: 10px;
  }
  @media screen and (min-width: 1080px) and (max-width: 1380px) {
    width: 50%;
    margin: 10px;
  }
  @media screen and (min-width: 1380px) {
    width: 50%;
    margin: 10px;
  }
  @media (min-width: 780px){
    cursor: pointer;
  }
`;

const Products = () => {
  const { user, refetch } = useTheContext();
  const API_URL = "https://coding-challenge-api.aerolab.co/products";
  const [openDiv, setOpenDiv] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [theProduct, setTheProduct] = useState({});
  const [searchProduct, setSearchProduct] = useState("");

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
  const buyProduct = (obj) => {
    setOpenProduct(true);
    setTheProduct(obj);
  };

  const closedModal = (el) => {
    setOpenProduct(false);
  };

  const buyItem = async (el) => {
    const findItemUser = user.redeemHistory.find(
      (item) => item.productId === el._id
    );

    if (user.redeemHistory.includes(findItemUser)) {
      return console.log("existe");
    } else {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        },
        body: {
          productId: el._id,
        },
      };
      const API_ITEMS = "https://coding-challenge-api.aerolab.co/redeem";
      const respones = await Promise.all([helpHttp().post(API_ITEMS, options)]);
      refetch();
      closedModal();
    }
  };

  let filterObj;
  if (searchProduct.length < 1) {
    filterObj = data;
  } else {
    filterObj = data.filter(
      (obj) =>
        obj.name.toLowerCase().includes(searchProduct.toLocaleLowerCase()) ||
        obj.category.toLowerCase().includes(searchProduct.toLocaleLowerCase())
    );
  }

  const onChangeValue = (e) => {
    setSearchProduct(e.target.value);
  };
  const onChangeOption = (e) => {
    setSearchProduct(e.target.value);
  };

  return (
    <>
      <main>
        <SectionFilter>
          <Input
            type={"text"}
            placeholder="Que estas buscando..."
            onChange={onChangeValue}
          />
          <Select onChange={onChangeOption} defaultValue="Ver Todo">
            <option value={""}>Ver Todo</option>
            <option value={"Laptops"}>Laptops</option>
            <option value={"Cameras"}>Cameras</option>
            <option value={"Phones"}>Phones</option>
            <option value={"Smart Home"}>Smart Home</option>
            <option value={"Pc Accessories"}>Pc Accessories</option>
            <option value={"Gaming"}>Gaming</option>
            <option value={"Audio"}>Audio</option>
            <option value={"Tablets & E-Readers"}>Tablets & E-Readers</option>
            <option value={"Drones"}>Drones</option>
          </Select>
        </SectionFilter>

        <Container>
          {filterObj.map((el) => (
            <SectionProduct key={el._id} value={openProduct}>
              <Img alt="" src={el.img.hdUrl} />
              <Category>{el.category}</Category>
              <Name>{el.name}</Name>
              <ImgBuy alt="" src={Buy} />

              <DivClick value={openDiv}>
                {el.cost < user.points ? (
                  <DivBuy>
                    <Price>${el.cost}</Price>
                    <PBuy onClick={() => buyProduct(el)}>
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

        {openProduct ? (
          <WatchProdcut>
            <CenterProduct>
              <p>{`Estas por comprar el producto ${theProduct.name}`}</p>
              <p>
                Actualmente tienes {user.points} puntos, te quedarían{" "}
                {user.points - theProduct.cost} puntos.
              </p>
              <p>Estas seguro/a ?</p>
              <ImgModal alt="" src={theProduct.img.hdUrl} />

              <section>
                <button onClick={() => closedModal(theProduct)}>
                  Cancelar
                </button>
                <button onClick={() => buyItem(theProduct)}>Aceptar</button>
              </section>
            </CenterProduct>
          </WatchProdcut>
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Products;
