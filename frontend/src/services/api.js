export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

/**
 * JWT token авч Authorization header-тай fetch хийнэ.
 * Нэвтэрсэн хэрэглэгч шаарддаг API дуудлагуудад ашиглана.
 */
export const authFetch = (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token || '';

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
};
