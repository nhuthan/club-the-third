import List from './list';
//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { removeItem, setLists } from '../../reducer/todo';
import { useEffect } from 'react';

const Lists = ({ lists, setLists }) => {

    useEffect(function () {
        fetch('https://localhost:5001/api/lists')
            .then(res => res.json())
            .then(data => {
                setLists({ data })
            })
    }, [])


    return (
        <>
            {
                lists.map(list => (
                    <List {...list} />
                ))
            }
        </>
    )
}

// function mapStateToProps(state) {
//     return { lists: state.todo.lists }
// }

// const mapDispatchToProps = {
//     removeItem
// }

//export default connect(mapStateToProps, mapDispatchToProps)(Lists);

const myConnect = (component, mapStateToProps, mapDispatchToProps) => {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}



export default myConnect(Lists,
    state => ({
        lists: state.todo.lists
    }),
    {
        removeItem,
        setLists
    }
);