import {
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import Logo from '@/assets/images/logo.svg';
import { Link } from 'react-router-dom';

const NavbarMobile: React.FC = () => {
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'64px'}
        py={2}
        px={4}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        {/* LOGO */}
        <Flex flex={1} justify={'center'}>
          <Link to="/">
            <img src={Logo} width="36px" height="36px" title="logo" alt="Logomarca da empresa" />
          </Link>
        </Flex>
        </Flex>
    </Box>
  );
};

export default NavbarMobile;
