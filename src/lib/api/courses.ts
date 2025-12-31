import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export type Course = {
  _id?: string;
  title: string;
  description?: string;
  instructor?: string;
  duration?: string;
  price?: number;
  priceUSD?: number;
  modules?: number;
  image?: string;
  [k: string]: any;
};

export async function fetchCourses(page = 1, limit = 100): Promise<any> {
  const res = await axios.get(`${API_BASE}/courses`, { params: { page, limit } });
  return res.data;
}

export async function fetchCourseById(id: string): Promise<Course> {
  const res = await axios.get(`${API_BASE}/courses/${id}`);
  return res.data;
}
