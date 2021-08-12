import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { typeToSearchBar } from "../../../app/itemCardSlice";

const Textarea = styled.input.attrs(props => ({
    type: "text",
    size: props.size || "1em",
  }))`
    border: 2px solid var(--elements-border-color);
    margin: ${props => props.size} 0;
    padding: ${props => props.size};
    width: var(--search-bar-width);
    font-size: var(--big-button-font-size)
  `;
const EnterSubmission = styled.input.attrs(props => ({
  type: "submit"
}))`
  border:0;
  padding:0px;
  font-size:0.0em;
`

export const ProductBar = (props) => {
    const dispatch = useDispatch()
    let searchbarText = useSelector(state => state.itemCard.currentTextInSearch)
    
    const changeInput = (e) => {
      dispatch(typeToSearchBar(e.target.value))
    }

    const handleSubmit =(e) => {
      e.preventDefault()
    }
    
    return (
      <form onSubmit={handleSubmit}>
        <Textarea size="1.25em" placeholder="Начните искать товар..." onChange={changeInput} value={searchbarText}></Textarea>
        <EnterSubmission />
      </form>
    )
}
