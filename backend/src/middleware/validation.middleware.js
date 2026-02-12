import Joi from 'joi';

export const onboardingSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters'
    }),

    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email address'
    }),

    contact: Joi.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/).optional().allow('').messages({
        'string.pattern.base': 'Please provide a valid phone number'
    }),

    education: Joi.object({
        degree: Joi.string().required().messages({
            'string.empty': 'Degree is required'
        }),
        institution: Joi.string().required().messages({
            'string.empty': 'Institution is required'
        }),
        graduationYear: Joi.number().integer().min(1950).max(2030).required().messages({
            'number.base': 'Graduation year must be a number',
            'number.min': 'Graduation year must be after 1950',
            'number.max': 'Graduation year cannot be beyond 2030'
        })
    }).required(),

    skills: Joi.array().items(Joi.string()).min(3).required().messages({
        'array.min': 'Please add at least 3 skills',
        'array.base': 'Skills must be an array'
    }),

    interestedCompanies: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.min': 'Please select at least 1 company',
        'array.base': 'Interested companies must be an array'
    })
});

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path[0],
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        next();
    };
};
