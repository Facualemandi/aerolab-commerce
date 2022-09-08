import React, { useState } from "react";
import styled from "styled-components";
import { helpHttp } from "../../Helper/helpHttp";
import Logo from "../../images/logo.svg";
import Coin from "../../images/coin.svg";
import Aerolab from "../../images/aerolab-image.png";
import { useTheContext } from "../../context/context";
import Loader from "../Loader/Loader";
import { RiShoppingCartFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;
const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 5000;
  background-color: white;

  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 780px) {
    position: fixed;
    z-index: 2700;
    background-color: white;
    padding: 10px;
    box-shadow: 0 0 10px 0 rgba(45, 45, 45, 0.37);
    bottom: 0px;
  }
`;
const SectionUser = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgLogo = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 10px;
`;
const Name = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 500;
  margin-right: 15px;
`;
const Points = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 200;
`;
const CoinImg = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  @media (min-width: 780px){
    cursor: pointer;
  }
`;
const DivPoints = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`;
const ImgAeroLab = styled.img`
  width: 100%;
  margin: auto;
  
`;
const SectionElectronic = styled.section`
  position: relative;
`;
const Electronics = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 5vw;
  font-weight: bold;
  color: white;
`;
const Div = styled.div`
  position: absolute;
  bottom: 4vw;
  left: 15vw;
`;
const IconCart = styled(RiShoppingCartFill)`
  width: 35px;
  height: 35px;
  margin-right: 15px;
  color: rgba(48, 216, 250, 0.85);
  margin-right: 25px;
  @media (min-width: 780px){
    cursor: pointer;
  }
`;
const SectionNumberCart = styled.section`
  position: relative;

  p {
    position: absolute;
    right: 0px;
    bottom: 0px;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    margin-right: 15px;
  }
`;
const SectionProductsCart = styled.section`
  @media (max-width: 780px) {
    width: 100vw;
    height: auto;
    position: fixed;
    bottom: 80px;
    background-color: white;
    z-index: 2000;
    transform: ${({ value }) =>
      !value ? "translateY(100%)" : "translateY(0%)"};
    transition: 0.5s;
    box-shadow: 0 0 10px 0 rgba(76, 76, 76, 0.32);
  }
  @media (min-width: 780px) {
    position: fixed;
    top: 0px;
    background-color: white;
    width: 100%;
    transform: ${({ value }) =>
      !value ? "translateY(-110%)" : "translateY(60px)"};
    transition: 0.5s;
    box-shadow: 0 10px 10px 0 rgba(39, 39, 39, 0.181);
    z-index: 4000;
  }
`;
const ImgCart = styled.img`
  width: 100px;
  height: 100px;
  @media (min-width: 780px) {
    width: 130px;
    height: 130px;
  }
`;
const SectionCart = styled.section`
    div {
      margin-top: 10px;
      p {
        :nth-child(1) {
          font-family: "Roboto", sans-serif;
          font-size: 20px;
          font-weight: 500;
          span {
            font-weight: lighter;
          }
        }
        :nth-child(2) {
          font-family: "Roboto", sans-serif;
          color: grey;
          font-size: 16px;
          font-weight: 500;
          margin-top: 5px;
          span {
            font-weight: lighter;
          }
        }
      }
    }
  @media (max-width: 780px) {
    display: flex;
    margin: 15px;
    padding: 5px;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 10px 0 rgba(76, 76, 76, 0.32);
    border-radius: 20px;
    width: 94%;
  }

  @media (min-width: 780px) {
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 5px auto;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(52, 52, 52, 0.205);
    margin-bottom: 10px;
    cursor: pointer;
    &:hover{
      background-color: rgba(2, 255, 255, 0.131);
    }
  }
`;
const IconDelete = styled(RiDeleteBin6Line)`
  color: rgba(48, 216, 250, 0.85);
  width: 35px;
  height: 35px;
`;

const User = () => {
  const { data, refetch, isFetching } = useTheContext();
  const [openCart, setOpenCart] = useState(false);

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
    body: {
      amount: 1000,
    },
  };

  const showCart = () => {
    !openCart ? setOpenCart(true) : setOpenCart(false);
  };

  const deleteProduct = async (product) => {
    const API_ITEMS = "https://coding-challenge-api.aerolab.co/redeem";
    const deleteProduct = data.redeemHistory.findIndex(
      (el) => el.productId === product.productId
    );
    data.redeemHistory.splice(deleteProduct, 1);
    refetch();
  };

  const getPoints = async () => {
    const API_POINTS = "https://coding-challenge-api.aerolab.co/user/points";
    const theResponse = await Promise.all([
      helpHttp().post(API_POINTS, options),
    ]);
    refetch();
    return theResponse;
  };

  return (
    <>
      <Main>
        <Container>
          <ImgLogo alt="" src={Logo} />

          <section>
            <SectionUser>
              <Name>{data.name}</Name>
              <DivPoints>
                {isFetching ? (
                  <Loader />
                ) : (
                  <>
                    <Points>{data.points}</Points>
                    <CoinImg alt="" src={Coin} onClick={getPoints} />
                  </>
                )}
              </DivPoints>
            </SectionUser>

            <SectionNumberCart>
              <IconCart onClick={showCart} />
              <p>{data.redeemHistory.length}</p>
            </SectionNumberCart>
          </section>
        </Container>

        <SectionElectronic>
          <ImgAeroLab alt="" src={Aerolab} />
          <Div>
            <Electronics>Electronics</Electronics>
          </Div>
        </SectionElectronic>

        <SectionProductsCart value={openCart}>
          {data.redeemHistory.map((product) => (
            <SectionCart key={product.productId}>
              <ImgCart alt="" src={product.img.hdUrl} />
              <div>
                <p>
                  Nombre: <span>{product.name}</span>
                </p>
                <p>
                  Categoría: <span>{product.category}</span>
                </p>
              </div>
              <IconDelete onClick={() => deleteProduct(product)} />
            </SectionCart>
          ))}
        </SectionProductsCart>
      </Main>
    </>
  );
};

export default User;
