import { useState, useRef } from "react";

export function useToggleCollapse(styles, ref, transitionDelay) {
    const [isOpen, setIsOpen] = useState(false);
    const isReady = useRef(true);

    const toggle = () => {
        if (!ref.current || !isReady.current) {
            return;
        }

        // Lock the function
        isReady.current = false;

        if (!isOpen) {
            ref.current.style.display = "flex";

            setTimeout(() => {
                ref.current.classList.add(styles.open);
            }, 10);
        } else {
            ref.current.classList.remove(styles.open);

            setTimeout(() => {
                ref.current.style.display = "none";
            }, transitionDelay + 10);
        }

        setIsOpen((prev) => !prev);

        // Unlock function after transition
        setTimeout(() => {
            isReady.current = true;
        }, transitionDelay + 50);
    };

    return { isOpen, toggle };
}