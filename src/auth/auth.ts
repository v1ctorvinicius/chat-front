// Function to check if the token is expired
export const isTokenExpired = () => {
  let expirationTime = parseInt(localStorage.getItem("expirationTime") ?? '0');
  if (Date.now() > expirationTime) {
    console.log("Token expired");
  }
  return Date.now() > expirationTime;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("username");
  localStorage.removeItem("imageUrl");
  localStorage.removeItem("isAuthenticated");
}