import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { clearSearchBar, typeToSearchBar } from "../../../app/itemCardSlice";
import { addItem } from "../../../app/productsSlice";
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
    let currentCategory = useSelector(state => state.itemCard.currentCategory)
    let currentSubcategory = useSelector(state => state.itemCard.currentSubcategory)
    
    // such a hack, honestly
    const changeInput = (e) => {
      dispatch(typeToSearchBar(e.target.value))
    }

    const handleSubmit =(e) => {
      e.preventDefault()
      if (currentItem) {
        currentItem = {...currentItem, category: currentCategory.name, subcategory: currentSubcategory.name}
        dispatch(addItem(currentItem))
        dispatch(clearSearchBar())
      }
    }

    const handleArrowKeys = (e) => {
      if (e.keyCode === 40) {

      } else if (e.keyCode === 37) {

      }
    }
    
    return (
      <form onSubmit={handleSubmit}>
        <Textarea size="1.5em" placeholder="Начните искать товар..." onChange={changeInput} value={searchbarText}></Textarea>
        <Predictions predictions={useSelector(state => state.itemCard.searchPredictions)} />
        <EnterSubmission />
      </form>
    )
}
