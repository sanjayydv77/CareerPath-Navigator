// CareerPath Navigator - JavaScript Functionality
// Developed by Sanjay Yadav - Full Stack Developer

console.log('%c🚀 CareerPath Navigator Loaded', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%c💻 Developed by Sanjay Yadav', 'color: #4ecdc4; font-size: 14px;');

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const loadingScreen = document.getElementById('loadingScreen');
const mainContent = document.getElementById('mainContent');
const welcomeBtn = document.getElementById('welcomeBtn');

// Modal elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.querySelector('.btn-login');
const signupBtn = document.querySelector('.btn-signup');
const closeBtns = document.querySelectorAll('.close');

// Form elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Mobile menu
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Application initialized');
    initializeApp();
});

// Welcome screen functionality
function initializeApp() {
    // Show welcome screen initially
    welcomeScreen.style.display = 'flex';
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'none';
    
    // Add welcome button event listener
    welcomeBtn.addEventListener('click', startApplication);
}

// Start application with loading sequence
function startApplication() {
    console.log('🚀 Starting application...');
    
    // Hide welcome screen
    welcomeScreen.style.display = 'none';
    
    // Show loading screen
    loadingScreen.style.display = 'flex';
    
    // Simulate loading time and show main content
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
        
        // Add fade-in animation
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
        
        console.log('✅ Application loaded successfully');
        
        // Initialize main content functionality
        initializeMainContent();
        
    }, 2000); // 2 second loading time
}

// Initialize main content functionality
function initializeMainContent() {
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Modal functionality
    initializeModals();
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Form handling
    initializeForms();
    
    // Header scroll effect
    initializeHeaderScroll();
    
    // Career stream interactions
    initializeCareerStreams();
    
    // **NEW: Initialize additional features**
    initializeFeatureCards();
    initializeGetStartedButton();
    
    console.log('🎨 Main content initialized');
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modal functionality
function initializeModals() {
    // Login modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Signup modal
    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modals
    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Form handling
function initializeForms() {
    // Login form
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (email && password) {
            showNotification('Login functionality will be implemented soon!', 'info');
            console.log('Login attempt:', { email, password: '***' });
            
            // Close modal
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form
            loginForm.reset();
        }
    });
    
    // Signup form
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        if (name && email && password) {
            showNotification('Signup functionality will be implemented soon!', 'success');
            console.log('Signup attempt:', { name, email, password: '***' });
            
            // Close modal
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form
            signupForm.reset();
        }
    });
}

// Header scroll effect
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Career streams interactions
function initializeCareerStreams() {
    const streamCards = document.querySelectorAll('.stream-card');
    
    streamCards.forEach(card => {
        card.addEventListener('click', function() {
            const streamTitle = this.querySelector('h3').textContent;
            const streamDescription = this.querySelector('p').textContent;
            
            showNotification(`Exploring ${streamTitle} careers...`, 'info');
            console.log('Career stream selected:', { streamTitle, streamDescription });
            
            // Future: Navigate to detailed career page
            // window.location.href = `careers.html?stream=${streamTitle}`;
        });
        
        // Add hover effects with JavaScript for better control
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            removeNotification(notification);
        }
    }, 4000);
}

// Remove notification with animation
function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 300);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-triangle',
        'warning': 'exclamation-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get notification color based on type
function getNotificationColor(type) {
    const colors = {
        'success': '#4ecdc4',
        'error': '#e74c3c',
        'warning': '#f39c12',
        'info': '#667eea'
    };
    return colors[type] || '#667eea';
}

