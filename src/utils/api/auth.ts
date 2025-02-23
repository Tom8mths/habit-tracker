import axios, { isAxiosError } from "axios";

const AUTH_API_URL = "http://localhost:8080/auth";

export async function registerUser(username: string, email: string, password: string) {
  try {
    const { data } = await axios.post(`${AUTH_API_URL}/register`, { username, email, password})
    return data;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) {
      throw error?.response?.data?.message || "Something went wrong";
    } else {
      throw "An unexpected error occurred";
    }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data } = await axios.post(`${AUTH_API_URL}/login`, { email, password }, { withCredentials: true })
    return data;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) {
      throw error?.response?.data?.message || "Something went wrong";
    } else {
      throw "An unexpected error occurred";
    }
  }
}