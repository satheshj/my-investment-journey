"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LearningsMotionProps = {
  children: ReactNode;
};

export function LearningsMotion({ children }: LearningsMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = scope.current;

    if (!root || typeof window.matchMedia !== "function") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 64rem)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (mediaContext) => {
        if (!mediaContext.conditions?.motion) {
          return;
        }

        const animationContext = gsap.context(() => {
          gsap.from("[data-learning-hero-item]", {
            clearProps: "opacity,transform",
            duration: 0.9,
            ease: "power3.out",
            opacity: 0,
            stagger: 0.1,
            y: 28,
          });

          gsap.utils
            .toArray<HTMLElement>("[data-learning-media]", root)
            .forEach((frame) => {
              const image = frame.querySelector("img");

              if (!image) {
                return;
              }

              gsap
                .timeline({
                  scrollTrigger: {
                    end: "bottom 10%",
                    scrub: 0.8,
                    start: "top 92%",
                    trigger: frame,
                  },
                })
                .fromTo(
                  image,
                  { opacity: 0.62, scale: 0.88 },
                  { ease: "none", opacity: 1, scale: 1 },
                )
                .to(image, { ease: "none", opacity: 0.38, scale: 1.04 });
            });

          gsap.from("[data-learning-principle]", {
            clearProps: "opacity,transform",
            duration: 0.78,
            ease: "power3.out",
            opacity: 0,
            scrollTrigger: {
              once: true,
              start: "top 82%",
              trigger: "[data-learning-principles]",
            },
            stagger: 0.09,
            y: 24,
          });

          gsap.utils
            .toArray<HTMLElement>("[data-learning-question]", root)
            .forEach((question) => {
              gsap.from(question, {
                clearProps: "opacity,transform",
                duration: 0.72,
                ease: "power3.out",
                opacity: 0,
                scrollTrigger: {
                  once: true,
                  start: "top 88%",
                  trigger: question,
                },
                y: 22,
              });
            });

          if (mediaContext.conditions?.desktop) {
            const chapter = root.querySelector<HTMLElement>(
              "[data-learning-question-chapter]",
            );
            const guide = root.querySelector<HTMLElement>(
              "[data-learning-question-guide]",
            );
            const questions = root.querySelector<HTMLElement>(
              "[data-learning-question-list]",
            );

            if (chapter && guide && questions) {
              ScrollTrigger.create({
                end: () =>
                  `+=${Math.max(0, questions.offsetHeight - guide.offsetHeight)}`,
                pin: guide,
                pinSpacing: false,
                start: "top 15%",
                trigger: chapter,
              });
            }
          }
        }, root);

        return () => animationContext.revert();
      },
    );

    return () => media.revert();
  }, []);

  return (
    <div data-motion-scope="learnings" ref={scope}>
      {children}
    </div>
  );
}
