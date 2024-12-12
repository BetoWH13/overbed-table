// Decision Tree Questions and Logic
const questions = [
    {
        id: 'primary-use',
        title: 'What is your primary use for the overbed table?',
        options: [
            { id: 'medical', text: 'Medical Care / Recovery', icon: '🏥' },
            { id: 'elderly', text: 'Elderly Care', icon: '👴' },
            { id: 'work', text: 'Work / Study', icon: '💻' }
        ]
    },
    {
        id: 'features',
        title: 'Which feature is most important to you?',
        options: [
            { id: 'height-tilt', text: 'Height & Tilt Adjustment', icon: '📐' },
            { id: 'stability', text: 'Maximum Stability', icon: '🔒' },
            { id: 'storage', text: 'Storage Space', icon: '📦' }
        ]
    },
    {
        id: 'budget',
        title: 'What is your budget range?',
        options: [
            { id: 'economy', text: 'Basic ($50-$100)', icon: '💰' },
            { id: 'mid', text: 'Standard ($100-$200)', icon: '💰💰' },
            { id: 'premium', text: 'Premium ($200+)', icon: '💰💰💰' }
        ]
    }
];

const recommendations = {
    // Medical use recommendations
    'medical_height-tilt_premium': {
        title: 'Premium Medical Overbed Table with Tilt',
        description: 'Professional-grade overbed table with full tilt functionality, perfect for medical recovery',
        features: [
            'Medical-grade construction',
            'Smooth height adjustment',
            'Full tilt-top functionality',
            'Heavy-duty casters with locks'
        ],
        price: '$249.99',
        affiliateLink: 'https://amzn.to/4grgJqD'
    },
    'medical_height-tilt_mid': {
        title: 'Standard Medical Overbed Table',
        description: 'Reliable overbed table with essential features for recovery',
        features: [
            'Height adjustment mechanism',
            'Partial tilt functionality',
            'Stable base with casters',
            'Easy-clean surface'
        ],
        price: '$169.99',
        affiliateLink: 'https://amzn.to/4grgJqD'
    },
    
    // Elderly care recommendations
    'elderly_stability_premium': {
        title: 'Premium Stability-Focused Overbed Table',
        description: 'Extra-stable overbed table designed for elderly care',
        features: [
            'Enhanced stability system',
            'Auto-locking casters',
            'Extra-wide base',
            'One-touch height adjustment'
        ],
        price: '$229.99',
        affiliateLink: 'https://amzn.to/4grgJqD'
    },
    'elderly_stability_mid': {
        title: 'Standard Elderly Care Table',
        description: 'Stable and reliable overbed table for daily use',
        features: [
            'Locking casters',
            'Sturdy construction',
            'Simple height adjustment',
            'Non-slip surface'
        ],
        price: '$149.99',
        affiliateLink: 'https://amzn.to/4grgJqD'
    },

    // Work/Study recommendations
    'work_storage_premium': {
        title: 'Premium Work Station Overbed Table',
        description: 'Professional overbed table with ample storage for work materials',
        features: [
            'Multiple storage compartments',
            'Cable management system',
            'Large work surface',
            'Ergonomic design'
        ],
        price: '$219.99',
        affiliateLink: 'https://amzn.to/4grgJqD'
    },
    'work_storage_mid': {
        title: 'Standard Work Surface Table',
        description: 'Practical overbed table for work and study',
        features: [
            'Side storage pocket',
            'Spacious work area',
            'Height adjustment',
            'Stable platform'
        ],
        price: '$159.99',
        affiliateLink: 'https://amzn.to/4grgJqD'
    }
};

// DOM Elements
const progressBar = document.querySelector('.progress');
const questionContainer = document.getElementById('question-container');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const resultsSection = document.getElementById('results-section');
const recommendationsContainer = document.getElementById('recommendations');

let currentQuestionIndex = 0;
let answers = {};

// Initialize
function init() {
    showQuestion(currentQuestionIndex);
    updateProgress();
}

// Show Question
function showQuestion(index) {
    const question = questions[index];
    const questionHTML = `
        <div class="question">
            <h3>${question.title}</h3>
            <div class="options">
                ${question.options.map(option => `
                    <div class="option" data-id="${option.id}" onclick="selectOption(this)">
                        <span class="option-icon">${option.icon}</span>
                        <span class="option-text">${option.text}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    questionContainer.innerHTML = questionHTML;
}

// Select Option
function selectOption(option) {
    const questionId = questions[currentQuestionIndex].id;
    option.parentElement.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    option.classList.add('selected');
    answers[questionId] = option.dataset.id;
}

// Update Progress
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index <= currentQuestionIndex) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Navigation
nextButton.addEventListener('click', () => {
    const selectedOption = questionContainer.querySelector('.option.selected');
    if (!selectedOption) {
        alert('Please select an option to continue');
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
        if (currentQuestionIndex > 0) {
            prevButton.style.display = 'block';
        }
    } else {
        showResults();
    }
});

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
        if (currentQuestionIndex === 0) {
            prevButton.style.display = 'none';
        }
    }
});

// Show Results
function showResults() {
    document.getElementById('decision-tree').style.display = 'none';
    resultsSection.style.display = 'block';

    // Get recommendation key based on answers
    const recommendationKey = `${answers['primary-use']}_${answers['features']}_${answers['budget']}`;
    const recommendation = recommendations[recommendationKey] || recommendations[`${answers['primary-use']}_${answers['features']}_mid`];

    const resultsHTML = `
        <div class="recommendation-card">
            <h2>${recommendation.title}</h2>
            <p class="description">${recommendation.description}</p>
            <div class="features-list">
                <h3>Key Features:</h3>
                <ul>
                    ${recommendation.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="price">${recommendation.price}</div>
            <a href="${recommendation.affiliateLink}" class="cta-button primary" target="_blank" rel="nofollow sponsored">
                View on Amazon <span class="arrow">→</span>
            </a>
            <p class="disclaimer">*As an affiliate, we earn from qualifying purchases</p>
        </div>
    `;

    recommendationsContainer.innerHTML = resultsHTML;
}

// Initialize the decision tree
init();
