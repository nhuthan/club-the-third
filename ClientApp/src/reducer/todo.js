import { createSlice, isFulfilled } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        lists: []
    },
    reducers: {
        setLists: (state, action) => {
            state.lists = [...action.payload.data];
        },
        addList: (state, action) => {
            state.lists.push({
                name: action.payload.listName,
                items: []
            })
        },
        addItem: (state, action) => {
            const list = state.lists.find(item => item.name == action.payload.listName);
            if (list) {
                list.items.push({
                    title: action.payload.title,
                    id: Date.now(),
                    isCompleted: false,
                    isImportant: false
                })
            }
        },
        removeList: (state, action) => {
            const listName = action.payload.listName;
            state.lists = state.lists.filter(item => item.name != listName);
        },
        removeItem: (state, action) => {
            const listName = action.payload.listName;
            const itemId = action.payload.itemId;
            const list = state.lists.find(item => item.name == listName);
            if (list) {
                list.items = list.items.filter(item => item.id != itemId);
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addList, addItem, removeList, removeItem, setLists } = todoSlice.actions

export default todoSlice.reducer