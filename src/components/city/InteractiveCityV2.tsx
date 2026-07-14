"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { CategoryId, Building } from "@/types";

const BUILDING_COLORS: Record<CategoryId, { main: string; dark: string }> = {
  investing: { main: "#6ba3d6", dark: "#4a7ab3" },
  career: { main: "#7d8fb3", dark: "#5a6a8a" },
  language: { main: "#9b88c4", dark: "#7a67a3" },
  baking: { main: "#f0b775", dark: "#d4945f" },
  beauty: { main: "#e89db7", dark: "#cc7ca1" },
  fitness: { main: "#a8d5a8", dark: "#8ab98a" },
  lifestyle: { main: "#ffd580", dark: "#e6c168" },
  digital: { main: "#6bbfb5", dark: "#4fa39b" },
};

const BUILDING_EMOJIS: Record<CategoryId, string> = {
  investing: "🏦",
  career: "🏢",
  language: "🏫",
  baking: "🧁",
  beauty: "💄",
  fitness: "🏋️",
  lifestyle: "🎨",
  digital: "💻",
};

interface CityBuilding {
  id: CategoryId;
  x: number;
  y: number;
  width: number;
  height: number;
  level: number;
}

// 城市建筑布局
const cityLayout: CityBuilding[] = [
  { id: "investing", x: 100, y: 150, width: 180, height: 200, level: 4 },
  { id: "career", x: 350, y: 200, width: 160, height: 180, level: 3 },
  { id: "language", x: 600, y: 100, width: 140, height: 160, level: 2 },
  { id: "baking", x: 820, y: 150, width: 130, height: 150, level: 2 },
  { id: "beauty", x: 1050, y: 120, width: 120, height: 140, level: 1 },
  { id: "fitness", x: 100, y: 450, width: 150, height: 170, level: 1 },
  { id: "lifestyle", x: 350, y: 500, width: 140, height: 160, level: 1 },
  { id: "digital", x: 600, y: 400, width: 170, height: 190, level: 4 },
];

