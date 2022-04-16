import { removeItem } from '../../reducer/todo';
import { connect } from 'react-redux'

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
    return (
        <div className="todo-item">
            <h4>{title} <a onClick={remove}>Remove List</a></h4>
        </div>
    )
}

const mapDispatchToProps = {
    removeItem
}

export default connect(null, mapDispatchToProps)(TodoItem);