import { useState } from 'react';
import './Skills.css';

const TOP_COMPANIES = [
    'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta',
    'Netflix', 'Tesla', 'Uber', 'Airbnb', 'Adobe',
    'Salesforce', 'Oracle', 'IBM', 'Intel', 'NVIDIA',
    'Twitter', 'LinkedIn', 'Spotify', 'Dropbox', 'Zoom'
];

function InterestedCompanies({ data, onUpdate, onNext, onBack }) {
    const [companies, setCompanies] = useState(data.interestedCompanies || []);
    const [customCompany, setCustomCompany] = useState('');
    const [error, setError] = useState('');

    const addCompany = (company) => {
        if (!companies.includes(company)) {
            setCompanies(prev => [...prev, company]);
            setError('');
        }
    };

    const removeCompany = (company) => {
        setCompanies(prev => prev.filter(c => c !== company));
    };

    const handleAddCustomCompany = () => {
        const trimmed = customCompany.trim();
        if (trimmed === '') return;

        if (companies.includes(trimmed)) {
            setError('Company already added');
            return;
        }

        addCompany(trimmed);
        setCustomCompany('');
        setError('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustomCompany();
        }
    };

    const handleNext = () => {
        if (companies.length < 1) {
            setError('Please select at least 1 company');
            return;
        }
        onUpdate({ interestedCompanies: companies });
        onNext();
    };

    return (
        <div className="companies-step">
            <h2 className="step-title">Interested Companies</h2>
            <p className="step-subtitle">Which companies are you interested in? (minimum 1)</p>

            <div className="form-container">
                <div className="form-group">
                    <label className="form-label">
                        Add Custom Company
                    </label>
                    <div className="skill-input-group">
                        <input
                            type="text"
                            value={customCompany}
                            onChange={(e) => setCustomCompany(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="form-input"
                            placeholder="Type a company name and press Enter"
                        />
                        <button
                            type="button"
                            onClick={handleAddCustomCompany}
                            className="btn-add-skill"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="selected-skills">
                    <label className="form-label">
                        Selected Companies ({companies.length})
                    </label>
                    <div className="skills-chips">
                        {companies.length === 0 ? (
                            <p className="no-skills-message">No companies selected yet</p>
                        ) : (
                            companies.map(company => (
                                <div key={company} className="skill-chip selected">
                                    <span>{company}</span>
                                    <button
                                        onClick={() => removeCompany(company)}
                                        className="remove-skill"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="popular-skills">
                    <label className="form-label">Top Tech Companies</label>
                    <div className="skills-chips">
                        {TOP_COMPANIES.map(company => (
                            <button
                                key={company}
                                onClick={() => addCompany(company)}
                                className={`skill-chip ${companies.includes(company) ? 'disabled' : ''}`}
                                disabled={companies.includes(company)}
                            >
                                {company}
                                {companies.includes(company) && ' ✓'}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <span className="error-message">{error}</span>}
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

export default InterestedCompanies;
