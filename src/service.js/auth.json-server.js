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
        isloggedIn : true
      }
      localStorage.setItem("isloggedIn", "true");
      localStorage.setItem("authUser", JSON.stringify(storageUserData));
      return users[0]; // Or return the user object
    } else {
      throw new Error(
        "Invalid Login Credentials! :- " + new Date().toLocaleTimeString()
      ); // Throw an error
    }
  } catch (error) {
    // Catch any errors (network, JSON parsing, etc.)
    console.error("Login error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const signUp = async (data) => {
  // const newUserData = { email: data.email, password: data.password };
  try {
    // 1. Check if user with email already exists
    const checkResponse = await fetch(
      apiUrl + `users?email=${data.email}`
    );
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
      isloggedIn : true
    }
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
    const response = await fetch(apiUrl + 'users');

    if (!response.ok) {
      const errorText = await response.text(); // Attempt to get error details from the server
      console.error(`API request failed with status ${response.status}: ${errorText || response.statusText}`);
      return null; // Or throw the error if you want the caller to handle it
    }

    const responseData = await response.json(); // Parse JSON response

    console.log("API Response:", responseData); // Log the successful response data
    return responseData; // Return the response data if needed

  } catch (error) {
    console.error("Error checking API:", error);
    return null; // Or throw the error
  }
}