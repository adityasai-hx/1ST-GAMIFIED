// Quiz Data
const quizData = {
    6: [
        {
            id: 'class6-food-components',
            title: 'Food: Where Does It Come From?',
            description: 'Learn about different food sources, food components, and their importance for living organisms.',
            questions: [
                {
                    id: '6-1-1',
                    question: 'Which of the following is a plant-based food source?',
                    options: ['Milk', 'Rice', 'Egg', 'Fish'],
                    correctAnswer: 1,
                    explanation: 'Rice is obtained from rice plants, making it a plant-based food source.'
                },
                {
                    id: '6-1-2',
                    question: 'What is the main component that provides energy to our body?',
                    options: ['Proteins', 'Carbohydrates', 'Vitamins', 'Minerals'],
                    correctAnswer: 1,
                    explanation: 'Carbohydrates are the primary source of energy for our body.'
                },
                {
                    id: '6-1-3',
                    question: 'Which vitamin is produced by our skin when exposed to sunlight?',
                    options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
                    correctAnswer: 3,
                    explanation: 'Vitamin D is synthesized by our skin when exposed to ultraviolet rays from sunlight.'
                }
            ]
        },
        {
            id: 'class6-living-nonliving',
            title: 'Living and Non-living',
            description: 'Understand the characteristics that distinguish living things from non-living things.',
            questions: [
                {
                    id: '6-2-1',
                    question: 'Which of the following is a characteristic of living things?',
                    options: ['Growth', 'Movement only', 'Color change', 'Breaking down'],
                    correctAnswer: 0,
                    explanation: 'Growth is a fundamental characteristic of all living organisms.'
                },
                {
                    id: '6-2-2',
                    question: 'What do plants need to make their own food?',
                    options: ['Only water', 'Sunlight, water, and carbon dioxide', 'Only sunlight', 'Only soil'],
                    correctAnswer: 1,
                    explanation: 'Plants need sunlight, water, and carbon dioxide to carry out photosynthesis and make their own food.'
                }
            ]
        },
        {
            id: 'class6-body-movements',
            title: 'Body Movements',
            description: 'Explore different types of movements in animals and the body parts involved.',
            questions: [
                {
                    id: '6-3-1',
                    question: 'Which type of joint allows movement in all directions?',
                    options: ['Hinge joint', 'Ball and socket joint', 'Fixed joint', 'Pivot joint'],
                    correctAnswer: 1,
                    explanation: 'Ball and socket joints, like the shoulder joint, allow movement in all directions.'
                },
                {
                    id: '6-3-2',
                    question: 'How do earthworms move?',
                    options: ['Flying', 'Swimming', 'Contracting and expanding muscles', 'Rolling'],
                    correctAnswer: 2,
                    explanation: 'Earthworms move by contracting and expanding their muscles, creating wave-like motions.'
                }
            ]
        }
    ],
    7: [
        {
            id: 'class7-nutrition-plants',
            title: 'Nutrition in Plants',
            description: 'Learn about photosynthesis, different modes of nutrition in plants, and plant nutrients.',
            questions: [
                {
                    id: '7-1-1',
                    question: 'What is the process by which plants make their own food called?',
                    options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Digestion'],
                    correctAnswer: 1,
                    explanation: 'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to make glucose.'
                },
                {
                    id: '7-1-2',
                    question: 'Which gas is released during photosynthesis?',
                    options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
                    correctAnswer: 1,
                    explanation: 'Oxygen is released as a byproduct during the process of photosynthesis.'
                },
                {
                    id: '7-1-3',
                    question: 'Cuscuta is an example of which type of plant?',
                    options: ['Autotrophic', 'Parasitic', 'Saprophytic', 'Symbiotic'],
                    correctAnswer: 1,
                    explanation: 'Cuscuta is a parasitic plant that depends on host plants for nutrition.'
                }
            ]
        },
        {
            id: 'class7-respiration',
            title: 'Respiration in Organisms',
            description: 'Understand the process of respiration in plants and animals, and different breathing mechanisms.',
            questions: [
                {
                    id: '7-2-1',
                    question: 'What is the main purpose of respiration?',
                    options: ['To produce food', 'To release energy', 'To produce oxygen', 'To absorb water'],
                    correctAnswer: 1,
                    explanation: 'Respiration breaks down glucose to release energy for cellular activities.'
                },
                {
                    id: '7-2-2',
                    question: 'Through which organs do fish breathe?',
                    options: ['Lungs', 'Gills', 'Skin', 'Spiracles'],
                    correctAnswer: 1,
                    explanation: 'Fish have gills that extract dissolved oxygen from water for respiration.'
                }
            ]
        }
    ],
    8: [
        {
            id: 'class8-cell-structure',
            title: 'Cell - Structure and Functions',
            description: 'Explore the basic unit of life, cell organelles, and their functions in living organisms.',
            questions: [
                {
                    id: '8-1-1',
                    question: 'Who discovered the cell?',
                    options: ['Robert Hooke', 'Antonie van Leeuwenhoek', 'Robert Brown', 'Matthias Schleiden'],
                    correctAnswer: 0,
                    explanation: 'Robert Hooke discovered and named the cell in 1665 while observing cork tissue.'
                },
                {
                    id: '8-1-2',
                    question: 'Which organelle is known as the powerhouse of the cell?',
                    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'],
                    correctAnswer: 1,
                    explanation: 'Mitochondria produce energy (ATP) for cellular activities, earning them the title "powerhouse of the cell".'
                },
                {
                    id: '8-1-3',
                    question: 'What is the main difference between plant and animal cells?',
                    options: ['Plant cells have nucleus', 'Animal cells have mitochondria', 'Plant cells have cell wall', 'Animal cells have cytoplasm'],
                    correctAnswer: 2,
                    explanation: 'Plant cells have a rigid cell wall made of cellulose, which animal cells lack.'
                }
            ]
        },
        {
            id: 'class8-microorganisms',
            title: 'Microorganisms: Friend and Foe',
            description: 'Learn about beneficial and harmful microorganisms and their impact on human life.',
            questions: [
                {
                    id: '8-2-1',
                    question: 'Which microorganism is used in making bread?',
                    options: ['Bacteria', 'Virus', 'Yeast', 'Protozoa'],
                    correctAnswer: 2,
                    explanation: 'Yeast (Saccharomyces cerevisiae) ferments sugars to produce carbon dioxide, which makes bread rise.'
                },
                {
                    id: '8-2-2',
                    question: 'What is the process of converting milk into curd called?',
                    options: ['Pasteurization', 'Fermentation', 'Sterilization', 'Homogenization'],
                    correctAnswer: 1,
                    explanation: 'Fermentation by lactobacillus bacteria converts milk into curd by producing lactic acid.'
                }
            ]
        }
    ],
    9: [
        {
            id: 'class9-fundamental-unit',
            title: 'The Fundamental Unit of Life',
            description: 'Detailed study of cell structure, organelles, and their specific functions.',
            questions: [
                {
                    id: '9-1-1',
                    question: 'What is the function of the cell membrane?',
                    options: ['Protein synthesis', 'Controls entry and exit of substances', 'Energy production', 'Waste storage'],
                    correctAnswer: 1,
                    explanation: 'The cell membrane is selectively permeable and controls what enters and exits the cell.'
                },
                {
                    id: '9-1-2',
                    question: 'Which organelle contains the genetic material?',
                    options: ['Cytoplasm', 'Nucleus', 'Ribosome', 'Golgi apparatus'],
                    correctAnswer: 1,
                    explanation: 'The nucleus contains DNA, which carries the genetic information of the cell.'
                },
                {
                    id: '9-1-3',
                    question: 'What is the function of ribosomes?',
                    options: ['Energy production', 'Protein synthesis', 'Digestion', 'Transportation'],
                    correctAnswer: 1,
                    explanation: 'Ribosomes are the sites of protein synthesis in the cell.'
                }
            ]
        },
        {
            id: 'class9-tissues',
            title: 'Tissues',
            description: 'Study of different types of tissues in plants and animals and their specialized functions.',
            questions: [
                {
                    id: '9-2-1',
                    question: 'Which tissue is responsible for the growth of plants?',
                    options: ['Parenchyma', 'Collenchyma', 'Meristematic', 'Sclerenchyma'],
                    correctAnswer: 2,
                    explanation: 'Meristematic tissue consists of actively dividing cells responsible for plant growth.'
                },
                {
                    id: '9-2-2',
                    question: 'What type of tissue is blood?',
                    options: ['Epithelial', 'Connective', 'Muscular', 'Nervous'],
                    correctAnswer: 1,
                    explanation: 'Blood is a connective tissue that transports substances throughout the body.'
                }
            ]
        }
    ],
    10: [
        {
            id: 'class10-life-processes-nutrition',
            title: 'Life Processes - Nutrition',
            description: 'Comprehensive study of nutrition in living organisms, digestion, and metabolic processes.',
            questions: [
                {
                    id: '10-1-1',
                    question: 'What is the role of hydrochloric acid in the stomach?',
                    options: ['Kills bacteria and activates pepsin', 'Neutralizes food', 'Produces vitamins', 'Stores nutrients'],
                    correctAnswer: 0,
                    explanation: 'HCl kills harmful bacteria and activates pepsinogen to pepsin for protein digestion.'
                },
                {
                    id: '10-1-2',
                    question: 'Which part of the digestive system absorbs most nutrients?',
                    options: ['Stomach', 'Large intestine', 'Small intestine', 'Liver'],
                    correctAnswer: 2,
                    explanation: 'The small intestine has villi that provide a large surface area for nutrient absorption.'
                },
                {
                    id: '10-1-3',
                    question: 'What is the function of bile juice?',
                    options: ['Protein digestion', 'Fat emulsification', 'Carbohydrate breakdown', 'Vitamin synthesis'],
                    correctAnswer: 1,
                    explanation: 'Bile juice emulsifies fats, breaking them into smaller droplets for easier digestion.'
                }
            ]
        },
        {
            id: 'class10-respiration',
            title: 'Life Processes - Respiration',
            description: 'Understanding cellular respiration, breathing mechanisms, and gas exchange in organisms.',
            questions: [
                {
                    id: '10-2-1',
                    question: 'What is the end product of anaerobic respiration in muscles?',
                    options: ['Ethanol', 'Carbon dioxide', 'Lactic acid', 'Water'],
                    correctAnswer: 2,
                    explanation: 'During intense exercise, muscles produce lactic acid through anaerobic respiration.'
                },
                {
                    id: '10-2-2',
                    question: 'How many ATP molecules are produced in aerobic respiration?',
                    options: ['2', '36-38', '4', '10'],
                    correctAnswer: 1,
                    explanation: 'Aerobic respiration produces 36-38 ATP molecules per glucose molecule.'
                }
            ]
        }
    ],
    11: [
        {
            id: 'class11-biological-classification',
            title: 'Biological Classification',
            description: 'Study of taxonomic hierarchy, classification systems, and diversity of living organisms.',
            questions: [
                {
                    id: '11-1-1',
                    question: 'Who proposed the Five Kingdom classification?',
                    options: ['Carolus Linnaeus', 'R.H. Whittaker', 'Carl Woese', 'Charles Darwin'],
                    correctAnswer: 1,
                    explanation: 'R.H. Whittaker proposed the Five Kingdom classification system in 1969.'
                },
                {
                    id: '11-1-2',
                    question: 'Which kingdom includes organisms with cell wall made of chitin?',
                    options: ['Plantae', 'Animalia', 'Fungi', 'Protista'],
                    correctAnswer: 2,
                    explanation: 'Fungi have cell walls made of chitin, not cellulose like plants.'
                },
                {
                    id: '11-1-3',
                    question: 'What is the basic unit of classification?',
                    options: ['Genus', 'Species', 'Family', 'Order'],
                    correctAnswer: 1,
                    explanation: 'Species is the basic unit of taxonomic classification.'
                }
            ]
        },
        {
            id: 'class11-plant-kingdom',
            title: 'Plant Kingdom',
            description: 'Classification and characteristics of different plant groups from algae to angiosperms.',
            questions: [
                {
                    id: '11-2-1',
                    question: 'Which plant group shows alternation of generation?',
                    options: ['Algae', 'Bryophytes', 'Gymnosperms', 'All of the above'],
                    correctAnswer: 3,
                    explanation: 'All plant groups show alternation between gametophytic and sporophytic phases.'
                },
                {
                    id: '11-2-2',
                    question: 'What are bryophytes called?',
                    options: ['Amphibians of plant kingdom', 'Giants of plant kingdom', 'Pioneers of plant kingdom', 'Ancestors of plant kingdom'],
                    correctAnswer: 0,
                    explanation: 'Bryophytes are called amphibians of plant kingdom as they need water for reproduction.'
                }
            ]
        }
    ],
    12: [
        {
            id: 'class12-reproduction',
            title: 'Sexual Reproduction in Flowering Plants',
            description: 'Detailed study of reproduction mechanisms, pollination, and fertilization in angiosperms.',
            questions: [
                {
                    id: '12-1-1',
                    question: 'What is double fertilization?',
                    options: ['Two eggs fertilized', 'Two sperm nuclei involved', 'Two pollen grains needed', 'Two stigmas involved'],
                    correctAnswer: 1,
                    explanation: 'Double fertilization involves two sperm nuclei - one fertilizes the egg, another forms endosperm.'
                },
                {
                    id: '12-1-2',
                    question: 'What is the ploidy of endosperm in angiosperms?',
                    options: ['Haploid', 'Diploid', 'Triploid', 'Tetraploid'],
                    correctAnswer: 2,
                    explanation: 'Endosperm is triploid (3n) as it forms from the fusion of two polar nuclei with one sperm nucleus.'
                },
                {
                    id: '12-1-3',
                    question: 'Which part of the flower develops into fruit?',
                    options: ['Petals', 'Ovary', 'Stamens', 'Sepals'],
                    correctAnswer: 1,
                    explanation: 'The ovary develops into the fruit after fertilization, protecting the developing seeds.'
                }
            ]
        },
        {
            id: 'class12-inheritance',
            title: 'Principles of Inheritance and Variation',
            description: 'Mendel\'s laws, genetic inheritance patterns, and molecular basis of inheritance.',
            questions: [
                {
                    id: '12-2-1',
                    question: 'What is Mendel\'s First Law called?',
                    options: ['Law of Dominance', 'Law of Segregation', 'Law of Independent Assortment', 'Law of Inheritance'],
                    correctAnswer: 1,
                    explanation: 'Mendel\'s First Law is the Law of Segregation, stating that allele pairs separate during gamete formation.'
                },
                {
                    id: '12-2-2',
                    question: 'In a dihybrid cross, what is the phenotypic ratio in F2 generation?',
                    options: ['3:1', '1:2:1', '9:3:3:1', '1:1:1:1'],
                    correctAnswer: 2,
                    explanation: 'The dihybrid cross produces a 9:3:3:1 phenotypic ratio in the F2 generation.'
                },
                {
                    id: '12-2-3',
                    question: 'What are alleles?',
                    options: ['Different genes', 'Alternative forms of a gene', 'Chromosomes', 'DNA sequences'],
                    correctAnswer: 1,
                    explanation: 'Alleles are alternative forms of the same gene that occupy the same position on homologous chromosomes.'
                }
            ]
        }
    ]
};

