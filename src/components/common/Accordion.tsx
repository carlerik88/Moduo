import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  children,
  isOpen: controlledIsOpen,
  onToggle,
  defaultOpen = false,
}: AccordionItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:text-scandi-forest transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium pr-4">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  children: ReactNode;
  className?: string;
  allowMultiple?: boolean;
}

export default function Accordion({
  children,
  className = '',
  allowMultiple = true,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (allowMultiple) {
    return <div className={`divide-y divide-gray-200 ${className}`}>{children}</div>;
  }

  // For single-open mode, we need to control the children
  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {Array.isArray(children)
        ? children.map((child, index) => {
            if (!child) return null;
            return (
              <AccordionItem
                key={index}
                {...(child as React.ReactElement<AccordionItemProps>).props}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            );
          })
        : children}
    </div>
  );
}
