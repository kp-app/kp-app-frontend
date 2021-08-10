import styled from "styled-components"

const Textarea = styled.input.attrs(props => ({
    type: "text",
    size: props.size || "1em",
  }))`
    border: 2px solid palevioletred;
    margin: ${props => props.size} 0;
    padding: ${props => props.size};
    width: var(--search-bar-width);
  `;

export const ProductBar = (props) => {
    return <Textarea size="1.25em" placeholder="Начните искать товар..."></Textarea>
}
