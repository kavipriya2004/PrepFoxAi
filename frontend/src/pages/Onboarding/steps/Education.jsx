import { useState } from 'react';
import './PersonalInfo.css';

function Education({ data, onUpdate, onNext, onBack }) {
    const [formData, setFormData] = useState({
        degree: data.education?.degree || '',
        institution: data.education?.institution || '',
        graduationYear: data.education?.graduationYear || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.degree.trim()) {
            newErrors.degree = 'Degree is required';
        }

        if (!formData.institution.trim()) {
            newErrors.institution = 'Institution is required';
        }

        const year = parseInt(formData.graduationYear);
        if (!formData.graduationYear) {
            newErrors.graduationYear = 'Graduation year is required';
        } else if (isNaN(year) || year < 1950 || year > 2030) {
            newErrors.graduationYear = 'Please enter a valid year (1950-2030)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            onUpdate({
                education: {
                    degree: formData.degree,
                    institution: formData.institution,
                    graduationYear: parseInt(formData.graduationYear)
                }
            });
            onNext();
        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 80 }, (_, i) => currentYear + 10 - i);

    return (
        <div className="education-step">
            <h2 className="step-title">Education</h2>
            <p className="step-subtitle">Tell us about your educational background</p>

            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="degree" className="form-label">
                        Degree <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className={`form-input ${errors.degree ? 'input-error' : ''}`}
                        placeholder="e.g., Bachelor of Computer Science"
                    />
                    {errors.degree && <span className="error-message">{errors.degree}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="institution" className="form-label">
                        Institution <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className={`form-input ${errors.institution ? 'input-error' : ''}`}
                        placeholder="e.g., MIT"
                    />
                    {errors.institution && <span className="error-message">{errors.institution}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="graduationYear" className="form-label">
                        Graduation Year <span className="required">*</span>
                    </label>
                    <select
                        id="graduationYear"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        className={`form-select ${errors.graduationYear ? 'input-error' : ''}`}
                    >
                        <option value="">Select year</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    {errors.graduationYear && <span className="error-message">{errors.graduationYear}</span>}
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

export default Education;
