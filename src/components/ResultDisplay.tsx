import React from 'react';
import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useFormDataContext } from '../context/FormContext';

const ResultDisplay: React.FC = () => {
  const { formDataArray } = useFormDataContext();
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <>
    <VStack bg="#F0EBEB"  spacing={4} mt={4} align="stretch" borderRadius="lg" boxShadow="lg" maxW="container.md" mx="auto">
    {formDataArray?.length ? <Text fontSize="2xl" fontWeight="bold" color="gray.700" mt={4} mx="auto">User List</Text>: null}
      {formDataArray?.map((data, index) => (
        <Box p={10}>
          <Text fontWeight="semibold" color={textColor}>First Name: <Text as="span" fontWeight="normal">{data?.firstName}</Text></Text>
          <Text fontWeight="semibold" color={textColor}>Last Name: <Text as="span" fontWeight="normal">{data?.lastName}</Text></Text>
          <Text fontWeight="semibold" color={textColor}>Gender: <Text as="span" fontWeight="normal">{data?.gender}</Text></Text>
          <Text fontWeight="semibold" color={textColor}>Date of Birth: <Text as="span" fontWeight="normal">{data?.dateOfBirth}</Text></Text>
          <Text fontWeight="semibold" color={textColor}>Email: <Text as="span" fontWeight="normal">{data?.email}</Text></Text>
          <Text fontWeight="semibold" color={textColor}>Phone Number: <Text as="span" fontWeight="normal">{data?.phoneNumber}</Text></Text>
          <Text fontWeight="semibold" color={textColor}>Tech Stack: <Text as="span" fontWeight="normal">{data?.techStack?.map(tech => tech?.name).join(', ')}</Text></Text>
          <hr/>
        </Box>
        
      ))}
    </VStack></>
  );
};

export default ResultDisplay;
