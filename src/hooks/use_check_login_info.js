import { useDispatch } from "react-redux";
import { loginOK } from "../reducers/login_reducer";

export default function useCheckLoginInfo() {
    const loginInfoJson = localStorage.getItem('login_info');
    const loginInfo = JSON.parse(loginInfoJson);
    const dispatch = useDispatch();

    if (loginInfo !== null) {
        dispatch(loginOK({ token: loginInfo.token, name: loginInfo.name }))
    }
}