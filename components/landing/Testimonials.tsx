"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    content:
      "The image analysis tools are a game-changer for my marketing projects!",
    author: "Anand Ghatage",
    role: "Digital Marketer",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Anand&backgroundColor=b6e3f4`,
  },
  {
    content:
      "Finally, an AI platform that's both powerful and easy to use. ChatSuite has simplified my workflow and saved me so much time.",
    author: "Arvind Bhagwath",
    role: "Entrepreneur",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind&backgroundColor=c0aede`,
  },
  {
    content:
      "As a student, ChatSuite is a lifesaver. I can access top-tier AI models without breaking the bank.",
    author: "Arjun Bhandari",
    role: "Student",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=ffdfbf`,
  },
];

const Testimonials = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen py-24 bg-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900" />

        {/* Animated Background Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Quote className="w-12 h-12 mx-auto text-purple-400 mb-4" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              Thousands
            </span>{" "}
            of Users
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what our community has to say about their experience with
            ChatSuite
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50,
              }}
              className="relative group"
            >
              {/* Card */}
              <div
                className="relative h-full p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-purple-500/20
                            hover:border-purple-500/40 transition-colors duration-300"
              >
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 
                              group-hover:opacity-100 blur-xl transition-opacity duration-500"
                />

                {/* Content Container */}
                <div className="relative">
                  {/* Avatar */}
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden
                              ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-800"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Stars */}
                  <div className="flex justify-center mb-4 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-300 text-center mb-6">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="text-center">
                    <p className="text-white font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-purple-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        />
      </div>
    </div>
  );
};

export default Testimonials;
