import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { cn } from "@/lib/utils";
export default function BannerCarouselSection({ bannerItems }) {
    const timer = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
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
        if (!instanceRef.current)
            return;
        timer.current = setInterval(() => {
            instanceRef.current?.next();
        }, 3000);
        return () => {
            if (timer.current)
                clearInterval(timer.current);
        };
    }, [instanceRef]);
    return (_jsx("section", { className: "bg-white", children: _jsxs("div", { className: "max-w-screen-sm mx-auto px-4 sm:px-6 lg:px-8 py-4", children: [_jsx("div", { ref: sliderRef, className: "keen-slider", children: bannerItems.map((banner, idx) => (_jsxs("div", { className: "keen-slider__slide flex-shrink-0 w-[80%] md:w-[60%] h-60 relative rounded-lg overflow-hidden", children: [_jsx("img", { src: banner.image, alt: banner.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center", children: _jsx("h3", { className: "text-white font-semibold text-lg", children: banner.title }) })] }, banner.id))) }), _jsx("div", { className: "flex justify-center mt-4 space-x-2", children: bannerItems.map((_, idx) => (_jsx("button", { onClick: () => instanceRef.current?.moveToIdx(idx), className: cn("w-3 h-3 rounded-full", idx === currentSlide ? "bg-primary" : "bg-gray-300") }, idx))) })] }) }));
}
