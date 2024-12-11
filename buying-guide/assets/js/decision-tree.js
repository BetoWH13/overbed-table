// Decision Tree Questions and Logic
const questions = [
    {
        id: 'primary-use',
        title: 'What is your primary use for the overbed table?',
        options: [
            { id: 'medical', text: 'Medical Care / Recovery', icon: '🏥' },
            { id: 'work', text: 'Work / Study', icon: '💻' },
            { id: 'elderly', text: 'Elderly Care', icon: '👴' },
            { id: 'general', text: 'General Use', icon: '🏠' }
        ]
    },
    {
        id: 'weight-capacity',
        title: 'What weight capacity do you need?',
        options: [
            { id: 'standard', text: 'Standard (up to 50 lbs)', icon: '⚖️' },
            { id: 'heavy', text: 'Heavy Duty (up to 100 lbs)', icon: '⚖️⚖️' },
            { id: 'bariatric', text: 'Bariatric (100+ lbs)', icon: '⚖️⚖️⚖️' }
        ]
    },
    {
        id: 'stability',
        title: 'What type of stability features do you need?',
        options: [
            { id: 'basic', text: 'Basic (Standard Wheels)', icon: '🔄' },
            { id: 'locking', text: 'Locking Wheels', icon: '🔒' },
            { id: 'advanced', text: 'Advanced (Auto-Locking)', icon: '🔐' }
        ]
    },
    {
        id: 'features',
        title: 'Which additional features are important to you?',
        options: [
            { id: 'height', text: 'Height Adjustment', icon: '📏' },
            { id: 'tilt', text: 'Tilt Function', icon: '📐' },
            { id: 'side-guards', text: 'Side Guards', icon: '🛡️' },
            { id: 'storage', text: 'Storage Space', icon: '📦' }
        ],
        multiple: true
    },
    {
        id: 'budget',
        title: 'What is your budget range?',
        options: [
            { id: 'economy', text: 'Economy ($50-$100)', icon: '💰' },
            { id: 'mid', text: 'Mid-Range ($100-$200)', icon: '💰💰' },
            { id: 'premium', text: 'Premium ($200+)', icon: '💰💰💰' }
        ]
    }
];

const recommendations = {
    'medical-heavy-advanced': {
        title: 'Professional Medical Overbed Table',
        features: [
            'Hospital-grade construction',
            'Auto-locking casters',
            'Heavy-duty weight capacity (100 lbs)',
            'Side guards for added safety',
            'Easy-clean antimicrobial surface'
        ],
        safetyFeatures: [
            'Auto-locking brake system',
            'Anti-tip design',
            'Rounded corners for safety',
            'Non-slip surface coating'
        ],
        price: '$249.99',
        image: '/assets/images/products/medical-premium.jpg'
    },
    'elderly-locking-basic': {
        title: 'Senior-Friendly Overbed Table',
        features: [
            'Easy-grip height adjustment',
            'Locking caster wheels',
            'Standard weight capacity (50 lbs)',
            'Large ergonomic handle'
        ],
        safetyFeatures: [
            'High-visibility safety markers',
            'Stable four-point base',
            'Easy-lock wheel system',
            'Smooth edge design'
        ],
        price: '$179.99',
        image: '/assets/images/products/elderly-friendly.jpg'
    },
    'work-standard-basic': {
        title: 'Ergonomic Work Station Table',
        features: [
            'Adjustable tilt top',
            'Cable management system',
            'Standard weight capacity',
            'Built-in storage'
        ],
        safetyFeatures: [
            'Cable organization system',
            'Stability cross-bars',
            'Non-slip surface',
            'Weight distribution indicators'
        ],
        price: '$159.99',
        image: '/assets/images/products/work-station.jpg'
    }
};

const scenarios = {
    'medical-recovery': {
        title: 'Post-Surgery Recovery',
        description: 'Ideal for patients recovering from surgery or medical procedures',
        requirements: [
            'Easy height adjustment for nurse access',
            'Stable base for medical equipment',
            'Smooth-rolling casters for mobility',
            'Easy-clean surfaces for hygiene'
        ],
        recommendedFeatures: [
            'Auto-locking wheels',
            'Side rails for safety',
            'Spill-proof surface',
            'Height adjustment range: 28-45 inches'
        ]
    },
    'long-term-care': {
        title: 'Long-term Bed Care',
        description: 'Perfect for individuals requiring extended bed rest or long-term care',
        requirements: [
            'Durable construction for daily use',
            'Multiple surface angles for various activities',
            'Extra storage for medical supplies',
            'Enhanced stability features'
        ],
        recommendedFeatures: [
            'Split-top design',
            'Built-in storage drawers',
            'Heavy-duty frame',
            'Weight capacity: 100+ lbs'
        ]
    },
    'work-study': {
        title: 'Work/Study From Bed',
        description: 'Designed for professionals and students working remotely from bed',
        requirements: [
            'Ergonomic positioning for laptops',
            'Cable management system',
            'Adequate workspace',
            'Tilt adjustment for screens'
        ],
        recommendedFeatures: [
            'Large work surface',
            'USB ports and power options',
            'Adjustable tilt top',
            'Cooling pad compatibility'
        ]
    },
    'elderly-care': {
        title: 'Elderly Care',
        description: 'Specialized features for senior comfort and safety',
        requirements: [
            'Simple, intuitive controls',
            'Enhanced stability',
            'Easy-grip handles',
            'Visual safety markers'
        ],
        recommendedFeatures: [
            'One-touch height adjustment',
            'Extra-wide base',
            'High-contrast safety features',
            'Rounded edges for safety'
        ]
    },
    'bariatric-use': {
        title: 'Bariatric Care',
        description: 'Heavy-duty solutions for bariatric patients',
        requirements: [
            'Reinforced frame construction',
            'Extra-wide surface area',
            'Enhanced weight capacity',
            'Stability at extended reach'
        ],
        recommendedFeatures: [
            'Weight capacity: 500+ lbs',
            'Wider base for stability',
            'Heavy-duty casters',
            'Reinforced height adjustment'
        ]
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
    questionContainer.innerHTML = `
        <div class="question">
            <h3>${question.title}</h3>
            <div class="options">
                ${question.options.map(option => `
                    <div class="option" data-id="${option.id}">
                        <span class="icon">${option.icon}</span>
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Add event listeners to options
    const options = questionContainer.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => selectOption(option, question.multiple));
    });

    // Update buttons
    prevButton.style.display = index === 0 ? 'none' : 'block';
    nextButton.textContent = index === questions.length - 1 ? 'See Results' : 'Next';
}

