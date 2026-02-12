import { useState } from 'react';
import './Skills.css';

const POPULAR_SKILLS = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'SQL',
    'TypeScript', 'HTML/CSS', 'MongoDB', 'PostgreSQL', 'Docker',
    'Kubernetes', 'AWS', 'Git', 'Data Structures', 'Algorithms',
    'System Design', 'REST APIs', 'GraphQL', 'Redux', 'Express.js'
];

function Skills({ data, onUpdate, onNext, onBack }) {
    const [skills, setSkills] = useState(data.skills || []);
    const [customSkill, setCustomSkill] = useState('');
    const [error, setError] = useState('');

    const addSkill = (skill) => {
        if (!skills.includes(skill)) {
            setSkills(prev => [...prev, skill]);
            setError('');
        }
    };

    const removeSkill = (skill) => {
        setSkills(prev => prev.filter(s => s !== skill));
    };

    const handleAddCustomSkill = () => {
        const trimmedSkill = customSkill.trim();
        if (trimmedSkill === '') return;

        if (skills.includes(trimmedSkill)) {
            setError('Skill already added');
            return;
        }

        addSkill(trimmedSkill);
        setCustomSkill('');
        setError('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustomSkill();
        }
    };

    const handleNext = () => {
        if (skills.length < 3) {
            setError('Please add at least 3 skills');
            return;
        }
        onUpdate({ skills });
        onNext();
    };

    return (
        <div className="skills-step">
            <h2 className="step-title">Skills</h2>
            <p className="step-subtitle">Select or add your technical skills (minimum 3)</p>

            <div className="form-container">
                <div className="form-group">
                    <label className="form-label">
                        Add Custom Skill
                    </label>
                    <div className="skill-input-group">
                        <input
                            type="text"
                            value={customSkill}
                            onChange={(e) => setCustomSkill(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="form-input"
                            placeholder="Type a skill and press Enter"
                        />
                        <button
                            type="button"
                            onClick={handleAddCustomSkill}
                            className="btn-add-skill"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="selected-skills">
                    <label className="form-label">
                        Selected Skills ({skills.length})
                    </label>
                    <div className="skills-chips">
                        {skills.length === 0 ? (
                            <p className="no-skills-message">No skills selected yet</p>
                        ) : (
                            skills.map(skill => (
                                <div key={skill} className="skill-chip selected">
                                    <span>{skill}</span>
                                    <button
                                        onClick={() => removeSkill(skill)}
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
                    <label className="form-label">Popular Skills</label>
                    <div className="skills-chips">
                        {POPULAR_SKILLS.map(skill => (
                            <button
                                key={skill}
                                onClick={() => addSkill(skill)}
                                className={`skill-chip ${skills.includes(skill) ? 'disabled' : ''}`}
                                disabled={skills.includes(skill)}
                            >
                                {skill}
                                {skills.includes(skill) && ' ✓'}
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

export default Skills;
