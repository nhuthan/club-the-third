import Item from './item';
import CreateItem from './create-item';
import '../../asset/css/todolist.scss';
import { removeList } from '../../reducer/todo';
import { useDispatch } from 'react-redux'

const TodoList = ({ name, items }) => {
    const dispatch = useDispatch()

    const remove = e => {
        e.preventDefault();
        dispatch(removeList({ listName: name }))
    }

    return (
        <div className="todo-list">
            <h3 className="list-name">{name}</h3>
            {
                items && items.map(item => (
                    <Item key={item.id} {...item} listName={name} />
                ))
            }
            <CreateItem listName={name} />
            <a onClick={remove}>Remove List</a>
        </div>
    )
}

export default TodoList;