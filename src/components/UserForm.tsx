import React, { useState } from 'react';
import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import {
  Box, Button, FormControl, FormLabel, Input, Flex, useColorModeValue, useBreakpointValue,
  IconButton, Text,  FormErrorMessage, VStack, Stack, HStack
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

import Select from './Select';
import { useFormDataContext } from '../context/FormContext';

interface FormInput extends FieldValues {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  techStack: Array<{ id: string; name: string }>;
}


const UserForm = () => {

  const { addFormData } = useFormDataContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, control, handleSubmit, watch, setValue, formState: { errors }, reset, setError} = useForm<FormInput>({
    defaultValues: {
      techStack: [{ id: '0', name: 'React.js' }],
      phoneNumber: '+91'

    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techStack',
  });
  

  const onSubmit = (data: FormInput) => {
    const hasEmptyFields = data.techStack.some((tech) => !tech.name.trim());
    if (hasEmptyFields) {
      setError('techStack', {
        type: 'manual',
        message: 'All tech stack fields must be filled.',
      });
      return;
    }
    if (!hasEmptyFields) {
      setIsSubmitting(true);
      setTimeout(() => {
        addFormData(data);
        reset();
        setIsSubmitting(false);
      }, 3000);
    }
  };

  const inputBgColor = useColorModeValue('#D7D7D7', 'gray.600');

  const formWidth = useBreakpointValue({ base: '100%', lg: '50%' });
  const buttonPlacement = useBreakpointValue({ base: 'center', lg: 'end' });

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <Box bg="#F0EBEB" p={10} borderRadius="lg" boxShadow="lg" maxW="container.md" mx="auto" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5} fontWeight="bold">

          <Text fontSize="3xl" fontWeight="bold" color="gray.700">User Details</Text>

          <Stack spacing={5} w="full" p={6} borderRadius="md">

          <Text fontSize="2xl" fontWeight="bold" color="gray.700">Basic Details</Text>

            <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
              <FormControl isInvalid={!!errors.firstName} flex={1}>
                <FormLabel >First Name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  bg={inputBgColor}
                  {...register('firstName', { required: 'First Name is required' })}
                />
                <FormErrorMessage>
                  {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName} flex={1}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  bg={inputBgColor}
                  {...register('lastName', { required: 'Last Name is required' })}
                />
                <FormErrorMessage>
                  {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
              <FormControl isInvalid={!!errors.gender} flex={1}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  id="gender"
                  options={genderOptions}
                  placeholder="Select Gender"
                  value={genderOptions.find(option => option.value === watch('gender'))}
                  {...register('gender', { required: 'Gender is required' })}
                  onChange={(selectedOption) => setValue('gender', selectedOption?.value || '')}
                />
                <FormErrorMessage>
                  {errors.gender && errors.gender.message}
                </FormErrorMessage>

              </FormControl>

              <FormControl isInvalid={!!errors.dateOfBirth} flex={1}>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  id="dateOfBirth"
                  type="date"
                  bg={inputBgColor}
                  max={new Date().toISOString().split('T')[0]}
                  {...register('dateOfBirth', { required: 'Date of Birth is required' })}
                />
                <FormErrorMessage>
                  {errors.dateOfBirth && errors.dateOfBirth.message}
                </FormErrorMessage>
              </FormControl>

            </Flex>

            <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
              <FormControl isInvalid={!!errors.email} flex={1}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  bg={inputBgColor}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Invalid email address'
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.phoneNumber} flex={1}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+91XXXXXXXXXX"
                  bg={inputBgColor}
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+91\d{10}$/,
                      message: 'Phone number must start with +91 and contain 10 digits thereafter'
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.phoneNumber && errors.phoneNumber.message}
                </FormErrorMessage>
              </FormControl>

            </Flex>

            <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <FormControl isInvalid={!!errors.techStack} width={formWidth}>
              <HStack justify="space-between">
                <FormLabel>Tech Stack</FormLabel>
                <IconButton
                  aria-label="Add tech stack"
                  icon={<AddIcon boxSize="15px"/>}
                  onClick={() => {
                    append({ id: `field-${fields.length}`, name: '' });
                  }}
                />
              </HStack>
              {fields?.map((field, index) => (
                <HStack key={field.id} mt={2}>
                  <Input
                    {...register(`techStack.${index}.name` as const, {
                      required: 'Tech stack cannot be empty'
                    })}
                    placeholder="Enter tech stack"
                    bg={inputBgColor}
                  />
                  {index !== 0 && (
                    <IconButton
                      aria-label="Remove tech stack"
                      icon={<CloseIcon />}
                      onClick={() => remove(index)}
                    />
                  )}
                  {/* {errors.techStack && errors.techStack[index]?.name && (
                    <FormErrorMessage>
                      {errors.techStack[index]?.name?.message}
                    </FormErrorMessage>
                  )} */}
                </HStack>
              ))}
              <FormErrorMessage>
                {errors.techStack && typeof errors.techStack === 'object' && 'Some fields are empty'}
              </FormErrorMessage>
            </FormControl>
</Flex>

          
          </Stack>
          
          <Flex width="100%" justifyContent={buttonPlacement} p={4}>
          <Button
              bg="#D7D7D7"
              color="#fff"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting"
              spinnerPlacement="start"
              mt={4}
            >
              Submit
            </Button>
          </Flex>

        </VStack>
      </form>
    </Box>
  );
};

export default UserForm;
