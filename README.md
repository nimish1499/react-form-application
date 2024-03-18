# React Form Application with Multiple User Submissions

This React application enables the submission of user details through a form and displays all submitted entries. Built with TypeScript, it utilizes Context for global state management, ensuring an efficient way to pass and display data across components. The application supports adding details for more than one user and viewing all users that have been added thus far.

## Deployment:

The live version of this project - https://user-details-typescript.netlify.app/.

## Key Features

- **Multiple User Submissions:** Users can submit details for multiple individuals, and each submission is added to a list of all users.
- **Custom Select Component:** Features a custom dropdown component created with chakra-react-select, including a green check icon for selected options, adhering to specific UI requirements.
- **Global State Management:** Employs React Context for state management, avoiding props drilling and enhancing data flow across components.
- **Responsive Design:** The form is responsive, providing a seamless experience across various devices.
- **Comprehensive Form Validation:** Utilizes react-hook-form for robust form handling and validation, offering custom validation messages.
- **Dynamic Tech Stack Inputs:** Allows for the dynamic addition and removal of tech stack fields, maintaining a minimum of one field.
- **Loading State on Submission:** Displays a loading spinner inside the submit button for three seconds upon form submission, simulating data processing.
- **Error Handling:** Implements comprehensive error handling, displaying specific messages for different validation failures.
- **Accessibility Focused:** Adheres to accessibility standards, ensuring the form is usable for a broad audience.

## Technologies and Libraries Used

- **TypeScript:** For type-checking and enhancing code maintainability.
- **Chakra UI:** Provides a comprehensive set of React components designed for creating intuitive and responsive UIs.
- **React Hook Form (v7.39):** Facilitates efficient and easy form handling with built-in validation.
- **Chakra-React-Select (v3.3.1):** Used for enhancing the custom select component with Chakra UI styling.

### Installation and Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/nimish1499/react-form-application.git

2. Navigate to the project directory:
   ```sh
     cd react-form-application(project-name)
3. Install the Dependencies:
   ```sh
   npm i 
4. Running the Application:
   ```sh
   npm start
