import styled from "styled-components"

const PricingBar = styled.div`
    width: var(--card-width);
    background-color: var(--secondary-color);
`

const OutLine = styled.hr`
    margin: 0;
`

const PriceRow = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

const PricesBlock = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
`

const Price = styled.div`
font-size: var(--big-button-font-size);
padding: 7px;
border: 1px solid black;
border-radius: 10px;
`

export const PriceBar = (props) => {

    return (
        <PricingBar>
                <OutLine/>
                <PriceRow>
                    <PricesBlock>
                        <Price>
                            Себестоимость: 73000
                        </Price>
                        <Price>
                            Цена интегратору: 77000
                        </Price>
                        <Price>
                            Цена заказчику: 87000
                        </Price>
                    </PricesBlock>
                </PriceRow>
        </PricingBar>
        )
}