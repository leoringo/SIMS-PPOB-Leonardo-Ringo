import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router/router.jsx'
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import store from './store/index.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
)