// Utility function to add loading state to buttons
function addLoadingState(button, loadingText = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<span class="loading"></span> ${loadingText}`;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .stream-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after main content loads
setTimeout(() => {
    if (mainContent.style.display === 'block') {
        initializeScrollAnimations();
    }
}, 2500);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            openModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Ctrl/Cmd + K to open search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('Search feature coming soon!', 'info');
    }
});

// Handle form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Add real-time form validation
function initializeFormValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#e74c3c';
                showNotification('Please enter a valid email address', 'error');
            } else {
                this.style.borderColor = '#4ecdc4';
            }
        });
    });
    
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value && !validatePassword(this.value)) {
                this.style.borderColor = '#f39c12';
            } else if (this.value) {
                this.style.borderColor = '#4ecdc4';
            }
        });
    });
}

// Initialize form validation after content loads
setTimeout(() => {
    if (mainContent.style.display === 'block') {
        initializeFormValidation();
    }
}, 2500);

// Add performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('⚡ Performance Metrics:');
                console.log(`📄 DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
                console.log(`🎨 Page Load Complete: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
                console.log(`🚀 Total Load Time: ${perfData.loadEventEnd - perfData.navigationStart}ms`);
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformanceMetrics();

// Add service worker registration for future PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Future: Register service worker
        console.log('🔧 Service Worker support detected - ready for PWA features');
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePassword,
        showNotification
    };
}

// Final initialization log
console.log('%c✅ CareerPath Navigator fully loaded and ready!', 'color: #4ecdc4; font-size: 16px; font-weight: bold;');
console.log('%c🎓 Built for B.Tech Final Year Project by Sanjay Yadav', 'color: #667eea; font-size: 12px;');

function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.email ? currentUser : null;
}

// ==========================================================================
// 🚀 NEW FEATURES ADDED - WITHOUT AFFECTING EXISTING CODE
// ==========================================================================

// Initialize feature cards functionality
function initializeFeatureCards() {
    // Wait a bit to ensure DOM is ready
    setTimeout(() => {
        const featureCards = document.querySelectorAll('.feature-card, .card, [class*="feature"], [class*="card"]');
        
        featureCards.forEach((card, index) => {
            // Make cards clickable
            card.style.cursor = 'pointer';
            card.style.transition = 'all 0.3s ease';
            
            card.addEventListener('click', function() {
                const cardTitle = this.querySelector('h3, h4, h2, .card-title, .feature-title');
                const titleText = cardTitle ? cardTitle.textContent.trim() : `Feature ${index + 1}`;
                handleFeatureNavigation(titleText, index);
            });
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
            });
        });
        
        console.log(`🎯 Initialized ${featureCards.length} feature cards`);
    }, 1000);
}

// Handle feature navigation based on card clicked
function handleFeatureNavigation(featureName, cardIndex) {
    console.log(`🔗 Feature clicked: ${featureName}`);
    
    // Add click animation
    const clickedCards = document.querySelectorAll('.feature-card, .card, [class*="feature"], [class*="card"]');
    if (clickedCards[cardIndex]) {
        const clickedCard = clickedCards[cardIndex];
        clickedCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickedCard.style.transform = 'translateY(-8px) scale(1.02)';
        }, 150);
    }
    
    // Handle different features
    const lowerCaseName = featureName.toLowerCase();
    
    if (lowerCaseName.includes('assessment') || lowerCaseName.includes('test') || lowerCaseName.includes('quiz')) {
        navigateToAssessment();
    } else if (lowerCaseName.includes('stream') || lowerCaseName.includes('career') || lowerCaseName.includes('guidance')) {
        navigateToStreams();
    } else if (lowerCaseName.includes('skill') || lowerCaseName.includes('development') || lowerCaseName.includes('training')) {
        navigateToSkills();
    } else if (lowerCaseName.includes('counselor') || lowerCaseName.includes('expert') || lowerCaseName.includes('mentor')) {
        navigateToCounselors();
    } else if (lowerCaseName.includes('job') || lowerCaseName.includes('opportunity') || lowerCaseName.includes('portal')) {
        navigateToJobs();
    } else if (lowerCaseName.includes('resource') || lowerCaseName.includes('learning') || lowerCaseName.includes('material')) {
        navigateToResources();
    } else {
        showComingSoon(featureName);
    }
}

// Navigate to Assessment page
function navigateToAssessment() {
    showLoadingIndicator();
    showNotification('Launching Career Assessment...', 'info');
    
    setTimeout(() => {
        // Check if assessment.html exists
        fetch('assessment.html', { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'assessment.html';
                } else {
                    hideLoadingIndicator();
                    showNotification('Assessment page is being prepared. Coming soon!', 'warning');
                }
            })
            .catch(() => {
                hideLoadingIndicator();
                showNotification('Assessment feature will be available soon!', 'info');
            });
    }, 800);
}

// Navigate to other features (to be implemented)
function navigateToStreams() {
    showLoadingIndicator();
    setTimeout(() => {
        hideLoadingIndicator();
        showComingSoon('Career Streams', 'Explore detailed career streams with requirements, courses, and opportunities!');
    }, 500);
}

function navigateToSkills() {
    showComingSoon('Skill Development', 'Enhance your skills with personalized learning paths and certifications!');
}

function navigateToCounselors() {
    showComingSoon('Expert Counselors', 'Connect with industry experts and career counselors for personalized guidance!');
}

function navigateToJobs() {
    showComingSoon('Job Portal', 'Discover job opportunities tailored to your profile and career goals!');
}

function navigateToResources() {
    showComingSoon('Learning Resources', 'Access career guides, interview tips, resume templates and study materials!');
}

// Initialize "Let's Get Started" button functionality
function initializeGetStartedButton() {
    setTimeout(() => {
        // Find buttons that might be "Get Started"
        const buttons = document.querySelectorAll('button, .btn, a, .cta, [class*="start"], [class*="begin"]');
        let getStartedBtn = null;
        
        buttons.forEach(btn => {
            const text = btn.textContent || btn.innerHTML || '';
            if (text.toLowerCase().includes("let's get started") || 
                text.toLowerCase().includes("get started") ||
                text.toLowerCase().includes("start now") ||
                text.toLowerCase().includes("begin") ||
                text.toLowerCase().includes("start journey")) {
                getStartedBtn = btn;
            }
        });
        
        if (getStartedBtn) {
            getStartedBtn.style.cursor = 'pointer';
            getStartedBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleGetStartedClick();
            });
            console.log('✅ Get Started button initialized');
        } else {
            console.log('🔍 Get Started button not found - will work with feature cards');
        }
    }, 1500);
}

// Handle "Let's Get Started" button click
function handleGetStartedClick() {
    console.log('🚀 Get Started clicked!');
    
    // Add click animation
    if (event && event.target) {
        event.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            event.target.style.transform = 'scale(1)';
        }, 150);
    }
    
    showGetStartedModal();
}

// Show loading indicator
function showLoadingIndicator() {
    const existingLoader = document.getElementById('featureLoader');
    if (existingLoader) return;
    
    const loader = document.createElement('div');
    loader.id = 'featureLoader';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        ">
            <div style="
                width: 60px;
                height: 60px;
                border: 4px solid #e3f2fd;
                border-top: 4px solid #667eea;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loader);
}

// Hide loading indicator
function hideLoadingIndicator() {
    const loader = document.getElementById('featureLoader');
    if (loader) {
        loader.remove();
    }
}

// Show Get Started options modal
function showGetStartedModal() {
    const modal = document.createElement('div');
    modal.id = 'getStartedModal';
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 600px;
                margin: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                animation: slideUp 0.3s ease-out;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 40px;
                    color: white;
                ">
                    🎯
                </div>
                <h2 style="
                    margin: 0 0 15px 0;
                    color: #333;
                    font-size: 28px;
                    font-weight: 700;
                ">Welcome to Your Career Journey!</h2>
                <p style="
                    margin: 0 0 30px 0;
                    color: #666;
                    font-size: 16px;
                    line-height: 1.6;
                ">Choose how you'd like to begin exploring your career path:</p>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px;">
                    <button onclick="startWithAssessment()" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                    " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                        📝 Take Career Assessment
                        <small style="opacity: 0.8; font-weight: 400;">(Recommended)</small>
                    </button>
                    
                    <button onclick="exploreCareerStreams()" style="
                        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                    " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                        🎯 Explore Career Options
                    </button>
                    
                    <button onclick="scrollToFeatures()" style="
                        background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
                        color: #333;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                    " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                        ✨ Browse All Features
                    </button>
                </div>
                
                <button onclick="closeGetStartedModal()" style="
                    background: transparent;
                    color: #999;
                    border: 1px solid #ddd;
                    padding: 10px 25px;
                    border-radius: 25px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                " onmouseover="this.style.borderColor='#999'; this.style.color='#666'" onmouseout="this.style.borderColor='#ddd'; this.style.color='#999'">
                    Maybe Later
                </button>
            </div>
        </div>
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes fadeOut {
                to { opacity: 0; }
            }
        </style>
    `;
    document.body.appendChild(modal);
}

// Modal action functions
function startWithAssessment() {
    closeGetStartedModal();
    navigateToAssessment();
}

function exploreCareerStreams() {
    closeGetStartedModal();
    navigateToStreams();
}

function scrollToFeatures() {
    closeGetStartedModal();
    // Look for features section
    const featuresSection = document.querySelector('#features') || 
                           document.querySelector('.features') ||
                           document.querySelector('[class*="feature"]') ||
                           document.querySelector('.stream-card').parentElement ||
                           document.querySelector('section:nth-child(3)');
    
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        showNotification('Explore our features below! 👇', 'info');
    } else {
        // If no features section found, scroll down a bit
        window.scrollTo({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
        showNotification('Check out all the amazing features! 🚀', 'info');
    }
}

function closeGetStartedModal() {
    const modal = document.getElementById('getStartedModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => modal.remove(), 300);
    }
}

// Show coming soon modal
function showComingSoon(featureName, description = '') {
    const modal = document.createElement('div');
    modal.id = 'comingSoonModal';
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                margin: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                animation: slideUp 0.3s ease-out;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 40px;
                    color: white;
                ">
                    🚀
                </div>
                <h2 style="
                    margin: 0 0 15px 0;
                    color: #333;
                    font-size: 28px;
                    font-weight: 700;
                ">${featureName}</h2>
                <p style="
                    margin: 0 0 25px 0;
                    color: #666;
                    font-size: 16px;
                    line-height: 1.6;
                ">${description || 'This exciting feature is under development! Stay tuned for amazing updates.'}</p>
                <div style="margin-bottom: 20px;">
                    <div style="
                        display: inline-block;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                    ">Coming Soon 🔥</div>
                </div>
                <button onclick="closeComingSoonModal()" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Got it! 👍
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => modal.remove(), 300);
    }
}

