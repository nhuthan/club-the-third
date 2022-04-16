import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addItem } from '../../reducer/todo';

const CreateItem = props => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch()

    return (
        <div>
            <input type="text"
                value={title}
                onKeyDown={e => {
                    if (e.key == 'Enter') {
                        dispatch(addItem({listName: props.listName, title: e.target.value}))
                        setTitle('');
                    }
                }}
                onChange={e => setTitle(e.target.value)} />
        </div>

    )
}

export default CreateItem;