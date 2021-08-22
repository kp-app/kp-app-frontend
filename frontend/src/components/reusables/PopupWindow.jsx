import styled from "styled-components"
import {useDispatch} from "react-redux";

const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: whitesmoke;
  height: 200px;
  width: 200px;
`

export const Popup = props => {
    const dispatch = useDispatch()
    if (props.isActive) {
        return (
            <Modal onClick={() => {
                dispatch(props.action())
            }}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    {props.children}
                </ModalContent>
            </Modal>
        )
    } else {
        return null
    }
}