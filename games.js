// Smooth scrolling function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
}

// Intersection Observer for animations
function createScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = '0s';
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });
}

// Add click handlers for play buttons
function initializePlayButtons() {
  const playButtons = document.querySelectorAll('.play-button');
  playButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const gameTitle = this.parentNode.querySelector('h3').textContent;
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      showGameLaunchMessage(gameTitle);
    });
  });
}

// Show game launch message
function showGameLaunchMessage(gameTitle) {
  const modal = document.createElement('div');
  modal.className = 'game-launch-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>🎮 Launching ${gameTitle}</h3>
      <p>This is a demo version. The full game would be loaded here!</p>
      <div class="modal-buttons">
        <button class="modal-button primary" id="start-game-btn">Start Playing</button>
        <button class="modal-button secondary" onclick="closeModal()">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Attach start button event (IMPORTANT FIX)
// Attach start button event (NEW FIX - Load game.js)
document.getElementById('start-game-btn').addEventListener('click', () => {
    closeModal();
  
    // Dynamically load game.js
    const existingScript = document.getElementById('game-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'game.js'; // make sure this path is correct
      script.id = 'game-script';
      document.body.appendChild(script);
    } else {
      // If already loaded, restart the game (if your game.js has init function)
      if (typeof startGame === 'function') {
        startGame(); // call your main game function
      }
    }
  });
  if (!document.getElementById('modal-styles')) {
    const modalStyles = document.createElement('style');
    modalStyles.id = 'modal-styles';
    modalStyles.textContent = `
      .game-launch-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      }
      .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        animation: slideInUp 0.3s ease;
      }
      .modal-content h3 {
        margin-bottom: 1rem;
        color: #1f2937;
        font-size: 1.5rem;
      }
      .modal-content p {
        margin-bottom: 2rem;
        color: #6b7280;
        line-height: 1.6;
      }
      .modal-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }
      .modal-button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .modal-button.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .modal-button.secondary {
        background: #f3f4f6;
        color: #6b7280;
      }
      .modal-button:hover {
        transform: translateY(-2px);
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(modalStyles);
  }
}

// Close modal function
window.closeModal = function() {
  const modal = document.querySelector('.game-launch-modal');
  if (modal) {
    modal.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
};

// Active nav link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('.games-section');
  const navLinks = document.querySelectorAll('.nav-link');
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionId = section.id;
    if (rect.top <= 200 && rect.bottom >= 200) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

// Floating animation for hero elements
function createFloatingAnimation() {
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach((element, index) => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2) rotate(10deg)';
      this.style.opacity = '0.3';
    });
    element.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.opacity = '0.1';
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  createScrollAnimations();
  initializePlayButtons();
  createFloatingAnimation();
  window.addEventListener('scroll', handleNavbarScroll);
  window.addEventListener('scroll', updateActiveNavLink);
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });
});

document.addEventListener('mousemove', function(e) {
  const heroElements = document.querySelectorAll('.floating-element');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  heroElements.forEach((element, index) => {
    const speed = (index + 1) * 0.02;
    const x = (mouseX - 0.5) * speed * 100;
    const y = (mouseY - 0.5) * speed * 100;
    element.style.transform += ` translate(${x}px, ${y}px)`;
  });
});

window.scrollToSection = scrollToSection;
console.log('🎮 EduGames Portal loaded successfully!');