// Application State
let currentState = {
    view: 'grades', // 'grades', 'chapters', 'quiz', 'results'
    selectedGrade: null,
    selectedChapter: null,
    currentQuestionIndex: 0,
    selectedAnswers: {},
    startTime: null,
    timeElapsed: 0,
    timer: null
};

// DOM Elements
const views = {
    grades: document.getElementById('gradeView'),
    chapters: document.getElementById('chapterView'),
    quiz: document.getElementById('quizView'),
    results: document.getElementById('resultsView')
};

const navigation = {
    gradeNav: document.getElementById('gradeNav'),
    chapterNav: document.getElementById('chapterNav'),
    quizNav: document.getElementById('quizNav'),
    chapterSep: document.getElementById('chapterSep')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    showView('grades');
});

function initializeEventListeners() {
    // Grade selection
    document.querySelectorAll('.grade-card').forEach(card => {
        card.addEventListener('click', function() {
            const grade = parseInt(this.dataset.grade);
            selectGrade(grade);
        });
    });

    // Navigation
    navigation.gradeNav.addEventListener('click', () => showView('grades'));
    navigation.chapterNav.addEventListener('click', () => showView('chapters'));
    
    document.getElementById('backToGrades').addEventListener('click', () => showView('grades'));
    document.getElementById('backToChapters').addEventListener('click', () => showView('chapters'));
    document.getElementById('backToChaptersFromResults').addEventListener('click', () => showView('chapters'));

    // Quiz controls
    document.getElementById('nextBtn').addEventListener('click', handleNextQuestion);
    document.getElementById('retakeBtn').addEventListener('click', retakeQuiz);
}

