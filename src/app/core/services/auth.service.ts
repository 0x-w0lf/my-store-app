import { Injectable, computed, effect, signal } from '@angular/core';

const ROLES = {
  GUEST: 'guest',
  CUSTOMER: 'customer',
  ADMIN: 'admin'
} as const;

type Role = typeof ROLES[keyof typeof ROLES];

const STORAGE_KEY = 'my_store_auth_v1';

interface AuthState {
  role: Role;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private state = signal<AuthState>(this.load());

  role = computed(() => this.state().role);
  token = computed(() => this.state().token);
  isAuthenticated = computed(() => this.state().token != null);
  isAdmin = computed(() => this.role() === ROLES.ADMIN);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
    })
  }

  loginAsCustomer(): void {
    this.state.set({ role: ROLES.CUSTOMER, token: 'mock-customer-token'});
  }

  loginAsAdmin(): void {
    this.state.set({ role: ROLES.ADMIN, token: 'mock-admin-token'});
  }

  logout(): void {
    this.state.set({ role: ROLES.GUEST, token: null});
  }

  private load(): AuthState {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { role: ROLES.GUEST, token: null };
    try {
      const parsed = JSON.parse(raw) as AuthState;
      if (!parsed || typeof parsed !== 'object') return { role: ROLES.GUEST, token: null };
      return {
        role: parsed.role ?? ROLES.GUEST,
        token: parsed.token ?? null
      }
    } catch {
      return { role: ROLES.GUEST, token: null };
    }
  }
}
