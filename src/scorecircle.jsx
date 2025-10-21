import React, { useEffect, useRef, useState } from "react";

const SIZE = 160; // SVG size
const STROKE = 12; // Stroke width
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScoreCircle({ score = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const prevScore = useRef(score);

  useEffect(() => {
    let frame;
    let start;
    const duration = 900; // ms

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current =
        prevScore.current + (score - prevScore.current) * progress;
      setAnimatedScore(Math.round(current));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        prevScore.current = score;
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const offset = CIRCUMFERENCE * (1 - animatedScore / 100);

  return (
    <div className="score-circle-container">
      <svg
        width={SIZE}
        height={SIZE}
        className="score-circle-svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <defs>
          <linearGradient id="scoreGradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a21caf" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#e5e7eb"
          strokeWidth={STROKE}
          fill="none"
        />
        {/* Animated progress circle */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="url(#scoreGradient)"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="score-circle-progress"
        />
        {/* Percentage text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="2.5rem"
          fontWeight="bold"
          fill="#3b82f6"
        >
          {animatedScore}%
        </text>
      </svg>
    </div>
  );
}