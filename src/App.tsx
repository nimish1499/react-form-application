// App.tsx
import React, { useRef, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { FormDataProvider, useFormDataContext } from './context/FormContext';
import UserForm from './components/UserForm';
import ResultDisplay from './components/ResultDisplay';

const App = () => {
  const { submissionNotified } = useFormDataContext();
  const resultDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submissionNotified && resultDisplayRef.current) {
      resultDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [submissionNotified]);

  return (
    <ChakraProvider>
      <FormDataProvider>
        <UserForm />
        <div ref={resultDisplayRef}>
          <ResultDisplay />
        </div>
      </FormDataProvider>
    </ChakraProvider>
  );
};

export default App;
