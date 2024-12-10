import { motion } from 'framer-motion';
import { MessageSquare, Upload, Image, Zap, Circle } from 'lucide-react';

const MockupDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full bg-slate-900 rounded-xl overflow-hidden"
    >
      {/* Window Controls */}
      <div className="h-10 bg-slate-800/50 flex items-center px-4 border-b border-slate-700/50">
        <div className="flex space-x-2">
          <Circle className="w-3 h-3 text-red-500 fill-red-500" />
          <Circle className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <Circle className="w-3 h-3 text-green-500 fill-green-500" />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-12 gap-4 p-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-slate-800/30 rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-blue-400">
              <MessageSquare size={18} />
              <span className="text-sm">Models</span>
            </div>
            {['GPT-4', 'Claude 3', 'Gemini Pro', 'Llama'].map((model, index) => (
              <motion.div
                key={model}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="pl-6 text-sm text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"
              >
                {model}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="col-span-9 space-y-4">
          {/* Chat Messages */}
          <div className="bg-slate-800/30 rounded-lg p-4">
            <div className="space-y-4">
              {/* AI Message */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <div className="flex-1 bg-slate-700/50 rounded-lg p-3">
                  <p className="text-sm text-gray-300">
                    Hello! I'm your AI assistant. How can I help you today?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-slate-800/30 rounded-lg p-3 flex items-center space-x-3">
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <Upload size={18} className="text-blue-400" />
            </button>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <Image size={18} className="text-blue-400" />
            </button>
            <div className="flex-1 bg-slate-700/50 rounded-lg px-3 py-2">
              <p className="text-sm text-gray-400">Type your message...</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6 rounded-full bg-blue-500/20"
          initial={{ 
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: 0
          }}
          animate={{ 
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

export default MockupDashboard;
