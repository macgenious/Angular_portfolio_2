// Skills Matrix JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Define skills data with categories and proficiency levels
    const skillsData = {
        'Languages': [
            { name: 'Python', proficiency: 90 },
            { name: 'JavaScript', proficiency: 85 },
            { name: 'Java', proficiency: 80 },
            { name: 'HTML/CSS', proficiency: 90 },
            { name: 'SQL', proficiency: 20 },
            { name: 'C++', proficiency: 10 }
        ],
        'Tools': [
            { name: 'Git', proficiency: 50 },
            { name: 'Statgraphics', proficiency: 75 },
            { name: 'VS Code', proficiency: 95 },
            { name: 'SciLab', proficiency: 60 },
            { name: 'Wolfram Mathematica', proficiency: 60 }
        ],
        'AI & ML': [
            { name: 'StableDifussion', proficiency: 50 },
            { name: 'Gemini', proficiency: 85 },
            { name: 'Claude', proficiency: 95 },
            { name: 'Deepseek', proficiency: 100 },
            { name: 'Generative AI', proficiency: 75 }
        ],
        'Hardware': [
            { name: 'Arduino', proficiency: 85 },
            { name: 'Raspberry Pi', proficiency: 80 },
            { name: 'Electronics', proficiency: 75 },
            { name: 'Sensors', proficiency: 80 },
            { name: 'IoT', proficiency: 70 },
        ]
    };

    const skillItemsContainer = document.querySelector('.skill-items-container');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Function to create and display skill items for a category
    function displaySkillsForCategory(category) {
        // Clear previous skills
        skillItemsContainer.innerHTML = '';
        
        // Get skills for the selected category
        const skills = skillsData[category];
        
        // Create and append skill items
        skills.forEach((skill, index) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            
            skillItem.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="proficiency-bar-container">
                    <div class="proficiency-bar" style="width: ${skill.proficiency}%"></div>
                </div>
                <div class="proficiency-text">${skill.proficiency}%</div>
            `;
            
            skillItemsContainer.appendChild(skillItem);
            
            // Add animation effect - delay each skill item slightly with increasing delay based on index
            setTimeout(() => {
                skillItem.style.opacity = '1';
                skillItem.style.transform = 'translateY(0)';
            }, 100 * (index + 1)); // Staggered animation based on index
        });
    }

    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Display skills for the selected category
            const category = this.getAttribute('data-category');
            displaySkillsForCategory(category);
        });
    });

    // Initialize with the first category (Languages)
    displaySkillsForCategory('Languages');
});