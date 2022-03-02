import { authApi } from "api";

export const checkToken = async (token) => {
  try {
    const result=await authApi.checkToken(token);
    return true;
  } catch (error) {
    return false;
  }
};
export function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}