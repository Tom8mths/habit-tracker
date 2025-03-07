import { Task } from "@/src/lib/types";
import axios, { isAxiosError } from "axios";

const TASK_API_URL = "http://localhost:8080/tasks";

export async function addNewTask(value: Task) {
  try {
    const { data } = await axios.post(`${TASK_API_URL}`, value, {
      withCredentials: true,
    })
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

export async function getTasks() {
  try {
    const { data } = await axios.get(`${TASK_API_URL}`, {
      withCredentials: true,
    })
    return data;
  } catch (error: unknown) {
    console.log(error);
    if(isAxiosError(error)) {
      throw new Error(error?.response?.data?.message) || "Something went wrong";
    } else {
      throw "An unexpected error occurred";
    }
  }  
}