// Select Option
function selectOption(option, multiple = false) {
    const questionId = questions[currentQuestionIndex].id;
    
    if (!multiple) {
        // Single selection
        option.parentElement.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        answers[questionId] = option.dataset.id;
    } else {
        // Multiple selection
        option.classList.toggle('selected');
        answers[questionId] = Array.from(option.parentElement.querySelectorAll('.option.selected'))
            .map(opt => opt.dataset.id);
    }
}

// Update Progress
function updateProgress() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
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
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
    } else {
        showResults();
    }
});

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
});

// Show Results
function showResults() {
    document.getElementById('decision-tree').style.display = 'none';
    resultsSection.style.display = 'block';

    // Get recommended products and relevant scenarios
    const recommendedProducts = getRecommendations(answers);
    const relevantScenarios = getRelevantScenarios(answers);
    
    // Display scenarios first
    const scenariosHTML = `
        <div class="scenarios-section">
            <h2>Recommended Use Cases</h2>
            <div class="scenarios-grid">
                ${relevantScenarios.map(scenario => `
                    <div class="scenario-card">
                        <h3>${scenario.title}</h3>
                        <p class="scenario-description">${scenario.description}</p>
                        <div class="requirements">
                            <h4>Key Requirements</h4>
                            <ul>
                                ${scenario.requirements.map(req => `<li>${req}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="recommended-features">
                            <h4>Recommended Features</h4>
                            <ul>
                                ${scenario.recommendedFeatures.map(feat => `<li>${feat}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="amazon-cta-section">
            <div class="amazon-cta-content">
                <h2>Ready to Find Your Perfect Overbed Table?</h2>
                <p>Browse our curated selection of top-rated overbed tables on Amazon</p>
                <div class="cta-features">
                    <div class="cta-feature">
                        <span class="feature-icon">✓</span>
                        <span>Verified Reviews</span>
                    </div>
                    <div class="cta-feature">
                        <span class="feature-icon">🚚</span>
                        <span>Fast Prime Shipping</span>
                    </div>
                    <div class="cta-feature">
                        <span class="feature-icon">💰</span>
                        <span>Competitive Prices</span>
                    </div>
                </div>
                <a href="https://amzn.to/4grgJqD" class="btn btn-amazon" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/amazon-logo.svg" alt="Amazon" class="amazon-logo">
                    Shop on Amazon
                </a>
            </div>
        </div>
    `;

    // Display product recommendations
    const productsHTML = `
        <div class="products-section">
            <h2>Recommended Products</h2>
            <div class="recommendations">
                ${recommendedProducts.map(product => `
                    <div class="recommendation-card">
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <ul class="features">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <ul class="safety-features">
                            ${product.safetyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <div class="price">${product.price}</div>
                        <a href="#" class="btn btn-primary">Learn More</a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Update the results container
    recommendationsContainer.innerHTML = scenariosHTML + productsHTML;
}

// Function to get relevant scenarios based on user answers
function getRelevantScenarios(answers) {
    const use = answers['primary-use'];
    const weightCapacity = answers['weight-capacity'];
    
    let relevantScenarios = [];
    
    // Add primary scenario based on use
    switch(use) {
        case 'medical':
            relevantScenarios.push(scenarios['medical-recovery']);
            relevantScenarios.push(scenarios['long-term-care']);
            break;
        case 'work':
            relevantScenarios.push(scenarios['work-study']);
            break;
        case 'elderly':
            relevantScenarios.push(scenarios['elderly-care']);
            break;
    }

    // Add bariatric scenario if heavy weight capacity is selected
    if (weightCapacity === 'bariatric') {
        relevantScenarios.push(scenarios['bariatric-use']);
    }

    return relevantScenarios;
}

// Get Recommendations based on answers
function getRecommendations(answers) {
    // Simple recommendation logic - can be expanded based on needs
    const use = answers['primary-use'];
    const weightCapacity = answers['weight-capacity'];
    const stability = answers['stability'];
    const features = answers['features'] || [];
    const budget = answers['budget'];

    // For now, return all recommendations (this should be replaced with actual logic)
    return Object.values(recommendations);
}

// Initialize the decision tree
init();
