import React from "react";
import styled from "styled-components";
import { helpHttp } from "../../Helper/helpHttp";
import Logo from "../../images/logo.svg";
import Coin from "../../images/coin.svg";
import Aerolab from "../../images/aerolab-image.png";
import { useTheContext } from "../../context/context";
import Loader from "../Loader/Loader";
import { RiShoppingCartFill } from "react-icons/ri";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Container = styled.section`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  margin-top: 10px;
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
`;

const User = () => {
  const { data, refetch, isFetching } = useTheContext();

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
    body: {
      amount: 1000,
    },
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
          <IconCart />
        </Container>

        <SectionElectronic>
          <ImgAeroLab alt="" src={Aerolab} />
          <Div>
            <Electronics>Electronics</Electronics>
          </Div>
        </SectionElectronic>
      </Main>
    </>
  );
};

export default User;