// Enhanced notification for new features
function showFeatureNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        max-width: 350px;
        font-size: 14px;
        font-weight: 500;
        border-left: 4px solid rgba(255,255,255,0.3);
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${getNotificationIcon(type)}" style="font-size: 16px;"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }
    }, duration);
}

// Initialize all new features after main content is loaded
setTimeout(() => {
    if (mainContent && mainContent.style.display === 'block') {
        console.log('🎯 Initializing enhanced features...');
        
        // Add welcome message for new features
        setTimeout(() => {
            showFeatureNotification('🚀 CareerPath Navigator is now interactive! Click on any feature card to explore.', 'success', 4000);
        }, 3000);
    }
}, 3500);

// Debug function to test features
function testFeatureCards() {
    console.log('🧪 Testing feature cards...');
    const cards = document.querySelectorAll('.feature-card, .card, [class*="feature"], [class*="card"]');
    console.log(`Found ${cards.length} cards:`);
    cards.forEach((card, index) => {
        const title = card.querySelector('h3, h4, h2, .card-title, .feature-title');
        console.log(`Card ${index + 1}: ${title ? title.textContent.trim() : 'No title found'}`);
    });
}

// Add to window for debugging (can be removed in production)
window.CareerPathDebug = {
    testFeatureCards,
    showGetStartedModal,
    navigateToAssessment,
    showComingSoon
};

