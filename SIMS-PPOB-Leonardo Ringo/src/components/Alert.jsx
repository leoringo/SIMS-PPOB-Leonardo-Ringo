import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useDisclosure,
    Box,
    CloseButton,
} from '@chakra-ui/react'
import { useEffect } from 'react'


export default function ErrorAlert({errorMessage, setErrorMessage}) {
    const {
        isOpen: isVisible,
        onClose,
        onOpen
    } = useDisclosure({ defaultIsOpen: false })

    const closeButton = () => {
        onClose()
        setErrorMessage("")
    }
    
    useEffect(() => {
      if(errorMessage) onOpen()
    
    }, [errorMessage])
    return isVisible ? (
      <Alert status='warning' position='absolute' bottom={1} left={1} width={"25vw"}>
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Box>
        <CloseButton
          position='absolute'
          right={-1}
          top={-1}
          onClick={closeButton}
        />
      </Alert>
    ) : ("")
  }