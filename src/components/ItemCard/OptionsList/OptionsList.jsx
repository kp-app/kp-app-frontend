import styled from "styled-components"

const OptionsRow = styled.div`
    display: flex;
    direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: var(--options-row-padding-size)
`

const OptionControls = styled.div`
display: flex;
direction: row;
align-items: center;
justify-content: flex-start;
padding-right: calc(2*var(--options-row-padding-size))
`

const DeleteButton = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid var(--elements-border-color);
    color: var(--elements-border-color);
    margin: 0.5em 0;
    margin-left: 1em;
    padding: 0.25em 1em;
    font-size: var(--small-button-font-size);
    &:hover {
        border: 2px solid var(--danger-color);
        color: var(--danger-color);
        background: transparent;
    }

    &:active {
        border: 2px solid var(--button-click-color);
        color: var(--button-click-color);
        background: transparent;
    }
`

const P = styled.p`
    margin-right: calc(9*var(--options-row-padding-size));
`

const optionsTitles = (<OptionsRow>
    Имя опции
    <OptionControls>
        <P>Надбавка к цене</P>   
    </OptionControls>
</OptionsRow>)



export const OptionsList = (props) => {

    const options = [
        (<OptionsRow>
            Опция 1
            <OptionControls>
                2300
                <DeleteButton>Удалить опцию</DeleteButton>      
            </OptionControls>
        </OptionsRow>)
    ]

    return (
        <div className="">
            Опции
            {/* {optionsTitles} */}
            {options}
        </div>
    )
}