function showView(viewName) {
    // Hide all views
    Object.values(views).forEach(view => view.classList.remove('active'));
    
    // Show selected view
    views[viewName].classList.add('active');
    
    // Update navigation
    updateNavigation(viewName);
    
    currentState.view = viewName;
}

function updateNavigation(viewName) {
    // Reset navigation
    navigation.gradeNav.classList.remove('active');
    navigation.chapterNav.classList.add('hidden');
    navigation.quizNav.classList.add('hidden');
    navigation.chapterSep.classList.add('hidden');

    switch(viewName) {
        case 'grades':
            navigation.gradeNav.classList.add('active');
            break;
        case 'chapters':
            navigation.chapterNav.classList.remove('hidden');
            navigation.chapterSep.classList.remove('hidden');
            navigation.chapterNav.textContent = `Class ${currentState.selectedGrade} Chapters`;
            break;
        case 'quiz':
        case 'results':
            navigation.chapterNav.classList.remove('hidden');
            navigation.quizNav.classList.remove('hidden');
            navigation.chapterSep.classList.remove('hidden');
            document.getElementById('chapterSep').nextElementSibling.classList.remove('hidden');
            navigation.chapterNav.textContent = `Class ${currentState.selectedGrade} Chapters`;
            navigation.quizNav.textContent = currentState.selectedChapter.title;
            break;
    }
}

