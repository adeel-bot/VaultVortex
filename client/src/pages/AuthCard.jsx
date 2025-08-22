import { motion } from "framer-motion";

export default function AuthCard({ title, children, footer }) {
  return (
    <div className="md:min-h-screen min-h-svh flex items-center justify-center " >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-full w-[85%]  max-w-sm p-8 rounded-2xl shadow-xl
         bg-black/20 backdrop-blur-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
        {children}
        {footer && (
          <p className="text-sm text-center mt-6 opacity-80">{footer}</p>
        )}
      </motion.div>
    </div>
  );
}
