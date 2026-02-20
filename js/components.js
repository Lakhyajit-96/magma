// ============================================
// REUSABLE COMPONENTS - Vanilla JS
// ============================================

// Navigation Component
class Navigation {
  constructor() {
    this.nav = null;
    this.init();
  }

  init() {
    this.createNav();
    this.setupScrollEffect();
  }

  createNav() {
    const navHTML = `
      <nav id="main-nav">
        <img src="../assets/scrollstory-logo.svg" alt="ScrollStory" class="nav-logo" />
        <div id="right-nav">
          <a href="../pages/pricing.html" class="nav-link">Pricing</a>
          <a href="../pages/features.html" class="nav-link">Features</a>
          <a href="../pages/about.html" class="nav-link">About</a>
          <a href="../pages/contact.html" class="nav-link">Contact</a>
          <a href="../pages/login.html" class="nav-btn">Login</a>
          <a href="../pages/signup.html" class="nav-btn primary">Get Started</a>
        </div>
      </nav>
    `;
    return navHTML;
  }

  setupScrollEffect() {
    const nav = document.querySelector('#main-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
}

// Footer Component
class Footer {
  constructor() {
    this.init();
  }

  createFooter() {
    const footerHTML = `
      <footer id="main-footer">
        <div class="footer-content">
          <div class="footer-section">
            <img src="../assets/scrollstory-logo.svg" alt="ScrollStory" class="footer-logo" />
            <p>Create cinematic scroll-driven experiences</p>
          </div>
          <div class="footer-section">
            <h4>Product</h4>
            <a href="../pages/features.html">Features</a>
            <a href="../pages/pricing.html">Pricing</a>
            <a href="../pages/dashboard.html">Dashboard</a>
          </div>
          <div class="footer-section">
            <h4>Company</h4>
            <a href="../pages/about.html">About</a>
            <a href="../pages/contact.html">Contact</a>
            <a href="#">Blog</a>
          </div>
          <div class="footer-section">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div class="footer-section">
            <h4>Connect</h4>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">Instagram</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 ScrollStory. All rights reserved.</p>
        </div>
      </footer>
    `;
    return footerHTML;
  }
}

// Loading Component (reuse current premium loader)
class LoadingOverlay {
  constructor() {
    this.overlay = null;
    this.progress = 0;
  }

  show() {
    if (this.overlay) return;
    
    const loaderHTML = `
      <div id="loading-overlay">
        <div class="loading-content">
          <div class="loader-3d-container">
            <div class="loader-cube">
              <div class="cube-face front">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <defs>
                    <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#1863ff;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#0b48ed;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <path d="M 20 18 Q 20 13, 25 13 L 35 13 Q 40 13, 40 18 Q 40 23, 35 23 L 25 23 Q 20 23, 20 28 Q 20 33, 25 33 L 35 33 Q 40 33, 40 38" 
                        stroke="url(#cubeGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="cube-face back"></div>
              <div class="cube-face left"></div>
              <div class="cube-face right"></div>
              <div class="cube-face top"></div>
              <div class="cube-face bottom"></div>
            </div>
            <div class="orbit-ring ring-1"></div>
            <div class="orbit-ring ring-2"></div>
            <div class="orbit-ring ring-3"></div>
            <div class="loader-particles">
              <span class="particle-dot"></span>
              <span class="particle-dot"></span>
              <span class="particle-dot"></span>
              <span class="particle-dot"></span>
              <span class="particle-dot"></span>
              <span class="particle-dot"></span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill"></div>
            </div>
          </div>
          <div class="percentage-display">
            <span class="percentage-text">0</span>
            <span class="percentage-symbol">%</span>
          </div>
          <p class="loading-text">Loading Experience</p>
          <div class="loading-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="grid-background"></div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    this.overlay = document.getElementById('loading-overlay');
    this.startProgress();
  }

  startProgress() {
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const percentageText = document.querySelector('.percentage-text');
    
    const updateProgress = () => {
      if (this.progress < 100) {
        this.progress += Math.random() * 8;
        if (this.progress > 100) this.progress = 100;
        
        if (progressBarFill) progressBarFill.style.width = this.progress + '%';
        if (percentageText) percentageText.textContent = Math.floor(this.progress);
        
        setTimeout(updateProgress, 150);
      } else {
        this.hide();
      }
    };
    
    updateProgress();
  }

  hide() {
    setTimeout(() => {
      if (this.overlay) {
        this.overlay.style.opacity = '0';
        setTimeout(() => {
          this.overlay.remove();
          this.overlay = null;
        }, 800);
      }
    }, 500);
  }
}

// Toast Notification Component
class Toast {
  static show(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  static success(message) {
    this.show(message, 'success');
  }

  static error(message) {
    this.show(message, 'error');
  }

  static warning(message) {
    this.show(message, 'warning');
  }
}

// Modal Component
class Modal {
  constructor(content, options = {}) {
    this.content = content;
    this.options = options;
    this.modal = null;
  }

  open() {
    const modalHTML = `
      <div class="modal-overlay">
        <div class="modal-container">
          <button class="modal-close">&times;</button>
          <div class="modal-content">
            ${this.content}
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.querySelector('.modal-overlay');
    
    setTimeout(() => this.modal.classList.add('active'), 10);
    
    this.modal.querySelector('.modal-close').addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('active');
      setTimeout(() => this.modal.remove(), 300);
    }
  }
}

// Export components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Navigation, Footer, LoadingOverlay, Toast, Modal };
}
