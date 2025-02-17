const apiUrl = process.env.REACT_APP_JSONServerAPIUrl;

// Function created using gemini AI
export const login = async (email, pass) => {
  // Use async/await
  try {
    const response = await fetch(
      apiUrl + "users?email=" + email + "&password=" + pass
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error ${response.status}: ${errorText || response.statusText}`
      );
    }

    const users = await response.json(); // Await response.json()

    if (users.length > 0) {
      console.log(users[0]);
      const storageUserData = {
        ...users[0],
        isloggedIn: true,
      };
      localStorage.setItem("isloggedIn", "true");
      localStorage.setItem("authUser", JSON.stringify(storageUserData));
      return users[0]; // Or return the user object
    } else {
      throw new Error(
        "Invalid Login Credentials! :- " + new Date().toLocaleTimeString()
      ); // Throw an error
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const signUp = async (data) => {
  // const newUserData = { email: data.email, password: data.password };
  try {
    // 1. Check if user with email already exists
    const checkResponse = await fetch(apiUrl + `users?email=${data.email}`);
    if (!checkResponse.ok) {
      const errorText = await checkResponse.text();
      throw new Error(
        `HTTP error ${checkResponse.status}: ${
          errorText || checkResponse.statusText
        }`
      );
    }
    const existingUsers = await checkResponse.json();

    if (existingUsers.length > 0) {
      throw new Error("User with this email already exists."); // Or return null, etc.
    }
    const response = await fetch(apiUrl + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error ${response.status}: ${errorText || response.statusText}`
      );
    }

    const newUser = await response.json();
    const storageUserData = {
      ...data,
      password: `Trying to steal password?`,
      isloggedIn: true,
    };
    localStorage.setItem("isloggedIn", "true");
    localStorage.setItem("authUser", JSON.stringify(storageUserData));
    return newUser;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const checkApiResponse = async () => {
  try {
    // console.log(apiUrl);
    const response = await fetch(apiUrl + "users");

    if (!response.ok) {
      const errorText = await response.text(); // Attempt to get error details from the server
      console.error(
        `API request failed with status ${response.status}: ${
          errorText || response.statusText
        }`
      ); // Or throw the error if you want the caller to handle it
    }

    const responseData = await response.json(); // Parse JSON response

    console.log("API Response:", responseData); // Log the successful response data
    return responseData; // Return the response data if needed
  } catch (error) {
    console.error("Error checking API:", error);
    throw error;
  }
};

export const updateUserPassword = async (email, newPassword) => {
  try {
    // console.log(apiUrl + `users?email=${email}`);
    const findUserResponse = await fetch(apiUrl + `users?email=${email}`);
    var userData = null;

    if (!findUserResponse.ok) {
      const errorText = await findUserResponse.text();
      throw new Error(
        `API request failed with status ${findUserResponse.status}: ${
          errorText || findUserResponse.statusText
        }`
      );
    }

    const users = await findUserResponse.json();
    if (users.length) {
      userData = users[0];
    } else {
      throw new Error("User with this email not found !");
    }
    const newData = userData;
    newData.password = newPassword;

    const updateResponse = await fetch(apiUrl + `users/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw new Error(
        `HTTP error ${updateResponse.status}: ${errorText || updateResponse.statusText}`
      );
    }

    const updated = await updateResponse.json();
    return updated; 
  } catch (error){
    console.error(error);
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const apiResponse = await fetch(apiUrl + `users?email=${email}`);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      throw new Error(
        `API request failed with status ${apiResponse.status}: ${
          errorText || apiResponse.statusText
        }`
      );
    }

    const users = await apiResponse.json();
    if (users.length) {
      return users[0];
    } else {
      throw new Error("User with this email not found !");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
