import { removeItem } from '../../reducer/todo';
import { connect } from 'react-redux'
import { List, Checkbox, Typography } from 'antd';

const TodoItem = ({ title, listName, id, removeItem, isCompleted, isImportant }) => {
    //const dispatch = useDispatch()

    const remove = e => {
        e.preventDefault();
        fetch(`https://localhost:5001/api/items/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                if (data.success == true) {
                    removeItem({ listName, itemId: id })
                }
                else {
                    alert('Lỗi')
                }
            })
            .catch(e => {
                console.log('error', e);
                alert('Lỗi')
            })

    }

    const onChange = () => {

    }
    return (
        <List.Item
            actions={[<a onClick={remove}>remove</a>]}
        >
            <Typography.Title level={4}><Checkbox onChange={onChange} /> {title}</Typography.Title>
        </List.Item>
    )
}

const mapDispatchToProps = {
    removeItem
}

export default connect(null, mapDispatchToProps)(TodoItem);