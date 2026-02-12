import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import Welcome from './steps/Welcome';
import PersonalInfo from './steps/PersonalInfo';
import Education from './steps/Education';
import Skills from './steps/Skills';
import InterestedCompanies from './steps/InterestedCompanies';
import Review from './steps/Review';
import { registerUser } from '../../services/onboarding.service';
import './OnboardingPage.css';

const TOTAL_STEPS = 6;

function OnboardingPage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        education: {
            degree: '',
            institution: '',
            graduationYear: ''
        },
        skills: [],
        interestedCompanies: []
    });

    const updateFormData = (data) => {
        setFormData(prev => ({
            ...prev,
            ...data
        }));
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async (data) => {
        try {
            const response = await registerUser(data);
            console.log('Registration successful:', response);

            // Navigate to home page on success
            navigate('/home');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Welcome onNext={nextStep} />;
            case 2:
                return (
                    <PersonalInfo
                        data={formData}
                        onUpdate={updateFormData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 3:
                return (
                    <Education
                        data={formData}
                        onUpdate={updateFormData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 4:
                return (
                    <Skills
                        data={formData}
                        onUpdate={updateFormData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 5:
                return (
                    <InterestedCompanies
                        data={formData}
                        onUpdate={updateFormData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 6:
                return (
                    <Review
                        data={formData}
                        onBack={prevStep}
                        onSubmit={handleSubmit}
                    />
                );
            default:
                return <Welcome onNext={nextStep} />;
        }
    };

    return (
        <div className="onboarding-page">
            {/* Left Sidebar */}
            <div className="onboarding-sidebar">
                <div className="sidebar-content">
                    <div className="sidebar-logo">
                        <div className="logo-icon">🦊</div>
                        <div className="logo-text">
                            <h1>PrepFox AI</h1>
                            <p>Learn. Practice. Get Hired.</p>
                        </div>
                    </div>

                    <div className="sidebar-features">
                        <h2>Everything you need</h2>
                        <div className="feature-list">
                            <div className="feature-item-sidebar">
                                <div className="feature-icon-sidebar">💻</div>
                                <div className="feature-content">
                                    <h3>Practice Coding</h3>
                                    <p>Master DSA, System Design, and more with real interview questions</p>
                                </div>
                            </div>
                            <div className="feature-item-sidebar">
                                <div className="feature-icon-sidebar">🤖</div>
                                <div className="feature-content">
                                    <h3>AI Interview Coach</h3>
                                    <p>Get personalized feedback on behavioral and technical interviews</p>
                                </div>
                            </div>
                            <div className="feature-item-sidebar">
                                <div className="feature-icon-sidebar">📄</div>
                                <div className="feature-content">
                                    <h3>Resume Builder</h3>
                                    <p>Create ATS-optimized resumes that get you noticed</p>
                                </div>
                            </div>
                            <div className="feature-item-sidebar">
                                <div className="feature-icon-sidebar">📊</div>
                                <div className="feature-content">
                                    <h3>Track Progress</h3>
                                    <p>Monitor your improvement with detailed analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <p>© 2026 PrepFox AI. All rights reserved.</p>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="onboarding-container">
                {currentStep > 1 && (
                    <div className="progress-section">
                        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
                    </div>
                )}
                <div className="step-content">
                    <div className="step-wrapper">
                        {renderStep()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnboardingPage;
