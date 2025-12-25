// Global state
let currentPage = 'dashboard';
let currentQuizId = null;
let currentClassroomId = null;
let activeExams = new Map();

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupNavigation();
    updateDashboard();
    loadQuizzes();
    loadClassrooms();
    loadHomework();
    loadGKPosts();
});

// Initialize sample data if not exists
function initializeData() {
    if (!localStorage.getItem('teachquiz_classrooms')) {
        const sampleClassrooms = [
            {
                id: 'class1',
                name: 'Mathematics 10A',
                subject: 'Mathematics',
                grade: '10',
                students: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson'],
                createdAt: new Date().toISOString()
            },
            {
                id: 'class2',
                name: 'Science 9B',
                subject: 'Science',
                grade: '9',
                students: ['Frank Miller', 'Grace Lee', 'Henry Davis', 'Ivy Chen'],
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('teachquiz_classrooms', JSON.stringify(sampleClassrooms));
    }

    if (!localStorage.getItem('teachquiz_quizzes')) {
        localStorage.setItem('teachquiz_quizzes', JSON.stringify([]));
    }

    if (!localStorage.getItem('teachquiz_homework')) {
        localStorage.setItem('teachquiz_homework', JSON.stringify([]));
    }

    if (!localStorage.getItem('teachquiz_gk_posts')) {
        localStorage.setItem('teachquiz_gk_posts', JSON.stringify([]));
    }

    if (!localStorage.getItem('teachquiz_quiz_results')) {
        localStorage.setItem('teachquiz_quiz_results', JSON.stringify([]));
    }

    if (!localStorage.getItem('teachquiz_activities')) {
        const sampleActivities = [
            {
                text: 'Quiz "Basic Algebra" completed by Mathematics 10A',
                time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
                text: 'New student "Alice Johnson" added to Mathematics 10A',
                time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
            }
        ];
        localStorage.setItem('teachquiz_activities', JSON.stringify(sampleActivities));
    }
}

// Navigation setup
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });

    // Update pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.toggle('active', p.id === page);
    });

    currentPage = page;

    // Load page-specific data
    switch(page) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'quizzes':
            loadQuizzes();
            break;
        case 'classrooms':
            loadClassrooms();
            break;
        case 'homework':
            loadHomework();
            break;
        case 'gk':
            loadGKPosts();
            break;
    }
}

// Dashboard functions
function updateDashboard() {
    const classrooms = getClassrooms();
    const quizzes = getQuizzes();
    const activities = getActivities();
    const quizResults = getQuizResults();

    // Update stats
    const totalStudents = classrooms.reduce((sum, classroom) => sum + classroom.students.length, 0);
    const activeQuizzes = quizzes.filter(q => q.status === 'active').length;
    const today = new Date().toDateString();
    const todayParticipants = quizResults.filter(r => new Date(r.completedAt).toDateString() === today).length;

    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('activeQuizzes').textContent = activeQuizzes;
    document.getElementById('totalClassrooms').textContent = classrooms.length;
    document.getElementById('todayParticipants').textContent = todayParticipants;

    // Update leaderboard
    updateTodayLeaderboard();

    // Update activity feed
    updateActivityFeed(activities);
}

function updateTodayLeaderboard() {
    const container = document.getElementById('todayLeaderboard');
    const quizResults = getQuizResults();
    const today = new Date().toDateString();
    
    const todayResults = quizResults.filter(r => new Date(r.completedAt).toDateString() === today);
    
    if (todayResults.length === 0) {
        container.innerHTML = '<p class="empty-state">No quiz results today</p>';
        return;
    }

    // Group by student and get their best score
    const studentScores = {};
    todayResults.forEach(result => {
        if (!studentScores[result.studentName] || studentScores[result.studentName].score < result.score) {
            studentScores[result.studentName] = result;
        }
    });

    // Sort by score and take top 10
    const topStudents = Object.values(studentScores)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

    container.innerHTML = topStudents.map((result, index) => `
        <div class="leaderboard-item">
            <div class="rank">${index + 1}</div>
            <div class="student-info">
                <div class="student-name">${result.studentName}</div>
                <div class="student-class">${result.className}</div>
            </div>
            <div class="score">${result.score}%</div>
        </div>
    `).join('');
}

