import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addList } from '../../reducer/todo';

const CreateList = props => {
    const [name, setName] = useState('');
    const dispatch = useDispatch()

    return (
        <input type="text"
            value={name}
            onKeyDown={e => {
                if (e.key == 'Enter') {
                    dispatch(addList({ listName: e.target.value }))
                    setName('');
                }
            }}
            onChange={e => setName(e.target.value)}
        />
    )
}

export default CreateList;