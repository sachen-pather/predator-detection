// Simple authentication service for prototype
class AuthService {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
  }

  // Mock login - replace with real authentication
  async login(email, password) {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication logic
    if (email && password) {
      this.currentUser = {
        id: 1,
        email: email,
        name: email.split("@")[0],
      };

      // Store in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(this.currentUser));

      // Notify listeners
      this.notifyListeners();

      return this.currentUser;
    }

    throw new Error("Invalid credentials");
  }

  async logout() {
    this.currentUser = null;
    localStorage.removeItem("user");
    this.notifyListeners();
  }

  getCurrentUser() {
    if (!this.currentUser) {
      // Try to restore from localStorage
      const stored = localStorage.getItem("user");
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  // Simple observer pattern for auth state changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }
}

// Export singleton instance
export const authService = new AuthService();
export default AuthService;