function updateActivityFeed(activities) {
    const container = document.getElementById('activityFeed');
    
    if (activities.length === 0) {
        container.innerHTML = '<p class="empty-state">No recent activity</p>';
        return;
    }

    container.innerHTML = activities.slice(0, 5).map(activity => `
        <div class="activity-item">
            <div class="activity-text">${activity.text}</div>
            <div class="activity-time">${formatTimeAgo(activity.time)}</div>
        </div>
    `).join('');
}

// Quiz management
function loadQuizzes() {
    const quizzes = getQuizzes();
    const container = document.getElementById('quizList');
    
    if (quizzes.length === 0) {
        container.innerHTML = '<p class="empty-state">No quizzes created yet</p>';
        return;
    }

    container.innerHTML = quizzes.map(quiz => `
        <div class="quiz-card">
            <div class="quiz-info">
                <h3>${quiz.title}</h3>
                <div class="quiz-meta">
                    <span>Subject: ${quiz.subject}</span>
                    <span>Duration: ${quiz.duration} mins</span>
                    <span>Questions: ${quiz.questions.length}</span>
                    <span>Classroom: ${quiz.classroomName}</span>
                </div>
            </div>
            <div class="quiz-actions">
                <span class="quiz-status ${quiz.status}">${quiz.status}</span>
                ${quiz.status === 'draft' ? `
                    <button class="btn btn-success btn-sm" onclick="startQuiz('${quiz.id}')">Start Quiz</button>
                    <button class="btn btn-secondary btn-sm" onclick="editQuiz('${quiz.id}')">Edit</button>
                ` : ''}
                ${quiz.status === 'active' ? `
                    <button class="btn btn-primary btn-sm" onclick="monitorExam('${quiz.id}')">Monitor</button>
                    <button class="btn btn-danger btn-sm" onclick="endQuiz('${quiz.id}')">End Quiz</button>
                ` : ''}
                ${quiz.status === 'completed' ? `
                    <button class="btn btn-secondary btn-sm" onclick="viewResults('${quiz.id}')">View Results</button>
                ` : ''}
                <button class="btn btn-danger btn-sm" onclick="deleteQuiz('${quiz.id}')">Delete</button>
            </div>
        </div>
    `).join('');

    // Update classroom options for quiz creation
    updateQuizClassroomOptions();
}

function showCreateQuiz() {
    document.getElementById('createQuizModal').classList.add('active');
}

