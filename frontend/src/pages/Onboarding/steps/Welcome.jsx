import './Welcome.css';

function Welcome({ onNext }) {
    return (
        <div className="welcome-step">
            <div className="welcome-content">
                <div className="welcome-icon">🚀</div>
                <h1 className="welcome-title">Welcome to PrepFox AI</h1>
                <p className="welcome-subtitle">
                    Your journey from learning to hiring starts here
                </p>

                <div className="welcome-features">
                    <div className="feature-item">
                        <span className="feature-icon">💻</span>
                        <span>Practice coding problems</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">🤖</span>
                        <span>AI-powered interview coaching</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">📄</span>
                        <span>Build ATS-optimized resumes</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">📊</span>
                        <span>Track your progress</span>
                    </div>
                </div>

                <button onClick={onNext} className="btn-primary btn-large">
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default Welcome;
