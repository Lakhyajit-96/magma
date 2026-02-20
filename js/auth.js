// ============================================
// AUTHENTICATION MODULE
// ============================================

class Auth {
  constructor() {
    this.token = Storage.get('token');
    this.user = Storage.get('user');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Get token
  getToken() {
    return this.token;
  }

  // Login
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user
      this.token = data.token;
      this.user = data.user;
      Storage.set('token', data.token);
      Storage.set('user', data.user);

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }

  // Register
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and user
      this.token = data.token;
      this.user = data.user;
      Storage.set('token', data.token);
      Storage.set('user', data.user);

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  }

  // Logout
  logout() {
    this.token = null;
    this.user = null;
    Storage.remove('token');
    Storage.remove('user');
    window.location.href = '../pages/login.html';
  }

  // Forgot Password
  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: false, error: error.message };
    }
  }

  // Reset Password
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Reset failed');
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: error.message };
    }
  }

  // Verify Email
  async verifyEmail(token) {
    try {
      const response = await fetch(`${API_URL}/auth/verify-email/${token}`, {
        method: 'GET'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Email verification error:', error);
      return { success: false, error: error.message };
    }
  }

  // Update Profile
  async updateProfile(updates) {
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }

      // Update stored user
      this.user = { ...this.user, ...data.user };
      Storage.set('user', this.user);

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  }

  // Check authentication and redirect if needed
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '../pages/login.html';
      return false;
    }
    return true;
  }

  // Redirect if already authenticated
  redirectIfAuthenticated() {
    if (this.isAuthenticated()) {
      window.location.href = '../pages/dashboard.html';
      return true;
    }
    return false;
  }
}

// Create global auth instance
const auth = new Auth();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Auth, auth };
}
