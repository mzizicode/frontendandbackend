// Importing necessary components from external libraries
import { Form, Formik, useField } from 'formik'; // Formik is a library for building forms in React
import * as Yup from 'yup'; // Yup is a library for form validation
import { Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack } from "@chakra-ui/react"; // Chakra UI components for styling

// Importing functions for saving and updating user data, and for showing notifications
import { saveUser, updateUser } from "../services/client.js";
import { successNotification, errorNotification } from "../services/notification.js";

// A custom text input field component
const MyTextInput = ({ label, ...props }) => {
    // useField() helps manage form input fields and validation
    // It returns information about the field and whether it has an error
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? ( // Display an error message if the field is touched and has an error
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

// A component for updating user information
const UpdateUserForm = ({ fetchUsers, initialValues, userId }) => {
    return (
        <>
            {/* Formik component is used to manage form state and submission */}
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Must be a valid email')
                        .required('Required'),
                })}
                onSubmit={(updatedUser, { setSubmitting }) => {
                    setSubmitting(true);
                    updateUser(userId, updatedUser)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "User updated",
                                `${updatedUser.name} was successfully updated`
                            );
                            fetchUsers();
                        }).catch(err => {
                        console.log(err);
                        errorNotification(
                            err.code,
                            err.response.data.message
                        );
                    }).finally(() => {
                        setSubmitting(false);
                    });
                }}
            >
                {({ isValid, isSubmitting, dirty }) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            {/* Custom text input fields */}
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Full Names"
                            />
                            <MyTextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="Email"
                            />
                            {/* Submit button to update user data */}
                            <Button disabled={!(isValid && dirty) || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UpdateUserForm; // Exporting the UpdateUserForm component
