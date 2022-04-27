import { setAccount, setLoginError, tokenChecked } from '../reducer/user';

export function checkToken(params) {
    let token = localStorage.getItem("token");
    return (dispatch) => {
        if (!token) {
            dispatch(setAccount(null))
            dispatch(tokenChecked(true))
        }
        else {
            fetch(`/user/info`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => {
                    res.json()
                        .then(data => {
                            if (res.status == 200) {
                                dispatch(setAccount(data))
                            }
                            else {
                                dispatch(setLoginError(data))
                            }
                            dispatch(tokenChecked(true))
                        })
                        .catch(e => {
                            dispatch(setLoginError({
                                error: e.name,
                                message: e.message
                            }))
                            dispatch(tokenChecked(true))
                        })
                })
        }
    }
}


export function login(params) {
    return (dispatch) => {
        fetch(`/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
            .then(res => {
                res.json()
                    .then(data => {
                        if (res.status == 200) {
                            localStorage.setItem("token", data.accessToken);
                            dispatch(setAccount(data))
                        }
                        else {
                            dispatch(setLoginError(data))
                        }
                    })
                    .catch(e => {
                        dispatch(setLoginError({
                            error: e.name,
                            message: e.message
                        }))
                    })
            })

    }
}
