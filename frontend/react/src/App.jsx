// We're importing some building blocks and tools from a library called 'Chakra UI.'
import { Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react';

// We're importing a custom component called 'SidebarWithHeader' from a file named 'sidebar.jsx.'
import SidebarWithHeader from "./components/shared/sidebar.jsx";

// We're importing special tools called 'useEffect' and 'useState' from a library called 'React.'
import { useEffect, useState } from "react";

// We're importing a function called 'getUsers' from a file named 'client.js' in a 'services' folder.
import { getUsers } from "./services/client.js";

// We're importing a custom component called 'CardWithImage' from a file named 'Card.jsx.'
import CardWithImage from "./components/Card.jsx";
import DraweForm from "./components/CreateUserDrawer.jsx";
import {errorNotification} from "./services/notification.js";
import CreateUserDrawer from "./components/CreateUserDrawer.jsx";

// This is the main function called 'App' for our application.
function App() {
    // We're creating a piece of memory called 'users' and setting it to an empty list initially.
    const [users, setUsers] = useState([]);

    // We're creating another piece of memory called 'loading' and setting it to 'false' initially.
    const [loading, setLoading] = useState(false);

    const [err, setError] = useState("")

    const fetchUsers=()=>{
        // We're setting 'loading' to 'true' to indicate that we're fetching data.
        setLoading(true);

        // We're calling the 'getUsers' function to fetch user data from a server.
        getUsers().then(res => {
            // When we receive the data successfully, we set 'users' to the data.
            setUsers(res.data);
        }).catch(err => {
            setError( err.response.data.message)
            errorNotification(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            // Regardless of success or failure, we set 'loading' back to 'false.'
            setLoading(false);
        })
    }

    // This is a special function that runs automatically when the component is loaded.
    useEffect(() => {
        fetchUsers();

    }, []);

    // If 'loading' is true, we show a loading spinner.
    if (loading) {
        return (
            // We display a sidebar with a spinning loading indicator.
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        );
    }

    if (err) {
        return (
            // We display a sidebar with a text message saying "No users available."
            <SidebarWithHeader>
                <CreateUserDrawer
                    fetchUsers={fetchUsers}
                />

                <Text mt={5}>Ooops there was an error</Text>
            </SidebarWithHeader>
        )

    }

    // If there are no users in the list, we display a message.
    if (users.length <= 0) {
        return (
            // We display a sidebar with a text message saying "No users available."
            <SidebarWithHeader>
                <CreateUserDrawer
                 fetchUsers={fetchUsers}
                />

                <Text mt={5}>No users available</Text>
            </SidebarWithHeader>
        )
    }

    // If we have users in the list, we display them as cards in a nice layout.
    return (

        // We display a sidebar with user cards wrapped in a layout called 'Wrap.'
        <SidebarWithHeader>
            <CreateUserDrawer
                fetchUsers={fetchUsers}/>
            <Wrap justify={"center"} spacing={"30px"}>
                {users.map((user, index) => (
                    <WrapItem key={index}>
                        <CardWithImage {...user}
                          imageNumber={index}
                          fetchUsers={fetchUsers}/>
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
    );
}

// We export the 'App' function as the main component of our application.
export default App;
