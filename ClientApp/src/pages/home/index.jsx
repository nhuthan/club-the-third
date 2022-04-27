import CreateList from './create-list';
import Lists from './lists'

import { Button, Input } from 'antd';

const HomePage = props => {

    return (
        <div style={{ width: 500, margin: '20px auto' }}>
            <Lists />
            <CreateList />
        </div >

    )
}

export default HomePage;