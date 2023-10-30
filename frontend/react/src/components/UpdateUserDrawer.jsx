// Importing Chakra UI components for creating a drawer and button
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react"

// Importing components for creating and updating a user form
import CreateUserForm from "./CreateUserForm.jsx";
import UpdateUserForm from "./UpdateUserForm.jsx";

// A component representing a close icon (a simple "x")
const CloseIcon = () => "x";

// A component for updating a user's information
const UpdateUserDrawer = ({ fetchUsers, initialValues, userId }) => {
    // useDisclosure helps manage the open and close state of the drawer
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        {/* Button to open the drawer for updating user information */}
        <Button
            bg={'blue.500'}
            color={'white'}
            rounded={'full'}
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
            }}
            onClick={onOpen}
        >
            Update
        </Button>

        {/* Drawer component for updating user information */}
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size={"xl"}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />

                <DrawerHeader>Update user</DrawerHeader>

                <DrawerBody>
                    {/* Using the UpdateUserForm to edit user details */}
                    <UpdateUserForm
                        fetchUsers={fetchUsers}
                        initialValues={initialValues}
                        userId={userId}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button leftIcon={<CloseIcon />}
                            colorScheme={"teal"}
                            onClick={onClose}>
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}

export default UpdateUserDrawer; // Exporting the UpdateUserDrawer component
