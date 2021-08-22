import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Popup} from "../reusables/PopupWindow";
import {togglePopup, typePassword, typeUsername} from "../../app/authSlice";

const StickyHeader = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--solid-button-primary-color);
  height: 80px;
  padding: 0;
  margin-bottom: 10px;
  justify-content: flex-end;
  align-items: center;
`

const AuthButton = styled.button`
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 60px;
  height: 50px;
  background-color: var(--secondary-color);
  color: black;
  font-size: var(--big-button-font-size);

`

const AuthForm = props => {
    const dispatch = useDispatch()
    const writeUsername = (e) => {
        dispatch(typeUsername(e.target.value))
    }

    const writePassword = (e) => {
        dispatch(typePassword(e.target.value))
    }

    return (
        <form>
            <input type={'text'} value={props.credentials.username} onChange={writeUsername}/>
            <input type={'password'} value={props.credentials.password} onChange={writePassword}/>
        </form>
    )
}

export const Header = () => {
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    let credentials = authState.currentCredentials
    return (
        <StickyHeader>
            <AuthButton
                onClick={() => {
                    dispatch(togglePopup())
                }}>{!authState.token ? "Войти" : `${authState.user} (Выйти)`}</AuthButton>
            {authState.popupOpen &&
            <Popup isActive={authState.popupOpen} action={togglePopup}><AuthForm credentials={credentials}/></Popup>}
        </StickyHeader>
    )
}