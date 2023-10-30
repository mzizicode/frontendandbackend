// Importing necessary components from external libraries
import {Form, Formik, useField} from 'formik'; // Formik is a library for building forms in React
import * as Yup from 'yup'; // Yup is a library for form validation
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react"; // Chakra UI components for styling

import {saveUser} from "../services/client.js"; // Importing a function to save user data
import {successNotification, errorNotification} from "../services/notification.js"; // Functions for showing success and error notifications

// Creating a custom text input field component
const MyTextInput = ({label, ...props}) => {
    // useField() helps us manage form input fields and validation
    // It returns information about the field and whether it has an error
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? ( // Display an error message if the field is touched and has an error
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

// Creating a custom select (dropdown) field component
const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? ( // Display an error message if the field is touched and has an error
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

// Creating a form component to create a new user
const CreateUserForm = ({onSuccess}) => {
    return (
        <>
            {/* Formik component is used to manage form state and submission */}
            <Formik
                initialValues={{
                    name: '',
                    gender: '',
                    email: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    gender: Yup.string()
                        .oneOf(
                            ['MALE', 'FEMALE'],
                            'Invalid gender'
                        )
                        .required('Required'),
                    email: Yup.string()
                        .email('Must be a valid email')
                        .required('Required'),
                })}
                onSubmit={(userData, {setSubmitting}) => {
                    setSubmitting(true);
                    saveUser(userData)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "User saved",
                                `${userData.name} was successfully saved`
                            )
                            onSuccess(res.headers["authorization"]);
                        }).catch(err => {
                        console.log(err);
                        errorNotification(
                            err.code,
                            err.response.data.message
                        )
                    }).finally(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            {/* Custom text input fields */}
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Name"
                            />
                            <MyTextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="Email"
                            />

                            {/* Custom select field for gender */}
                            <MySelect label="Gender" name="gender">
                                <option value="">Select gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </MySelect>

                            {/* Submit button to save the user data */}
                            <Button disabled={!isValid || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateUserForm; // Export the CreateUserForm component