console.log('%c🎯 Enhanced features loaded successfully!', 'color: #4ecdc4; font-size: 14px; font-weight: bold;');
console.log('%c🚀 Feature cards, Get Started button, and navigation are now active!', 'color: #667eea; font-size: 12px;');
// Initialize navigation bar functionality
function initializeNavigationBar() {
    // Find navigation links by common selectors
    const navSelectors = [
        'nav a', '.nav-link', '.navbar a', '.navigation a', 
        '.menu a', '.header a', 'header a', '.nav-item a'
    ];
    
    let navLinks = [];
    
    // Try different selectors to find navigation links
    for (const selector of navSelectors) {
        const links = document.querySelectorAll(selector);
        if (links.length > 0) {
            navLinks = [...links];
            break;
        }
    }
    
    // If no nav links found, try finding by text content
    if (navLinks.length === 0) {
        const allLinks = document.querySelectorAll('a');
        navLinks = Array.from(allLinks).filter(link => {
            const text = link.textContent.trim().toLowerCase();
            return text.includes('career') || text.includes('stream') || 
                   text.includes('assessment') || text.includes('about') || 
                   text.includes('contact') || text.includes('home');
        });
    }
    
    // Add click handlers to navigation links
    navLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        
        // Handle Career Stream navigation
        if (linkText.includes('career stream') || linkText.includes('streams') || 
            (linkText.includes('career') && linkText.includes('stream'))) {
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navigateToStreams();
            });
            
            // Add hover effect
            link.style.transition = 'all 0.3s ease';
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
                link.style.textShadow = '0 2px 4px rgba(0,0,0,0.2)';
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
                link.style.textShadow = 'none';
            });
        }
        
        // Handle Career Assessment navigation
        else if (linkText.includes('assessment') || linkText.includes('test')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navigateToAssessment();
            });
        }
        
        // Handle Home navigation
        else if (linkText.includes('home') || linkText === '') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    });
    
    console.log(`🧭 Navigation initialized: Found ${navLinks.length} navigation links`);
}

