import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

export interface HoverCardProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
}

/**
 * A hover card component that displays content when the trigger element is hovered over.
 * The card appears with a smooth animation and can be customized with delay times and positioning.
 *
 * @param {HoverCardProps} props - The props for the HoverCard component.
 * @param {React.ReactNode} props.trigger - The element that triggers the hover card.
 * @param {React.ReactNode} props.content - The content to be displayed inside the hover card.
 * @param {number} [props.openDelay=200] - The delay before the hover card opens.
 * @param {number} [props.closeDelay=200] - The delay before the hover card closes.
 * @param {string} [props.className=""] - Additional CSS classes for styling the hover card.
 * @returns {JSX.Element} The HoverCard component.
 *
 * @example
 * ```tsx
 * <HoverCard
 *   trigger={<button>Hover me</button>}
 *   content={<div>Some content to display</div>}
 * />
 * ```
 */
export const HoverCard: React.FC<HoverCardProps> = ({
  trigger,
  content,
  openDelay = 200,
  closeDelay = 200,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  // TODO: find type of Timeout
  const openTimeout = useRef<number>();
  const closeTimeout = useRef<number>();

  useEffect(() => {
    return () => {
      if (openTimeout.current) clearTimeout(openTimeout.current);
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  };

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    openTimeout.current = setTimeout(() => {
      updatePosition();
      setIsOpen(true);
    }, openDelay);
  };

  const handleMouseLeave = () => {
    if (openTimeout.current) clearTimeout(openTimeout.current);
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {trigger}
      </div>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute z-200 p-4 bg-white rounded shadow-lg border border-gray-200",
                className
              )}
              style={{
                top: position.top,
                left: position.left,
              }}
              onMouseEnter={() => {
                if (closeTimeout.current) clearTimeout(closeTimeout.current);
              }}
              onMouseLeave={handleMouseLeave}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
