import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Input, Button } from '@chakra-ui/react'


function App() {
  return (
    <div className="App">
      <ChakraProvider>
       <h1>Create Facebook</h1>
       <Input placeholder='Enter name...' w="50%"/>
       <Button>Login</Button>
      </ChakraProvider>
    </div>
  );
}

export default App;
