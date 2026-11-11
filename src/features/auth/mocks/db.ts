
import type { OrderConfirmation } from "../../checkout/types";
export interface MockUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  orders?: OrderConfirmation[],
}

const USERS_KEY = 'mock_db_users';

const DEFAULT_USERS: MockUser[] = [
  {
    id: 'usr_1',
    name: 'Default User',
    email: 'user@example.com',
    password: 'Password123!',
  },
];

export const mockDB = {
  getUsers: (): MockUser[] => {
    try {
      const data = localStorage.getItem(USERS_KEY);
      if (!data) {
        localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      return JSON.parse(data);
    } catch {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
  },

  

  findUserByEmail: (email: string): MockUser | undefined => {
    const users = mockDB.getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    return users.find((u) => u.email.trim().toLowerCase() === normalizedEmail);
  },

  findUserById: (id: string): MockUser | undefined => {
    const users = mockDB.getUsers();
    return users.find((u) => u.id === id);
  },

  addUser: (newUser: MockUser): void => {
    const users = mockDB.getUsers();
    const userToSave = {
      ...newUser,
      email: newUser.email.trim().toLowerCase(),
    };
    users.push(userToSave);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },
};
