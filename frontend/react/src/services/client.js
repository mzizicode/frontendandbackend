// We're importing a tool called "axios" that helps us make requests to a web server.
import axios from "axios";

// This is a function named "getUsers" that we're defining. It will fetch user data from a web server.
export const getUsers = async () => {
    try {
        // We're trying to do something here...
        // We're making a request to a specific URL using axios. This URL is stored in an environment variable called "VITE_API_BASE_URL."
        // The "/api/v1/users" part is added to the base URL to specify the endpoint we want to access, which is where user data is located.

        // We're using "await" to wait for the response from the server before proceeding.
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users`);
    } catch (e) {
        // If something goes wrong during the request, we catch any errors (like network issues) and handle them here.
        // We throw the error again to let the calling code know that something went wrong.
        throw e;
    }
}

// This is a function named "saveUser" that sends user data to the server for storage.
export const saveUser = async (users) => {
    try {
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users`, users);
    } catch (e) {
        throw e;
    }
}

// This is a function named "deleteUser" that sends a request to delete a user from the server.
export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${id}`);
    } catch (e) {
        throw e;
    }
}

// This is a function named "updateUser" that sends updated user data to the server for modification.
export const updateUser = async (id, update) => {
    try {
        return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${id}`, update);
    } catch (e) {
        throw e;
    }
}
