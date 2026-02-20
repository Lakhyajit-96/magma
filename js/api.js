// ============================================
// API MODULE - Fetch wrapper with auth
// ============================================

class API {
  constructor() {
    this.baseURL = API_URL;
  }

  // Get auth headers
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (includeAuth && auth.getToken()) {
      headers['Authorization'] = `Bearer ${auth.getToken()}`;
    }

    return headers;
  }

  // Handle response
  async handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        auth.logout();
      }
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  // GET request
  async get(endpoint, includeAuth = true) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(includeAuth)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET error:', error);
      throw error;
    }
  }

  // POST request
  async post(endpoint, data, includeAuth = true) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(includeAuth),
        body: JSON.stringify(data)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST error:', error);
      throw error;
    }
  }

  // PUT request
  async put(endpoint, data, includeAuth = true) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(includeAuth),
        body: JSON.stringify(data)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('PUT error:', error);
      throw error;
    }
  }

  // DELETE request
  async delete(endpoint, includeAuth = true) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(includeAuth)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE error:', error);
      throw error;
    }
  }

  // Upload file
  async uploadFile(endpoint, file, additionalData = {}) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Add additional data
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.getToken()}`
        },
        body: formData
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }
}

// Projects API
class ProjectsAPI extends API {
  // Get all projects
  async getAll() {
    return await this.get('/projects');
  }

  // Get project by ID
  async getById(id) {
    return await this.get(`/projects/${id}`);
  }

  // Create project
  async create(projectData) {
    return await this.post('/projects', projectData);
  }

  // Update project
  async update(id, projectData) {
    return await this.put(`/projects/${id}`, projectData);
  }

  // Delete project
  async deleteProject(id) {
    return await this.delete(`/projects/${id}`);
  }

  // Publish project
  async publish(id) {
    return await this.post(`/projects/${id}/publish`, {});
  }

  // Unpublish project
  async unpublish(id) {
    return await this.post(`/projects/${id}/unpublish`, {});
  }
}

// Payments API
class PaymentsAPI extends API {
  // Create checkout session
  async createCheckout(planId) {
    return await this.post('/payments/create-checkout', { planId });
  }

  // Get invoices
  async getInvoices() {
    return await this.get('/payments/invoices');
  }

  // Cancel subscription
  async cancelSubscription() {
    return await this.post('/payments/cancel-subscription', {});
  }

  // Update payment method
  async updatePaymentMethod(paymentMethodId) {
    return await this.post('/payments/update-method', { paymentMethodId });
  }
}

// Users API
class UsersAPI extends API {
  // Get current user
  async getMe() {
    return await this.get('/users/me');
  }

  // Update current user
  async updateMe(userData) {
    return await this.put('/users/me', userData);
  }

  // Delete account
  async deleteAccount() {
    return await this.delete('/users/me');
  }

  // Upload avatar
  async uploadAvatar(file) {
    return await this.uploadFile('/users/avatar', file);
  }
}

// Create API instances
const api = new API();
const projectsAPI = new ProjectsAPI();
const paymentsAPI = new PaymentsAPI();
const usersAPI = new UsersAPI();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API, api, projectsAPI, paymentsAPI, usersAPI };
}
