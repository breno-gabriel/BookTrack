
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
  
    try {
      const [, payloadBase64] = token.split(".");
      const payload = JSON.parse(atob(payloadBase64));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (e) {
      return false;
    }
  };

export interface Book {
    id: number;
    title: string;
    author: string;
    status: string;
    rating: string;
}