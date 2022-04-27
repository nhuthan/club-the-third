import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addItem } from '../../reducer/todo';
import { Input } from 'antd';

const CreateItem = props => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch()

    return (
        <Input type="text"
            value={title}
            onKeyDown={e => {
                if (e.key == 'Enter') {
                    dispatch(addItem({ listName: props.listName, title: e.target.value }))
                    setTitle('');
                }
            }}
            onChange={e => setTitle(e.target.value)} />

    )
}

export default CreateItem;