function selectGrade(grade) {
    currentState.selectedGrade = grade;
    loadChapters(grade);
    showView('chapters');
}

function loadChapters(grade) {
    const chapters = quizData[grade] || [];
    const chapterGrid = document.getElementById('chapterGrid');
    const chapterTitle = document.getElementById('chapterTitle');
    
    chapterTitle.textContent = `Class ${grade} Biology Chapters`;
    
    chapterGrid.innerHTML = chapters.map((chapter, index) => `
        <div class="chapter-card" data-chapter-id="${chapter.id}">
            <div class="chapter-header">
                <div class="grade-overlay"></div>
                <div class="chapter-content">
                    <div class="chapter-icon">📖</div>
                    <div class="chapter-number">Chapter ${index + 1}</div>
                </div>
            </div>
            <div class="chapter-body">
                <h3 class="chapter-title">${chapter.title}</h3>
                <p class="chapter-description">${chapter.description}</p>
                <div class="chapter-stats">
                    <div class="chapter-stat">
                        <span>❓</span>
                        <span>${chapter.questions.length} Questions</span>
                    </div>
                    <div class="chapter-stat">
                        <span>⏱️</span>
                        <span>~${Math.ceil(chapter.questions.length * 1.5)} min</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add click listeners to chapter cards
    document.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('click', function() {
            const chapterId = this.dataset.chapterId;
            const chapter = chapters.find(c => c.id === chapterId);
            selectChapter(chapter);
        });
    });
}

function selectChapter(chapter) {
    currentState.selectedChapter = chapter;
    currentState.currentQuestionIndex = 0;
    currentState.selectedAnswers = {};
    startQuiz();
}

function startQuiz() {
    currentState.startTime = Date.now();
    currentState.timeElapsed = 0;
    
    // Start timer
    if (currentState.timer) {
        clearInterval(currentState.timer);
    }
    
    currentState.timer = setInterval(updateTimer, 1000);
    
    // Update quiz header
    document.getElementById('quizTitle').textContent = currentState.selectedChapter.title;
    document.getElementById('quizSubtitle').textContent = `Class ${currentState.selectedGrade} Biology Quiz`;
    
    loadQuestion();
    showView('quiz');
}

function updateTimer() {
    currentState.timeElapsed = Math.floor((Date.now() - currentState.startTime) / 1000);
    const minutes = Math.floor(currentState.timeElapsed / 60);
    const seconds = currentState.timeElapsed % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function loadQuestion() {
    const question = currentState.selectedChapter.questions[currentState.currentQuestionIndex];
    const totalQuestions = currentState.selectedChapter.questions.length;
    
    // Update question counter and progress
    document.getElementById('questionCounter').textContent = `Question ${currentState.currentQuestionIndex + 1} of ${totalQuestions}`;
    document.getElementById('progressFill').style.width = `${((currentState.currentQuestionIndex + 1) / totalQuestions) * 100}%`;
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Update options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="option">
            <input type="radio" name="answer" value="${index}" id="option${index}">
            <label for="option${index}">${option}</label>
        </div>
    `).join('');
    
    // Add event listeners to options
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.addEventListener('change', function() {
            currentState.selectedAnswers[question.id] = parseInt(this.value);
            updateQuizControls();
        });
    });
    
    // Restore selected answer if exists
    if (currentState.selectedAnswers[question.id] !== undefined) {
        const selectedInput = document.querySelector(`input[value="${currentState.selectedAnswers[question.id]}"]`);
        if (selectedInput) {
            selectedInput.checked = true;
        }
    }
    
    updateQuizControls();
}

