import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

const domains = [
  {
    id: "web",
    name: "Web Dev",
    color: "#ff2a85",
    colorEnd: "#ff6b9d",
    subdomains: ["Custom Web Apps", "E-commerce", "APIs"],
  },
  {
    id: "app",
    name: "App Dev",
    color: "#ff7b00",
    colorEnd: "#ffb347",
    subdomains: ["Cross-platform", "UI/UX", "Deployment"],
  },
  {
    id: "aiml",
    name: "AI / ML",
    color: "#00e5ff",
    colorEnd: "#80f0ff",
    subdomains: ["Analytics", "NLP", "Vision"],
  },
  {
    id: "events",
    name: "Events",
    color: "#9d4edd",
    colorEnd: "#c084fc",
    subdomains: ["Hackathons", "Meetups", "Seminars"],
  },
  {
    id: "sponsor",
    name: "Sponsors",
    color: "#00ff88",
    colorEnd: "#80ffbb",
    subdomains: ["Brands", "Funds", "Partners"],
  },
];

/* ────── Organic Tree layout config ────── */
// Trunk: runs from bottom-center up to where branches diverge
// Branches splay outward like a real tree

const TRUNK_TOP = 200;
const TRUNK_BOTTOM = 820;
const TRUNK_X = 500;

// Branch endpoints (where domain nodes sit) — arranged in an arc like a tree canopy
const branchEndpoints = [
  { x: 140, y: 130 },   // Web Dev — far left
  { x: 280, y: 80 },    // App Dev — upper left
  { x: 500, y: 50 },    // AI/ML — top center
  { x: 720, y: 80 },    // Events — upper right
  { x: 860, y: 130 },   // Sponsors — far right
];

// Generate organic branch paths (cubic bezier with natural curvature)
function branchPath(endX, endY) {
  // From trunk top, curve outward naturally
  const cx1 = TRUNK_X + (endX - TRUNK_X) * 0.15;
  const cy1 = TRUNK_TOP + 40;
  const cx2 = TRUNK_X + (endX - TRUNK_X) * 0.6;
  const cy2 = endY + 60;
  return `M ${TRUNK_X} ${TRUNK_TOP} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`;
}

// Sub-branch endpoints (fan out below each domain node)
function subBranchPositions(parentX, parentY, count) {
  const spread = 55;
  const drop = 70;
  const positions = [];
  const startAngle = -(count - 1) / 2;
  for (let i = 0; i < count; i++) {
    const offset = (startAngle + i) * spread;
    const nx = parentX + offset;
    const ny = parentY - drop - Math.abs(offset) * 0.2;
    positions.push({ x: nx, y: ny });
  }
  return positions;
}

function subBranchPath(parentX, parentY, childX, childY) {
  const cx = parentX + (childX - parentX) * 0.3;
  const cy = parentY - 20;
  return `M ${parentX} ${parentY} Q ${cx} ${cy}, ${childX} ${childY}`;
}

/* ────── Floating particles ────── */
function Particles({ count = 30 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 80 + Math.random() * 840,
      y: 20 + Math.random() * 250,
      size: 2 + Math.random() * 3,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      color: ["#ff2a85", "#ff7b00", "#00e5ff", "#9d4edd", "#00ff88"][
        Math.floor(Math.random() * 5)
      ],
    }));
  }, [count]);

  return (
    <>
      {particles.map((p) => (
        <motion.circle
          key={p.id}
          cx={p.x}
          cy={p.y}
          r={p.size}
          fill={p.color}
          opacity={0}
          animate={{
            opacity: [0, 0.6, 0],
            cy: [p.y, p.y - 30 - Math.random() * 20, p.y - 60],
            cx: [p.x, p.x + (Math.random() - 0.5) * 30, p.x + (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ────── Animated path drawing ────── */
const drawBranch = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.8 + i * 0.25, type: "spring", duration: 1.8, bounce: 0 },
      opacity: { delay: 0.8 + i * 0.25, duration: 0.1 },
    },
  }),
};

const drawSubBranch = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 2.0 + i * 0.08, type: "spring", duration: 1.0, bounce: 0 },
      opacity: { delay: 2.0 + i * 0.08, duration: 0.1 },
    },
  }),
};

const trunkDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: "easeOut" },
      opacity: { duration: 0.2 },
    },
  },
};

const nodeAppear = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1.3 + i * 0.25,
      duration: 0.5,
      type: "spring",
      stiffness: 200,
    },
  }),
};

const subNodeAppear = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 2.5 + i * 0.06,
      duration: 0.35,
      type: "spring",
      stiffness: 250,
    },
  }),
};

/* ────── Root node pulse ────── */
const rootPulse = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, type: "spring", stiffness: 150 },
  },
};

