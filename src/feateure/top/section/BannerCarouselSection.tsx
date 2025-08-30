import React, { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { cn } from "@/lib/utils";

interface BannerItem {
  id: string;
  image: string;
  title: string;
}

interface BannerCarouselSectionProps {
  bannerItems: BannerItem[];
}

export default function BannerCarouselSection({ bannerItems }: BannerCarouselSectionProps) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      origin: "center",
      perView: 1,
      spacing: 16,
    },
    renderMode: "performance",
  });

  // 自動スライド処理
  useEffect(() => {
    if (!instanceRef.current) return;

    timer.current = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [instanceRef]);

  return (
    <section className="bg-white">
      <div className="max-w-screen-sm mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div ref={sliderRef} className="keen-slider">
          {bannerItems.map((banner, idx) => (
            <div
              key={banner.id}
              className="keen-slider__slide flex-shrink-0 w-[80%] md:w-[60%] h-60 relative rounded-lg overflow-hidden"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white font-semibold text-lg">{banner.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {bannerItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={cn(
                "w-3 h-3 rounded-full",
                idx === currentSlide ? "bg-primary" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 