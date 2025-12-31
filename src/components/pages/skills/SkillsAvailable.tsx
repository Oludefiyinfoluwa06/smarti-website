"use client";

import { Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchCourses } from "@/lib/api/courses";
import Image from "next/image";

type CourseItem = {
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

export const SkillsAvailable: React.FC = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const resp: any = await fetchCourses(1, 100);
        let items: CourseItem[] = [];
        if (Array.isArray(resp)) items = resp;
        else if (Array.isArray(resp.data)) items = resp.data;
        else if (Array.isArray(resp.items)) items = resp.items;
        if (!mounted) return;
        setCourses(items || []);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="available-skills" className="py-24" style={{background: 'linear-gradient(135deg, #FBFAF7 0%, #F5F4F0 50%, #FBFAF7 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{color: '#0F0820'}}>
            Available
            <span className="block" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Skills & Courses
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our curated selection of industry-relevant skills taught by experienced professionals.
            All courses include lifetime access and certification upon completion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="text-sm text-slate-600">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="text-sm text-slate-600">No courses available.</div>
          ) : (
            courses.map((skill) => (
              <div key={skill._id || skill.title} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                  {skill.image ? (
                    <Image
                      src={skill.image}
                      alt={skill.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                      <div className="text-center">
                        <div className="text-4xl" style={{color: '#241153'}}>📚</div>
                        <p className="text-sm text-purple-700 mt-2">Course Image</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors flex-1">
                      {skill.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">Instructor:</span> {skill.instructor || '-'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" style={{color: '#241153'}} />
                      <span className="text-xs font-medium">{skill.duration || '-'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <TrendingUp className="w-4 h-4" style={{color: '#241153'}} />
                      <span className="text-xs font-medium">{skill.modules ?? '-' } modules</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-3 mt-auto">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{skill.price ? `₦${Number(skill.price).toLocaleString()}` : '-'}</span>
                    </div>

                    <Link
                      href={`/enroll/${skill._id || ''}`}
                      className="w-full py-3 px-4 rounded-full font-semibold text-center transition-all duration-300 text-white hover:shadow-lg transform hover:scale-105 block"
                      style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