// Navigate to Career Streams page
function navigateToStreams() {
    console.log('🎯 Navigating to Career Streams...');
    
    // Show loading indicator
    showLoadingIndicator('Loading Career Streams...');
    
    // Check if streams.html exists and navigate
    setTimeout(() => {
        try {
            window.location.href = 'streams.html';
        } catch (error) {
            console.error('Navigation error:', error);
            hideLoadingIndicator();
            showNotification('Career Streams page will be available soon!', 'info');
        }
    }, 800);
}

// Navigate to Assessment page  
function navigateToAssessment() {
    console.log('📝 Navigating to Career Assessment...');
    
    // Show loading indicator
    showLoadingIndicator('Loading Career Assessment...');
    
    // Check if assessment.html exists and navigate
    setTimeout(() => {
        try {
            window.location.href = 'assessment.html';
        } catch (error) {
            console.error('Navigation error:', error);
            hideLoadingIndicator();
            showNotification('Career Assessment page will be available soon!', 'info');
        }
    }, 800);
}

// Show loading indicator
function showLoadingIndicator(message = 'Loading...') {
    // Remove existing loader if any
    const existingLoader = document.getElementById('page-loader');
    if (existingLoader) existingLoader.remove();
    
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(102, 126, 234, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                border-top: 3px solid white;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            "></div>
            <div style="font-size: 1.2rem; font-weight: 500;">${message}</div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loader);
}

// Hide loading indicator
function hideLoadingIndicator() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => loader.remove(), 300);
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced CareerPath Navigator Features Loaded!');
    
    // Initialize all new features
    initializeNavigationBar();  // NEW: Navigation bar functionality
    initializeFeatureCards();
    initializeGetStartedButton();
    
    // Show welcome notification after page loads
    setTimeout(() => {
        showWelcomeNotification();
    }, 3000);
});
// Add to your existing main.js file
function navigateToColleges() {
    showLoadingIndicator();
    setTimeout(() => {
        window.location.href = 'colleges.html';
    }, 800);
}

// Update your existing navigation function to include college finder
function initializeNavigationBar() {
    // Your existing code...
    
    // Add college finder navigation
    const collegeLinks = document.querySelectorAll('a[href*="college"], .nav-link:contains("College"), .college-finder-link');
    collegeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToColleges();
        });
    });
}
