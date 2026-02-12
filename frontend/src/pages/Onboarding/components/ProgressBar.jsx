import './ProgressBar.css';

function ProgressBar({ currentStep, totalSteps }) {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="progress-text">
                Step {currentStep} of {totalSteps}
            </div>
        </div>
    );
}

export default ProgressBar;
