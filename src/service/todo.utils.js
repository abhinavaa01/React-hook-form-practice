export const editTodo = (todos, newtodo) => {
    const newList = todos.map((todo)=> todo.id === newtodo.id ? newtodo : todo);
    return newList;
};

export const removeTodo = (todos, todo) => {
    const newList = todos.filter((t)=> t.id !== todo.id);
    return newList;
};

export const toggleTodo = (todos, todo) => {
    return todos.map((t)=> t.id === todo.id ? {...t, isCompleted: !t.isCompleted} : t);
};

export const addTodo = (todos, todo) => {
    return [...todos, todo];
};


export const mergeTodos = (todos, newTodos) => {
    newTodos.forEach((todo)=> {
        const index = todos.findIndex((t)=> t.id === todo.id);
        if(index !== -1) {
            todos[index] = todo;
        } else {
            todos.push(todo);
        }
    });
    return todos;
};