import styled from "styled-components"

const Container = styled.div`
    display: flex;
    width: var(--card-width);
    margin: auto;
`

const Button = styled.button`
    background-color: var(--solid-button-primary-color);
    border-radius: 3px;
    color: white;
    margin: 0.5em 0;
    padding: 0.25em 1em;
    width: calc(var(--card-width) / 3);
    font-size: var(--big-button-font-size);
    &:hover {
        border: 2px solid var(--elements-border-color);
        color: var(--elements-border-color);
        background: transparent;
    }

    &:active {
        border: 2px solid var(--button-click-color);
        color: var(--button-click-color);
        background: transparent;
    }
`

export const CreateTableButton = (props) => {

    return <Container><Button>Создать таблицу</Button></Container>
}