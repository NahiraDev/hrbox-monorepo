import { useEffect, useRef, useState } from 'react';

interface DoubleLineProgressProps {
  value: number;
  size?: number;
  gap?: number;
  duration?: number;
}

const DoubleLineProgress: React.FC<DoubleLineProgressProps> = ({
                                                                 value,
                                                                 size = 80,
                                                                 gap = 2,
                                                                 duration = 2000,
                                                               }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const getColor = (value: number): string => {
    if (value < 30) return '#0B76B7';
    if (value < 70) return '#FD8F02';
    return '#22AD5C';
  };

  const strokeColor = getColor(value);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const easedProgress = Math.min(progress / duration, 1);

      setAnimatedValue(easedProgress * value);

      if (easedProgress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(requestRef.current!);
        requestRef.current = null;
        startTimeRef.current = null;
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [value, duration]);

  const strokeWidth = 6;
  const center = size / 2;
  const outerRadius = center - strokeWidth / 2;
  const innerRadius = outerRadius - strokeWidth - gap;

  const getStrokeData = (radius: number) => {
    const circumference = 2 * Math.PI * radius;
    const visibleValue = animatedValue === 0 ? 0.5 : animatedValue;
    const offset = circumference * (1 - visibleValue / 100);
    return { circumference, offset };
  };

  const outer = getStrokeData(outerRadius);
  const inner = getStrokeData(innerRadius);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-block',
      }}
    >
      <svg height={size} width={size}>
        <circle
          cx={center}
          cy={center}
          fill="none"
          r={outerRadius}
          stroke="#dcf0f966"
          strokeWidth={strokeWidth}
        />

        <circle
          cx={center}
          cy={center}
          fill="none"
          r={innerRadius}
          stroke="#dcf0f966"
          strokeWidth={strokeWidth}
        />

        <circle
          cx={center}
          cy={center}
          fill="none"
          r={outerRadius}
          stroke={strokeColor}
          strokeDasharray={outer.circumference}
          strokeDashoffset={outer.offset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${center} ${center})`}
        />
        <circle
          cx={center}
          cy={center}
          fill="none"
          r={innerRadius}
          stroke={strokeColor}
          strokeDasharray={inner.circumference}
          strokeDashoffset={inner.offset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: '900',
          fontSize: '18px',
          color: strokeColor,
          fontFamily: 'Nunito',
        }}
      >
        {animatedValue.toFixed(0)}%
      </div>
    </div>
  );
};

export default DoubleLineProgress;
