const apiUrl = process.env.REACT_APP_JSONServerAPIUrl;

export const storeNewTodo = async (todo, emailId) => {
    try {
        if (!emailId) {
            throw new Error("User not logged in...");
        }
        const apiResponse = await fetch(apiUrl + `todos`, {
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


export const getAllTodos = async (emailId) => {
    try {
        if (!emailId) {
            throw new Error("User not logged in...");
        }
        const apiResponse = await fetch(apiUrl + `todos` +`?userEmail=${emailId}`);

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


export const updateTodo = async (todo, emailId) => {
    try {
        if (!emailId) {
            throw new Error("User not logged in...");
        }
        const apiResponse = await fetch(
            apiUrl + `todos/${todo.id}`,
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


export const deleteTodo = async (todoId, emailId) => {
    try {
        if (!emailId) {
            throw new Error("User not logged in...");
        }
        const apiResponse = await fetch(
            apiUrl + `todos/${todoId}`,
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