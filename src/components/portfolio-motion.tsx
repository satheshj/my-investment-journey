"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type PortfolioMotionProps = {
  children: ReactNode;
};

export function PortfolioMotion({ children }: PortfolioMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = scope.current;

    if (!root || typeof window.matchMedia !== "function") {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add({ motion: "(prefers-reduced-motion: no-preference)" }, (mediaContext) => {
      if (!mediaContext.conditions?.motion) {
        return;
      }

      const animationContext = gsap.context(() => {
        gsap.from("[data-portfolio-hero-item]", {
          clearProps: "opacity,transform",
          duration: 0.8,
          ease: "power3.out",
          opacity: 0,
          stagger: 0.1,
          y: 24,
        });

        const allocationBand = root.querySelector<HTMLElement>(
          "[data-portfolio-allocation-band]",
        );
        const allocationSegments = gsap.utils.toArray<HTMLElement>(
          "[data-portfolio-segment]",
          root,
        );

        if (allocationBand && allocationSegments.length > 0) {
          gsap.from(allocationSegments, {
            clearProps: "transform",
            duration: 0.9,
            ease: "power3.inOut",
            scaleX: 0,
            scrollTrigger: {
              once: true,
              start: "top 82%",
              trigger: allocationBand,
            },
            stagger: 0.08,
            transformOrigin: "left center",
          });
        }

        const revealGroups = [
          "[data-portfolio-heading]",
          "[data-portfolio-holding]",
          "[data-portfolio-strategy]",
          "[data-portfolio-geography]",
          "[data-portfolio-disclosure]",
        ];

        revealGroups.forEach((selector) => {
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
              y: 22,
            });
          });
        });
      }, root);

      return () => animationContext.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <div data-motion-scope="portfolio" ref={scope}>
      {children}
    </div>
  );
}
