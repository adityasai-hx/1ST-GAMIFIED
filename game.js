// Game Management System
class GameManager {
    constructor() {
      this.currentGame = null;
      this.gameContainer = null;
      this.createGameContainer();
    }
  
    createGameContainer() {
      this.gameContainer = document.createElement('div');
      this.gameContainer.className = 'game-modal';
      this.gameContainer.innerHTML = `
        <div class="game-modal-content">
          <div class="game-header">
            <h3 id="game-title"></h3>
            <button class="close-game-btn" onclick="gameManager.closeGame()">&times;</button>
          </div>
          <div id="game-content"></div>
        </div>
      `;
      document.body.appendChild(this.gameContainer);
    }
  
    openGame(gameType, gameTitle) {
      document.getElementById('game-title').textContent = gameTitle;
      const gameContent = document.getElementById('game-content');
      
      // Clear previous game
      gameContent.innerHTML = '';
      
      // Load specific game
      switch(gameType) {
        case 'algebra':
          this.loadAlgebraGame(gameContent);
          break;
        case 'geometry':
          this.loadGeometryGame(gameContent);
          break;
        case 'calculus':
          this.loadCalculusGame(gameContent);
          break;
        case 'circuit':
          this.loadCircuitGame(gameContent);
          break;
        case 'wave':
          this.loadWaveGame(gameContent);
          break;
        case 'motion':
          this.loadMotionGame(gameContent);
          break;
        case 'element':
          this.loadElementGame(gameContent);
          break;
        case 'reaction':
          this.loadReactionGame(gameContent);
          break;
        case 'molecule':
          this.loadMoleculeGame(gameContent);
          break;
        case 'dna':
          this.loadDNAGame(gameContent);
          break;
        case 'cell':
          this.loadCellGame(gameContent);
          break;
        case 'ecosystem':
          this.loadEcosystemGame(gameContent);
          break;
      }
      
      this.gameContainer.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  
    closeGame() {
      this.gameContainer.style.display = 'none';
      document.body.style.overflow = 'auto';
      if (this.currentGame && this.currentGame.cleanup) {
        this.currentGame.cleanup();
      }
    }
  
    // Math Games
    loadAlgebraGame(container) {
      const game = new AlgebraGame(container);
      this.currentGame = game;
    }
  
    loadGeometryGame(container) {
      const game = new GeometryGame(container);
      this.currentGame = game;
    }
  
    loadCalculusGame(container) {
      const game = new CalculusGame(container);
      this.currentGame = game;
    }
  
    // Physics Games
    loadCircuitGame(container) {
      const game = new CircuitGame(container);
      this.currentGame = game;
    }
  
    loadWaveGame(container) {
      const game = new WaveGame(container);
      this.currentGame = game;
    }
  
    loadMotionGame(container) {
      const game = new MotionGame(container);
      this.currentGame = game;
    }
  
    // Chemistry Games
    loadElementGame(container) {
      const game = new ElementGame(container);
      this.currentGame = game;
    }
  
    loadReactionGame(container) {
      const game = new ReactionGame(container);
      this.currentGame = game;
    }
  
    loadMoleculeGame(container) {
      const game = new MoleculeGame(container);
      this.currentGame = game;
    }
  
    // Biology Games
    loadDNAGame(container) {
      const game = new DNAGame(container);
      this.currentGame = game;
    }
  
    loadCellGame(container) {
      const game = new CellGame(container);
      this.currentGame = game;
    }
  
    loadEcosystemGame(container) {
      const game = new EcosystemGame(container);
      this.currentGame = game;
    }
  }
  
  // Math Games
  class AlgebraGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.currentProblem = null;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="algebra-game">
          <div class="game-stats">
            <span>Score: <span id="algebra-score">0</span></span>
            <span>Level: <span id="algebra-level">1</span></span>
          </div>
          <div class="problem-container">
            <h4>Solve the equation:</h4>
            <div id="algebra-problem" class="math-problem"></div>
            <input type="number" id="algebra-answer" placeholder="Enter your answer">
            <button onclick="gameManager.currentGame.checkAnswer()" class="submit-btn">Submit</button>
          </div>
          <div id="algebra-feedback" class="feedback"></div>
          <button onclick="gameManager.currentGame.nextProblem()" class="next-btn">Next Problem</button>
        </div>
      `;
      this.generateProblem();
    }
  
    generateProblem() {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      const c = Math.floor(Math.random() * 30) + 1;
      
      this.currentProblem = {
        equation: `${a}x + ${b} = ${c}`,
        answer: (c - b) / a
      };
      
      document.getElementById('algebra-problem').textContent = this.currentProblem.equation;
      document.getElementById('algebra-answer').value = '';
      document.getElementById('algebra-feedback').textContent = '';
    }
  
    checkAnswer() {
      const userAnswer = parseFloat(document.getElementById('algebra-answer').value);
      const feedback = document.getElementById('algebra-feedback');
      
      if (Math.abs(userAnswer - this.currentProblem.answer) < 0.01) {
        this.score += 10;
        feedback.textContent = '✅ Correct! Well done!';
        feedback.className = 'feedback correct';
        document.getElementById('algebra-score').textContent = this.score;
      } else {
        feedback.textContent = `❌ Incorrect. The answer is ${this.currentProblem.answer.toFixed(2)}`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    nextProblem() {
      this.generateProblem();
    }
  }
  
  class GeometryGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="geometry-game">
          <div class="game-stats">
            <span>Score: <span id="geometry-score">0</span></span>
          </div>
          <div class="shape-container">
            <canvas id="geometry-canvas" width="400" height="300"></canvas>
          </div>
          <div class="question-container">
            <h4 id="geometry-question">Calculate the area of the rectangle</h4>
            <input type="number" id="geometry-answer" placeholder="Enter area">
            <button onclick="gameManager.currentGame.checkAnswer()" class="submit-btn">Submit</button>
          </div>
          <div id="geometry-feedback" class="feedback"></div>
          <button onclick="gameManager.currentGame.nextShape()" class="next-btn">Next Shape</button>
        </div>
      `;
      this.canvas = document.getElementById('geometry-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.generateShape();
    }
  