function addQuestion() {
    const container = document.getElementById('questionsContainer');
    const questionCount = container.children.length + 1;
    
    const questionHtml = `
        <div class="question-item">
            <div class="form-group">
                <label>Question ${questionCount}</label>
                <input type="text" class="question-text" required>
            </div>
            <div class="options-grid">
                <input type="text" class="option" placeholder="Option A" required>
                <input type="text" class="option" placeholder="Option B" required>
                <input type="text" class="option" placeholder="Option C" required>
                <input type="text" class="option" placeholder="Option D" required>
            </div>
            <div class="form-group">
                <label>Correct Answer</label>
                <select class="correct-answer" required>
                    <option value="0">Option A</option>
                    <option value="1">Option B</option>
                    <option value="2">Option C</option>
                    <option value="3">Option D</option>
                </select>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', questionHtml);
}

function saveQuiz() {
    const title = document.getElementById('quizTitle').value;
    const subject = document.getElementById('quizSubject').value;
    const duration = parseInt(document.getElementById('quizDuration').value);
    const classroomId = document.getElementById('quizClassroom').value;
    
    const questionItems = document.querySelectorAll('.question-item');
    const questions = Array.from(questionItems).map(item => {
        const questionText = item.querySelector('.question-text').value;
        const options = Array.from(item.querySelectorAll('.option')).map(opt => opt.value);
        const correctAnswer = parseInt(item.querySelector('.correct-answer').value);
        
        return {
            question: questionText,
            options: options,
            correctAnswer: correctAnswer
        };
    });

    if (!title || !subject || !duration || !classroomId || questions.length === 0) {
        alert('Please fill in all fields and add at least one question.');
        return;
    }

    const classrooms = getClassrooms();
    const classroom = classrooms.find(c => c.id === classroomId);

    const quiz = {
        id: 'quiz_' + Date.now(),
        title,
        subject,
        duration,
        classroomId,
        classroomName: classroom.name,
        questions,
        status: 'draft',
        createdAt: new Date().toISOString()
    };

    const quizzes = getQuizzes();
    quizzes.push(quiz);
    localStorage.setItem('teachquiz_quizzes', JSON.stringify(quizzes));

    // Add activity
    addActivity(`New quiz "${title}" created for ${classroom.name}`);

    closeModal('createQuizModal');
    resetCreateQuizForm();
    loadQuizzes();
}

function resetCreateQuizForm() {
    document.getElementById('createQuizForm').reset();
    document.getElementById('questionsContainer').innerHTML = `
        <div class="question-item">
            <div class="form-group">
                <label>Question 1</label>
                <input type="text" class="question-text" required>
            </div>
            <div class="options-grid">
                <input type="text" class="option" placeholder="Option A" required>
                <input type="text" class="option" placeholder="Option B" required>
                <input type="text" class="option" placeholder="Option C" required>
                <input type="text" class="option" placeholder="Option D" required>
            </div>
            <div class="form-group">
                <label>Correct Answer</label>
                <select class="correct-answer" required>
                    <option value="0">Option A</option>
                    <option value="1">Option B</option>
                    <option value="2">Option C</option>
                    <option value="3">Option D</option>
                </select>
            </div>
        </div>
    `;
}

function startQuiz(quizId) {
    const quizzes = getQuizzes();
    const quiz = quizzes.find(q => q.id === quizId);
    quiz.status = 'active';
    quiz.startedAt = new Date().toISOString();
    
    localStorage.setItem('teachquiz_quizzes', JSON.stringify(quizzes));
    
    // Initialize exam monitoring
    activeExams.set(quizId, {
        quiz: quiz,
        participants: [],
        startTime: Date.now()
    });
    
    // Add activity
    addActivity(`Quiz "${quiz.title}" started for ${quiz.classroomName}`);
    
    loadQuizzes();
    monitorExam(quizId);
}

function monitorExam(quizId) {
    currentQuizId = quizId;
    const examData = activeExams.get(quizId) || { quiz: getQuizzes().find(q => q.id === quizId), participants: [] };
    
    document.getElementById('examInfo').innerHTML = `
        <div class="exam-title">${examData.quiz.title}</div>
        <div class="exam-details">
            <span>Duration: ${examData.quiz.duration} minutes</span>
            <span>Questions: ${examData.quiz.questions.length}</span>
            <span>Participants: ${examData.participants.length}</span>
        </div>
    `;
    
    updateStudentProgress(examData.participants);
    document.getElementById('startExamModal').classList.add('active');
}

function updateStudentProgress(participants) {
    const container = document.getElementById('progressList');
    
    if (participants.length === 0) {
        container.innerHTML = '<p class="empty-state">No students have started the quiz yet</p>';
        return;
    }
    
    container.innerHTML = participants.map(participant => `
        <div class="progress-item">
            <div class="progress-info">
                <div class="progress-name">${participant.name}</div>
                <div class="progress-status">${participant.status}</div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${participant.progress}%"></div>
            </div>
        </div>
    `).join('');
}

function endQuiz(quizId) {
    const quizzes = getQuizzes();
    const quiz = quizzes.find(q => q.id === quizId);
    quiz.status = 'completed';
    quiz.endedAt = new Date().toISOString();
    
    localStorage.setItem('teachquiz_quizzes', JSON.stringify(quizzes));
    
    // Generate sample results for demonstration
    generateSampleResults(quiz);
    
    activeExams.delete(quizId);
    
    addActivity(`Quiz "${quiz.title}" completed by ${quiz.classroomName}`);
    
    loadQuizzes();
    closeModal('startExamModal');
}

function generateSampleResults(quiz) {
    const classrooms = getClassrooms();
    const classroom = classrooms.find(c => c.id === quiz.classroomId);
    const results = getQuizResults();
    
    // Generate random results for some students
    const participantCount = Math.floor(classroom.students.length * 0.7); // 70% participation
    const participants = classroom.students.slice(0, participantCount);
    
    participants.forEach(studentName => {
        const score = Math.floor(Math.random() * 40) + 60; // Scores between 60-100
        results.push({
            quizId: quiz.id,
            quizTitle: quiz.title,
            studentName: studentName,
            className: classroom.name,
            score: score,
            totalQuestions: quiz.questions.length,
            correctAnswers: Math.floor((score / 100) * quiz.questions.length),
            completedAt: new Date().toISOString()
        });
    });
    
    localStorage.setItem('teachquiz_quiz_results', JSON.stringify(results));
}

function deleteQuiz(quizId) {
    if (confirm('Are you sure you want to delete this quiz?')) {
        const quizzes = getQuizzes();
        const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
        localStorage.setItem('teachquiz_quizzes', JSON.stringify(updatedQuizzes));
        loadQuizzes();
    }
}

function updateQuizClassroomOptions() {
    const select = document.getElementById('quizClassroom');
    const classrooms = getClassrooms();
    
    select.innerHTML = '<option value="">Select Classroom</option>' + 
        classrooms.map(classroom => 
            `<option value="${classroom.id}">${classroom.name}</option>`
        ).join('');
}

// Classroom management
function loadClassrooms() {
    const classrooms = getClassrooms();
    const container = document.getElementById('classroomsList');
    
    if (classrooms.length === 0) {
        container.innerHTML = '<p class="empty-state">No classrooms created yet</p>';
        return;
    }

    container.innerHTML = classrooms.map(classroom => `
        <div class="classroom-card">
            <div class="classroom-header">
                <h3>${classroom.name}</h3>
                <div class="classroom-meta">
                    <span>${classroom.subject}</span>
                    <span>Grade ${classroom.grade}</span>
                </div>
            </div>
            
            <div class="classroom-stats">
                <div class="classroom-stat">
                    <span class="classroom-stat-number">${classroom.students.length}</span>
                    <span class="classroom-stat-label">Students</span>
                </div>
                <div class="classroom-stat">
                    <span class="classroom-stat-number">${getQuizzesForClassroom(classroom.id).length}</span>
                    <span class="classroom-stat-label">Quizzes</span>
                </div>
            </div>
            
            <div class="classroom-actions">
                <button class="btn btn-primary btn-sm" onclick="manageStudents('${classroom.id}')">Manage Students</button>
                <button class="btn btn-danger btn-sm" onclick="deleteClassroom('${classroom.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function showCreateClassroom() {
    document.getElementById('createClassroomModal').classList.add('active');
}

