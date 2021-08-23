import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Popup} from "../reusables/PopupWindow";
import {clearCredentials, login, togglePopup, typePassword, typeUsername, logout} from "../../app/authSlice";

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
  height: 60px;
  background-color: var(--secondary-color);
  color: black;
  font-size: var(--big-button-font-size);
    display: flex;
    justify-content: center;
    align-items: center
`

const InputsDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Input = styled.input`
    width: 500px;
    height: 40px;
    font-size: var(--small-button-font-size);
    border-radius: 12px;

`

const SubmitLoginButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: var(--small-button-font-size);
    margin-bottom: 0px;
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
        <form onSubmit={async (e) => {
            e.preventDefault()
            const thing = await dispatch(login(props.credentials))
            console.log(thing)
        }}>
            <InputsDiv>
                <Input type={'text'} value={props.credentials.username} onChange={writeUsername}/>
                <Input type={'password'} value={props.credentials.password} onChange={writePassword}/>
                <SubmitLoginButton type={'submit'}>Войти</SubmitLoginButton>
            </InputsDiv>

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
                    const clear = () => {
                        dispatch(clearCredentials())
                        dispatch(logout())
                    }
                    authState.token ? clear() : dispatch(togglePopup())
                }}>{!authState.token ? "Войти" : `${authState.user} (Выйти)`}</AuthButton>
            {authState.popupOpen && !authState.token &&
            <Popup isActive={authState.popupOpen} action={togglePopup}><AuthForm credentials={credentials}/></Popup>}
        </StickyHeader>
    )
}