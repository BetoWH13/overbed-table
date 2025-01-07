// Configuration object for recommendations
const RECOMMENDATIONS = {
    activities: {
        working: {
            title: 'Workspace Setup',
            tips: [
                'Position the table surface at elbow height when seated',
                'Ensure adequate space for keyboard and mouse if using a computer',
                'Consider a tilting surface for better screen viewing angles'
            ]
        },
        eating: {
            title: 'Dining Setup',
            tips: [
                'Position the table slightly lower than elbow height for comfortable eating',
                'Ensure the table is stable and can support dining items',
                'Choose a waterproof surface for easy cleaning'
            ]
        },
        reading: {
            title: 'Reading Setup',
            tips: [
                'Adjust table height to reduce neck strain',
                'Consider a tilting surface for books or tablets',
                'Position the table to minimize glare on reading materials'
            ]
        },
        crafting: {
            title: 'Crafting Setup',
            tips: [
                'Ensure ample surface area for materials',
                'Position the table to allow for detailed work',
                'Consider additional storage solutions for supplies'
            ]
        }
    },
    weights: {
        light: 'Standard table weight capacity is sufficient.',
        medium: 'Ensure table has a minimum weight capacity of 25 pounds.',
        heavy: 'Choose a heavy-duty table with reinforced support and at least 50 pounds capacity.'
    },
    positions: {
        sitting: 'Maintain 90-degree elbow angle when working.',
        lying: 'Use a table with full height and tilt adjustment capabilities.',
        mixed: 'Choose a table with easy height adjustment mechanisms for different positions.'
    },
    lighting: {
        bright: 'Position table to minimize screen glare and shadows.',
        dim: 'Consider an attachable LED lamp with adjustable brightness.',
        varied: 'Choose a position with consistent lighting or use adjustable lighting solutions.'
    },
    products: {
        standard: {
            title: "Best-Selling Overbed Table",
            description: "Versatile and reliable overbed table perfect for daily use. Features smooth height adjustment and stable design.",
            link: "https://shrsl.com/4s78c",
            tags: {
                eating: "Ideal for meals",
                reading: "Perfect for reading",
                working: "Great for laptops",
                light: "Suitable for light items",
                medium: "Supports medium weight",
                sitting: "Optimal for sitting position"
            }
        },
        heavyDuty: {
            title: "Heavy-Duty Overbed Table",
            description: "Extra sturdy construction with enhanced stability. Perfect for intensive use and heavier items.",
            link: "https://shrsl.com/4s78c",
            tags: {
                crafting: "Perfect for crafting",
                working: "Ideal for workstation",
                heavy: "Supports heavy items",
                mixed: "Stable in any position",
                lying: "Great for bed use"
            }
        }
    }
};

// Initialize height slider
document.addEventListener('DOMContentLoaded', function() {
    const heightSlider = document.getElementById('height');
    const heightValue = document.getElementById('height-value');
    
    // Update height value display
    heightSlider.addEventListener('input', function() {
        heightValue.textContent = this.value;
    });

    // Add input validation and real-time feedback
    const inputs = document.querySelectorAll('select, input[type="radio"]');
    inputs.forEach(input => {
        input.addEventListener('change', validateForm);
    });
});

// Validate form and update UI
function validateForm() {
    const submitBtn = document.getElementById('submit-btn');
    const allInputs = {
        activity: document.getElementById('activity').value,
        weight: document.getElementById('weight').value,
        position: document.querySelector('input[name="position"]:checked')?.value,
        lighting: document.getElementById('lighting').value
    };

    const isValid = Object.values(allInputs).every(value => value);
    submitBtn.disabled = !isValid;
    submitBtn.style.opacity = isValid ? '1' : '0.6';
}

// Generate product recommendations HTML
function generateProductRecommendations(formData) {
    const productCards = [];
    const { activity, weight, position } = formData;
    
    // Determine which products to show and their relevance
    const products = RECOMMENDATIONS.products;
    
    // Logic for standard table
    const standardRelevant = weight !== 'heavy' || ['eating', 'reading'].includes(activity);
    if (standardRelevant) {
        const relevantTags = [];
        if (products.standard.tags[activity]) relevantTags.push(products.standard.tags[activity]);
        if (products.standard.tags[weight]) relevantTags.push(products.standard.tags[weight]);
        if (products.standard.tags[position]) relevantTags.push(products.standard.tags[position]);
        
        productCards.push(createProductCard(products.standard, relevantTags));
    }
    
    // Logic for heavy-duty table
    const heavyDutyRelevant = weight === 'heavy' || activity === 'crafting' || position === 'lying';
    if (heavyDutyRelevant) {
        const relevantTags = [];
        if (products.heavyDuty.tags[activity]) relevantTags.push(products.heavyDuty.tags[activity]);
        if (products.heavyDuty.tags[weight]) relevantTags.push(products.heavyDuty.tags[weight]);
        if (products.heavyDuty.tags[position]) relevantTags.push(products.heavyDuty.tags[position]);
        
        productCards.push(createProductCard(products.heavyDuty, relevantTags));
    }
    
    return productCards.join('');
}

// Create product card HTML
function createProductCard(product, tags) {
    const tagsHtml = tags.length 
        ? tags.map(tag => `<span class="recommendation-tag">${tag}</span>`).join('') 
        : '';
        
    return `
        <div class="product-card">
            ${tagsHtml}
            <h4>${product.title}</h4>
            <p>${product.description}</p>
            <a href="${product.link}" class="cta-button" target="_blank" rel="nofollow">
                View on Amazon
            </a>
        </div>
    `;
}

// Main form submission handler
document.getElementById('submit-btn').addEventListener('click', function() {
    const formData = {
        activity: document.getElementById('activity').value,
        weight: document.getElementById('weight').value,
        position: document.querySelector('input[name="position"]:checked')?.value,
        height: document.getElementById('height').value,
        lighting: document.getElementById('lighting').value
    };

    if (!formData.activity || !formData.weight || !formData.position || !formData.lighting) {
        alert('Please complete all steps before getting recommendations.');
        return;
    }

    // Generate recommendations
    const recommendations = [];
    
    // Add activity-specific recommendations
    const activityRecs = RECOMMENDATIONS.activities[formData.activity];
    if (activityRecs) {
        recommendations.push(`<li class="recommendation-header">${activityRecs.title}</li>`);
        activityRecs.tips.forEach(tip => recommendations.push(`<li>${tip}</li>`));
    }

    // Add height recommendation
    recommendations.push(`<li>Optimal table height: ${formData.height} inches</li>`);

    // Display results
    const results = document.getElementById('results');
    const recommendationsList = document.getElementById('recommendations');
    recommendationsList.innerHTML = recommendations.join('');
    
    // Display product recommendations
    const productRecommendationsContainer = document.getElementById('product-recommendations');
    productRecommendationsContainer.innerHTML = generateProductRecommendations(formData);
    
    // Show results with animation
    results.style.display = 'block';
    results.scrollIntoView({ behavior: 'smooth' });
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
