// We're importing various UI components and styles from the Chakra UI library
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Tag,
    useColorModeValue,
    Button,
    useDisclosure,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody, AlertDialogFooter, AlertDialog,
} from '@chakra-ui/react';
import {useRef} from 'react'
import {deleteUser} from "../services/client.js";
import {errorNotification, successNotification} from "../services/notification.js";
import UpdateUserDrawer from "./UpdateUserDrawer.jsx";
// This is a React functional component called CardWithImage that takes three props: id, email, and password
export default function CardWithImage({ id, name,gender, email,imageNumber,fetchUsers }) {
    const randomUserGender = gender === "MALE" ? "men" : "women";
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    return (
        // We create a centered container with padding on the Y-axis
        <Center py={6}>
            {/* This is a box that represents a card */}
            <Box
                maxW={'300px'} // Maximum width of the card
                w={'full'} // Full width of the card
                bg={useColorModeValue('white', 'gray.800')} // Background color based on the color mode
                boxShadow={'2xl'} // Adds a shadow to the card
                rounded={'md'} // Rounds the corners of the card
                overflow={'hidden'} // Hides overflowing content
            >
                {/* An image at the top of the card */}
                <Image
                    h={'120px'} // Height of the image
                    w={'full'} // Full width of the image
                    src={
                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    } // Image source URL
                    objectFit={'cover'} // Scales and crops the image to fit the container
                />
                {/* A container for the author's avatar */}
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'} // Size of the avatar
                        src={
                           `https://randomuser.me/api/portraits/${randomUserGender}/${imageNumber}.jpg`
                        } // Avatar image source URL
                        alt={'Author'} // Alt text for the avatar
                        css={{
                            border: '2px solid white', // Adds a white border around the avatar
                        }}
                    />
                </Flex>
                {/* A container for text information */}
                <Box p={6}>
                    <Stack spacing={2} align={'center'} mb={5}>
                        {/* A tag displaying the 'id' prop */}
                        <Tag borderRadius={'full'}>{id}</Tag>
                        {/* A heading element */}
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {/* Heading text (currently empty, should be added) */}
                        </Heading>
                        {/* Text displaying the 'email' prop */}
                        <Text color={'gray.500'}>{name}</Text>
                        <Text color={'gray.500'}>{gender}</Text>
                        <Text color={'gray.500'}>{email}</Text>
                    </Stack>
                </Box>
                <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Stack>
                      <UpdateUserDrawer
                          initialValues = {{name,email}}/>
                          userId={id}
                          fetchUsers ={fetchUsers}


                    </Stack>
                    <Stack>
                        <Button
                                 bg={'red.400'}
                                 color={'white'}
                                 rounded={'full'}
                                 _hover={{
                                     transform:'translateY(-2px)',
                                     boxShadow:'lg'
                                 }}
                                 _focus={{
                                     bg:'green.500'
                                 }}
                                 onClick={onOpen}
                        >
                            Delete
                        </Button>
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Delete Customer
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure you want to delete {name}? You can't undo this action afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme='red' onClick={()=>{
                                            deleteUser(id).then(res=>{
                                                console.log(res)
                                                successNotification(
                                                    'User deleted',
                                                    `${name} was successfully deleted`
                                                )

                                                fetchUsers();

                                            }).catch(err => {
                                                console.log(err);
                                                errorNotification(err.code, err.response.data.message)
                                            }).finally(()=>{onClose()})
                                        }} ml={3}>
                                            Delete
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Stack>
                    </Stack>

            </Box>
        </Center>
    );
}
