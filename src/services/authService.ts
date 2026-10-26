import { UserProfile } from '../types';

const TOKEN_KEY = 'kinetix_jwt_token';

export const authService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  async login(email: string, password: string): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Login failed' };
      }

      if (data.token) {
        this.setToken(data.token);
      }

      return { success: true, user: data.user, message: data.message };
    } catch (err: any) {
      console.warn('API login error, checking demo credentials offline:', err);
      // Fallback for offline/standalone demo
      if (email === 'trainer@kinetix.com' && password === 'kinetix123') {
        const demoTrainer: UserProfile = {
          id: 'usr-demo-trainer',
          name: 'Coach Rahul Varma',
          email: 'trainer@kinetix.com',
          phoneCountryCode: '+91',
          phone: '9811223344',
          avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80',
          role: 'trainer',
          age: 32,
          gender: 'Male',
          unitSystem: 'metric',
          heightCm: 183,
          weightKg: 82,
          fitnessGoal: 'muscle_gain',
          experienceLevel: 'Pro',
          primarySports: ['Strength Training', 'CrossFit'],
          jerseySize: 'XL',
          emergencyContact: { name: 'Pooja Varma', phone: '+91 9811223300', relation: 'Family / Guardian' },
          medicalClearance: true,
          bloodGroup: 'B+',
          city: 'Hyderabad',
          turfElo: 1750,
          streakDays: 28,
          lastCheckInDate: new Date().toISOString().split('T')[0],
        };
        this.setToken('offline-demo-trainer-token');
        return { success: true, user: demoTrainer };
      }

      return { success: false, message: 'Could not connect to authentication server' };
    }
  },

  async register(formData: any): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Registration failed' };
      }

      if (data.token) {
        this.setToken(data.token);
      }

      return { success: true, user: data.user, message: data.message };
    } catch (err: any) {
      return { success: false, message: 'Could not connect to registration server' };
    }
  },

  async getMe(): Promise<{ success: boolean; user?: UserProfile }> {
    const token = this.getToken();
    if (!token) return { success: false };

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        this.clearToken();
        return { success: false };
      }

      const data = await res.json();
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false };
    }
  },

  async updateProfile(profileData: Partial<UserProfile>): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
    const token = this.getToken();
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Update failed' };
      }

      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: 'Network error updating profile' };
    }
  },
};
