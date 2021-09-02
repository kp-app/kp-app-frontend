import {useSelector} from "react-redux";
import {ShopLikeBasicLayout} from "./components/Layout/ShopLikeBasicLayout";

const App = () => {
    const token = useSelector(state => state.auth.token)

    return (
        <>
            {token && <ShopLikeBasicLayout/>}
        </>
    )
}

export default App