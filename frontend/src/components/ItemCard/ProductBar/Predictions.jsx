import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { selectItem } from "../../../app/itemCardSlice"

const PredictionSpan = styled.span`
    width: 100%;
    font-size: var(--big-button-font-size);
    margin-left: var(--big-button-font-size);
`

const PredictionDiv = styled.div`
    width: var(--search-bar-width);
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 var(--big-button-font-size);
`

const SelectedPredictionDiv = styled.div`
    width: var(--search-bar-width);
    display: flex;
    align-items: center;
    background-color: blue;
    height: 50px;
    padding-left: 0 var(--big-button-font-size);
`

const PredictionContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    width: var(--search-bar-width);
`

export const Predictions = (props) => {
    const dispatch = useDispatch()
    let currentPrediction = useSelector(state => state.itemCard.currentItem) //could be undefined
    const highlightSelection = (e) => {
        // TODO add listening to arrow buttons
        if (e.keyCode === 13) {
            console.log("listening")
        }
        dispatch(selectItem(e.target.firstChild.textContent))
    }

    return (
        <PredictionContainer>
            {props.predictions.map((prediction, index) => {
                if (currentPrediction) {
                    if (prediction.fullName !== currentPrediction.fullName) {    
                        return (<PredictionDiv onMouseOver={highlightSelection} key={index}><PredictionSpan>{prediction.fullName}</PredictionSpan></PredictionDiv>)
                    } else {
                        return ((<SelectedPredictionDiv key={index}><PredictionSpan>{prediction.fullName}</PredictionSpan></SelectedPredictionDiv>))
                    }
                } else {
                    return (<PredictionDiv key={index} onMouseOver={highlightSelection}><PredictionSpan>{prediction.fullName}</PredictionSpan></PredictionDiv>)
                }
            }
            )}
        </PredictionContainer>
    )
}