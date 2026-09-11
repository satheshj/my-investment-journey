"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HomepageMotionProps = {
  children: ReactNode;
};

type MotionConditions = {
  desktop?: boolean;
  motion?: boolean;
};

export function HomepageMotion({ children }: HomepageMotionProps) {
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
        desktop: "(min-width: 48.01rem)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (mediaContext) => {
        const { desktop, motion } = mediaContext.conditions as MotionConditions;

        if (!motion) {
          return;
        }

        const animationContext = gsap.context(() => {
          const revealEach = (selector: string, y = 24) => {
            gsap.utils.toArray<HTMLElement>(selector, root).forEach((element) => {
              gsap.from(element, {
                clearProps: "opacity,transform",
                duration: 0.72,
                ease: "power3.out",
                opacity: 0,
                scrollTrigger: {
                  once: true,
                  start: "top 88%",
                  trigger: element,
                },
                y,
              });
            });
          };

          gsap.from("[data-motion-hero-item]", {
            clearProps: "opacity,transform",
            duration: 0.78,
            ease: "power3.out",
            opacity: 0,
            stagger: 0.1,
            y: 22,
          });

          revealEach("[data-motion-heading]");
          revealEach("[data-motion-image]", 18);
          revealEach("[data-motion-publication]", 18);
          revealEach("[data-motion-reflection]");
          revealEach("[data-motion-learning]");
          revealEach("[data-motion-build]");
          revealEach("[data-motion-closing]");

          const startingImage = root.querySelector<HTMLElement>(
            "[data-motion-image] img",
          );

          if (startingImage) {
            gsap.fromTo(
              startingImage,
              { scale: 1.03 },
              {
                ease: "none",
                scale: 1,
                scrollTrigger: {
                  end: "bottom 30%",
                  scrub: 0.7,
                  start: "top 92%",
                  trigger: startingImage,
                },
              },
            );
          }

          const homeAllocation = root.querySelector<HTMLElement>(
            "[data-motion-home-allocation]",
          );
          const homeAllocationTiles = gsap.utils.toArray<HTMLElement>(
            "[data-motion-home-allocation-tile]",
            root,
          );
          const allocationRows = gsap.utils.toArray<HTMLElement>(
            "[data-motion-allocation-row]",
            root,
          );

          if (homeAllocation && homeAllocationTiles.length > 0) {
            gsap.from(homeAllocationTiles, {
              ease: "none",
              opacity: 0.12,
              scale: 0.35,
              scrollTrigger: {
                end: "bottom 58%",
                scrub: 0.65,
                start: "top 86%",
                trigger: homeAllocation,
              },
              stagger: 0.012,
              transformOrigin: "center",
            });
          }

          if (allocationRows.length > 0) {
            gsap.from(allocationRows, {
              clearProps: "opacity,transform",
              duration: 0.7,
              ease: "power3.out",
              opacity: 0,
              scrollTrigger: {
                once: true,
                start: "top 82%",
                trigger: allocationRows[0],
              },
              stagger: 0.1,
              y: 18,
            });
          }

          const timeline = root.querySelector<HTMLElement>("[data-motion-timeline]");
          const timelineTrack = root.querySelector<HTMLElement>(
            "[data-motion-timeline-track]",
          );
          const timelineEntries = gsap.utils.toArray<HTMLElement>(
            "[data-motion-timeline-entry]",
            root,
          );

          if (desktop && timeline && timelineTrack && timelineEntries.length > 0) {
            const timelineSequence = gsap.timeline({
              scrollTrigger: {
                end: "bottom 58%",
                scrub: 0.65,
                start: "top 78%",
                trigger: timeline,
              },
            });

            timelineSequence.from(
              timelineTrack,
              {
                ease: "none",
                scaleY: 0,
                transformOrigin: "top",
              },
              0,
            );
            timelineSequence.from(
              timelineEntries,
              {
                ease: "none",
                opacity: 0.18,
                stagger: 0.22,
                y: 30,
              },
              0,
            );
          } else {
            revealEach("[data-motion-timeline-entry]");
          }

          const strategyProgression = root.querySelector<HTMLElement>(
            "[data-motion-strategy-progression]",
          );
          const strategyStory = root.querySelector<HTMLElement>(
            "[data-motion-strategy-story]",
          );
          const strategyVisual = root.querySelector<HTMLElement>(
            "[data-motion-strategy-visual]",
          );
          const strategyImage = root.querySelector<HTMLElement>(
            "[data-motion-strategy-image]",
          );
          const strategyStages = gsap.utils.toArray<HTMLElement>(
            "[data-motion-strategy-stage]",
            root,
          );

          if (
            desktop &&
            strategyProgression &&
            strategyStory &&
            strategyVisual &&
            strategyStages.length > 0
          ) {
            ScrollTrigger.create({
              anticipatePin: 1,
              end: "bottom 82%",
              endTrigger: strategyProgression,
              pin: strategyVisual,
              pinSpacing: false,
              start: "top 12%",
              trigger: strategyStory,
            });

            if (strategyImage) {
              gsap.fromTo(
                strategyImage,
                { scale: 0.985 },
                {
                  ease: "none",
                  scale: 1.015,
                  scrollTrigger: {
                    end: "bottom 82%",
                    endTrigger: strategyProgression,
                    scrub: 0.8,
                    start: "top 12%",
                    trigger: strategyStory,
                  },
                },
              );
            }

            strategyStages.forEach((stage, index) => {
              gsap.fromTo(
                stage,
                { opacity: index === 0 ? 0.72 : 0.24 },
                {
                  ease: "none",
                  opacity: 1,
                  scrollTrigger: {
                    end: "center 48%",
                    scrub: 0.45,
                    start: "top 76%",
                    trigger: stage,
                  },
                },
              );

              if (index < strategyStages.length - 1) {
                gsap.to(stage, {
                  ease: "none",
                  opacity: 0.24,
                  scrollTrigger: {
                    end: "bottom 24%",
                    scrub: 0.45,
                    start: "center 42%",
                    trigger: stage,
                  },
                });
              }
            });
          } else {
            revealEach("[data-motion-strategy-visual]", 18);
            revealEach("[data-motion-strategy-stage]");
          }

          const strategyDirections = gsap.utils.toArray<HTMLElement>(
            "[data-motion-strategy-direction]",
            root,
          );

          if (strategyDirections.length > 0) {
            gsap.from(strategyDirections, {
              clearProps: "opacity,transform",
              duration: 0.8,
              ease: "power3.out",
              opacity: 0,
              scrollTrigger: {
                once: true,
                start: "top 82%",
                trigger: strategyDirections[0],
              },
              stagger: 0.12,
              x: desktop ? 24 : 0,
              y: desktop ? 0 : 20,
            });
          }

          revealEach("[data-motion-strategy-caveat]", 12);
        }, root);

        return () => animationContext.revert();
      },
    );

    return () => media.revert();
  }, []);

  return (
    <div data-motion-scope="homepage" ref={scope}>
      {children}
    </div>
  );
}