    generateShape() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      const width = Math.floor(Math.random() * 100) + 50;
      const height = Math.floor(Math.random() * 80) + 40;
      
      this.currentShape = {
        type: 'rectangle',
        width: width,
        height: height,
        area: width * height
      };
      
      // Draw rectangle
      this.ctx.fillStyle = '#3b82f6';
      this.ctx.fillRect(50, 50, width, height);
      
      // Add dimensions
      this.ctx.fillStyle = '#000';
      this.ctx.font = '14px Arial';
      this.ctx.fillText(`${width}`, 50 + width/2 - 10, 45);
      this.ctx.fillText(`${height}`, 30, 50 + height/2);
      
      document.getElementById('geometry-question').textContent = 'Calculate the area of the rectangle';
      document.getElementById('geometry-answer').value = '';
      document.getElementById('geometry-feedback').textContent = '';
    }
  
    checkAnswer() {
      const userAnswer = parseInt(document.getElementById('geometry-answer').value);
      const feedback = document.getElementById('geometry-feedback');
      
      if (userAnswer === this.currentShape.area) {
        this.score += 15;
        feedback.textContent = '✅ Correct! Great job!';
        feedback.className = 'feedback correct';
        document.getElementById('geometry-score').textContent = this.score;
      } else {
        feedback.textContent = `❌ Incorrect. The area is ${this.currentShape.area}`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    nextShape() {
      this.generateShape();
    }
  }
  
  class CalculusGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="calculus-game">
          <div class="game-stats">
            <span>Score: <span id="calculus-score">0</span></span>
          </div>
          <div class="derivative-container">
            <h4>Find the derivative:</h4>
            <div id="calculus-function" class="math-problem"></div>
            <div class="options-container">
              <button class="option-btn" onclick="gameManager.currentGame.selectAnswer(0)"></button>
              <button class="option-btn" onclick="gameManager.currentGame.selectAnswer(1)"></button>
              <button class="option-btn" onclick="gameManager.currentGame.selectAnswer(2)"></button>
              <button class="option-btn" onclick="gameManager.currentGame.selectAnswer(3)"></button>
            </div>
          </div>
          <div id="calculus-feedback" class="feedback"></div>
          <button onclick="gameManager.currentGame.nextProblem()" class="next-btn">Next Problem</button>
        </div>
      `;
      this.generateProblem();
    }
  
    generateProblem() {
      const problems = [
        {
          function: 'f(x) = x²',
          options: ['2x', 'x', '2x²', 'x²'],
          correct: 0
        },
        {
          function: 'f(x) = 3x³',
          options: ['9x²', '3x²', '9x³', '3x'],
          correct: 0
        },
        {
          function: 'f(x) = 5x',
          options: ['5', '5x', '10x', '0'],
          correct: 0
        }
      ];
      
      this.currentProblem = problems[Math.floor(Math.random() * problems.length)];
      
      document.getElementById('calculus-function').textContent = this.currentProblem.function;
      const buttons = document.querySelectorAll('.option-btn');
      buttons.forEach((btn, index) => {
        btn.textContent = this.currentProblem.options[index];
        btn.className = 'option-btn';
      });
      
      document.getElementById('calculus-feedback').textContent = '';
    }
  
    selectAnswer(index) {
      const buttons = document.querySelectorAll('.option-btn');
      const feedback = document.getElementById('calculus-feedback');
      
      buttons.forEach(btn => btn.classList.remove('selected'));
      buttons[index].classList.add('selected');
      
      if (index === this.currentProblem.correct) {
        this.score += 20;
        feedback.textContent = '✅ Correct derivative!';
        feedback.className = 'feedback correct';
        document.getElementById('calculus-score').textContent = this.score;
      } else {
        feedback.textContent = `❌ Incorrect. The correct answer is ${this.currentProblem.options[this.currentProblem.correct]}`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    nextProblem() {
      this.generateProblem();
    }
  }
  
  // Physics Games
  class CircuitGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="circuit-game">
          <div class="game-stats">
            <span>Score: <span id="circuit-score">0</span></span>
          </div>
          <div class="circuit-builder">
            <canvas id="circuit-canvas" width="500" height="300"></canvas>
            <div class="circuit-controls">
              <label>Voltage (V): <input type="range" id="voltage-slider" min="1" max="12" value="6"></label>
              <label>Resistance (Ω): <input type="range" id="resistance-slider" min="1" max="20" value="10"></label>
              <div class="circuit-display">
                <span>Current: <span id="current-display">0.6</span> A</span>
                <span>Power: <span id="power-display">3.6</span> W</span>
              </div>
            </div>
          </div>
          <div class="circuit-question">
            <h4 id="circuit-question-text">Adjust the circuit to get 1.2A current</h4>
            <button onclick="gameManager.currentGame.checkCircuit()" class="submit-btn">Check Circuit</button>
          </div>
          <div id="circuit-feedback" class="feedback"></div>
        </div>
      `;
      
      this.canvas = document.getElementById('circuit-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.setupEventListeners();
      this.drawCircuit();
      this.generateChallenge();
    }
  
    setupEventListeners() {
      const voltageSlider = document.getElementById('voltage-slider');
      const resistanceSlider = document.getElementById('resistance-slider');
      
      voltageSlider.addEventListener('input', () => this.updateCircuit());
      resistanceSlider.addEventListener('input', () => this.updateCircuit());
    }
  
    drawCircuit() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw circuit components
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 3;
      
      // Battery
      this.ctx.beginPath();
      this.ctx.rect(50, 100, 60, 40);
      this.ctx.stroke();
      this.ctx.fillStyle = '#000';
      this.ctx.font = '12px Arial';
      this.ctx.fillText('Battery', 55, 125);
      
      // Resistor
      this.ctx.beginPath();
      this.ctx.rect(200, 100, 80, 40);
      this.ctx.stroke();
      this.ctx.fillText('Resistor', 210, 125);
      
      // Wires
      this.ctx.beginPath();
      this.ctx.moveTo(110, 120);
      this.ctx.lineTo(200, 120);
      this.ctx.moveTo(280, 120);
      this.ctx.lineTo(350, 120);
      this.ctx.lineTo(350, 200);
      this.ctx.lineTo(50, 200);
      this.ctx.lineTo(50, 140);
      this.ctx.stroke();
      
      // Current flow arrows
      this.ctx.fillStyle = '#ff0000';
      this.ctx.beginPath();
      this.ctx.moveTo(150, 115);
      this.ctx.lineTo(160, 120);
      this.ctx.lineTo(150, 125);
      this.ctx.fill();
    }
  
    updateCircuit() {
      const voltage = parseFloat(document.getElementById('voltage-slider').value);
      const resistance = parseFloat(document.getElementById('resistance-slider').value);
      
      const current = voltage / resistance;
      const power = voltage * current;
      
      document.getElementById('current-display').textContent = current.toFixed(2);
      document.getElementById('power-display').textContent = power.toFixed(2);
      
      this.drawCircuit();
    }
  
    generateChallenge() {
      const targetCurrent = (Math.random() * 2 + 0.5).toFixed(1);
      this.targetCurrent = parseFloat(targetCurrent);
      document.getElementById('circuit-question-text').textContent = `Adjust the circuit to get ${targetCurrent}A current`;
    }
  
    checkCircuit() {
      const current = parseFloat(document.getElementById('current-display').textContent);
      const feedback = document.getElementById('circuit-feedback');
      
      if (Math.abs(current - this.targetCurrent) < 0.1) {
        this.score += 25;
        feedback.textContent = '✅ Perfect! You got the right current!';
        feedback.className = 'feedback correct';
        document.getElementById('circuit-score').textContent = this.score;
        setTimeout(() => this.generateChallenge(), 2000);
      } else {
        feedback.textContent = `❌ Close, but try to get exactly ${this.targetCurrent}A`;
        feedback.className = 'feedback incorrect';
      }
    }
  }
  
  class WaveGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.animationId = null;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="wave-game">
          <div class="game-stats">
            <span>Score: <span id="wave-score">0</span></span>
          </div>
          <div class="wave-simulator">
            <canvas id="wave-canvas" width="500" height="200"></canvas>
            <div class="wave-controls">
              <label>Frequency: <input type="range" id="frequency-slider" min="1" max="10" value="2"></label>
              <label>Amplitude: <input type="range" id="amplitude-slider" min="10" max="50" value="30"></label>
              <div class="wave-display">
                <span>Wavelength: <span id="wavelength-display">250</span> px</span>
              </div>
            </div>
          </div>
          <div class="wave-challenge">
            <h4 id="wave-question">Match the target wave pattern</h4>
            <button onclick="gameManager.currentGame.checkWave()" class="submit-btn">Check Wave</button>
          </div>
          <div id="wave-feedback" class="feedback"></div>
        </div>
      `;
      
      this.canvas = document.getElementById('wave-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.time = 0;
      this.setupEventListeners();
      this.generateTarget();
      this.animate();
    }
  
    setupEventListeners() {
      document.getElementById('frequency-slider').addEventListener('input', () => this.updateWave());
      document.getElementById('amplitude-slider').addEventListener('input', () => this.updateWave());
    }
  
    updateWave() {
      const frequency = parseFloat(document.getElementById('frequency-slider').value);
      const wavelength = 500 / frequency;
      document.getElementById('wavelength-display').textContent = wavelength.toFixed(0);
    }
  
    generateTarget() {
      this.targetFreq = Math.floor(Math.random() * 5) + 3;
      this.targetAmp = Math.floor(Math.random() * 30) + 20;
      document.getElementById('wave-question').textContent = `Create a wave with frequency ${this.targetFreq} and amplitude ${this.targetAmp}`;
    }
  
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      const frequency = parseFloat(document.getElementById('frequency-slider').value);
      const amplitude = parseFloat(document.getElementById('amplitude-slider').value);
      
      // Draw current wave
      this.ctx.strokeStyle = '#3b82f6';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      
      for (let x = 0; x < this.canvas.width; x++) {
        const y = this.canvas.height/2 + amplitude * Math.sin((x * frequency * Math.PI / 50) + this.time);
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
      
      // Draw target wave (faded)
      this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      
      for (let x = 0; x < this.canvas.width; x++) {
        const y = this.canvas.height/2 + this.targetAmp * Math.sin((x * this.targetFreq * Math.PI / 50) + this.time);
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
      
      this.time += 0.1;
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  
    checkWave() {
      const frequency = parseFloat(document.getElementById('frequency-slider').value);
      const amplitude = parseFloat(document.getElementById('amplitude-slider').value);
      const feedback = document.getElementById('wave-feedback');
      
      if (Math.abs(frequency - this.targetFreq) < 0.5 && Math.abs(amplitude - this.targetAmp) < 5) {
        this.score += 30;
        feedback.textContent = '✅ Perfect wave match!';
        feedback.className = 'feedback correct';
        document.getElementById('wave-score').textContent = this.score;
        setTimeout(() => this.generateTarget(), 2000);
      } else {
        feedback.textContent = `❌ Not quite right. Target: freq=${this.targetFreq}, amp=${this.targetAmp}`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    cleanup() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }
  }
  
  class MotionGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="motion-game">
          <div class="game-stats">
            <span>Score: <span id="motion-score">0</span></span>
          </div>
          <div class="motion-simulator">
            <canvas id="motion-canvas" width="500" height="300"></canvas>
            <div class="motion-controls">
              <label>Initial Velocity: <input type="range" id="velocity-slider" min="0" max="50" value="20"> m/s</label>
              <label>Angle: <input type="range" id="angle-slider" min="0" max="90" value="45">°</label>
              <button onclick="gameManager.currentGame.launch()" class="launch-btn">Launch!</button>
            </div>
          </div>
          <div class="motion-challenge">
            <h4 id="motion-question">Hit the target at 400m distance</h4>
            <div class="target-info">Target: <span id="target-distance">400</span>m</div>
          </div>
          <div id="motion-feedback" class="feedback"></div>
        </div>
      `;
      
      this.canvas = document.getElementById('motion-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.generateTarget();
      this.drawScene();
    }
  
    generateTarget() {
      this.targetDistance = Math.floor(Math.random() * 200) + 300;
      document.getElementById('target-distance').textContent = this.targetDistance;
      document.getElementById('motion-question').textContent = `Hit the target at ${this.targetDistance}m distance`;
    }
  
    drawScene() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Ground
      this.ctx.fillStyle = '#8B4513';
      this.ctx.fillRect(0, 250, this.canvas.width, 50);
      
      // Cannon
      this.ctx.fillStyle = '#333';
      this.ctx.fillRect(20, 230, 40, 20);
      
      // Target
      const targetX = (this.targetDistance / 500) * this.canvas.width;
      this.ctx.fillStyle = '#ff0000';
      this.ctx.fillRect(targetX - 5, 200, 10, 50);
      
      // Distance markers
      this.ctx.fillStyle = '#000';
      this.ctx.font = '12px Arial';
      for (let i = 100; i <= 500; i += 100) {
        const x = (i / 500) * this.canvas.width;
        this.ctx.fillText(`${i}m`, x, 280);
      }
    }
  
    launch() {
      const velocity = parseFloat(document.getElementById('velocity-slider').value);
      const angle = parseFloat(document.getElementById('angle-slider').value) * Math.PI / 180;
      
      const vx = velocity * Math.cos(angle);
      const vy = velocity * Math.sin(angle);
      const g = 9.81;
      
      // Calculate range
      const range = (velocity * velocity * Math.sin(2 * angle)) / g;
      
      this.animateProjectile(vx, vy, g, range);
    }
  
    animateProjectile(vx, vy, g, range) {
      let t = 0;
      const dt = 0.05;
      
      const animate = () => {
        this.drawScene();
        
        const x = vx * t;
        const y = vy * t - 0.5 * g * t * t;
        
        if (y >= 0) {
          // Draw projectile
          const canvasX = 40 + (x / 500) * (this.canvas.width - 40);
          const canvasY = 230 - y * 2; // Scale for visibility
          
          this.ctx.fillStyle = '#0066cc';
          this.ctx.beginPath();
          this.ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
          this.ctx.fill();
          
          t += dt;
          requestAnimationFrame(animate);
        } else {
          // Projectile landed
          this.checkHit(range);
        }
      };
      
      animate();
    }
  
    checkHit(range) {
      const feedback = document.getElementById('motion-feedback');
      const distance = Math.abs(range - this.targetDistance);
      
      if (distance < 20) {
        this.score += 35;
        feedback.textContent = '🎯 Direct hit! Excellent physics!';
        feedback.className = 'feedback correct';
        document.getElementById('motion-score').textContent = this.score;
        setTimeout(() => this.generateTarget(), 2000);
      } else {
        feedback.textContent = `📍 Missed by ${distance.toFixed(1)}m. Range was ${range.toFixed(1)}m`;
        feedback.className = 'feedback incorrect';
      }
    }
  }
  
  // Chemistry Games
  class ElementGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="element-game">
          <div class="game-stats">
            <span>Score: <span id="element-score">0</span></span>
          </div>
          <div class="periodic-table-mini">
            <div id="element-display" class="element-card">
              <div class="atomic-number"></div>
              <div class="element-symbol"></div>
              <div class="element-name"></div>
            </div>
          </div>
          <div class="element-question">
            <h4 id="element-question-text">What is the atomic number of this element?</h4>
            <input type="number" id="element-answer" placeholder="Enter atomic number">
            <button onclick="gameManager.currentGame.checkElement()" class="submit-btn">Submit</button>
          </div>
          <div id="element-feedback" class="feedback"></div>
          <button onclick="gameManager.currentGame.nextElement()" class="next-btn">Next Element</button>
        </div>
      `;
      this.generateElement();
    }
  
    generateElement() {
      const elements = [
        { symbol: 'H', name: 'Hydrogen', number: 1 },
        { symbol: 'He', name: 'Helium', number: 2 },
        { symbol: 'Li', name: 'Lithium', number: 3 },
        { symbol: 'C', name: 'Carbon', number: 6 },
        { symbol: 'N', name: 'Nitrogen', number: 7 },
        { symbol: 'O', name: 'Oxygen', number: 8 },
        { symbol: 'Na', name: 'Sodium', number: 11 },
        { symbol: 'Mg', name: 'Magnesium', number: 12 },
        { symbol: 'Al', name: 'Aluminum', number: 13 },
        { symbol: 'Si', name: 'Silicon', number: 14 },
        { symbol: 'Cl', name: 'Chlorine', number: 17 },
        { symbol: 'Ca', name: 'Calcium', number: 20 }
      ];
      
      this.currentElement = elements[Math.floor(Math.random() * elements.length)];
      
      document.querySelector('.element-symbol').textContent = this.currentElement.symbol;
      document.querySelector('.element-name').textContent = this.currentElement.name;
      document.querySelector('.atomic-number').textContent = '?';
      
      document.getElementById('element-answer').value = '';
      document.getElementById('element-feedback').textContent = '';
    }
  
    checkElement() {
      const userAnswer = parseInt(document.getElementById('element-answer').value);
      const feedback = document.getElementById('element-feedback');
      
      if (userAnswer === this.currentElement.number) {
        this.score += 15;
        feedback.textContent = '✅ Correct atomic number!';
        feedback.className = 'feedback correct';
        document.getElementById('element-score').textContent = this.score;
        document.querySelector('.atomic-number').textContent = this.currentElement.number;
      } else {
        feedback.textContent = `❌ Incorrect. ${this.currentElement.name} has atomic number ${this.currentElement.number}`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    nextElement() {
      this.generateElement();
    }
  }
  
  class ReactionGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="reaction-game">
          <div class="game-stats">
            <span>Score: <span id="reaction-score">0</span></span>
          </div>
          <div class="reaction-equation">
            <h4>Balance the chemical equation:</h4>
            <div id="reaction-display" class="equation-display"></div>
            <div class="coefficient-inputs">
              <input type="number" id="coeff1" min="1" max="10" value="1">
              <span class="reactant1"></span>
              <span> + </span>
              <input type="number" id="coeff2" min="1" max="10" value="1">
              <span class="reactant2"></span>
              <span> → </span>
              <input type="number" id="coeff3" min="1" max="10" value="1">
              <span class="product1"></span>
              <span> + </span>
              <input type="number" id="coeff4" min="1" max="10" value="1">
              <span class="product2"></span>
            </div>
            <button onclick="gameManager.currentGame.checkBalance()" class="submit-btn">Check Balance</button>
          </div>
          <div id="reaction-feedback" class="feedback"></div>
          <button onclick="gameManager.currentGame.nextReaction()" class="next-btn">Next Reaction</button>
        </div>
      `;
      this.generateReaction();
    }
  
    generateReaction() {
      const reactions = [
        {
          reactants: ['H₂', 'O₂'],
          products: ['H₂O'],
          coefficients: [2, 1, 2, 0],
          display: 'H₂ + O₂ → H₂O'
        },
        {
          reactants: ['CH₄', 'O₂'],
          products: ['CO₂', 'H₂O'],
          coefficients: [1, 2, 1, 2],
          display: 'CH₄ + O₂ → CO₂ + H₂O'
        },
        {
          reactants: ['Na', 'Cl₂'],
          products: ['NaCl'],
          coefficients: [2, 1, 2, 0],
          display: 'Na + Cl₂ → NaCl'
        }
      ];
      
      this.currentReaction = reactions[Math.floor(Math.random() * reactions.length)];
      
      document.querySelector('.reactant1').textContent = this.currentReaction.reactants[0];
      document.querySelector('.reactant2').textContent = this.currentReaction.reactants[1];
      document.querySelector('.product1').textContent = this.currentReaction.products[0];
      document.querySelector('.product2').textContent = this.currentReaction.products[1] || '';
      
      // Reset inputs
      document.getElementById('coeff1').value = 1;
      document.getElementById('coeff2').value = 1;
      document.getElementById('coeff3').value = 1;
      document.getElementById('coeff4').value = this.currentReaction.products[1] ? 1 : 0;
      
      document.getElementById('reaction-feedback').textContent = '';
    }
  
    checkBalance() {
      const userCoeffs = [
        parseInt(document.getElementById('coeff1').value),
        parseInt(document.getElementById('coeff2').value),
        parseInt(document.getElementById('coeff3').value),
        parseInt(document.getElementById('coeff4').value) || 0
      ];
      
      const feedback = document.getElementById('reaction-feedback');
      const correct = this.currentReaction.coefficients;
      
      if (JSON.stringify(userCoeffs) === JSON.stringify(correct)) {
        this.score += 25;
        feedback.textContent = '✅ Perfectly balanced equation!';
        feedback.className = 'feedback correct';
        document.getElementById('reaction-score').textContent = this.score;
      } else {
        feedback.textContent = `❌ Not balanced. Try: ${correct.join(', ')}`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    nextReaction() {
      this.generateReaction();
    }
  }
  
  class MoleculeGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="molecule-game">
          <div class="game-stats">
            <span>Score: <span id="molecule-score">0</span></span>
          </div>
          <div class="molecule-builder">
            <canvas id="molecule-canvas" width="400" height="300"></canvas>
            <div class="atom-palette">
              <button class="atom-btn" data-atom="H" style="background: #fff">H</button>
              <button class="atom-btn" data-atom="C" style="background: #000; color: #fff">C</button>
              <button class="atom-btn" data-atom="O" style="background: #f00; color: #fff">O</button>
              <button class="atom-btn" data-atom="N" style="background: #00f; color: #fff">N</button>
            </div>
          </div>
          <div class="molecule-challenge">
            <h4 id="molecule-question">Build: Water (H₂O)</h4>
            <button onclick="gameManager.currentGame.checkMolecule()" class="submit-btn">Check Molecule</button>
            <button onclick="gameManager.currentGame.clearCanvas()" class="clear-btn">Clear</button>
          </div>
          <div id="molecule-feedback" class="feedback"></div>
        </div>
      `;
      
      this.canvas = document.getElementById('molecule-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.atoms = [];
      this.selectedAtom = 'H';
      this.setupEventListeners();
      this.generateChallenge();
    }
  
    setupEventListeners() {
      document.querySelectorAll('.atom-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.selectedAtom = e.target.dataset.atom;
          document.querySelectorAll('.atom-btn').forEach(b => b.classList.remove('selected'));
          e.target.classList.add('selected');
        });
      });
      
      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.addAtom(x, y);
      });
    }
  
    addAtom(x, y) {
      this.atoms.push({ type: this.selectedAtom, x, y });
      this.drawMolecule();
    }
  
    drawMolecule() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.atoms.forEach(atom => {
        const colors = { H: '#fff', C: '#000', O: '#f00', N: '#00f' };
        
        this.ctx.fillStyle = colors[atom.type];
        this.ctx.beginPath();
        this.ctx.arc(atom.x, atom.y, 20, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        
        this.ctx.fillStyle = atom.type === 'C' ? '#fff' : '#000';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(atom.type, atom.x, atom.y + 5);
      });
    }
  
    generateChallenge() {
      const molecules = [
        { name: 'Water', formula: 'H₂O', atoms: { H: 2, O: 1 } },
        { name: 'Methane', formula: 'CH₄', atoms: { C: 1, H: 4 } },
        { name: 'Ammonia', formula: 'NH₃', atoms: { N: 1, H: 3 } },
        { name: 'Carbon Dioxide', formula: 'CO₂', atoms: { C: 1, O: 2 } }
      ];
      
      this.currentMolecule = molecules[Math.floor(Math.random() * molecules.length)];
      document.getElementById('molecule-question').textContent = `Build: ${this.currentMolecule.name} (${this.currentMolecule.formula})`;
    }
  
    checkMolecule() {
      const atomCount = {};
      this.atoms.forEach(atom => {
        atomCount[atom.type] = (atomCount[atom.type] || 0) + 1;
      });
      
      const feedback = document.getElementById('molecule-feedback');
      const target = this.currentMolecule.atoms;
      
      let correct = true;
      for (let atom in target) {
        if (atomCount[atom] !== target[atom]) {
          correct = false;
          break;
        }
      }
      
      if (correct && Object.keys(atomCount).length === Object.keys(target).length) {
        this.score += 20;
        feedback.textContent = '✅ Perfect molecule structure!';
        feedback.className = 'feedback correct';
        document.getElementById('molecule-score').textContent = this.score;
        setTimeout(() => {
          this.generateChallenge();
          this.clearCanvas();
        }, 2000);
      } else {
        feedback.textContent = `❌ Incorrect. Need: ${Object.entries(target).map(([k,v]) => `${k}:${v}`).join(', ')}`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    clearCanvas() {
      this.atoms = [];
      this.drawMolecule();
    }
  }
  
  // Biology Games
  class DNAGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="dna-game">
          <div class="game-stats">
            <span>Score: <span id="dna-score">0</span></span>
          </div>
          <div class="dna-sequence">
            <h4>Complete the DNA sequence:</h4>
            <div class="sequence-display">
              <div class="strand">
                <span>5' - </span>
                <span id="dna-sequence"></span>
                <span> - 3'</span>
              </div>
              <div class="strand">
                <span>3' - </span>
                <span id="complement-sequence"></span>
                <span> - 5'</span>
              </div>
            </div>
            <div class="base-buttons">
              <button class="base-btn" onclick="gameManager.currentGame.addBase('A')">A</button>
              <button class="base-btn" onclick="gameManager.currentGame.addBase('T')">T</button>
              <button class="base-btn" onclick="gameManager.currentGame.addBase('G')">G</button>
              <button class="base-btn" onclick="gameManager.currentGame.addBase('C')">C</button>
            </div>
          </div>
          <div id="dna-feedback" class="feedback"></div>
          <button onclick="gameManager.currentGame.nextSequence()" class="next-btn">Next Sequence</button>
        </div>
      `;
      this.generateSequence();
    }
  
    generateSequence() {
      const bases = ['A', 'T', 'G', 'C'];
      const length = 8;
      this.originalSequence = '';
      
      for (let i = 0; i < length; i++) {
        this.originalSequence += bases[Math.floor(Math.random() * bases.length)];
      }
      
      // Hide some bases for the user to complete
      this.hiddenPositions = [];
      for (let i = 0; i < 3; i++) {
        this.hiddenPositions.push(Math.floor(Math.random() * length));
      }
      
      this.userSequence = this.originalSequence.split('');
      this.hiddenPositions.forEach(pos => {
        this.userSequence[pos] = '_';
      });
      
      this.currentPosition = this.hiddenPositions[0];
      this.updateDisplay();
    }
  
    updateDisplay() {
      document.getElementById('dna-sequence').textContent = this.userSequence.join(' ');
      
      const complement = this.userSequence.map(base => {
        const pairs = { A: 'T', T: 'A', G: 'C', C: 'G', _: '_' };
        return pairs[base];
      });
      
      document.getElementById('complement-sequence').textContent = complement.join(' ');
      document.getElementById('dna-feedback').textContent = '';
    }
  
    addBase(base) {
      if (this.currentPosition !== undefined) {
        this.userSequence[this.currentPosition] = base;
        
        // Find next hidden position
        const nextIndex = this.hiddenPositions.indexOf(this.currentPosition) + 1;
        this.currentPosition = nextIndex < this.hiddenPositions.length ? this.hiddenPositions[nextIndex] : undefined;
        
        this.updateDisplay();
        
        if (this.currentPosition === undefined) {
          this.checkSequence();
        }
      }
    }
  
    checkSequence() {
      const feedback = document.getElementById('dna-feedback');
      
      if (this.userSequence.join('') === this.originalSequence) {
        this.score += 30;
        feedback.textContent = '✅ Perfect DNA sequence completion!';
        feedback.className = 'feedback correct';
        document.getElementById('dna-score').textContent = this.score;
      } else {
        feedback.textContent = `❌ Incorrect. The correct sequence was: ${this.originalSequence}`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    nextSequence() {
      this.generateSequence();
    }
  }
  
  class CellGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="cell-game">
          <div class="game-stats">
            <span>Score: <span id="cell-score">0</span></span>
          </div>
          <div class="cell-diagram">
            <canvas id="cell-canvas" width="400" height="400"></canvas>
            <div class="organelle-info">
              <h4 id="organelle-question">Click on the Nucleus</h4>
              <div id="organelle-description"></div>
            </div>
          </div>
          <div id="cell-feedback" class="feedback"></div>
          <button onclick="gameManager.currentGame.nextOrganelle()" class="next-btn">Next Organelle</button>
        </div>
      `;
      
      this.canvas = document.getElementById('cell-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.organelles = [
        { name: 'Nucleus', x: 200, y: 200, radius: 40, color: '#8B4513', description: 'Controls cell activities and contains DNA' },
        { name: 'Mitochondria', x: 150, y: 150, radius: 25, color: '#FF6347', description: 'Powerhouse of the cell, produces ATP' },
        { name: 'Ribosome', x: 250, y: 150, radius: 15, color: '#4169E1', description: 'Protein synthesis' },
        { name: 'Endoplasmic Reticulum', x: 300, y: 200, radius: 30, color: '#32CD32', description: 'Transport system of the cell' },
        { name: 'Golgi Apparatus', x: 150, y: 250, radius: 25, color: '#FFD700', description: 'Modifies and packages proteins' }
      ];
      
      this.setupEventListeners();
      this.drawCell();
      this.generateQuestion();
    }
  
    setupEventListeners() {
      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.checkClick(x, y);
      });
    }
  
    drawCell() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Cell membrane
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(200, 200, 180, 0, 2 * Math.PI);
      this.ctx.stroke();
      
      // Cytoplasm
      this.ctx.fillStyle = 'rgba(173, 216, 230, 0.3)';
      this.ctx.fill();
      
      // Draw organelles
      this.organelles.forEach(organelle => {
        this.ctx.fillStyle = organelle.color;
        this.ctx.beginPath();
        this.ctx.arc(organelle.x, organelle.y, organelle.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Label
        this.ctx.fillStyle = '#000';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(organelle.name, organelle.x, organelle.y - organelle.radius - 5);
      });
    }
  
    generateQuestion() {
      this.currentOrganelle = this.organelles[Math.floor(Math.random() * this.organelles.length)];
      document.getElementById('organelle-question').textContent = `Click on the ${this.currentOrganelle.name}`;
      document.getElementById('organelle-description').textContent = '';
    }
  
    checkClick(x, y) {
      const clicked = this.organelles.find(organelle => {
        const distance = Math.sqrt((x - organelle.x) ** 2 + (y - organelle.y) ** 2);
        return distance <= organelle.radius;
      });
      
      const feedback = document.getElementById('cell-feedback');
      
      if (clicked && clicked.name === this.currentOrganelle.name) {
        this.score += 20;
        feedback.textContent = '✅ Correct organelle!';
        feedback.className = 'feedback correct';
        document.getElementById('cell-score').textContent = this.score;
        document.getElementById('organelle-description').textContent = clicked.description;
      } else {
        feedback.textContent = `❌ That's not the ${this.currentOrganelle.name}. Try again!`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    nextOrganelle() {
      this.generateQuestion();
      document.getElementById('cell-feedback').textContent = '';
    }
  }
  
  class EcosystemGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.init();
    }
  
    init() {
      this.container.innerHTML = `
        <div class="ecosystem-game">
          <div class="game-stats">
            <span>Score: <span id="ecosystem-score">0</span></span>
            <span>Population: <span id="total-population">0</span></span>
          </div>
          <div class="ecosystem-builder">
            <canvas id="ecosystem-canvas" width="500" height="300"></canvas>
            <div class="organism-controls">
              <button class="organism-btn" onclick="gameManager.currentGame.addOrganism('plant')">🌱 Plant</button>
              <button class="organism-btn" onclick="gameManager.currentGame.addOrganism('herbivore')">🐰 Herbivore</button>
              <button class="organism-btn" onclick="gameManager.currentGame.addOrganism('carnivore')">🦊 Carnivore</button>
              <button class="clear-btn" onclick="gameManager.currentGame.clearEcosystem()">Clear</button>
            </div>
          </div>
          <div class="ecosystem-challenge">
            <h4 id="ecosystem-question">Create a balanced ecosystem with 5 plants, 3 herbivores, and 1 carnivore</h4>
            <button onclick="gameManager.currentGame.checkBalance()" class="submit-btn">Check Balance</button>
          </div>
          <div id="ecosystem-feedback" class="feedback"></div>
        </div>
      `;
      
      this.canvas = document.getElementById('ecosystem-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.organisms = [];
      this.generateChallenge();
      this.drawEcosystem();
    }
  
    addOrganism(type) {
      const x = Math.random() * (this.canvas.width - 40) + 20;
      const y = Math.random() * (this.canvas.height - 40) + 20;
      
      this.organisms.push({ type, x, y });
      this.drawEcosystem();
      this.updatePopulation();
    }
  
    drawEcosystem() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Background
      this.ctx.fillStyle = '#87CEEB';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Ground
      this.ctx.fillStyle = '#8FBC8F';
      this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);
      
      // Draw organisms
      this.organisms.forEach(organism => {
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        
        const symbols = { plant: '🌱', herbivore: '🐰', carnivore: '🦊' };
        this.ctx.fillText(symbols[organism.type], organism.x, organism.y);
      });
    }
  
    updatePopulation() {
      const total = this.organisms.length;
      document.getElementById('total-population').textContent = total;
    }
  
    generateChallenge() {
      const challenges = [
        { plants: 5, herbivores: 3, carnivores: 1 },
        { plants: 8, herbivores: 4, carnivores: 2 },
        { plants: 6, herbivores: 2, carnivores: 1 }
      ];
      
      this.currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      const { plants, herbivores, carnivores } = this.currentChallenge;
      
      document.getElementById('ecosystem-question').textContent = 
        `Create a balanced ecosystem with ${plants} plants, ${herbivores} herbivores, and ${carnivores} carnivore${carnivores > 1 ? 's' : ''}`;
    }
  
    checkBalance() {
      const counts = { plant: 0, herbivore: 0, carnivore: 0 };
      this.organisms.forEach(organism => {
        counts[organism.type]++;
      });
      
      const feedback = document.getElementById('ecosystem-feedback');
      const target = this.currentChallenge;
      
      if (counts.plant === target.plants && 
          counts.herbivore === target.herbivores && 
          counts.carnivore === target.carnivores) {
        this.score += 40;
        feedback.textContent = '✅ Perfect ecosystem balance!';
        feedback.className = 'feedback correct';
        document.getElementById('ecosystem-score').textContent = this.score;
        setTimeout(() => {
          this.generateChallenge();
          this.clearEcosystem();
        }, 2000);
      } else {
        feedback.textContent = `❌ Imbalanced. Current: ${counts.plant} plants, ${counts.herbivore} herbivores, ${counts.carnivore} carnivores`;
        feedback.className = 'feedback incorrect';
      }
    }
  
    clearEcosystem() {
      this.organisms = [];
      this.drawEcosystem();
      this.updatePopulation();
    }
  }
  
  // Initialize game manager
  const gameManager = new GameManager();