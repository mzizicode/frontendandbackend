// We're importing necessary functionality from libraries.
import React from 'react'; // This is for creating React components.
import ReactDOM from 'react-dom/client'; // This is for rendering React components into the DOM.
import App from './App.jsx'; // We're importing our main application component from a file named 'App.jsx'.
import { ChakraProvider } from "@chakra-ui/react"; // We're importing some user interface (UI) components from the 'Chakra UI' library.
import './index.css'; // We're importing some styles from a CSS file.
import { createStandaloneToast } from '@chakra-ui/react'

const { ToastContainer } = createStandaloneToast()
// We're creating a special "root" in the HTML document where our React app will be inserted.
ReactDOM.createRoot(document.getElementById('root')).render(
    // We're using "React.StrictMode" to highlight potential issues in our code.
    <React.StrictMode>
        {/* We're wrapping our entire application in the 'ChakraProvider' component to apply Chakra UI styling. */}
        <ChakraProvider>
            {/* We're including our main application component here. */}
            <App />
            <ToastContainer/>
        </ChakraProvider>
    </React.StrictMode>,
)

