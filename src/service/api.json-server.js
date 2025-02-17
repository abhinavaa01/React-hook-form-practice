const apiUrl = process.env.REACT_APP_JSONServerAPIUrl;
const userEmail = JSON.parse(localStorage.getItem("auth-storage"))?.state.userData.email;

export const storeNewTodo = async (todo) => {
    try {
        const apiResponse = await fetch(apiUrl + `userdata/${userEmail}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            throw new Error(
                `API request failed with status ${apiResponse.status}: ${
                    errorText || apiResponse.statusText
                }`
            );
        }

        const createdTodo = await apiResponse.json();
        return createdTodo;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getAllTodos = async () => {
    try {
        const apiResponse = await fetch(apiUrl + `userdata/${userEmail}/todos`);

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            throw new Error(
                `API request failed with status ${apiResponse.status}: ${
                    errorText || apiResponse.statusText
                }`
            );
        }

        const todos = await apiResponse.json();
        return todos;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const updateTodo = async (todo) => {
    try {
        const apiResponse = await fetch(
            apiUrl + `userdata/${userEmail}/todos/${todo.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            }
        );

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            throw new Error(
                `API request failed with status ${apiResponse.status}: ${
                    errorText || apiResponse.statusText
                }`
            );
        }

        const updatedTodo = await apiResponse.json();
        return updatedTodo;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const deleteTodo = async (todoId) => {
    try {
        const apiResponse = await fetch(
            apiUrl + `userdata/${userEmail}/todos/${todoId}`,
            {
                method: "DELETE",
            }
        );

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            throw new Error(
                `API request failed with status ${apiResponse.status}: ${
                    errorText || apiResponse.statusText
                }`
            );
        }

        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};