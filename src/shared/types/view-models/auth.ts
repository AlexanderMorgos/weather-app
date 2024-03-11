export interface IAuthViewModel {
  loggedIn: boolean;
  userEmail?: string;
  signUp: (email: string) => void;
  logout: () => void;
}
