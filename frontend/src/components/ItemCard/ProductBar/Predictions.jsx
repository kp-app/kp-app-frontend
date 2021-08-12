import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { selectItem } from "../../../app/itemCardSlice"

const PredictionDiv = styled.div`
    height: 30px;
`

const SelectedPredictionDiv = styled.div`
    background-color: blue;
    height: 30px;
`

const PredictionContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    width: var(--search-bar-width);
`

export const Predictions = (props) => {
    const dispatch = useDispatch()
    let currentPrediction = useSelector(state => state.itemCard.currentItem) //could be undefined
    const highlightselection = (e) => {
        // TODO add listening to arrow buttons
        dispatch(selectItem(e.target.textContent))
    }

    // TODO fix displays. Prices also freeze, this isn't good
    // TODO fix event listener to listen on whole div

    return (
        <PredictionContainer>
            {props.predictions.map(prediction => {
                if (currentPrediction) {
                    if (prediction.fullName !== currentPrediction.fullName) {    
                        return (<PredictionDiv><span onMouseOver={highlightselection}>{prediction.fullName}</span></PredictionDiv>)
                    } else {
                        return ((<SelectedPredictionDiv><span>{prediction.fullName}</span></SelectedPredictionDiv>))
                    }
                } else {
                    return (<PredictionDiv><span onMouseOver={highlightselection}>{prediction.fullName}</span></PredictionDiv>)
                }
            }
            )}
        </PredictionContainer>
    )
}