import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay, useDisclosure
} from "@chakra-ui/react"
import CreateUserForm from "./CreateUserForm.jsx";


const AddIcon = () => "+";
const CloseIcon = () => "x";

const CreateUserDrawer = ({fetchUsers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Button
            leftIcon={<AddIcon/>}
            colorScheme={"teal"}
            onClick = {onOpen}>

            Create user
        </Button>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size={"xl"}

        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create new account</DrawerHeader>

                <DrawerBody>
                    <CreateUserForm
                      onSuccess={fetchUsers}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button  leftIcon={<CloseIcon/>}
                             colorScheme={"teal"}
                             onClick={onClose}>
                       close
                    </Button>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    </>

}

export default CreateUserDrawer ;