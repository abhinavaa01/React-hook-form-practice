export const storeTodo = async (userEmail, todo) => {
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