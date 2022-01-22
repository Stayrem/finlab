export const TOKEN_KEY = 'token';
export const setAccessToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const getAccessToken = (): string | null => localStorage.getItem(TOKEN_KEY);
