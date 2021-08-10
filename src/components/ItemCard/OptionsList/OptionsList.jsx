import styled from "styled-components"

const OptionsRow = styled.div`
    display: flex;
    direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 20px;
`

const OptionControls = styled.div`
display: flex;
direction: row;
align-items: center;
justify-content: flex-start;
`
const options = [
    (<OptionsRow>
        Опция 1
        <OptionControls/>
    </OptionsRow>)
]

export const OptionsList = (props) => {
    return (
        <div className="">
            Опции
            {options}
        </div>
    )
}