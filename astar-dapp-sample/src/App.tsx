import { Container } from '@chakra-ui/react'
import Home from './components/Home'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <Container minW={'100vw'} minH={'100vh'}>
      <Navbar />
      <Home />
    </Container>
  )
}

export default App
