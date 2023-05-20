import React from "react"
import {
  Button, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure
} from "@chakra-ui/react"
import SignUpForm from "../Components/SignUpForm"

const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button
        onClick={onOpen}
        bg={'#42b72a'}
        color={'white'}
        _hover={{
        bg: 'green.500',
        }}>
            Create new account
        </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
           <SignUpForm  />
        </ModalContent>
      </Modal>
    </>
  )
}
export default SignUp