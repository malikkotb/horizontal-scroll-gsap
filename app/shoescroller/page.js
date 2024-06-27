"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  let scroll = useRef(null);

  const sectionRefs = useRef([]);
  const h1Refs = useRef([]);
  const addToRefs = (refsArray) => (el) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };

  const addToH1Refs = addToRefs(h1Refs);
  const addToSectionRefs = addToRefs(sectionRefs);
  let scrollTween = null;
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    scrollTween = gsap.to(sectionRefs.current, {
      xPercent: -100 * (sectionRefs.current.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scroll.current,
        end: () => `+=${scroll.current.scrollWidth}`,
        // snap: 1 / (sectionRefs.current.length - 1),
        scrub: 1,
        pin: true,
      },
    });

    sectionRefs.current.forEach((section, i) => {
      gsap.from(h1Refs.current[i], {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: h1Refs.current[i],
          containerAnimation: scrollTween,
          start: "left center",
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  return (
    <main>
        <div className="outer">
            <section className="h-screen"></section>
            <section className="h-screen"></section>
            <section className="h-screen"></section>
        </div>
    </main>
  );
}
