import { Button, ButtonProps, Flex, useColorMode, Link } from '@chakra-ui/react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';

export default function Theme(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    /**
     * Ideally, only the button component should be used (without Flex).
     * Props compatible with <Button /> are supported.
     */
    <Flex h="" justifyContent="center" alignItems="center">
      <Link textDecoration="none"
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
        _focus={{ boxShadow: 'none' }}
        w="fit-content"
        mr="20px"
        {...props}>
        {colorMode === 'light' ? "Dark-mode" : "Light-mode"}
      </Link>
    </Flex>
  );
}