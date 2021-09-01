import {useSelector} from "react-redux";
import {AuthedHeader} from "./AuthedLayout";
import {ShopLikeBasicLayout} from "./components/Layout/ShopLikeBasicLayout";

const App = () => {
    const token = useSelector(state => state.auth.token)

    return (
        <AuthedHeader>
            {token && <ShopLikeBasicLayout/>}
        </AuthedHeader>
    )
}

export default App