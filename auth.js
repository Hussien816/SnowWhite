const API_URL = 'http://localhost:5037/api';

// Register function
async function register(userData) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorText = await response.text();
if (errorText.includes("Email already exists")) {
    document.getElementById('registerError').textContent = "Email already exists. Please use a different email.";
} else {
    document.getElementById('registerError').textContent = "Registration failed. Please try again.";
}
document.getElementById('registerError').style.display = 'block';
            return null;
        }

        const result = await response.json();
        showNotification('Welcome back! Please login.');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return result;
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('An error occurred during registration. Please try again.');
        return null;
    }
}

// Login function
async function login(loginData) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            showNotification('Invalid email or password');
            return null;
        }

        const userData = await response.json();
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('userToken', userData.token);
        
        // Show welcome overlay
        const welcomeOverlay = document.getElementById('welcomeOverlay');
        if (welcomeOverlay) {
            welcomeOverlay.style.display = 'flex';
            // Redirect after overlay is shown
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            window.location.href = 'index.html';
        }
        
        return userData;
    } catch (error) {
        console.error('Login error:', error);
        showNotification('An error occurred during login. Please try again.');
        return null;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    window.location.href = 'login.html';
}

// Check if user is logged in and update UI
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    const token = localStorage.getItem('userToken');
    
    if (user && token) {
        const userData = JSON.parse(user);
        const loginNav = document.querySelector('.login-nav a');
        if (loginNav) {
            loginNav.textContent = userData.user.userName;
            loginNav.href = '#';
            loginNav.classList.remove('active');
            
            const popup = document.querySelector('.create-account-popup');
            if (popup) {
                popup.innerHTML = `
                    <a href="orders.html">My Orders</a>
                    <a href="#" onclick="logout()">Logout</a>
                `;
            }
        }

        // Update login page if we're on it
        const guestHeader = document.getElementById('guest-header');
        const userHeader = document.getElementById('user-header');
        const loginForm = document.getElementById('loginForm');
        const container = document.querySelector('.container');

        if (guestHeader && userHeader && loginForm && container) {
            // Hide guest content
            guestHeader.style.display = 'none';
            loginForm.style.display = 'none';
            
            // Show user content
            userHeader.style.display = 'block';
            document.getElementById('userName').textContent = `Name: ${userData.user.userName}`;
            document.getElementById('userEmail').textContent = `Email: ${userData.user.email}`;
            
            // Update container style
            container.style.textAlign = 'center';
            container.innerHTML = `
                <h2 style="margin-bottom: 20px;">You are already logged in</h2>
                <button onclick="window.location.href='index.html'" class="normal" style="margin: 10px;">Home Page</button>
                <button onclick="logout()" class="normal" style="margin: 10px;">Logout</button>
            `;
        }

        return userData;
    }
    return null;
}


// Show notification message
function showNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds with slide out animation
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Call checkAuth when the page loads
document.addEventListener('DOMContentLoaded', checkAuth);
