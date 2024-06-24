import { REACT_NATIVE_APP_API_URL } from '@env';

export const validateProduct = async (id, name, description, logo, releaseDate, edit) => {
    const checkIdExistence = async () => {
        try {
            const response = await fetch(`${REACT_NATIVE_APP_API_URL}/bp/products/${id}`);
            return response.ok;
        } catch (error) {
            console.error('Error checking product ID existence:', error);
            return false; // Return false if there's an error
        }
    };

    let errors = {};

    // Validate ID
    if (!id) {
        errors.id = 'This field is required';
    } else if (id.length < 3 || id.length > 10) {
        errors.id = 'Invalid ID length (must be between 3 and 10 characters)';
    } else if (edit !== 'edit') {
        const idExists = await checkIdExistence(); // Call the async function here and await the result
        if (idExists) {
            errors.id = 'ID already exists';
        }
    }


    // Validate Name
    if (!name) {
        errors.name = 'This field is required';
    } else if (name.length < 5 || name.length > 100) {
        errors.name = 'Invalid name length (must be between 5 and 100 characters)';
    }

    // Validate Description
    if (!description) {
        errors.description = 'This field is required';
    } else if (description.length < 10 || description.length > 200) {
        errors.description = 'Invalid description length (must be between 10 and 200 characters)';
    }

    // Validate Logo
    if (!logo) {
        errors.logo = 'This field is required';
    }

    // Validate Release Date
    if (!releaseDate) {
        errors.releaseDate = 'This field is required';
    } else {
        // Check format dd/mm/yyyy using regular expression
        const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateFormat.test(releaseDate)) {
            errors.releaseDate = 'Invalid date format. Should be dd/mm/yyyy';
        } else {
            // Split date into day, month, and year
            const [day, month, year] = releaseDate.split('/');

            // Create a Date object with the input date
            const inputDate = new Date(`${year}-${month}-${day}`);

            // Get current date
            const currentDate = new Date();

            // Compare dates
            if (inputDate < currentDate) {
                errors.releaseDate = 'Release date must be equal to or later than the current date';
            }
        }
    }

    return errors;
};