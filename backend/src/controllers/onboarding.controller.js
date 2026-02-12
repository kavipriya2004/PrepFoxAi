import { createUser, checkEmailExists } from '../models/User.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, contact, education, skills, interestedCompanies } = req.body;

        // Check if email already exists
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create user
        const result = await createUser({
            name,
            email,
            contact,
            education,
            skills,
            interestedCompanies
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: result.user.id,
            redirectTo: '/home'
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to register user',
            error: error.message
        });
    }
};

export const checkEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const exists = await checkEmailExists(email);

        res.json({
            exists
        });

    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check email',
            error: error.message
        });
    }
};
