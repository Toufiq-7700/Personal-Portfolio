'use client';

export default function SideDecor() {
  return (
    <div className="side-decor-container" aria-hidden="true">
      {/* ── Left Side Floating Geometric Shapes ── */}
      <div className="side-decor side-decor--left">
        {/* Isometric 3D Wireframe Box */}
        <div className="side-shape side-shape--float1" title="Wireframe Cube">
          <svg width="95" height="95" viewBox="0 0 120 120" fill="none">
            <polygon points="60,15 105,40 60,65 15,40" stroke="rgba(122, 31, 31, 0.32)" strokeWidth="1.6" fill="rgba(139, 58, 30, 0.04)" />
            <polygon points="15,40 60,65 60,105 15,80" stroke="rgba(90, 40, 10, 0.25)" strokeWidth="1.6" fill="rgba(90, 40, 10, 0.03)" />
            <polygon points="60,65 105,40 105,80 60,105" stroke="rgba(122, 31, 31, 0.35)" strokeWidth="1.6" fill="rgba(122, 31, 31, 0.06)" />
            <line x1="60" y1="15" x2="60" y2="65" stroke="rgba(122, 31, 31, 0.3)" strokeWidth="1.4" className="animated-dash" />
            <circle cx="60" cy="15" r="3" fill="var(--color-accent)" className="pulse-dot" />
            <circle cx="105" cy="40" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '0.8s' }} />
            <circle cx="15" cy="40" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1.4s' }} />
            <circle cx="60" cy="105" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '2s' }} />
          </svg>
        </div>

        {/* Ambient Drifting Mini Box */}
        <div className="side-particle side-particle--1">
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
            <rect x="5" y="5" width="20" height="20" rx="2" stroke="rgba(122, 31, 31, 0.35)" strokeWidth="1.2" className="animated-dash" />
          </svg>
        </div>

        {/* Double Nested Geometric Triangle */}
        <div className="side-shape side-shape--float2" title="Geometric Triangle">
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
            <polygon points="50,10 92,85 8,85" stroke="rgba(122, 31, 31, 0.3)" strokeWidth="1.6" fill="rgba(122, 31, 31, 0.03)" />
            <polygon points="50,85 71,48 29,48" stroke="rgba(90, 40, 10, 0.28)" strokeWidth="1.4" className="animated-dash-rev" />
            <circle cx="50" cy="10" r="3" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '0.5s' }} />
            <circle cx="92" cy="85" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1.2s' }} />
            <circle cx="8" cy="85" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1.8s' }} />
          </svg>
        </div>

        {/* Ambient Drifting Mini Triangle */}
        <div className="side-particle side-particle--2">
          <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
            <polygon points="15,4 26,24 4,24" stroke="rgba(90, 40, 10, 0.3)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Rotated Wireframe Box with Crosshairs & Orbit */}
        <div className="side-shape side-shape--float3" title="Rotating Tech Box">
          <svg width="85" height="85" viewBox="0 0 90 90" fill="none">
            <rect x="20" y="20" width="50" height="50" rx="3" transform="rotate(45 45 45)" stroke="rgba(90, 40, 10, 0.3)" strokeWidth="1.5" className="animated-dash" />
            <rect x="28" y="28" width="34" height="34" rx="2" transform="rotate(45 45 45)" stroke="rgba(122, 31, 31, 0.25)" strokeWidth="1.2" />
            <circle cx="45" cy="45" r="3.5" fill="var(--color-accent)" className="pulse-dot" />
          </svg>
        </div>

        {/* Geometric Angle & Triangle Accent */}
        <div className="side-shape side-shape--float4" title="Prism Angle">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <polygon points="40,10 70,70 10,70" stroke="rgba(122, 31, 31, 0.28)" strokeWidth="1.5" fill="rgba(139, 58, 30, 0.03)" />
            <line x1="40" y1="10" x2="40" y2="70" stroke="rgba(90, 40, 10, 0.22)" strokeWidth="1.2" className="animated-dash" />
            <rect x="35" y="65" width="10" height="10" stroke="rgba(122, 31, 31, 0.3)" strokeWidth="1.2" fill="none" />
            <circle cx="40" cy="10" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1s' }} />
          </svg>
        </div>
      </div>

      {/* ── Right Side Floating Geometric Shapes ── */}
      <div className="side-decor side-decor--right">
        {/* Overlapping Dual Triangles */}
        <div className="side-shape side-shape--float2" title="Dual Triangles">
          <svg width="95" height="95" viewBox="0 0 100 100" fill="none">
            <polygon points="20,15 85,35 40,90" stroke="rgba(90, 40, 10, 0.28)" strokeWidth="1.6" fill="rgba(90, 40, 10, 0.04)" />
            <polygon points="50,10 95,70 15,60" stroke="rgba(122, 31, 31, 0.32)" strokeWidth="1.4" className="animated-dash" />
            <circle cx="85" cy="35" r="3" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '0.3s' }} />
            <circle cx="50" cy="10" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1.1s' }} />
            <circle cx="40" cy="90" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1.7s' }} />
          </svg>
        </div>

        {/* Ambient Drifting Mini Box */}
        <div className="side-particle side-particle--3">
          <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
            <rect x="6" y="6" width="18" height="18" transform="rotate(45 15 15)" stroke="rgba(122, 31, 31, 0.3)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Floating Dual Isometric Cube Stack */}
        <div className="side-shape side-shape--float1" title="Cube Stack">
          <svg width="100" height="100" viewBox="0 0 110 110" fill="none">
            {/* Top Cube */}
            <polygon points="45,10 75,25 45,40 15,25" stroke="rgba(122, 31, 31, 0.3)" strokeWidth="1.5" fill="rgba(122, 31, 31, 0.04)" />
            <polygon points="15,25 45,40 45,65 15,50" stroke="rgba(90, 40, 10, 0.24)" strokeWidth="1.5" fill="rgba(90, 40, 10, 0.02)" />
            <polygon points="45,40 75,25 75,50 45,65" stroke="rgba(122, 31, 31, 0.28)" strokeWidth="1.5" fill="rgba(122, 31, 31, 0.05)" />
            {/* Lower Offset Cube with Animated Dash */}
            <polygon points="65,45 95,60 65,75 35,60" stroke="rgba(90, 40, 10, 0.28)" strokeWidth="1.4" className="animated-dash-rev" />
            <polygon points="35,60 65,75 65,100 35,85" stroke="rgba(90, 40, 10, 0.22)" strokeWidth="1.4" />
            <polygon points="65,75 95,60 95,85 65,100" stroke="rgba(122, 31, 31, 0.26)" strokeWidth="1.4" fill="rgba(90, 40, 10, 0.03)" />
            <circle cx="45" cy="10" r="3" fill="var(--color-accent)" className="pulse-dot" />
            <circle cx="75" cy="25" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '0.7s' }} />
            <circle cx="65" cy="100" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1.5s' }} />
          </svg>
        </div>

        {/* Diamond Box with Inner Geometric Division */}
        <div className="side-shape side-shape--float4" title="Diamond Matrix">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <polygon points="45,10 80,45 45,80 10,45" stroke="rgba(122, 31, 31, 0.3)" strokeWidth="1.5" fill="rgba(139, 58, 30, 0.03)" />
            <line x1="45" y1="10" x2="45" y2="80" stroke="rgba(90, 40, 10, 0.22)" strokeWidth="1.3" className="animated-dash" />
            <line x1="10" y1="45" x2="80" y2="45" stroke="rgba(90, 40, 10, 0.22)" strokeWidth="1.3" className="animated-dash-rev" />
            <circle cx="45" cy="45" r="3" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '0.9s' }} />
            <circle cx="45" cy="10" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1.3s' }} />
            <circle cx="80" cy="45" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1.9s' }} />
          </svg>
        </div>

        {/* Modern Geometric Polyline Shard */}
        <div className="side-shape side-shape--float3" title="Geometric Polyline">
          <svg width="85" height="85" viewBox="0 0 90 90" fill="none">
            <polygon points="20,15 80,25 70,80 25,70" stroke="rgba(122, 31, 31, 0.28)" strokeWidth="1.5" fill="rgba(122, 31, 31, 0.03)" />
            <line x1="20" y1="15" x2="70" y2="80" stroke="rgba(90, 40, 10, 0.2)" strokeWidth="1.3" className="animated-dash" />
            <circle cx="20" cy="15" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '0.4s' }} />
            <circle cx="80" cy="25" r="2.5" fill="var(--color-accent)" className="pulse-dot" style={{ animationDelay: '1.6s' }} />
          </svg>
        </div>
      </div>
    </div>
  );
}
