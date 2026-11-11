import { http, HttpResponse } from 'msw';
import { mockDB } from '../mocks/db';
import type { RegisterFormData } from '../schemas/register.schema';

interface LoginRequestBody {
  email?: string;
  password?: string;
}

export const authHandlers = [
  
  http.post('/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as RegisterFormData;
    const { name, email, password } = body;
    const normalizedEmail = email.trim().toLocaleLowerCase();
    const normalizedName = name.trim().toLocaleLowerCase();

    if (mockDB.findUserByEmail(email)) {
      return HttpResponse.json(
        { errors: { email: 'User already exists with this email' } },
        { status: 409 } 
      );
    }

    const newUser = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: normalizedName,
      email: normalizedEmail,
      password,
      orders: [],
    };

    mockDB.addUser(newUser);

    const token = `mock-jwt-token-${newUser.id}`;

    return HttpResponse.json(
      { user: { id: newUser.id, name: newUser.name, email: newUser.email } },
      {
        status: 201,
        headers: {
          'Set-Cookie': `authToken=${token}; Path=/; HttpOnly; SameSite=Strict`,
        },
      }
    );
  }),

  // 2. (Login)
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as LoginRequestBody;
    const { email = '', password = '' } = body;

    const user = mockDB.findUserByEmail(email);

    if (user && user.password === password) {
      const token = `mock-jwt-token-${user.id}`;

      return HttpResponse.json(
        { user: { id: user.id, name: user.name, email: user.email } },
        {
          status: 200,
          headers: {
            'Set-Cookie': `authToken=${token}; Path=/; HttpOnly; SameSite=Strict`,
          },
        }
      );
    }

    return HttpResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  }),

  // 3. (Get Current User Session - /auth/me)
  http.get('*/api/auth/me', ({ cookies }) => {
    const authToken = cookies.authToken;

    if (!authToken) {
      return HttpResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const userId = authToken.replace('mock-jwt-token-', '');
    const user = mockDB.findUserById(userId);

    if (user) {
      return HttpResponse.json({
        user: { id: user.id, name: user.name, email: user.email },
      });
    }

    return HttpResponse.json({ message: 'User not found' }, { status: 401 });
  }),

  // 4. (Logout)
  http.post('*/api/auth/logout', () => {
    return HttpResponse.json(
      { message: 'Logged out successfully' },
      {
        headers: {
          'Set-Cookie': 'authToken=; Path=/; HttpOnly; Max-Age=0',
        },
      }
    );
  }),
];
