import { useState } from 'react';
import styled from 'styled-components';


const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

const ModalView = styled.div`
    border-radius: 10px;
    background-color: #ffffff;
    width: 700px;
    height: 700px;
`;

const Container1 = styled.div`
    width: 600px;
    height: 175px;
    border: 1px solid black;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    display: flex;
`;

const MenuImgContainer = styled.div`
  width: 200px;
  height: 175px;
  border: 1px solid black;
`;

const Container2 = styled.div`
    width: 400px;
    height: 175px;
    border: 1px solid black;
`;

const MenuName = styled.div`
    width: 300px;
    height: 35px;
    margin-left: 20px;
    border: 1px solid black;  
    text-align: left;
    font-size: 35px;
    font-style: bold;
`;

const Container3 = styled.div`
    width: 400px;
    height: 35px;
    margin-top: 100px;
    border: 1px solid black;
    display: flex;
`;

const MenuPrice = styled.div`
    width: 150px;
    height: 35px;
    border: 1px solid black;
    font-size: 35px;
    font-style: bold;
`;

const Counter = styled.input.attrs({
    type: 'number',
})`
    width: 150px;
    height: 32px;
    text-align: center;
    margin-left: 100px;
    font-weight: bold;
    font-size: 35px;
    border: 1px solid black;
`;

const TextContainer = styled.div`
    width: 600px;
    height: 25px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    font-style: bold;
    text-align: left;
    border: 1px solid black;
`;

const SizeOptionContainer = styled.div`
    width: 600px;
    height: 120px;
    margin-left:auto;
    margin-right:auto;
    margin-top: 10px;
    border: 1px solid black;
    display: flex;
`;

const SizeOption = styled.label`
    width: 120px;
    height: 120px;
    border: 1px solid black;
    margin-right: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const RadioButton = styled.input.attrs({
    type: 'radio'
})`
    display: none;
    &:checked + ${SizeOption}{
        width: 120px;
        height: 120px;
        border: 1px solid black;
        background-color: #036635;
        color: white;
        margin-right: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

const ButtonContainer = styled.div`
    width: 600px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
    margin-top: 130px;
`;

const Button1 = styled.button`
    width: 150px;
    height: 60px;
    margin-right: 30px;
    border: 1px solid black;
    font-size: 32px;
    font-style: bold;
    color: white;
    background-color: #036635;
    cursor: pointer;
`;

const Button2 = styled.button`
    width: 150px;
    height: 60px;
    margin-left: 30px;
    border: 1px solid black;
    font-size: 32px;
    font-style: bold;
    background-color: white;
    cursor: pointer;
`;


const OptionModal = ({setOpenModal, select, totalPrice, setTotalPrice}: any) => {
  
  const [size, setSize] = useState('R');
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(select.price)
  const [goToCart, setGoToCart] = useState({
      name: select.name + `(${size})`,
      price: select.price,
      quantity: quantity
  })
    
  const openModalHandler = () => {
      setOpenModal(false);
  };

  const quantityHandler = (e:any) => {
    setQuantity(e.target.value)
  }

  const sizeHandler = (e:any) => {
      setSize(e.target.value);
      if(e.target.value === 'L'){
        setPrice(price+1000)
      }else{
        setPrice(select.price)
      }
  }

  const goToCartHandler = (e:any) => {
    setGoToCart({
        name: select.name + `(${size})`,
        price: price,
        quantity: quantity
    })
    setTotalPrice(totalPrice + (price * quantity))
    setOpenModal(false);
  }
  console.log(size, price, quantity)
//   console.log(goToCart)
  return (
    <>
      <ModalContainer>
        {<ModalBackdrop>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <Container1>
                <MenuImgContainer></MenuImgContainer>
                <Container2>
                    <MenuName>{select.name}</MenuName>
                    <Container3>
                        <MenuPrice>₩{price}</MenuPrice>
                        <Counter 
                            min={1} 
                            defaultValue={quantity}
                            onChange={quantityHandler}
                        ></Counter>
                    </Container3>
                </Container2>
            </Container1>
            <TextContainer>사이즈를 선택하세요</TextContainer>
            <SizeOptionContainer>
                <RadioButton
                    id="Regular"
                    className="radioBtn"
                    name="radio"
                    value="R"
                    checked={size === "R"}
                    onChange={sizeHandler}
                >
                </RadioButton>
                <SizeOption htmlFor="Regular">Regular</SizeOption>
                <RadioButton
                    id="Large"
                    className="radioBtn"
                    name="radio"
                    value="L"
                    onChange={sizeHandler}
                >
                </RadioButton>
                <SizeOption htmlFor='Large'>Large<br/>(+1000)</SizeOption>
            </SizeOptionContainer>
            <ButtonContainer>
                <Button1 onClick={goToCartHandler}>담기</Button1>
                <Button2 onClick={openModalHandler}>뒤로</Button2>
            </ButtonContainer>
          </ModalView>
        </ModalBackdrop>}
      </ModalContainer>
    </>
  );
};

export default OptionModal;