function saveClassroom() {
    const name = document.getElementById('classroomName').value;
    const subject = document.getElementById('classroomSubject').value;
    const grade = document.getElementById('classroomGrade').value;

    if (!name || !subject || !grade) {
        alert('Please fill in all fields.');
        return;
    }

    const classroom = {
        id: 'class_' + Date.now(),
        name,
        subject,
        grade,
        students: [],
        createdAt: new Date().toISOString()
    };

    const classrooms = getClassrooms();
    classrooms.push(classroom);
    localStorage.setItem('teachquiz_classrooms', JSON.stringify(classrooms));

    addActivity(`New classroom "${name}" created`);

    closeModal('createClassroomModal');
    document.getElementById('createClassroomForm').reset();
    loadClassrooms();
    updateDashboard();
}

function manageStudents(classroomId) {
    currentClassroomId = classroomId;
    const classrooms = getClassrooms();
    const classroom = classrooms.find(c => c.id === classroomId);
    
    updateCurrentStudentsList(classroom.students);
    document.getElementById('manageStudentsModal').classList.add('active');
}

function updateCurrentStudentsList(students) {
    const container = document.getElementById('currentStudents');
    
    if (students.length === 0) {
        container.innerHTML = '<p class="empty-state">No students enrolled</p>';
        return;
    }
    
    container.innerHTML = students.map(student => `
        <div class="student-item">
            <span class="student-name">${student}</span>
            <button class="remove-btn" onclick="removeStudent('${student}')">Remove</button>
        </div>
    `).join('');
}

function addStudent() {
    const studentName = document.getElementById('newStudentName').value.trim();
    
    if (!studentName) {
        alert('Please enter a student name.');
        return;
    }
    
    const classrooms = getClassrooms();
    const classroom = classrooms.find(c => c.id === currentClassroomId);
    
    if (classroom.students.includes(studentName)) {
        alert('Student already exists in this classroom.');
        return;
    }
    
    classroom.students.push(studentName);
    localStorage.setItem('teachquiz_classrooms', JSON.stringify(classrooms));
    
    addActivity(`Student "${studentName}" added to ${classroom.name}`);
    
    document.getElementById('newStudentName').value = '';
    updateCurrentStudentsList(classroom.students);
    updateDashboard();
}

