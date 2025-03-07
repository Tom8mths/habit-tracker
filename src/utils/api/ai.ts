import axios, { isAxiosError } from "axios";

const AI_API_URL = "http://localhost:8080/habot";

interface IAIMessage {
  message: string
}

export async function sendAIMessage(value: IAIMessage) {
  try {
    const { data } = await axios.post(`${AI_API_URL}`, { question: value.message }, {
      withCredentials: true,
    })
    console.log('data', data);
    
    return data;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.message) || "Something went wrong";
    } else {
      throw "An unexpected error occurred";
    }
  }
}
