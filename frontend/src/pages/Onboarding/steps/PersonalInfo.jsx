import { useState } from 'react';
import './PersonalInfo.css';

function PersonalInfo({ data, onUpdate, onNext, onBack }) {
    const [formData, setFormData] = useState({
        name: data.name || '',
        email: data.email || '',
        contact: data.contact || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (formData.contact && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.contact)) {
            newErrors.contact = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            onUpdate(formData);
            onNext();
        }
    };

    return (
        <div className="personal-info-step">
            <h2 className="step-title">Personal Information</h2>
            <p className="step-subtitle">Let's start with the basics</p>

            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Full Name <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email Address <span className="required">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="your.email@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="contact" className="form-label">
                        Phone Number <span className="optional">(Optional)</span>
                    </label>
                    <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className={`form-input ${errors.contact ? 'input-error' : ''}`}
                        placeholder="+1 (234) 567-8900"
                    />
                    {errors.contact && <span className="error-message">{errors.contact}</span>}
                </div>
            </div>

            <div className="button-group">
                <button onClick={onBack} className="btn-secondary">
                    Back
                </button>
                <button onClick={handleNext} className="btn-primary">
                    Next
                </button>
            </div>
        </div>
    );
}

export default PersonalInfo;
