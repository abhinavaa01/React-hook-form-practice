
// Function created using gemini AI
export const login = async (email, pass) => { // Use async/await
    try {
      const response = await fetch('http://localhost:3000/users?email=' + email + '&password=' + pass); 
      if (!response.ok) { 
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText || response.statusText}`);
      }
  
      const users = await response.json(); // Await response.json()
  
      if (users.length > 0) {
        localStorage.setItem("isloggedIn", "true");
        return users[0]; // Or return the user object
      } else {
        throw new Error("Invalid Login Credentials!"); // Throw an error
      }
    } catch (error) { // Catch any errors (network, JSON parsing, etc.)
      console.error("Login error:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };