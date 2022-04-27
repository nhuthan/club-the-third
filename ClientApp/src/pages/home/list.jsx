import Item from './item';
import CreateItem from './create-item';
import '../../asset/css/todolist.scss';
import { removeList } from '../../reducer/todo';
import { useDispatch } from 'react-redux';
import { List, Typography } from 'antd';

const TodoList = ({ name, items }) => {
    const dispatch = useDispatch()

    const remove = e => {
        e.preventDefault();
        dispatch(removeList({ listName: name }))
    }

    return (
        <div className="todo-list">
            <Typography.Title level={3}>{name}</Typography.Title>
            <List
                itemLayout="horizontal"
                dataSource={items}
                renderItem={item => (
                    <Item key={item.id} {...item} listName={name} />
                )}
            />
            <CreateItem listName={name} />
            <a onClick={remove}>Remove List</a>
        </div>
    )
}

export default TodoList;