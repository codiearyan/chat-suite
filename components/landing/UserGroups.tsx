import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Building2, 
  GraduationCap, 
  Pen, 
  BrainCircuit,
  Briefcase 
} from 'lucide-react';

interface UserGroupCard {
  icon: JSX.Element;
  headline: string;
  text: string;
  gradient: string;
}

const userGroups: UserGroupCard[] = [
  {
    icon: <GraduationCap className="w-12 h-12" />,
    headline: "Students",
    text: "Ace your assignments and research with AI-powered academic assistance. Get help with writing, research, and analysis at student-friendly prices.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Pen className="w-12 h-12" />,
    headline: "Content Creators",
    text: "Create engaging content faster with AI writing assistance. Generate ideas, outlines, and polished content for blogs, social media, and more.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <BrainCircuit className="w-12 h-12" />,
    headline: "Researchers",
    text: "Accelerate your research process with AI analysis tools. Extract insights from papers, analyze data, and generate comprehensive reports.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: <Building2 className="w-12 h-12" />,
    headline: "Small Businesses",
    text: "Scale your operations efficiently with AI automation. Handle customer service, content creation, and market analysis all in one place.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: <Lightbulb className="w-12 h-12" />,
    headline: "Entrepreneurs",
    text: "Turn your ideas into reality with AI-powered business tools. From market research to product development, ChatSuite helps you innovate faster.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: <Briefcase className="w-12 h-12" />,
    headline: "Professionals",
    text: "Enhance your productivity with AI assistance. Handle emails, reports, presentations, and data analysis more efficiently than ever.",
    gradient: "from-violet-500 to-indigo-500"
  }
];

const UserGroups = () => {
  return (
    <div className="relative min-h-screen bg-slate-900 py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900" />
        
        {/* Animated light beams */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent"
            style={{
              left: `${30 + i * 20}%`,
              filter: 'blur(8px)',
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              height: ['100%', '120%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
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
          <h2 className="text-4xl font-bold text-white mb-6">
            Who is{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              ChatSuite
            </span>
            {' '}For?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering users across different fields with powerful AI tools
          </p>
        </motion.div>

        {/* User Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm 
                            border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 
                              opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                {/* Content */}
                <div className="relative flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${group.gradient} p-4 mb-6
                               flex items-center justify-center relative group-hover:animate-pulse
                               shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="text-white">
                      {group.icon}
                    </div>
                  </motion.div>

                  {/* Headline */}
                  <h3 className="text-2xl font-semibold text-white mb-4 
                               bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                    {group.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {group.text}
                  </p>

                  {/* Hover Effect Indicator */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full 
                              bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                      '--tw-gradient-from': `var(--tw-gradient-${group.gradient.split(' ')[1]})`,
                      '--tw-gradient-to': `var(--tw-gradient-${group.gradient.split(' ')[3]})`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        />
      </div>
    </div>
  );
};

export default UserGroups;
