import { useState } from 'react';
import './Review.css';

function Review({ data, onBack, onSubmit }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');

        try {
            await onSubmit(data);
        } catch (err) {
            setError(err.message || 'Failed to submit. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="review-step">
            <h2 className="step-title">Review Your Information</h2>
            <p className="step-subtitle">Please review your details before submitting</p>

            <div className="review-container">
                <div className="review-section">
                    <h3 className="review-section-title">Personal Information</h3>
                    <div className="review-item">
                        <span className="review-label">Name:</span>
                        <span className="review-value">{data.name}</span>
                    </div>
                    <div className="review-item">
                        <span className="review-label">Email:</span>
                        <span className="review-value">{data.email}</span>
                    </div>
                    {data.contact && (
                        <div className="review-item">
                            <span className="review-label">Contact:</span>
                            <span className="review-value">{data.contact}</span>
                        </div>
                    )}
                </div>

                <div className="review-section">
                    <h3 className="review-section-title">Education</h3>
                    <div className="review-item">
                        <span className="review-label">Degree:</span>
                        <span className="review-value">{data.education?.degree}</span>
                    </div>
                    <div className="review-item">
                        <span className="review-label">Institution:</span>
                        <span className="review-value">{data.education?.institution}</span>
                    </div>
                    <div className="review-item">
                        <span className="review-label">Graduation Year:</span>
                        <span className="review-value">{data.education?.graduationYear}</span>
                    </div>
                </div>

                <div className="review-section">
                    <h3 className="review-section-title">Skills ({data.skills?.length || 0})</h3>
                    <div className="review-chips">
                        {data.skills?.map(skill => (
                            <span key={skill} className="review-chip">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="review-section">
                    <h3 className="review-section-title">Interested Companies ({data.interestedCompanies?.length || 0})</h3>
                    <div className="review-chips">
                        {data.interestedCompanies?.map(company => (
                            <span key={company} className="review-chip">{company}</span>
                        ))}
                    </div>
                </div>
            </div>

            {error && (
                <div className="error-banner">
                    {error}
                </div>
            )}

            <div className="button-group">
                <button
                    onClick={onBack}
                    className="btn-secondary"
                    disabled={isSubmitting}
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit & Get Started'}
                </button>
            </div>
        </div>
    );
}

export default Review;