const AboutUsTree = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full py-10 bg-transparent min-h-screen flex flex-col items-center overflow-hidden font-head">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 z-10"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a85] via-[#ff7b00] to-[#9d4edd]">
          Our Ecosystem
        </h2>
        <p className="text-gray-400 mt-3 text-base max-w-lg mx-auto px-4">
          A living tree of domains — each branch a core pillar of SQAC.
        </p>
      </motion.div>

      {/* ═══════ Desktop Tree ═══════ */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1000px] mx-auto hidden lg:block"
        style={{ aspectRatio: "1000 / 900" }}
      >
        <svg
          viewBox="0 0 1000 900"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Trunk gradient */}
            <linearGradient id="trunkGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#5c3d1a" />
              <stop offset="40%" stopColor="#7a5230" />
              <stop offset="100%" stopColor="#4a6741" />
            </linearGradient>
            {/* Trunk bark texture overlay */}
            <linearGradient id="trunkBark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
            </linearGradient>
            {/* Branch gradients for each domain */}
            {domains.map((d, i) => (
              <linearGradient
                key={d.id}
                id={`branchGrad-${d.id}`}
                x1={TRUNK_X}
                y1={TRUNK_TOP}
                x2={branchEndpoints[i].x}
                y2={branchEndpoints[i].y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#4a6741" />
                <stop offset="60%" stopColor={d.color + "80"} />
                <stop offset="100%" stopColor={d.color} />
              </linearGradient>
            ))}
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Trunk ── */}
          {/* Trunk shadow */}
          <motion.path
            d={`M ${TRUNK_X - 4} ${TRUNK_BOTTOM} C ${TRUNK_X - 6} ${TRUNK_BOTTOM - 150}, ${TRUNK_X + 8} ${TRUNK_TOP + 150}, ${TRUNK_X} ${TRUNK_TOP}`}
            fill="transparent"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="38"
            strokeLinecap="round"
            variants={trunkDraw}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          {/* Trunk main */}
          <motion.path
            d={`M ${TRUNK_X} ${TRUNK_BOTTOM} C ${TRUNK_X - 3} ${TRUNK_BOTTOM - 150}, ${TRUNK_X + 5} ${TRUNK_TOP + 150}, ${TRUNK_X} ${TRUNK_TOP}`}
            fill="transparent"
            stroke="url(#trunkGrad)"
            strokeWidth="32"
            strokeLinecap="round"
            variants={trunkDraw}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          {/* Trunk bark highlight */}
          <motion.path
            d={`M ${TRUNK_X + 2} ${TRUNK_BOTTOM} C ${TRUNK_X - 1} ${TRUNK_BOTTOM - 150}, ${TRUNK_X + 7} ${TRUNK_TOP + 150}, ${TRUNK_X + 2} ${TRUNK_TOP}`}
            fill="transparent"
            stroke="url(#trunkBark)"
            strokeWidth="32"
            strokeLinecap="round"
            variants={trunkDraw}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          {/* Trunk knot details */}
          <motion.ellipse
            cx={TRUNK_X + 3}
            cy={500}
            rx="8"
            ry="12"
            fill="#5c3d1a"
            stroke="#4a3015"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          />
          <motion.ellipse
            cx={TRUNK_X - 5}
            cy={650}
            rx="6"
            ry="9"
            fill="#5c3d1a"
            stroke="#4a3015"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          />

          {/* ── Main Branches ── */}
          {domains.map((domain, index) => {
            const ep = branchEndpoints[index];
            return (
              <React.Fragment key={domain.id}>
                {/* Branch shadow */}
                <motion.path
                  d={branchPath(ep.x, ep.y + 3)}
                  fill="transparent"
                  stroke="rgba(0,0,0,0.2)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  custom={index}
                  variants={drawBranch}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
                {/* Branch */}
                <motion.path
                  d={branchPath(ep.x, ep.y)}
                  fill="transparent"
                  stroke={`url(#branchGrad-${domain.id})`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  custom={index}
                  variants={drawBranch}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{
                    filter: `drop-shadow(0 0 8px ${domain.color}50)`,
                  }}
                />
              </React.Fragment>
            );
          })}

          {/* ── Sub Branches ── */}
          {domains.map((domain, dIndex) => {
            const parent = branchEndpoints[dIndex];
            const subPositions = subBranchPositions(
              parent.x,
              parent.y,
              domain.subdomains.length
            );
            return subPositions.map((sp, sIndex) => (
              <motion.path
                key={`${domain.id}-sub-${sIndex}`}
                d={subBranchPath(parent.x, parent.y, sp.x, sp.y)}
                fill="transparent"
                stroke={domain.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.6"
                custom={dIndex * 3 + sIndex}
                variants={drawSubBranch}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                  filter: `drop-shadow(0 0 4px ${domain.color}40)`,
                }}
              />
            ));
          })}

          {/* ── Floating particles ── */}
          {isInView && <Particles count={35} />}
        </svg>

        {/* ── Root Node (SQAC) ── at the base of trunk */}
        <motion.div
          variants={rootPulse}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute z-20 flex items-center justify-center cursor-pointer group"
          style={{
            left: `${(TRUNK_X / 1000) * 100}%`,
            top: `${(TRUNK_BOTTOM / 900) * 100}%`,
            transform: "translate(-50%, -30%)",
          }}
        >
          {/* Pulse ring */}
          <div
            className="absolute w-[140px] h-[140px] rounded-full animate-ping opacity-20"
            style={{
              background: "radial-gradient(circle, #ff2a8540, transparent 70%)",
            }}
          />
          <div
            className="w-[120px] h-[120px] rounded-full p-[3px] shadow-2xl group-hover:scale-105 transition-transform duration-300"
            style={{
              background: "linear-gradient(135deg, #ff2a85, #ff7b00)",
              boxShadow:
                "0 0 40px rgba(255,42,133,0.5), 0 0 80px rgba(255,123,0,0.3)",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#fa5b64] to-[#e84545] flex items-center justify-center">
              <span className="font-bold text-2xl text-white font-logo tracking-wider drop-shadow-lg">
                SQAC
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Domain Nodes (leaves) ── */}
        {domains.map((domain, index) => {
          const ep = branchEndpoints[index];
          return (
            <React.Fragment key={domain.id}>
              <motion.div
                custom={index}
                variants={nodeAppear}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute z-20 cursor-pointer group"
                style={{
                  left: `${(ep.x / 1000) * 100}%`,
                  top: `${(ep.y / 900) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Glow ring */}
                <div
                  className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-md"
                  style={{ background: domain.color + "40" }}
                />
                {/* Node circle */}
                <div
                  className="relative w-[85px] h-[85px] rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${domain.color}20, ${domain.color}08)`,
                    border: `2.5px solid ${domain.color}`,
                    boxShadow: `0 0 20px ${domain.color}40, inset 0 0 15px ${domain.color}15`,
                  }}
                >
                  {/* Inner glow dot */}
                  <div
                    className="absolute w-4 h-4 rounded-full top-2 right-2 opacity-40 blur-sm"
                    style={{ background: domain.colorEnd }}
                  />
                  <span className="text-[13px] font-bold text-white text-center leading-tight font-head drop-shadow-sm">
                    {domain.name}
                  </span>
                </div>
              </motion.div>

              {/* Subdomain nodes */}
              {domain.subdomains.map((subName, sIndex) => {
                const subPositions = subBranchPositions(
                  ep.x,
                  ep.y,
                  domain.subdomains.length
                );
                const sp = subPositions[sIndex];
                return (
                  <motion.div
                    key={`${domain.id}-subnode-${sIndex}`}
                    custom={index * 3 + sIndex}
                    variants={subNodeAppear}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="absolute z-10 group/sub cursor-default"
                    style={{
                      left: `${(sp.x / 1000) * 100}%`,
                      top: `${(sp.y / 900) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className="px-3 py-[5px] rounded-full text-[10px] font-semibold whitespace-nowrap backdrop-blur-sm group-hover/sub:scale-110 transition-transform duration-200"
                      style={{
                        background: `linear-gradient(135deg, ${domain.color}18, ${domain.color}08)`,
                        border: `1px solid ${domain.color}50`,
                        color: domain.colorEnd,
                        boxShadow: `0 2px 8px ${domain.color}20`,
                      }}
                    >
                      {subName}
                    </div>
                  </motion.div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>

      {/* ═══════ Mobile Fallback ═══════ */}
      <div className="w-full px-6 flex flex-col items-center lg:hidden mt-16 gap-10">
        {/* Root */}
        <div className="relative">
          <div
            className="w-[100px] h-[100px] rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #ff2a85, #ff7b00)",
              boxShadow:
                "0 0 30px rgba(255,42,133,0.5), 0 0 60px rgba(255,123,0,0.3)",
            }}
          >
            <div className="w-[90px] h-[90px] rounded-full bg-gradient-to-br from-[#fa5b64] to-[#e84545] flex items-center justify-center">
              <span className="font-bold text-xl text-white font-logo tracking-wider">
                SQAC
              </span>
            </div>
          </div>
          {/* Vine going down */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-[3px] h-10 bg-gradient-to-b from-[#4a6741] to-[#4a674140]" />
        </div>

        {/* Domain cards */}
        <div className="flex flex-col gap-10 w-full max-w-sm relative">
          {/* Central vine */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#4a6741] via-[#4a674180] to-transparent -z-10" />

          {domains.map((domain) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center w-full"
            >
              {/* Node */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-center mb-4 relative z-10 backdrop-blur-md"
                style={{
                  background: `linear-gradient(135deg, ${domain.color}20, ${domain.color}08)`,
                  border: `2px solid ${domain.color}`,
                  boxShadow: `0 0 18px ${domain.color}40`,
                }}
              >
                <span className="font-bold text-white text-xs font-head">
                  {domain.name}
                </span>
              </div>

              {/* Sub-items */}
              <div className="flex flex-wrap justify-center gap-2">
                {domain.subdomains.map((sub, j) => (
                  <div
                    key={j}
                    className="px-3 py-[5px] rounded-full text-[10px] font-semibold backdrop-blur-sm"
                    style={{
                      background: `${domain.color}10`,
                      border: `1px solid ${domain.color}50`,
                      color: domain.colorEnd,
                    }}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsTree;
