
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  techStack: Array<{ id: string; name: string }>;
}

interface FormDataContextProps {
  formDataArray: FormData[];
  addFormData: (newFormData: FormData) => void;
  notifySubmission: () => void;
  submissionNotified: boolean;
}

const FormDataContext = createContext<FormDataContextProps>({
  formDataArray: [],
  addFormData: () => {},
  notifySubmission: () => {},
  submissionNotified: false,
});

export const FormDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formDataArray, setFormDataArray] = useState<FormData[]>([]);
  const [submissionNotified, setSubmissionNotified] = useState(false);

  const addFormData = (newFormData: FormData) => {
    setFormDataArray(prev => [...prev, newFormData]);
    notifySubmission();
  };

  const notifySubmission = useCallback(() => {
    setSubmissionNotified(true);
    setTimeout(() => setSubmissionNotified(false), 100);
  }, []);

  return (
    <FormDataContext.Provider value={{ formDataArray, addFormData, notifySubmission, submissionNotified }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormDataContext = () => useContext(FormDataContext);
