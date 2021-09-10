import {useSelector} from "react-redux";
import {ShopLikeBasicLayout} from "./components/Layout/ShopLikeBasicLayout";

const App = (props) => {
    const token = useSelector(state => state.auth.token)

    return (
        <>
            {token && <ShopLikeBasicLayout>{props.children}</ShopLikeBasicLayout>}
        </>
    )
}

export default App