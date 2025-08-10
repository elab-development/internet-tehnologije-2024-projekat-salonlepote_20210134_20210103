import { useAuth } from "./AuthContext";

function MyComponent() {
  const { user, login, logout, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <div>Niste ulogovani</div>;
  }

  return <div>Dobrodošli, {user.name}</div>;
}