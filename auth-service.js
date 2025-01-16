class AuthService {
    constructor() {
        this.tokenKey = 'userToken';
        this.userKey = 'currentUser';
    }

    isAuthenticated() {
        return !!localStorage.getItem(this.tokenKey);
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    getCurrentUser() {
        const userStr = localStorage.getItem(this.userKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    setAuth(userData) {
        localStorage.setItem(this.userKey, JSON.stringify(userData));
        localStorage.setItem(this.tokenKey, userData.token);
    }

    clearAuth() {
        localStorage.removeItem(this.userKey);
        localStorage.removeItem(this.tokenKey);
    }
}

// Create a single instance to be used across the application
const authService = new AuthService();
