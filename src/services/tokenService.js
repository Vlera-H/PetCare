import axios from 'axios';

class TokenService {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.setupAxiosInterceptors();
  }

  // Setup axios interceptors for automatic token refresh
  setupAxiosInterceptors() {
    // Request interceptor - add access token to all requests
    axios.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle token expiration
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh token
            const newTokens = await this.refreshAccessToken();
            if (newTokens) {
              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Get access token
  getAccessToken() {
    return this.accessToken;
  }

  // Get refresh token
  getRefreshToken() {
    return this.refreshToken;
  }

  // Set tokens
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  // Clear tokens
  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('role');
  }

  // Check if token is expired
  isTokenExpired(token) {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expiryTime;
    } catch (error) {
      return true;
    }
  }

  // Refresh access token
  async refreshAccessToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post('https://localhost:7259/api/Auth/refresh-token', {
        refreshToken: refreshToken
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      
      // Update tokens
      this.setTokens(accessToken, newRefreshToken);
      
      console.log('🔐 Token refreshed successfully');
      return { accessToken, refreshToken: newRefreshToken };
      
    } catch (error) {
      console.error('❌ Failed to refresh token:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const accessToken = this.getAccessToken();
    return accessToken && !this.isTokenExpired(accessToken);
  }

  // Logout user
  logout() {
    const refreshToken = this.getRefreshToken();
    
    // Call backend logout endpoint
    if (refreshToken) {
      axios.post('https://localhost:7259/api/Auth/logout', {
        refreshToken: refreshToken
      }).catch(error => {
        console.error('Logout API call failed:', error);
      });
    }
    
    // Clear local tokens
    this.clearTokens();
  }
}

export default new TokenService();