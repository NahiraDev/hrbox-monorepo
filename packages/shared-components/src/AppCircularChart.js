import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
const DoubleLineProgress = ({ value, size = 80, gap = 2, duration = 2000, }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const requestRef = useRef(null);
    const startTimeRef = useRef(null);
    const getColor = (value) => {
        if (value < 30)
            return '#0B76B7';
        if (value < 70)
            return '#FD8F02';
        return '#22AD5C';
    };
    const strokeColor = getColor(value);
    useEffect(() => {
        const animate = (timestamp) => {
            if (!startTimeRef.current)
                startTimeRef.current = timestamp;
            const progress = timestamp - startTimeRef.current;
            const easedProgress = Math.min(progress / duration, 1);
            setAnimatedValue(easedProgress * value);
            if (easedProgress < 1) {
                requestRef.current = requestAnimationFrame(animate);
            }
            else {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = null;
                startTimeRef.current = null;
            }
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current)
                cancelAnimationFrame(requestRef.current);
        };
    }, [value, duration]);
    const strokeWidth = 6;
    const center = size / 2;
    const outerRadius = center - strokeWidth / 2;
    const innerRadius = outerRadius - strokeWidth - gap;
    const getStrokeData = (radius) => {
        const circumference = 2 * Math.PI * radius;
        const visibleValue = animatedValue === 0 ? 0.5 : animatedValue;
        const offset = circumference * (1 - visibleValue / 100);
        return { circumference, offset };
    };
    const outer = getStrokeData(outerRadius);
    const inner = getStrokeData(innerRadius);
    return (_jsxs("div", { style: {
            position: 'relative',
            width: size,
            height: size,
            display: 'inline-block',
        }, children: [_jsxs("svg", { height: size, width: size, children: [_jsx("circle", { cx: center, cy: center, fill: "none", r: outerRadius, stroke: "#dcf0f966", strokeWidth: strokeWidth }), _jsx("circle", { cx: center, cy: center, fill: "none", r: innerRadius, stroke: "#dcf0f966", strokeWidth: strokeWidth }), _jsx("circle", { cx: center, cy: center, fill: "none", r: outerRadius, stroke: strokeColor, strokeDasharray: outer.circumference, strokeDashoffset: outer.offset, strokeLinecap: "round", strokeWidth: strokeWidth, transform: `rotate(-90 ${center} ${center})` }), _jsx("circle", { cx: center, cy: center, fill: "none", r: innerRadius, stroke: strokeColor, strokeDasharray: inner.circumference, strokeDashoffset: inner.offset, strokeLinecap: "round", strokeWidth: strokeWidth, transform: `rotate(-90 ${center} ${center})` })] }), _jsxs("div", { style: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontWeight: '900',
                    fontSize: '18px',
                    color: strokeColor,
                    fontFamily: 'Nunito',
                }, children: [animatedValue.toFixed(0), "%"] })] }));
};
export default DoubleLineProgress;