function removeStudent(studentName) {
    if (confirm(`Remove ${studentName} from this classroom?`)) {
        const classrooms = getClassrooms();
        const classroom = classrooms.find(c => c.id === currentClassroomId);
        
        classroom.students = classroom.students.filter(s => s !== studentName);
        localStorage.setItem('teachquiz_classrooms', JSON.stringify(classrooms));
        
        addActivity(`Student "${studentName}" removed from ${classroom.name}`);
        
        updateCurrentStudentsList(classroom.students);
        updateDashboard();
    }
}

function deleteClassroom(classroomId) {
    if (confirm('Are you sure you want to delete this classroom? This will also delete all associated quizzes.')) {
        const classrooms = getClassrooms();
        const updatedClassrooms = classrooms.filter(c => c.id !== classroomId);
        localStorage.setItem('teachquiz_classrooms', JSON.stringify(updatedClassrooms));
        
        // Also delete quizzes for this classroom
        const quizzes = getQuizzes();
        const updatedQuizzes = quizzes.filter(q => q.classroomId !== classroomId);
        localStorage.setItem('teachquiz_quizzes', JSON.stringify(updatedQuizzes));
        
        loadClassrooms();
        updateDashboard();
    }
}

// Homework management
function loadHomework() {
    const homework = getHomework();
    const container = document.getElementById('homeworkList');
    
    if (homework.length === 0) {
        container.innerHTML = '<p class="empty-state">No homework assignments yet</p>';
        return;
    }

    container.innerHTML = homework.map(hw => {
        const dueDate = new Date(hw.dueDate);
        const today = new Date();
        const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        const statusClass = daysUntilDue <= 2 ? 'due-soon' : '';
        
        return `
            <div class="homework-card">
                <div class="homework-header">
                    <div>
                        <h3 class="homework-title">${hw.title}</h3>
                        <div class="homework-meta">
                            <span>Classroom: ${hw.classroomName}</span>
                            <span>Due: ${formatDate(hw.dueDate)}</span>
                        </div>
                    </div>
                    <span class="homework-status ${statusClass}">
                        ${daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Overdue'}
                    </span>
                </div>
                <div class="homework-description">${hw.description}</div>
                <div class="homework-actions">
                    <button class="btn btn-danger btn-sm" onclick="deleteHomework('${hw.id}')">Delete</button>
                </div>
            </div>
        `;
    }).join('');

    // Update classroom options for homework
    updateHomeworkClassroomOptions();
}

function showAssignHomework() {
    document.getElementById('assignHomeworkModal').classList.add('active');
}

function saveHomework() {
    const title = document.getElementById('homeworkTitle').value;
    const description = document.getElementById('homeworkDescription').value;
    const classroomId = document.getElementById('homeworkClassroom').value;
    const dueDate = document.getElementById('homeworkDueDate').value;

    if (!title || !description || !classroomId || !dueDate) {
        alert('Please fill in all fields.');
        return;
    }

    const classrooms = getClassrooms();
    const classroom = classrooms.find(c => c.id === classroomId);

    const homework = {
        id: 'hw_' + Date.now(),
        title,
        description,
        classroomId,
        classroomName: classroom.name,
        dueDate,
        assignedAt: new Date().toISOString()
    };

    const homeworkList = getHomework();
    homeworkList.push(homework);
    localStorage.setItem('teachquiz_homework', JSON.stringify(homeworkList));

    addActivity(`Homework "${title}" assigned to ${classroom.name}`);

    closeModal('assignHomeworkModal');
    document.getElementById('assignHomeworkForm').reset();
    loadHomework();
}

function deleteHomework(homeworkId) {
    if (confirm('Are you sure you want to delete this homework assignment?')) {
        const homework = getHomework();
        const updatedHomework = homework.filter(hw => hw.id !== homeworkId);
        localStorage.setItem('teachquiz_homework', JSON.stringify(updatedHomework));
        loadHomework();
    }
}

