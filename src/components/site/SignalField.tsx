// Abstract network visualization: layered rings, nodes and one highlighted signal path.
const nodes = [
  [120, 90], [300, 60], [430, 150], [470, 300], [380, 430], [210, 460], [80, 360], [60, 210],
  [250, 200], [340, 270], [200, 320], [160, 180],
];
const edges = [[0, 11], [1, 8], [2, 9], [3, 9], [4, 9], [5, 10], [6, 10], [7, 11], [8, 9], [9, 10], [10, 11], [11, 8], [1, 2], [6, 7]];

export const SignalField = () => (
  <svg viewBox="0 0 520 520" className="h-full w-full" role="img" aria-label="Abstract network diagram with one highlighted signal path">
    <defs>
      <radialGradient id="cyglow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(var(--cy-signal))" stopOpacity=".18" />
        <stop offset="100%" stopColor="hsl(var(--cy-signal))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="270" cy="260" r="250" fill="url(#cyglow)" />
    {[80, 150, 220].map((r) => (
      <circle key={r} cx="270" cy="260" r={r} fill="none" stroke="hsl(var(--cy-line))" strokeDasharray={r === 150 ? "2 6" : undefined} />
    ))}
    {edges.map(([a, b], i) => (
      <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="hsl(var(--cy-mute))" strokeOpacity=".28" />
    ))}
    <polyline points={`${nodes[7]} ${nodes[11]} ${nodes[8]} ${nodes[9]} ${nodes[3]}`} fill="none" stroke="hsl(var(--cy-signal))" strokeWidth="1.6" />
    {nodes.map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={[8, 9].includes(i) ? 5 : 3} fill={[7, 11, 8, 9, 3].includes(i) ? "hsl(var(--cy-signal))" : "hsl(var(--cy-text))"} fillOpacity={[7, 11, 8, 9, 3].includes(i) ? 1 : 0.55} />
    ))}
    <circle cx={nodes[9][0]} cy={nodes[9][1]} r="14" fill="none" stroke="hsl(var(--cy-signal))" className="cy-pulse" />
    <g fontFamily="ui-monospace, monospace" fontSize="10" fill="hsl(var(--cy-mute))" letterSpacing="1.5">
      <text x={nodes[9][0] + 22} y={nodes[9][1] - 8}>SIGNAL · REVIEW</text>
      <text x="40" y="505">EXPOSURE MAP</text>
      <text x="420" y="505">LAYER 03</text>
    </g>
  </svg>
);
