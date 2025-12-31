import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export type EnrollmentCount = { courseId: string; enrollments: number; seats: number };

export async function fetchEnrollmentCounts(courseIds?: string[]): Promise<EnrollmentCount[]> {
  const params: any = {};
  if (courseIds && courseIds.length > 0) params.ids = courseIds.join(',');
  const res = await axios.get(`${API_BASE}/enrollments/counts`, { params });
  return res.data;
}

export default {};
