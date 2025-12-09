import { SearchX } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface Props {
  title?: string;
  description?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export const NoDataFound = ({ title, description }: Props) => {
  const defaultTitle = title || "No Data Found";
  const defaultDescription =
    description ||
    "Looks like there’s nothing here yet. Try adjusting your search or filters.";

  return (
    <motion.div
      className="flex flex-col w-full items-center justify-center min-h-[300px] p-6 bg-gray-50 rounded-lg shadow-sm mx-auto text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <SearchX className="w-16 h-16 text-gray-400 mb-4" />
      </motion.div>
      <motion.h2
        className="text-2xl font-semibold text-gray-800 mb-2"
        variants={itemVariants}>
        {defaultTitle}
      </motion.h2>
      <motion.p
        className="text-gray-600 text-sm max-w-xs"
        variants={itemVariants}>
        {defaultDescription}
      </motion.p>
    </motion.div>
  );
};
