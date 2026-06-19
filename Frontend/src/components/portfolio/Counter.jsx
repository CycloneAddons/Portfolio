import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

export default function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (val) => {
        const rounded = Math.round(val);
        const display = to >= 1000 ? rounded.toLocaleString() : rounded;
        node.textContent = `${display}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