function updateHomeworkClassroomOptions() {
    const select = document.getElementById('homeworkClassroom');
    const classrooms = getClassrooms();
    
    select.innerHTML = '<option value="">Select Classroom</option>' + 
        classrooms.map(classroom => 
            `<option value="${classroom.id}">${classroom.name}</option>`
        ).join('');
}

// GK Posts management
function loadGKPosts() {
    const posts = getGKPosts();
    const container = document.getElementById('gkPosts');
    
    if (posts.length === 0) {
        container.innerHTML = '<p class="empty-state">No GK questions posted yet</p>';
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="gk-post">
            <div class="gk-post-header">
                <div class="gk-post-date">${formatDate(post.postedAt)}</div>
                <span class="gk-category">${post.category}</span>
            </div>
            <div class="gk-question">${post.question}</div>
            <div class="gk-answer">
                <strong>Answer:</strong> ${post.answer}
            </div>
            <div style="margin-top: 1rem;">
                <button class="btn btn-danger btn-sm" onclick="deleteGKPost('${post.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function showPostGK() {
    document.getElementById('postGKModal').classList.add('active');
}

function saveGKPost() {
    const question = document.getElementById('gkQuestion').value;
    const answer = document.getElementById('gkAnswer').value;
    const category = document.getElementById('gkCategory').value;

    if (!question || !answer || !category) {
        alert('Please fill in all fields.');
        return;
    }

    const post = {
        id: 'gk_' + Date.now(),
        question,
        answer,
        category,
        postedAt: new Date().toISOString()
    };

    const posts = getGKPosts();
    posts.unshift(post); // Add to beginning
    localStorage.setItem('teachquiz_gk_posts', JSON.stringify(posts));

    addActivity(`New GK question posted in ${category}`);

    closeModal('postGKModal');
    document.getElementById('postGKForm').reset();
    loadGKPosts();
}

function deleteGKPost(postId) {
    if (confirm('Are you sure you want to delete this GK post?')) {
        const posts = getGKPosts();
        const updatedPosts = posts.filter(p => p.id !== postId);
        localStorage.setItem('teachquiz_gk_posts', JSON.stringify(updatedPosts));
        loadGKPosts();
    }
}

// Utility functions
function getClassrooms() {
    return JSON.parse(localStorage.getItem('teachquiz_classrooms') || '[]');
}

function getQuizzes() {
    return JSON.parse(localStorage.getItem('teachquiz_quizzes') || '[]');
}

function getHomework() {
    return JSON.parse(localStorage.getItem('teachquiz_homework') || '[]');
}

function getGKPosts() {
    return JSON.parse(localStorage.getItem('teachquiz_gk_posts') || '[]');
}

function getQuizResults() {
    return JSON.parse(localStorage.getItem('teachquiz_quiz_results') || '[]');
}

function getActivities() {
    return JSON.parse(localStorage.getItem('teachquiz_activities') || '[]');
}

function getQuizzesForClassroom(classroomId) {
    return getQuizzes().filter(q => q.classroomId === classroomId);
}

function addActivity(text) {
    const activities = getActivities();
    activities.unshift({
        text,
        time: new Date().toISOString()
    });
    
    // Keep only last 50 activities
    if (activities.length > 50) {
        activities.splice(50);
    }
    
    localStorage.setItem('teachquiz_activities', JSON.stringify(activities));
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
        return 'Just now';
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} days ago`;
    }
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Sample data for demonstration
function generateSampleData() {
    // This would be called to populate with sample data for demo purposes
    const sampleQuizResults = [
        {
            quizId: 'quiz_1',
            quizTitle: 'Math Quiz 1',
            studentName: 'Alice Johnson',
            className: 'Mathematics 10A',
            score: 95,
            totalQuestions: 10,
            correctAnswers: 9.5,
            completedAt: new Date().toISOString()
        },
        {
            quizId: 'quiz_1',
            quizTitle: 'Math Quiz 1',
            studentName: 'Bob Smith',
            className: 'Mathematics 10A',
            score: 87,
            totalQuestions: 10,
            correctAnswers: 8.7,
            completedAt: new Date().toISOString()
        }
    ];
    
    localStorage.setItem('teachquiz_quiz_results', JSON.stringify(sampleQuizResults));
}