export function InteractiveCityV2({ buildings }: { buildings: Building[] }) {
  const router = useRouter();
  const [hoveredBuilding, setHoveredBuilding] = useState<CategoryId | null>(null);

  const buildingMap = new Map(buildings.map((b) => [b.id, b]));

  const handleBuildingClick = (id: CategoryId) => {
    router.push(`/building/${id}`);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-300 via-blue-200 to-green-100 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <TransformWrapper
        initialScale={0.8}
        initialPositionX={-300}
        initialPositionY={-200}
        minScale={0.5}
        maxScale={3}
        centerOnInit
      >
        <TransformComponent>
          <svg width="1200" height="700" viewBox="0 0 1200 700" className="drop-shadow-lg">
            {/* 背景 */}
            <defs>
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="100%" stopColor="#E0F6FF" />
              </linearGradient>
              <pattern id="grass" patternUnits="userSpaceOnUse" width="40" height="40">
                <circle cx="10" cy="10" r="3" fill="#90EE90" opacity="0.3" />
                <circle cx="30" cy="20" r="2" fill="#90EE90" opacity="0.2" />
              </pattern>
            </defs>

            {/* 地面 */}
            <rect width="1200" height="700" fill="url(#skyGradient)" />
            <rect width="1200" height="700" fill="url(#grass)" />

            {/* 道路 */}
            <g opacity="0.8">
              <path d="M 0 300 L 1200 300" stroke="#888888" strokeWidth="80" fill="none" />
              <path d="M 500 0 L 500 700" stroke="#888888" strokeWidth="80" fill="none" />
              {/* 路线标记 */}
              <line x1="0" y1="340" x2="1200" y2="340" stroke="#FFFF00" strokeWidth="3" strokeDasharray="20,10" opacity="0.6" />
              <line x1="540" y1="0" x2="540" y2="700" stroke="#FFFF00" strokeWidth="3" strokeDasharray="20,10" opacity="0.6" />
            </g>

            {/* 树木装饰 */}
            {[...Array(15)].map((_, i) => {
              const x = Math.random() * 1200;
              const y = Math.random() * 700;
              const size = Math.random() * 20 + 15;
              return (
                <g key={`tree-${i}`}>
                  <circle cx={x} cy={y} r={size} fill="#2d5016" opacity="0.8" />
                  <circle cx={x - 8} cy={y - 5} r={size * 0.8} fill="#3d6b1f" opacity="0.7" />
                  <circle cx={x + 8} cy={y - 5} r={size * 0.8} fill="#3d6b1f" opacity="0.7" />
                  <rect x={x - 3} y={y + size - 8} width="6" height="20" fill="#8B4513" />
                </g>
              );
            })}

            {/* 建筑 */}
            {cityLayout.map((layout) => {
              const building = buildingMap.get(layout.id);
              if (!building) return null;

              const colors = BUILDING_COLORS[layout.id];
              const emoji = BUILDING_EMOJIS[layout.id];
              const isHovered = hoveredBuilding === layout.id;
              const levelHeight = Math.min(layout.height * (building.level / 5), layout.height);

              return (
                <g
                  key={layout.id}
                  onClick={() => handleBuildingClick(layout.id)}
                  onMouseEnter={() => setHoveredBuilding(layout.id)}
                  onMouseLeave={() => setHoveredBuilding(null)}
                  style={{
                    cursor: "pointer",
                    opacity: isHovered ? 1 : 0.9,
                  }}
                  className={isHovered ? "animate-pulse-glow" : ""}
                >
                  {/* 建筑主体 */}
                  <rect
                    x={layout.x}
                    y={layout.y}
                    width={layout.width}
                    height={levelHeight}
                    fill={colors.main}
                    stroke={colors.dark}
                    strokeWidth="3"
                    rx="8"
                  />

                  {/* 建筑窗户 */}
                  {[...Array(Math.ceil(building.level))].map((_, row) => {
                    return [...Array(Math.max(2, Math.floor(layout.width / 30)))].map((_, col) => (
                      <circle
                        key={`window-${row}-${col}`}
                        cx={layout.x + 15 + col * 30}
                        cy={layout.y + 20 + row * 35}
                        r="4"
                        fill="#FFD700"
                        opacity={Math.random() > 0.3 ? 0.8 : 0.3}
                      />
                    ));
                  })}

                  {/* 建筑顶部装饰 */}
                  <polygon
                    points={`${layout.x + layout.width / 2},${layout.y - 15} ${layout.x},${layout.y} ${layout.x + layout.width},${layout.y}`}
                    fill={colors.dark}
                    opacity="0.6"
                  />

                  {/* 等级徽章 */}
                  <circle
                    cx={layout.x + layout.width - 15}
                    cy={layout.y - 15}
                    r="18"
                    fill="#FF6B6B"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={layout.x + layout.width - 15}
                    y={layout.y - 10}
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    {building.level}
                  </text>

                  {/* 建筑名称和emoji */}
                  <g className={isHovered ? "animate-float" : ""}>
                    <text
                      x={layout.x + layout.width / 2}
                      y={layout.y + levelHeight + 35}
                      textAnchor="middle"
                      fontSize="18"
                      fontWeight="bold"
                      fill="#333"
                    >
                      {emoji}
                    </text>
                  </g>
                  <text
                    x={layout.x + layout.width / 2}
                    y={layout.y + levelHeight + 55}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="600"
                    fill="#333"
                  >
                    {building.name}
                  </text>
                  <text
                    x={layout.x + layout.width / 2}
                    y={layout.y + levelHeight + 72}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#666"
                  >
                    {building.minutes} 分
                  </text>

                  {/* 悬停提示 */}
                  {isHovered && (
                    <g>
                      <rect
                        x={layout.x + layout.width / 2 - 70}
                        y={layout.y - 45}
                        width="140"
                        height="35"
                        rx="4"
                        fill="#1a1a1a"
                        opacity="0.95"
                      />
                      <text
                        x={layout.x + layout.width / 2}
                        y={layout.y - 20}
                        textAnchor="middle"
                        fontSize="11"
                        fill="#fff"
                        fontWeight="600"
                      >
                        點擊進入詳情
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* 人物和装饰 - 随机分布 */}
            {[...Array(8)].map((_, i) => {
              const x = Math.random() * 1200;
              const y = 350 + (Math.random() * 150 - 75);
              const char = ["🚶", "🏃", "🧑‍🦽", "👨‍💼", "👩‍💼"][Math.floor(Math.random() * 5)];
              return (
                <text
                  key={`person-${i}`}
                  x={x}
                  y={y}
                  fontSize="24"
                  opacity="0.7"
                  className="animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {char}
                </text>
              );
            })}

            {/* 汽车 */}
            {[...Array(3)].map((_, i) => (
              <g key={`car-${i}`} style={{ animationDelay: `${i * 0.5}s` }} className="animate-spin-slow">
                <circle cx={150 + i * 400} cy={300} r="25" fill="#FFD700" opacity="0.6" />
              </g>
            ))}
          </svg>
        </TransformComponent>
      </TransformWrapper>

      {/* 控制提示 */}
      <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-xs z-40">
        🔍 滾輪縮放 | 拖動平移 | 點擊進入
      </div>
    </div>
  );
}
