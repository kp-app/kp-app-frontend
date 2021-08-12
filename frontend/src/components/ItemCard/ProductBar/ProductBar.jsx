import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { clearItem, clearSearchBar, submitItem, typeToSearchBar } from "../../../app/itemCardSlice";
import { Predictions } from "./Predictions";

const Textarea = styled.input.attrs(props => ({
    type: "text",
    size: props.size || "1em",
  }))`
    border: 2px solid var(--elements-border-color);
    margin: ${props => props.size} 0;
    margin-bottom: 0;
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
    // freezes when we have an item in place w/o hack below
    let currentItem = useSelector(state => state.itemCard.currentItem)
    let currentItemText = currentItem ? currentItem.fullName : undefined
    
    // such a hack, honestly
    const changeInput = (e) => {
      dispatch(typeToSearchBar(e.target.value))
      dispatch(clearItem())
    }

    const handleSubmit =(e) => {
      e.preventDefault()
      dispatch(submitItem())
      dispatch(clearSearchBar())
    }
    
    return (
      <form onSubmit={handleSubmit}>
        <Textarea size="1.25em" placeholder="Начните искать товар..." onChange={changeInput} value={currentItemText || searchbarText}></Textarea>
        <Predictions predictions={useSelector(state => state.itemCard.searchPredictions)} />
        <EnterSubmission />
      </form>
    )
}
