import usePostFetch from "../hooks/usePostFetch";
const fetchData = usePostFetch();


class AuthService {

    async registration(login, password) {
        const { message: regMessage, isSuccess: regSuccess } = await fetchData(
            "http://localhost:8000/api/auth/registration/", {
                login,
                password,
            }
        );
        return { regMessage, regSuccess }

    }
    async login(login, password) {
        const { message: loginMessage, isSuccess: loginSuccess } = await fetchData(
            "http://localhost:8000/api/auth/login/", {
                login,
                password,
            }
        );
        return { loginMessage, loginSuccess }
    }
    async logout() {
        const { message: logoutMessage, isSuccess: logoutSuccess } = await fetchData(
            "http://localhost:8000/api/auth/logout/"
        );
        localStorage.removeItem('token');
    }
    async chechAuth() {

        let message = await fetch("http://localhost:8000/api/auth/refresh/", {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                mode: 'cors',
            })
            .then(res => res.json())
            .then(data => data)
            .catch(e => {
                console.log(e);
            })
        console.log(message);
    }

}

export default new AuthService