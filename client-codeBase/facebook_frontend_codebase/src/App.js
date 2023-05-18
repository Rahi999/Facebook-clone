import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Input, Button, Avatar } from '@chakra-ui/react'


function App() {
  return (
    <div className="App">
      <ChakraProvider>
       <h1>Create Facebook</h1>
       <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/800px-Facebook_logo_%28square%29.png" />
       <Input placeholder='Enter name...' w="50%"/>
       <Button>Login</Button>
      </ChakraProvider>
    </div>
  );
}

export default App;
