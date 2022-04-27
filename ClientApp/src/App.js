import 'antd/dist/antd.css';

import HomePage from './pages/home';
import Login from './pages/account/login';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkToken } from './actions/user';

function App() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkToken());
    }, [])

    return (
        <div className="container">
            {
                user.tokenChecked == false ?
                    <div>Loading..</div> :
                    user.account == null ?
                        <Login /> :
                        <HomePage />
            }
        </div>
    );
}

export default App;