function updateQuizControls() {
    const question = currentState.selectedChapter.questions[currentState.currentQuestionIndex];
    const hasAnswer = currentState.selectedAnswers[question.id] !== undefined;
    const isLastQuestion = currentState.currentQuestionIndex === currentState.selectedChapter.questions.length - 1;
    
    const nextBtn = document.getElementById('nextBtn');
    const quizStatus = document.getElementById('quizStatus');
    
    nextBtn.disabled = !hasAnswer;
    nextBtn.textContent = isLastQuestion ? 'Finish Quiz' : 'Next Question';
    quizStatus.textContent = hasAnswer ? 'Answer selected' : 'Select an answer to continue';
}

function handleNextQuestion() {
    const isLastQuestion = currentState.currentQuestionIndex === currentState.selectedChapter.questions.length - 1;
    
    if (isLastQuestion) {
        finishQuiz();
    } else {
        currentState.currentQuestionIndex++;
        loadQuestion();
    }
}

function finishQuiz() {
    if (currentState.timer) {
        clearInterval(currentState.timer);
    }
    
    calculateResults();
    showView('results');
}

function calculateResults() {
    const questions = currentState.selectedChapter.questions;
    const answers = questions.map(question => ({
        questionId: question.id,
        selectedAnswer: currentState.selectedAnswers[question.id] ?? -1,
        correct: currentState.selectedAnswers[question.id] === question.correctAnswer
    }));
    
    const correctCount = answers.filter(answer => answer.correct).length;
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    // Update results display
    document.getElementById('resultsSubtitle').textContent = `Class ${currentState.selectedGrade} - ${currentState.selectedChapter.title}`;
    document.getElementById('scoreValue').textContent = `${correctCount}/${questions.length}`;
    document.getElementById('percentageValue').textContent = `${percentage}%`;
    
    const minutes = Math.floor(currentState.timeElapsed / 60);
    const seconds = currentState.timeElapsed % 60;
    document.getElementById('timeValue').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Generate review
    generateReview(questions, answers);
}

function generateReview(questions, answers) {
    const reviewContainer = document.getElementById('reviewContainer');
    
    reviewContainer.innerHTML = questions.map((question, index) => {
        const userAnswer = answers.find(a => a.questionId === question.id);
        const isCorrect = userAnswer?.correct ?? false;
        const selectedAnswer = userAnswer?.selectedAnswer ?? -1;
        
        return `
            <div class="review-item">
                <div class="review-question">
                    <div class="review-icon ${isCorrect ? 'correct' : 'incorrect'}">
                        ${isCorrect ? '✅' : '❌'}
                    </div>
                    <div class="review-content">
                        <h4>${index + 1}. ${question.question}</h4>
                        <div class="review-options">
                            ${question.options.map((option, optIndex) => `
                                <div class="review-option ${
                                    optIndex === question.correctAnswer ? 'correct' :
                                    optIndex === selectedAnswer && !isCorrect ? 'incorrect' : 'neutral'
                                }">
                                    ${option}
                                </div>
                            `).join('')}
                        </div>
                        <div class="review-explanation">
                            <p><strong>Explanation:</strong> ${question.explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function retakeQuiz() {
    currentState.currentQuestionIndex = 0;
    currentState.selectedAnswers = {};
    startQuiz();
}