import * as THREE from "three";

const canvas = document.querySelector("#world");
const cues = [...document.querySelectorAll("[data-progress]")];
const equations = document.querySelector(".equations");
const prologueStage = document.querySelector(".prologue-stage");
const openingShot = document.querySelector(".opening-shot");
const decisionLines = [...document.querySelectorAll(".decision-stage p")];
const portugalIntro = document.querySelector(".portugal-intro");
const bubbleSentence = document.querySelector(".bubble-sentence");
const peopleLine = document.querySelector(".people-line");
const peopleContext = [...document.querySelectorAll(".people-context")];
const peopleWord = document.querySelector(".people-word");
const endingBubble = document.querySelector(".ending-bubble");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ink = new THREE.Color(0x191815);

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = value => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};
const range = (value, start, end) => smooth((value - start) / (end - start));
const smoother = value => {
  const x = clamp(value);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
// Stable hash, so hand-placed things look hand-placed but never move between loads.
const noise = (index, salt) => {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

// The people who appear as the world gets bigger use one shared scatter formula
// for all of them, so there's no visible seam between the ones that burst out
// of the bubble in color and the ones that follow.
const personColors = [
  0xc06c5b, 0x4f7895, 0x7c8f62, 0x9a6f8d, 0xd09a50, 0x4f8a83, 0xb45f73, 0x7086b5,
  0xa07b4f, 0x6c956f, 0xd17d61, 0x7e6ba8, 0x5d8fa8, 0xb99b45,
];
const personNodes = personColors.map((color, index) => ({
  id: `p${index + 1}`,
  type: "person",
  p: [(noise(index, 61) - .5) * 5.6, (noise(index, 62) - .5) * 5, (noise(index, 63) - .5) * 1.8],
  at: 1.58 + index * .016,
  color,
}));
const decisionDots = Array.from({ length: 12 }, (_, index) => {
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  // Fill the gap between Sindre and the wider scatter without putting any
  // colored sphere inside the black center.
  const radius = .24 + 2.35 * (index / 11) ** 1.35;
  return {
    id: `d${index + 1}`,
    type: "detail",
    p: [Math.cos(angle) * radius, Math.sin(angle) * radius, .12 + index * .007],
    at: 1.9,
    color: personColors[index % personColors.length],
  };
});

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xf2efe8, 11, 29);
const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, .1, 100);
camera.position.set(0, 0, 18);

const world = new THREE.Group();
scene.add(world);

const dotGeometry = new THREE.SphereGeometry(1, 20, 14);
const aiPlaneRotation = 1.2;
// Everything from AI onward hangs below the travel graph rather than back at origin.
const deep = -11;
// Recomputed every frame to hover above Sindre. The finance branch mirrors
// the math/data branch hanging below him.
const financeCenter = new THREE.Vector3();
const FINANCE_LIFT = 3.6;
const aiCenter = new THREE.Vector3(3.6, deep + .1, 0);
const collisionCenter = new THREE.Vector3();
const collisionShift = new THREE.Vector3();
const purposeCenter = new THREE.Vector3(.4, deep - 3.2, .2);
const collapsedSindrePosition = new THREE.Vector3(-1.5, deep - 1.2, .2);
const futureSindrePosition = new THREE.Vector3(-7.1, deep - 3.2, .2);
// The part of the graph that swings sideways into a branching timeline once we
// leave the cities behind.
const rotatePivotTypes = new Set(["self", "place", "person"]);

const rawNodes = [
  { id: "sindre", type: "self", p: [0, 0, 0], at: .12, label: "Sindre Veum", before: "My name is", after: "." },
  { id: "age", type: "trait", p: [-2.6, 1.9, .2], at: .34, label: "24", before: "I’m", after: "\u00a0years old," },
  { id: "positive", type: "trait", p: [2.4, 1.7, -.2], at: .4, label: "positive", before: "overly", after: "," },
  { id: "curious", type: "trait", p: [-3, .15, .55], at: .46, label: "curious", before: "chronically", after: "," },
  { id: "rational", type: "trait", p: [3, .1, -.55], at: .52, label: "rational", before: "at times maybe a little too", after: "." },
  { id: "financeTrait", type: "trait", p: [.2, -2.35, .3], at: .58, label: "financial theory", before: "Constantly thinking about everything from" },
  { id: "music", type: "trait", p: [2.45, -1.7, -.35], at: .64, label: "music", before: "to", after: "\u00a0theory." },
  ...personNodes,
  ...decisionDots,
  { id: "lisbon", type: "place", p: [0, -1.55, 0], at: 3, label: "Lisbon", color: 0xd18a52 },
  { id: "paris", type: "place", p: [0, -3.1, 0], at: 3.08, label: "Paris", color: 0x5d7fa8 },
  { id: "berlin", type: "place", p: [0, -4.65, 0], at: 3.16, label: "Berlin", color: 0x7c8f62 },

  // Current-path milestones arrive with the later reflection on work and study.
  { id: "zypp", type: "spring", offset: [1.2, .5, .2], at: 10, label: "Zypp", color: 0x4f8a83 },
  { id: "bi", type: "spring", offset: [-1, .75, -.25], at: 10.05, label: "BI", color: 0x5d7fa8 },
  { id: "norway", type: "spring", offset: [1.05, -.75, .35], at: 10.1, label: "Norway", color: 0xb45f73 },
  { id: "phd", type: "spring", offset: [-1.15, -.65, -.4], at: 10.15, label: "PhD?", color: 0x8f5fa8, grow: 1.55 },

  { id: "math", type: "idea", offset: [-1.1, -1.6, -.9], at: 5.12, label: "mathematics" },
  { id: "statistics", type: "idea", offset: [-.4, -2, .7], at: 5.22, label: "statistics" },
  { id: "data", type: "idea", offset: [.6, -1.5, -.4], at: 5.32, label: "data" },
  { id: "economics", type: "idea", offset: [-.9, -2.3, 1.1], at: 5.42, label: "economics" },
  // The finance branch grows up out of Sindre, mirroring the math/data
  // branch hanging below him.
  { id: "finance", type: "finance", offset: [.05, -.15, .4], at: 5.84, label: "finance" },
  { id: "prices", type: "finance", offset: [-1.25, -1.75, -.6], at: 6.2, label: "prices" },
  { id: "markets", type: "finance", offset: [.75, -2.35, .9], at: 6.17, label: "markets" },
  { id: "fear", type: "finance", offset: [-1.85, 1.35, -1.1], at: 6.34, label: "fear" },
  { id: "optimism", type: "finance", offset: [1.75, 1.55, .55], at: 6.37, label: "optimism" },
  { id: "models", type: "finance", offset: [-.15, 2.55, -.35], at: 6.22, label: "models" },
  { id: "conflicts", type: "finance", offset: [-2.25, -.45, 1.3], at: 6.4, label: "conflicts" },
  { id: "companies", type: "finance", offset: [2.15, -.65, -.85], at: 6.3, label: "companies" },
  // AI arrives and settles (and its label stays put) before its own
  // network of nodes swirls in around it, which finishes before it reaches
  // out to finance.
  { id: "ai", type: "ai", p: [3.6, -10.9, 0], at: 7.38, label: "AI", hold: 8.9 },
  { id: "tools", type: "ai", p: [3.02, -12.6, 1.49], at: 7.46, label: "tools" },
  { id: "memory", type: "ai", p: [3.89, -12.1, -.74], at: 7.5, label: "memory" },
  { id: "reasoning", type: "ai", p: [4.21, -9.5, -1.58], at: 7.52, label: "reasoning" },
  { id: "systems", type: "ai", p: [3.28, -9.2, .84], at: 7.54, label: "systems" },
  { id: "context", type: "ai", p: [4.1, -10.8, -1.3], at: 7.57, label: "context" },
  { id: "agents", type: "ai", p: [2.95, -10.8, 1.67], at: 7.6, label: "agents" },
  { id: "people", type: "hub", p: [0, -6.4, 0], at: 3.78 },
  { id: "purpose", type: "anchor", p: [.4, -14.2, .2], at: 10.46 },
  { id: "research", type: "future", p: [3, -16.15, .35], at: 10.93, label: "research" },
  { id: "industry", type: "future", p: [3.7, -14.2, -.8], at: 10.945, label: "industry" },
  { id: "build", type: "future", p: [3, -12.25, 1.25], at: 10.96, label: "build something" },
];

// No two nodes share a depth, even the ones that read as a flat 2D scatter,
// so a rotation always has real parallax to show, and nodes read at varied
// sizes under perspective instead of all sitting on one plane.
const spineIds = new Set(["sindre", "lisbon", "paris", "berlin"]);
{
  const seenZ = new Set();
  rawNodes.forEach((data, index) => {
    // Sindre/Lisbon/Paris/Berlin stay exactly colinear at x=0,z=0. That
    // line is the axis the rest of the graph later spins around.
    if (!data.p || spineIds.has(data.id)) return;
    let z = data.p[2];
    let nudge = 0;
    while (seenZ.has(+z.toFixed(3))) z = data.p[2] + (nudge += (noise(index, 41) - .5) * .16 + .06);
    seenZ.add(+z.toFixed(3));
    data.p[2] = z;
  });
}

const nodes = new Map();
const labelLayer = document.createElement("div");
labelLayer.className = "spatial-labels";
labelLayer.setAttribute("aria-hidden", "true");
document.body.append(labelLayer);

for (const [order, data] of rawNodes.entries()) {
  const material = new THREE.MeshBasicMaterial({
    color: data.color ?? ink,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const sprite = new THREE.Mesh(dotGeometry, material);
  if (data.p) sprite.position.fromArray(data.p);
  const typeSize = { self: .1, trait: .056, person: .085, detail: .085, place: .085, spring: .085, idea: .075, finance: .076, ai: .082, anchor: .11, future: .08, hub: .12 };
  const emphasis = ["finance", "ai", "research", "industry", "build"].includes(data.id) ? 1.3 : 1;
  const size = typeSize[data.type] * (data.grow ?? emphasis) * (.88 + order % 4 * .07);
  sprite.scale.setScalar(size);
  world.add(sprite);

  let label;
  if (data.label) {
    label = document.createElement("span");
    label.textContent = data.label;
    if (["self", "trait"].includes(data.type)) {
      label.className = "opening-word";
      label.dataset.node = data.id;
      label.dataset.before = data.before ?? "";
      label.dataset.after = data.after ?? "";
    }
    labelLayer.append(label);
  }
  nodes.set(data.id, {
    ...data,
    order,
    size,
    home: new THREE.Vector3(...(data.p ?? [0, 0, 0])),
    offset: data.offset && new THREE.Vector3(...data.offset),
    baseQuaternion: sprite.quaternion.clone(),
    interactionOffset: new THREE.Vector3(),
    interactionVelocity: new THREE.Vector3(),
    sprite,
    label,
  });
}

const rawEdges = [
  ["sindre", "lisbon", 3, false, false, .1], ["lisbon", "paris", 3.08, false, false, .1],
  ["paris", "berlin", 3.16, false, false, .1],

  ["sindre", "math", 5.16, false, false, .16], ["sindre", "statistics", 5.26, false, false, .16],
  ["sindre", "data", 5.36, false, false, .16], ["sindre", "economics", 5.46, false, false, .16],
  ["math", "statistics", 5.5, false, false, .18, .24], ["data", "economics", 5.56, false, false, .18, .24],
  ["data", "finance", 5.86],
  ["finance", "markets", 6.23], ["finance", "models", 6.29], ["finance", "prices", 6.35], ["finance", "companies", 6.41],
  ["finance", "fear", 6.42], ["finance", "optimism", 6.44], ["conflicts", "markets", 6.46], ["optimism", "models", 6.48],
  ["companies", "markets", 6.5], ["conflicts", "companies", 6.51], ["fear", "prices", 6.52], ["markets", "finance", 6.49, false, true],
  ["ai", "tools", 7.44], ["ai", "memory", 7.48], ["ai", "reasoning", 7.52], ["ai", "systems", 7.56],
  ["tools", "systems", 7.6], ["context", "reasoning", 7.64], ["agents", "tools", 7.68], ["context", "memory", 7.72],
  ["finance", "ai", 8.28, true], ["markets", "tools", 8.4, true], ["conflicts", "reasoning", 8.5, true],
  ["models", "reasoning", 8.34, true], ["prices", "memory", 8.38, true], ["companies", "agents", 8.42, true],
  ["fear", "context", 8.46, true], ["optimism", "systems", 8.5, true], ["data", "tools", 8.54, true],
  ["statistics", "memory", 8.58, true], ["economics", "context", 8.62, true],
  ["sindre", "purpose", 10.92, true, false, .08, .5],
  ["purpose", "research", 10.93, true, false, .05], ["purpose", "industry", 10.945, true, false, .05], ["purpose", "build", 10.96, true, false, .05],
];

const peopleIds = Array.from({ length: 14 }, (_, index) => `p${index + 1}`);
const cityIds = ["lisbon", "paris", "berlin"];
const springIds = ["zypp", "norway", "bi", "phd"];

// Each city sends roots down and out; later slots reach wider and drop
// further. Depth is thrown out even further than that, making a wide, dramatic
// spread front-to-back so the later spin around the spine has real 3D punch.
peopleIds.forEach((id, index) => {
  const slot = Math.floor(index / 3);
  const side = slot % 2 ? 1 : -1;
  const depthSide = noise(index, 7) > .5 ? 1 : -1;
  nodes.get(id).rootHome = new THREE.Vector3(
    side * (1.25 + slot * .58 + noise(index, 1) * .8) + (noise(index, 4) - .5) * .55,
    nodes.get(cityIds[index % 3]).home.y - .45 - noise(index, 2) * .95,
    depthSide * (1.3 + slot * .85 + noise(index, 3) * 1.3) + (noise(index, 8) - .5) * .6,
  );
});

// Cities take their turn one at a time. Lisbon's roots grow and bud first,
// then Paris starts as Lisbon settles, then Berlin as Paris settles, with each
// city overlapping the tail of the one before it so the reveal never stalls.
const ROOT_STAGGER = .035;
const ROOT_SPAN = .16;
const NODE_POP = .09;
const CITY_OVERLAP = .08;

let cityCursor = 3.05;
cityIds.forEach(city => {
  const members = peopleIds.filter((id, index) => cityIds[index % 3] === city);
  const start = cityCursor;
  members.forEach((id, slot) => {
    const node = nodes.get(id);
    node.rootAt = start + slot * ROOT_STAGGER;
    node.nodeAt = node.rootAt + ROOT_SPAN * .82;
    node.nodeReady = node.nodeAt + NODE_POP;
  });
  cityCursor = Math.max(...members.map(id => nodes.get(id).nodeReady)) - CITY_OVERLAP;
});

// Roots: drawn outward from the city, so they grow downward, each on its own
// clock instead of all at once.
rawEdges.push(...peopleIds.map((id, index) =>
  [cityIds[index % 3], id, nodes.get(id).rootAt, false, false, ROOT_SPAN, .3]));

// Lisbon experiences bleed into Paris and Berlin ones: each root reaches for its
// nearest neighbour under a different city, keeping one line per pair. These
// only reach out once both nodes they connect have actually budded in.
const crossPairs = [];
peopleIds.forEach((id, index) => {
  let best = null;
  peopleIds.forEach((otherId, other) => {
    if (other % 3 === index % 3) return;
    const gap = nodes.get(id).rootHome.distanceTo(nodes.get(otherId).rootHome);
    if (!best || gap < best.gap) best = { otherId, gap };
  });
  const key = [id, best.otherId].sort().join("-");
  if (!crossPairs.some(pair => pair.key === key)) crossPairs.push({ key, from: id, to: best.otherId });
});
rawEdges.push(...crossPairs.map((pair, index) => [
  pair.from, pair.to,
  Math.max(nodes.get(pair.from).nodeReady, nodes.get(pair.to).nodeReady) + index * .008,
  false, false, .14, .2,
]));

// Then the hub reaches every node still on screen, each thread taking its own
// time to grow out rather than snapping into place all at once. They finish
// before the spine spins, so their tips never swing while still growing.
const hubReachIds = ["sindre", ...cityIds, ...peopleIds];
const hubReachEdges = hubReachIds.map((id, index) =>
  ["people", id, 3.79 + index * .0025 + noise(index, 9) * .003, false, false, .1, .18]);
rawEdges.push(...hubReachEdges);
const hubGrowthDone = Math.max(...hubReachEdges.map(edge => edge[2] + edge[5]));

// Current milestones branch from Sindre when the letter reaches the present.
rawEdges.push(...springIds.map(id =>
  ["sindre", id, nodes.get(id).at, false, false, .18, .42]));

// A second strand a hair off to the side reads as one weighted line. WebGL
// ignores linewidth, so this is how every line in this piece gets its
// thickness (see the bubble below), and it keeps thin diagonal lines from
// aliasing away to nothing at some viewing angles.
const edges = rawEdges.map(([fromId, toId, at, cross = false, curved = false, span = 0, weight = 0]) => {
  const pointCount = curved ? 28 : 2;
  const makeStrand = () => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pointCount * 3), 3));
    const material = new THREE.LineBasicMaterial({
      color: nodes.get(toId).color ?? ink,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const line = new THREE.Line(geometry, material);
    // Endpoints move across the full story; their initial bounds go stale and
    // can otherwise cull a visible line after the camera has travelled.
    line.frustumCulled = false;
    world.add(line);
    return line;
  };
  const line = makeStrand();
  const line2 = makeStrand();
  return { from: nodes.get(fromId), to: nodes.get(toId), at, cross, curved, span, weight, pointCount, line, line2 };
});

// A glow travels along the wire itself as a bright stretch of the line
// sweeps from one end to the other and fades, rather than a separate dot
// riding on top of it. The line is built from many points colored per-vertex:
// mostly blended down to the page color (so it reads as bare thread) except
// right around the travelling position, which blends up toward a bright
// version of the edge's own color. That bright stretch is the "light".
const NEURON_CYCLE = 5.2;
const NEURON_TRAVEL = .82;
const NEURON_POINTS = 18;
const NEURON_WIDTH = .1;
const paperColor = new THREE.Color(0xf2efe8);
const neuronPulses = edges.map(edge => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(NEURON_POINTS * 3), 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(NEURON_POINTS * 3), 3));
  const material = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, depthWrite: false });
  const line = new THREE.Line(geometry, material);
  world.add(line);
  // Blending toward white for a colorful edge would just wash it out toward
  // the page color and vanish (this piece already runs pale-page/dark-ink,
  // there's no "brighter than the page" to reach), so full-strength saturated
  // color against the paper is what actually reads as a lit, high-contrast mark.
  const peakColor = new THREE.Color(edge.to.color ?? ink);
  return {
    edge,
    line,
    peakColor,
    // Staggered per-edge so pulses ripple across the graph rather than firing in lockstep.
    phase: (edge.from.order + edge.to.order) * .37 + noise(edge.from.order, edge.to.order) * NEURON_CYCLE,
    reverse: noise(edge.to.order, edge.from.order) > .5,
  };
});

const bubbleRadius = 2.4;
const bubble = new THREE.Group();
// Three strands a hair apart read as one weighted line; WebGL ignores linewidth.
const bubbleMaterials = [.985, 1, 1.015].map(spread => {
  const points = Array.from({ length: 128 }, (_, index) => {
    const angle = index / 128 * Math.PI * 2;
    return new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0).multiplyScalar(bubbleRadius * spread);
  });
  const material = new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0, depthWrite: false });
  bubble.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), material));
  return material;
});
world.add(bubble);

const particleCount = 180;
const particleBase = new Float32Array(particleCount * 3);
const particlePositions = new Float32Array(particleCount * 3);
for (let index = 0; index < particleCount; index++) {
  const t = index / particleCount * Math.PI * 10;
  const radius = 1.15 + (index % 17) * .035;
  const across = Math.sin(t * 1.7) * radius;
  const depth = Math.sin(t * .7) * .24;
  particleBase[index * 3] = 3.6 + across * .36 + depth * .93;
  particleBase[index * 3 + 1] = Math.cos(t * 2.1) * radius * .75;
  particleBase[index * 3 + 2] = across * -.93 + depth * .36;
}
particlePositions.set(particleBase);
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
const particleMaterial = new THREE.PointsMaterial({ color: ink, size: 2, transparent: true, opacity: 0, depthWrite: false, sizeAttenuation: false });
const particles = new THREE.Points(particleGeometry, particleMaterial);
world.add(particles);

function createSystemFrame(center, radii, rotationY) {
  const group = new THREE.Group();
  group.position.fromArray(center);
  group.rotation.y = rotationY;
  const baseQuaternion = group.quaternion.clone();
  const materials = [];
  const depth = .22;

  for (const z of [-depth, 0, depth]) {
    const points = Array.from({ length: 64 }, (_, index) => {
      const angle = index / 64 * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radii[0], Math.sin(angle) * radii[1], z);
    });
    const material = new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0, depthWrite: false });
    const contour = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), material);
    materials.push(material);
    group.add(contour);
  }

  const strutPoints = [];
  for (const angle of [0, Math.PI * .5, Math.PI, Math.PI * 1.5]) {
    const x = Math.cos(angle) * radii[0];
    const y = Math.sin(angle) * radii[1];
    strutPoints.push(new THREE.Vector3(x, y, -depth), new THREE.Vector3(x, y, depth));
  }
  const strutMaterial = new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0, depthWrite: false });
  group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(strutPoints), strutMaterial));
  materials.push(strutMaterial);
  world.add(group);
  return { group, materials, center: new THREE.Vector3(...center), baseQuaternion };
}

const systemFrames = {
  finance: createSystemFrame([0, 0, 0], [2.5, 2.05], 0),
  ai: createSystemFrame([3.6, .1, 0], [2.05, 2.1], aiPlaneRotation),
};

const cameraFrames = [
  { at: 0, p: [0, 0, 18], t: [0, 0, 0], view: 10 },
  { at: .45, p: [0, 0, 15], t: [0, 0, 0], view: 8.8 },
  { at: .95, p: [.1, .1, 14], t: [0, 0, 0], view: 8.6 },
  { at: 1.26, p: [0, .1, 13], t: [0, 0, 0], view: 8.4 },
  { at: 1.76, p: [0, .1, 13], t: [0, 0, 0], view: 8.4 },
  { at: 2.1, p: [0, .2, 15], t: [0, 0, 0], view: 10.5 },
  { at: 2.36, p: [0, .15, 13], t: [0, 0, 0], view: 2.93 },
  { at: 2.55, p: [0, .1, 11], t: [0, 0, 0], view: .98 },
  { at: 2.7, p: [0, .05, 9], t: [0, 0, 0], view: .35 },
  { at: 2.82, p: [0, 0, 7], t: [0, 0, 0], view: .147 },
  { at: 2.9, p: [0, 0, 6], t: [0, 0, 0], view: .07 },
  { at: 2.94, p: [0, 0, 6], t: [0, 0, 0], view: .07 },
  // Pulling back out. Roughly geometric so the dot shrinks at an even rate.
  { at: 2.955, p: [0, 0, 7], t: [0, 0, 0], view: .17 },
  { at: 2.97, p: [0, 0, 9], t: [0, 0, 0], view: .5 },
  { at: 2.98, p: [0, 0, 11], t: [0, 0, 0], view: 1.3 },
  { at: 2.99, p: [0, 0, 12], t: [0, -1.1, 0], view: 3.4 },
  { at: 3, p: [0, -2.1, 14], t: [0, -2.33, 0], view: 7.75 },
  { at: 3.38, p: [0, -2.15, 14], t: [0, -2.4, 0], view: 8.2 },
  { at: 3.86, p: [0, -5.2, 15], t: [0, -5.5, 0], view: 12.1 },
  { at: 4, p: [0, -7.5, 15], t: [0, -7.8, 0], view: 10.2 },
  { at: 5, p: [0, -9.2, 15], t: [0, -9.5, 0], view: 9.5 },
  { at: 5.84, p: [-5.2, -8, 13], t: [-5.8, -8.1, .2], view: 9.6 },
  { at: 6.8, p: [-9, -3.2, 11], t: [-9, -3.2, -1.2], view: 8.4, ease: true },
  { at: 7, p: [-9, -3.2, 11], t: [-9, -3.2, -1.2], view: 8.6 },
  { at: 7.58, p: [15.5, -11, 7.4], t: [4.2, -12.4, 0], view: 9.2, ease: true },
  { at: 8, p: [15.2, -10.9, 7.8], t: [3.6, -12.4, 0], view: 9.4 },
  { at: 8.88, p: [6.5, -4, 12.5], t: [-5.5, -9.8, 0], view: 15.2, roll: .04, ease: true },
  { at: 9, p: [15, -5, 9.5], t: [.1, -10.4, 0], view: 13.8, roll: -.02 },
  { at: 9.46, p: [2.5, -5.9, 15], t: [-4.8, -11.7, 0], view: 12.2, roll: .035 },
  { at: 9.82, p: [1, -5, 13], t: [.9, -10.2, 0], view: 10.8, roll: -.03 },
  { at: 10, p: [7, -7.5, 11], t: [-3.6, -12.5, 0], view: 12.6, roll: .02 },
  { at: 10.62, p: [-7, -12.2, 16], t: [-7, -12.2, 0], view: 11.8 },
  { at: 10.92, p: [-1.2, -14.2, 16], t: [-1.2, -14.2, 0], view: 11.5, ease: true },
  { at: 11, p: [-1.2, -13, 16], t: [-1.2, -13, 0], view: 11.5 },
  { at: 11.22, p: [0, -12, 18], t: [-1, -12.5, 0], view: 13.2, roll: .01 },
  { at: 11.48, p: [2, -10.5, 20], t: [-1, -10.5, 0], view: 10.5, roll: .02 },
  { at: 12.02, p: [9, -2, 25], t: [0, -11.5, 0], view: 24 },
  { at: 12.18, p: [0, -11, 28], t: [0, -11, 0], view: 29 },
];

let width = innerWidth;
let height = innerHeight;
let targetProgress = 0;
let progress = 0;
let raf = 0;
let cuePoints = [];
let keyboardCuePoints = [];
const pointer = new THREE.Vector2();
const pointerTarget = new THREE.Vector2();
const cameraTarget = new THREE.Vector3();
let keyboardTargetIndex = -1;
let keyboardScrollRaf = 0;
let pointerInside = false;
let activePointerId = null;
let draggedNode = null;
let lastInteractionTime = 0;
const graphDragOffset = new THREE.Vector3();
const dragStartOffset = new THREE.Vector3();
const dragStartPoint = new THREE.Vector3();
const dragPoint = new THREE.Vector3();
const dragPlane = new THREE.Plane();
const interactionRaycaster = new THREE.Raycaster();
const interactionWorldPosition = new THREE.Vector3();
const interactionDirection = new THREE.Vector3();
const cameraRight = new THREE.Vector3();
const cameraUp = new THREE.Vector3();
const inverseWorldQuaternion = new THREE.Quaternion();
const POINTER_RADIUS = 120;
const NODE_HIT_RADIUS = 20;

function graphInteraction(value = progress) {
  const rotationLife = Math.max(1 - range(value, 10.3, 10.58), range(value, 11.18, 11.48));
  return range(value, 8.88, 8.94) * rotationLife * (1 - range(value, 11.72, 12.02));
}

function rebuildCuePoints() {
  cuePoints = cues.map(element => {
    const bounds = element.getBoundingClientRect();
    return {
      element,
      y: bounds.top + scrollY + bounds.height * .5 - innerHeight * Number(element.dataset.screenY ?? .5),
      progress: Number(element.dataset.progress),
    };
  });
  keyboardCuePoints = cuePoints.filter(point => point.element.hasAttribute("data-key-step") || point.element.textContent.trim());
}

function storyProgress() {
  if (!cuePoints.length || scrollY <= cuePoints[0].y) return cuePoints[0]?.progress ?? 0;
  for (let index = 0; index < cuePoints.length - 1; index++) {
    const from = cuePoints[index];
    const to = cuePoints[index + 1];
    if (scrollY <= to.y) {
      const amount = clamp((scrollY - from.y) / (to.y - from.y));
      return THREE.MathUtils.lerp(from.progress, to.progress, amount);
    }
  }
  return cuePoints.at(-1).progress;
}

function catmull(p0, p1, p2, p3, amount) {
  const amount2 = amount * amount;
  const amount3 = amount2 * amount;
  return .5 * (
    2 * p1 +
    (-p0 + p2) * amount +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * amount2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * amount3
  );
}

function catmullVector(p0, p1, p2, p3, amount) {
  return new THREE.Vector3(
    catmull(p0[0], p1[0], p2[0], p3[0], amount),
    catmull(p0[1], p1[1], p2[1], p3[1], amount),
    catmull(p0[2], p1[2], p2[2], p3[2], amount),
  );
}

function interpolateFrames(value) {
  let frameIndex = cameraFrames.length - 2;
  for (let index = 0; index < cameraFrames.length - 1; index++) {
    if (value >= cameraFrames[index].at && value <= cameraFrames[index + 1].at) {
      frameIndex = index;
      break;
    }
  }
  const from = cameraFrames[frameIndex];
  const to = cameraFrames[frameIndex + 1];
  const linearAmount = clamp((value - from.at) / (to.at - from.at));
  // A spline between near-identical frames bows away and comes back instead
  // of holding still. Those few segments opt into a direct eased path.
  const spline = value >= 3 && value < 12.02 && !from.ease;
  const amount = spline ? linearAmount : smooth(linearAmount);
  const previous = frameIndex === 0 || from.at === 3 ? from : cameraFrames[frameIndex - 1];
  const next = cameraFrames[Math.min(frameIndex + 2, cameraFrames.length - 1)];
  return {
    position: spline
      ? catmullVector(previous.p, from.p, to.p, next.p, amount)
      : new THREE.Vector3(...from.p).lerp(new THREE.Vector3(...to.p), amount),
    target: spline
      ? catmullVector(previous.t, from.t, to.t, next.t, amount)
      : new THREE.Vector3(...from.t).lerp(new THREE.Vector3(...to.t), amount),
    view: spline
      ? Math.max(.07, catmull(previous.view, from.view, to.view, next.view, amount))
      : THREE.MathUtils.lerp(from.view, to.view, amount),
    roll: THREE.MathUtils.lerp(from.roll ?? 0, to.roll ?? 0, amount),
  };
}

function resize() {
  width = innerWidth;
  height = innerHeight;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  rebuildCuePoints();
}

function updateCamera() {
  const frame = interpolateFrames(progress);
  if (width < 720) {
    frame.view *= 1.32;
    if (progress >= 1 && progress < 5.6) {
      // Centre the dive, then hold a smaller offset for the whole descending graph.
      const dive = range(progress, 2.15, 2.4) * (1 - range(progress, 2.97, 3.02));
      const column = range(progress, 2.97, 3.02);
      frame.target.x -= 1.4 * (1 - dive - column) + .9 * column;
    }
    else {
      frame.target.y -= 2;
      if (progress > 10) frame.target.x = 0;
      if (progress > 10.8) {
        frame.target.y -= 1.8;
        frame.target.x = .45;
        frame.view *= 1.25;
      }
    }
  }
  camera.position.copy(reducedMotion
    ? new THREE.Vector3(frame.target.x, frame.target.y, 20)
    : frame.position);
  cameraTarget.copy(frame.target);
  camera.lookAt(cameraTarget);
  if (!reducedMotion) camera.rotateZ(frame.roll);
  const aspect = width / height;
  camera.left = -frame.view * aspect / 2;
  camera.right = frame.view * aspect / 2;
  camera.top = frame.view / 2;
  camera.bottom = -frame.view / 2;
  camera.updateProjectionMatrix();
}

function nodeOpacity(node) {
  const enter = range(progress, node.at, node.at + .26);
  const returning = range(progress, 11.18, 11.48);
  const finalFade = 1 - range(progress, 11.72, 12.02);
  if (node.type === "self" && progress < 1.3) {
    const clearForCopy = Math.max(1 - range(progress, .92, .95), range(progress, 1.14, 1.26));
    return range(progress, .26, .34) * clearForCopy;
  }
  if (node.type === "trait") {
    return range(progress, node.at - .045, node.at) * (1 - range(progress, .9, .94));
  }
  if (node.type === "detail") return range(progress, 1.9, 2.04) * (1 - range(progress, 2.9, 2.95));
  if (node.type === "self") return finalFade;
  if (node.type === "future") return range(progress, node.at, node.at + .025) * finalFade;
  if (node.type === "anchor") return 0;
  // Past this point in the story (once we've reached Lisbon/Paris/Berlin)
  // nothing fades back out or disappears on its own. Everything that's
  // formed stays visible until the final convergence at the very end.
  const afterConvergence = Math.max(1 - range(progress, 10.72, 11.02), returning) * finalFade;
  if (node.type === "hub") return range(progress, 3.78, 3.88) * afterConvergence;
  if (node.type === "finance" && progress > 7.25 && progress < 8.4) {
    return enter * (.08 + range(progress, 8.05, 8.4) * .92) * afterConvergence;
  }
  if (node.type === "person" && progress > 2.96) {
    // Back for the roots: each one buds in on its own city's turn, not all
    // at once, and then simply stays.
    const budded = node.nodeAt != null ? range(progress, node.nodeAt, node.nodeAt + NODE_POP) : range(progress, 3.42, 3.66);
    return enter * .55 * budded * afterConvergence;
  }
  return enter * afterConvergence;
}

function systemRotation(type) {
  if (type === "finance") {
    const turn = range(progress, 6.12, 6.88) * .14 + range(progress, 7.76, 8.62) * .5;
    return new THREE.Quaternion().setFromEuler(new THREE.Euler(turn * .28, turn, -turn * .18));
  }
  const turn = range(progress, 7.32, 7.9) * -.1 + range(progress, 7.72, 8.62) * -.42;
  return new THREE.Quaternion().setFromEuler(new THREE.Euler(turn * -.35, turn, turn * .14));
}

function formation(node) {
  if (node.type === "person") return { amount: 1, source: node.home };
  if (node.type === "spring") {
    return { amount: range(progress, node.at, node.at + .22), source: nodes.get("sindre").sprite.position };
  }
  if (node.type === "idea") {
    // The people/travel branch is done. These grow out of Sindre himself,
    // the way the springs grew out of the hub.
    return { amount: range(progress, node.at, node.at + .22), source: nodes.get("sindre").sprite.position };
  }
  if (node.type === "finance") {
    return {
      amount: range(progress, node.at - .1, node.at + .28),
      source: node.id === "finance" ? nodes.get("data").home : financeCenter,
    };
  }
  if (node.type === "ai") {
    return { amount: range(progress, node.at - .12, node.at + .28), source: aiCenter };
  }
  if (node.type === "future") {
    return { amount: range(progress, node.at - .02, node.at + .04), source: purposeCenter };
  }
  const travel = { lisbon: ["sindre", 3, 3.1], paris: ["lisbon", 3.08, 3.18], berlin: ["paris", 3.16, 3.26] }[node.id];
  if (travel) {
    const [previous, from, to] = travel;
    return { amount: range(progress, from, to), source: nodes.get(previous).home };
  }
  return { amount: 1, source: node.home };
}

function convergence(node) {
  if (["self", "anchor", "future"].includes(node.type)) return 0;
  const stagger = node.order % 6 * .018;
  const collapseAt = node.type === "spring" ? 10.42 : 9.98;
  const collapseEnd = node.type === "spring" ? 10.62 : 10.52;
  const firstCollapse = range(progress, collapseAt + stagger, collapseEnd + stagger) * (1 - range(progress, 11.18, 11.48));
  const finalCollapse = range(progress, 11.72 + stagger * .25, 12.02);
  return Math.max(firstCollapse, finalCollapse);
}

const hubRaycaster = new THREE.Raycaster();
const hubPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const hubPoint = new THREE.Vector3();
const pivotBeforeSpin = new THREE.Vector3();
const pivotAfterSpin = new THREE.Vector3();
const baseWorldRotation = new THREE.Euler();

// The hub sits just under the word, wherever the line happens to have wrapped.
function placeHub(node) {
  // Track the word until the lines are out, then keep the spot for good.
  if (progress < 3.4 || progress > 3.96 || targetProgress > 3.96) return;
  const rect = peopleWord.getBoundingClientRect();
  if (!rect.width) return;
  const x = (rect.left + rect.width / 2) / width * 2 - 1;
  const y = -((rect.bottom + Math.min(rect.height * .85, 44)) / height * 2 - 1);
  hubRaycaster.setFromCamera({ x, y }, camera);
  if (hubRaycaster.ray.intersectPlane(hubPlane, hubPoint)) {
    node.home.copy(hubPoint).sub(world.position);
    node.sprite.position.copy(node.home);
  }
}

function updateNodes(time) {
  const hub = nodes.get("people");
  placeHub(hub);

  const sindre = nodes.get("sindre");
  const rotationLife = Math.max(1 - range(progress, 10.3, 10.58), range(progress, 11.18, 11.48));
  const interactive = graphInteraction();
  const livingTurn = interactive * (reducedMotion ? 0 : 1);
  const finalTurnLife = range(progress, 8.88, 9.02) * (1 - range(progress, 10.2, 10.62));
  // Give the three responsibility beats distinct multi-axis views, then return
  // to the existing orientation before the next section.
  const finalSpin = new THREE.Vector3(
    140 * range(progress, 8.88, 9) + 160 * range(progress, 9, 9.46) + 120 * range(progress, 9.46, 9.82) - 60 * range(progress, 9.82, 10),
    60 * range(progress, 8.88, 9) + 55 * range(progress, 9, 9.46) + 100 * range(progress, 9.46, 9.82) + 145 * range(progress, 9.82, 10),
    100 * range(progress, 8.88, 9) + 70 * range(progress, 9, 9.46) + 130 * range(progress, 9.46, 9.82) + 60 * range(progress, 9.82, 10),
  ).multiplyScalar(THREE.MathUtils.DEG2RAD * (reducedMotion ? 0 : 1));
  const finalTravel = range(progress, 8.88, 10.05) * Math.PI * 2;
  const baseZ = range(progress, 8.05, 8.88) * .34;
  const livingZ = Math.sin(time * .00012) * .14 * livingTurn;
  const livingY = Math.sin(time * .000085) * .09 * livingTurn;
  world.rotation.x = THREE.MathUtils.euclideanModulo(finalSpin.x, Math.PI * 2);
  world.rotation.z = (baseZ + THREE.MathUtils.euclideanModulo(finalSpin.z, Math.PI * 2) + livingZ) * rotationLife;
  world.rotation.y = THREE.MathUtils.euclideanModulo(finalSpin.y, Math.PI * 2) + livingY;
  world.position.set(
    Math.sin(finalTravel) * 1.1 * finalTurnLife * (reducedMotion ? 0 : 1),
    Math.sin(finalTravel * 1.45) * .75 * finalTurnLife * (reducedMotion ? 0 : 1),
    0,
  );
  // Keep the camera's focal point fixed while the late-story rotation turns,
  // instead of orbiting the graph around the distant world origin.
  baseWorldRotation.set(0, livingY, (baseZ + livingZ) * rotationLife);
  pivotBeforeSpin.copy(cameraTarget).applyEuler(baseWorldRotation);
  pivotAfterSpin.copy(cameraTarget).applyEuler(world.rotation);
  world.position.add(pivotBeforeSpin).sub(pivotAfterSpin);
  pointer.lerp(pointerTarget, .16);
  for (const node of nodes.values()) {
    if (node.offset) {
      const anchor = ["idea", "spring"].includes(node.type) ? sindre.sprite.position : node.type === "finance" ? financeCenter : hub.home;
      node.home.copy(anchor).add(node.offset);
    }
    const formed = formation(node);
    node.sprite.position.lerpVectors(formed.source, node.home, formed.amount);

    if (node.type === "trait") {
      const orbit = Math.max(0, progress - node.at - .13) * .85;
      node.sprite.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), orbit);
      node.sprite.position.z += Math.sin(orbit * 1.7 + node.order) * .24;
      const absorbed = range(progress, .84 + node.order % 3 * .006, .92 + node.order % 3 * .006);
      const tangent = new THREE.Vector3(-node.sprite.position.y, node.sprite.position.x, 0).normalize();
      node.sprite.position.lerp(nodes.get("sindre").home, absorbed);
      node.sprite.position.addScaledVector(tangent, Math.sin(absorbed * Math.PI) * .32);
      if (width < 720) node.sprite.position.x *= .42;
      node.sprite.quaternion.copy(node.baseQuaternion);
    } else if (["finance", "ai"].includes(node.type)) {
      const center = node.type === "finance" ? financeCenter : aiCenter;
      const rotation = systemRotation(node.type);
      node.sprite.position.sub(center).applyQuaternion(rotation).add(center);
      node.sprite.quaternion.copy(node.baseQuaternion).premultiply(rotation);
      const alive = range(progress, node.at, node.at + .3) * (1 - range(progress, 10.1, 10.5));
      node.sprite.position.x += Math.sin(progress * 2.1 + node.order * 1.7) * .035 * alive;
      node.sprite.position.z += Math.cos(progress * 1.8 + node.order * 1.3) * .05 * alive;
      collisionCenter.copy(financeCenter).lerp(aiCenter, .5);
      collisionShift.copy(collisionCenter).sub(center);
      node.sprite.position.addScaledVector(collisionShift, range(progress, 8.05, 8.62));
    } else {
      node.sprite.quaternion.copy(node.baseQuaternion);
    }

    if (node.rootHome) node.sprite.position.lerp(node.rootHome, range(progress, node.rootAt, node.rootAt + ROOT_SPAN));

    // The moment the hub settles, the whole travel graph pivots around it:
    // the column that hung straight down from Sindre swings sideways into a
    // branching timeline, with Sindre ending up off to one side, done and
    // settled before the present-day text even arrives.
    if (rotatePivotTypes.has(node.type)) {
      const pivot = hub.home;
      const flip = range(progress, 3.96, 3.995) * (Math.PI / 2);
      // Sindre, Lisbon, Paris and Berlin all sit on one line through the
      // hub. That line is the spine everything else turns around, so the
      // spine itself holds still while the roots sweep around it in 3D.
      const spineAxis = new THREE.Vector3(0, 0, 0).sub(pivot);
      if (flip) {
        spineAxis.set(
          spineAxis.x * Math.cos(flip) - spineAxis.y * Math.sin(flip),
          spineAxis.x * Math.sin(flip) + spineAxis.y * Math.cos(flip),
          spineAxis.z,
        );
      }
      spineAxis.normalize();

      if (flip) {
        const delta = node.sprite.position.clone().sub(pivot);
        delta.set(
          delta.x * Math.cos(flip) - delta.y * Math.sin(flip),
          delta.x * Math.sin(flip) + delta.y * Math.cos(flip),
          delta.z,
        );
        node.sprite.position.copy(pivot).add(delta);
      }
      // The spin around the spine itself is given a much longer, gentler
      // window than the flip, spread out instead of packed into the same
      // instant, so connections visibly sweep through their turn rather
      // than snapping past the eye and appearing to blink out. The camera's
      // hand-tuned keyframes from progress 4.5 onward assume this is done,
      // don't push its end past 4.3 without also re-checking those frames.
      const spin = range(progress, 3.96, 4.3) * (Math.PI / 2) * .9;
      if (spin) {
        const delta = node.sprite.position.clone().sub(pivot);
        delta.applyAxisAngle(spineAxis, spin);
        node.sprite.position.copy(pivot).add(delta);
      }
      // A second, slower turn once we're back at Lisbon for "the funny thing
      // is...": the roots keep turning around the (stationary) spine as the
      // page scrolls, so Lisbon never drifts out from under the camera.
      const turn = range(progress, 5, 5.84) * .65;
      if (turn) {
        const delta = node.sprite.position.clone().sub(pivot);
        delta.applyAxisAngle(spineAxis, turn);
        node.sprite.position.copy(pivot).add(delta);
      }
    }

    if (node.id === "sindre") {
      const returning = range(progress, 11.18, 11.48);
      node.sprite.position.lerp(collapsedSindrePosition, range(progress, 9.98, 10.58) * (1 - returning));
      const departure = range(progress, 10.62, 10.9) * (1 - returning);
      node.sprite.position.lerp(futureSindrePosition, departure);
      financeCenter.set(node.sprite.position.x, node.sprite.position.y + FINANCE_LIFT, node.sprite.position.z);
    }

    const merging = convergence(node);
    if (merging) {
      const destination = nodes.get("sindre").sprite.position;
      const direction = node.sprite.position.clone().sub(destination);
      const tangent = new THREE.Vector3(-direction.y, direction.x, direction.z * .2).normalize();
      node.sprite.position.lerp(destination, merging);
      node.sprite.position.addScaledVector(tangent, Math.sin(merging * Math.PI) * .28);
    }

    if (!reducedMotion && interactive) {
      const drift = time * .00018 + node.order * 1.7;
      node.sprite.position.x += Math.sin(drift) * .035 * interactive;
      node.sprite.position.y += Math.cos(drift * .83) * .032 * interactive;
      node.sprite.position.z += Math.sin(drift * .61) * .04 * interactive;
    }

    const opacity = nodeOpacity(node);
    const strength = node.type === "self"
      ? 1
      : ["future", "anchor", "trait", "hub", "spring"].includes(node.type) ? .84 : ["person", "detail"].includes(node.type) && progress < 2.2 ? .95 : .66;
    const signal = interactive * Math.max(0, Math.sin(time * .00055 - node.order * .42)) ** 18;
    node.sprite.material.opacity = Math.min(1, opacity * strength + signal * .18);
    const activePulse = ["finance", "ai"].includes(node.type)
      ? 1 + Math.sin(progress * 2.2 + node.order) * .02 * range(progress, node.at, node.at + .4)
      : 1;
    const birth = range(progress, node.at, node.at + .18);
    const birthPulse = node.type === "person" ? .25 + birth * .75 + Math.sin(birth * Math.PI) * .28 : 1;
    // The city roots grow steadily from the tips of their lines.
    const rootPop = node.type === "person" && node.nodeAt != null && progress > 2.9
      ? THREE.MathUtils.lerp(.2, 1, range(progress, node.nodeAt, node.nodeAt + NODE_POP))
      : 1;
    const gapYearScale = node.id === "sindre"
      ? 1 - range(progress, 1.16, 1.26) * (1 - range(progress, 1.68, 1.76)) * .38
      : 1;
    node.sprite.scale.setScalar(node.size * activePulse * birthPulse * rootPop * gapYearScale * (1 - merging) * (1 + signal * .08));
  }
  updateGraphInteraction(time, interactive);
}

function updateGraphInteraction(time, amount) {
  const elapsed = lastInteractionTime ? (time - lastInteractionTime) / 16.67 : 1;
  const step = clamp(elapsed, .25, 2);
  lastInteractionTime = time;
  document.body.classList.toggle("graph-interactive", amount > .5);
  world.position.addScaledVector(graphDragOffset, amount);
  world.getWorldQuaternion(inverseWorldQuaternion).invert();
  cameraRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
  cameraUp.set(0, 1, 0).applyQuaternion(camera.quaternion);

  for (const node of nodes.values()) {
    const offset = node.interactionOffset;
    const velocity = node.interactionVelocity;
    if (node !== draggedNode) {
      velocity.addScaledVector(offset, -.035 * step);
      velocity.multiplyScalar(Math.pow(.86, step));
      if (amount && !reducedMotion && pointerInside && activePointerId == null && node.sprite.material.opacity > .04) {
        node.sprite.getWorldPosition(interactionWorldPosition).project(camera);
        const dx = (interactionWorldPosition.x - pointer.x) * width / 2;
        const dy = (interactionWorldPosition.y - pointer.y) * height / 2;
        const distance = Math.hypot(dx, dy);
        if (distance > 1 && distance < POINTER_RADIUS) {
          const influence = (1 - distance / POINTER_RADIUS) ** 2;
          interactionDirection.copy(cameraRight).multiplyScalar(dx / distance)
            .addScaledVector(cameraUp, dy / distance)
            .applyQuaternion(inverseWorldQuaternion);
          velocity.addScaledVector(interactionDirection, .022 * influence * amount * step);
        }
      }
      offset.addScaledVector(velocity, step).clampLength(0, 1.1);
      if (offset.lengthSq() < 1e-7 && velocity.lengthSq() < 1e-7) {
        offset.set(0, 0, 0);
        velocity.set(0, 0, 0);
      }
    } else {
      velocity.set(0, 0, 0);
    }
    node.sprite.position.addScaledVector(offset, amount);
  }
}

function updateSystemFrames() {
  const returning = range(progress, 11.18, 11.48);
  const firstCollapse = range(progress, 9.98, 10.56) * (1 - returning);
  const finalCollapse = range(progress, 11.72, 12.02);
  const merging = Math.max(firstCollapse, finalCollapse);
  const visible = Math.max(1 - range(progress, 10.72, 11.02), returning) * (1 - finalCollapse);
  const collision = range(progress, 8.05, 8.62);
  const financeRelevance = progress < 7.25 ? 1 : .16 + collision * .84;
  const financeOpacity = range(progress, 6.16, 6.62) * financeRelevance * visible;
  const aiOpacity = range(progress, 7.3, 7.76) * visible;

  for (const [type, frame] of Object.entries(systemFrames)) {
    const rotation = systemRotation(type);
    const center = type === "finance" ? financeCenter : aiCenter;
    collisionCenter.copy(financeCenter).lerp(aiCenter, .5);
    frame.group.position.copy(center).lerp(collisionCenter, collision).lerp(nodes.get("sindre").sprite.position, merging);
    frame.group.quaternion.copy(frame.baseQuaternion).premultiply(rotation);
    frame.group.scale.setScalar(THREE.MathUtils.lerp(1, .06, merging));
  }

  systemFrames.finance.materials.forEach((material, index) => {
    material.opacity = financeOpacity * (index === 1 ? .105 : .045);
  });
  systemFrames.ai.materials.forEach((material, index) => {
    material.opacity = aiOpacity * (index === 1 ? .105 : .045);
  });
}

const edgeThickness = .01;
// The view height cameraFrames were tuned against (see `view: 10` at progress 0).
// edgeOffset is scaled relative to this so it holds a constant on-screen width.
const referenceView = 10;
const cameraForward = new THREE.Vector3();
const edgeDirection = new THREE.Vector3();
const edgeOffset = new THREE.Vector3();

function updateEdges(time) {
  camera.getWorldDirection(cameraForward);
  const interactive = graphInteraction();
  for (const edge of edges) {
    const span = edge.span || (edge.cross ? .42 : .25);
    const amount = range(progress, edge.at, edge.at + span);
    // Lines shouldn't fade in at full length. They should read as visibly
    // growing out of their start node. So opacity reaches full quickly while
    // the line itself keeps lengthening for the rest of the span.
    const reveal = range(progress, edge.at, edge.at + span * .3);
    const futureEdge = (edge.from.id === "sindre" && edge.to.type === "anchor") || edge.from.type === "anchor";
    const from = edge.from.sprite.position;
    const to = edge.to.sprite.position;
    // A second strand offset perpendicular to both the line and the camera,
    // so it reads as thickness on screen regardless of the line's own angle.
    // The ortho camera's `view` (frustum height) swings from .07 to 16 across
    // the piece, so a fixed world-space offset either vanishes (zoomed out)
    // or splits into two visibly separate lines (zoomed in), so scale it by
    // the current view so it stays a constant on-screen width, and split it
    // evenly either side of the true path instead of shifting the whole line.
    edgeDirection.subVectors(to, from);
    edgeOffset.crossVectors(edgeDirection, cameraForward);
    const viewScale = (camera.top - camera.bottom) / referenceView;
    if (edgeOffset.lengthSq() > 1e-6) edgeOffset.normalize().multiplyScalar(edgeThickness * viewScale * .5);
    const positions = edge.line.geometry.attributes.position;
    const positions2 = edge.line2.geometry.attributes.position;
    if (edge.curved) {
      const midpoint = from.clone().lerp(to, .5).add(new THREE.Vector3(1.2, 1.4, 1.8));
      const curve = new THREE.QuadraticBezierCurve3(from, midpoint, to);
      for (let index = 0; index < edge.pointCount; index++) {
        const point = curve.getPoint((index / (edge.pointCount - 1)) * amount);
        positions.setXYZ(index, point.x - edgeOffset.x, point.y - edgeOffset.y, point.z - edgeOffset.z);
        positions2.setXYZ(index, point.x + edgeOffset.x, point.y + edgeOffset.y, point.z + edgeOffset.z);
      }
    } else {
      const end = from.clone().lerp(to, amount);
      positions.setXYZ(0, from.x - edgeOffset.x, from.y - edgeOffset.y, from.z - edgeOffset.z);
      positions.setXYZ(1, end.x - edgeOffset.x, end.y - edgeOffset.y, end.z - edgeOffset.z);
      positions2.setXYZ(0, from.x + edgeOffset.x, from.y + edgeOffset.y, from.z + edgeOffset.z);
      positions2.setXYZ(1, end.x + edgeOffset.x, end.y + edgeOffset.y, end.z + edgeOffset.z);
    }
    positions.needsUpdate = true;
    positions2.needsUpdate = true;
    // Once a connection has grown in, it stays at its assigned strength.
    const strength = futureEdge ? .68 : edge.cross ? .52 : edge.weight || (edge.span ? .62 : .28);
    const opacity = reveal * strength;
    edge.line.material.opacity = opacity;
    edge.line2.material.opacity = opacity;
  }
  updateNeuronPulses(time, interactive);
}

const neuronPointColor = new THREE.Color();
const neuronMidpoint = new THREE.Vector3();

function updateNeuronPulses(time, interactive) {
  if (!interactive) {
    for (const pulse of neuronPulses) pulse.line.material.opacity = 0;
    return;
  }
  for (const pulse of neuronPulses) {
    const { edge, line, peakColor } = pulse;
    const span = edge.span || (edge.cross ? .42 : .25);
    // Only glow along connections that have actually finished growing in.
    if (range(progress, edge.at, edge.at + span) < 1) {
      line.material.opacity = 0;
      continue;
    }
    const localTime = (((time / 1000 + pulse.phase) % NEURON_CYCLE) + NEURON_CYCLE) % NEURON_CYCLE;
    if (localTime > NEURON_TRAVEL) {
      line.material.opacity = 0;
      continue;
    }
    const travel = localTime / NEURON_TRAVEL;
    const t = pulse.reverse ? 1 - travel : travel;
    const from = edge.from.sprite.position;
    const to = edge.to.sprite.position;
    let curve = null;
    if (edge.curved) {
      neuronMidpoint.copy(from).lerp(to, .5).add(new THREE.Vector3(1.2, 1.4, 1.8));
      curve = new THREE.QuadraticBezierCurve3(from, neuronMidpoint.clone(), to);
    }
    const positions = line.geometry.attributes.position;
    const colors = line.geometry.attributes.color;
    for (let index = 0; index < NEURON_POINTS; index++) {
      const s = index / (NEURON_POINTS - 1);
      const point = curve ? curve.getPoint(s) : from.clone().lerp(to, s);
      positions.setXYZ(index, point.x, point.y, point.z);
      // A narrow Gaussian around the travelling position is bright there, blended
      // down to the page color everywhere else, so the thread itself stays
      // near-invisible and only the moving stretch reads as lit.
      const brightness = Math.exp(-((s - t) ** 2) / (2 * NEURON_WIDTH * NEURON_WIDTH));
      neuronPointColor.copy(paperColor).lerp(peakColor, brightness);
      colors.setXYZ(index, neuronPointColor.r, neuronPointColor.g, neuronPointColor.b);
    }
    positions.needsUpdate = true;
    colors.needsUpdate = true;
    // A soft in/out fade at the ends of the travel window, layered on the per-point glow above.
    line.material.opacity = Math.sin(travel * Math.PI) * interactive * .32;
  }
}

function updateBubble() {
  const forming = range(progress, .92, 1.24);
  // The bubble doesn't shatter into pieces. Its circumference simply rushes
  // outward past the edges of the screen, then is gone, and the people dots
  // appear on their own right after (no lingering fragments in between).
  const burst = range(progress, 1.34, 1.68);
  const goneOffscreen = 1 - range(progress, 1.58, 1.7);
  for (const material of bubbleMaterials) material.opacity = forming * goneOffscreen * .5;
  const formedScale = THREE.MathUtils.lerp(.03, 1, Math.pow(forming, .72));
  const explodeScale = THREE.MathUtils.lerp(1, 40, burst);
  bubble.scale.setScalar(formedScale * explodeScale);
  bubble.rotation.set(0, forming * .1, forming * -.07);
}

function updateParticles(time) {
  const appear = range(progress, 7.12, 7.24);
  const disappear = 1 - range(progress, 7.62, 7.96);
  particleMaterial.opacity = appear * disappear * .56;
  const motion = reducedMotion ? 0 : time * .00018;
  const structure = range(progress, 7.46, 7.88);
  const aiTargets = [...nodes.values()].filter(node => node.type === "ai");
  for (let index = 0; index < particleCount; index++) {
    const offset = index * 3;
    const target = aiTargets[index % aiTargets.length].sprite.position;
    const scatter = ((index * 37) % 23) / 23 - .5;
    particlePositions[offset] = THREE.MathUtils.lerp(particleBase[offset] + Math.sin(motion + index) * .06, target.x + scatter * .45, structure);
    particlePositions[offset + 1] = THREE.MathUtils.lerp(particleBase[offset + 1] + Math.cos(motion * 1.3 + index) * .05, target.y + scatter * .35, structure);
    particlePositions[offset + 2] = THREE.MathUtils.lerp(particleBase[offset + 2], target.z + scatter * .3, structure);
  }
  particleGeometry.attributes.position.needsUpdate = true;
}

function updateLabels() {
  const projected = new THREE.Vector3();
  for (const node of nodes.values()) {
    if (!node.label) continue;
    const futureLabel = node.type === "future" && progress >= node.at - .08 && progress < 12.02;
    const heldLabel = node.hold && progress >= node.at && progress < node.hold;
    const springLabel = node.type === "spring" && progress >= node.at && progress < node.at + .6;
    const ideaLabel = node.type === "idea" && progress >= node.at && progress < 6.2;
    const financeLabel = node.type === "finance" && progress >= node.at && progress < 7.05;
    const collisionLabel = ["finance", "ai"].includes(node.id) && progress >= 8.05 && progress < 8.9;
    const relevant = node.type === "self" || (progress >= node.at && progress < node.at + .28) || futureLabel || heldLabel || springLabel || ideaLabel || financeLabel || collisionLabel;
    const openingName = node.id === "sindre" && progress < 1.3;
    const openingTrait = node.type === "trait" && progress < 1.1;
    const opacity = openingName
      ? range(progress, .17, .24) * Math.max(1 - range(progress, .92, .95), range(progress, 1.14, 1.26))
      : openingTrait
        ? range(progress, node.at - .045, node.at) * (1 - range(progress, .9, .94))
        : nodeOpacity(node) * (relevant ? 1 : 0);
    if (openingName) node.label.style.setProperty("--phrase-context", 1 - range(progress, .3, .4));
    if (openingTrait) node.label.style.setProperty("--phrase-context", 1 - range(progress, node.at + .05, node.at + .13));
    node.sprite.getWorldPosition(projected).project(camera);
    const diveFade = node.id === "sindre" && progress >= 1.06
      ? Math.max(1 - range(progress, 1.04, 1.1), range(progress, 3.02, 3.3))
      : 1;
    node.label.style.opacity = opacity * (openingName || openingTrait ? 1 : .68) * diveFade;
    const x = (projected.x * .5 + .5) * width;
    const y = (-projected.y * .5 + .5) * height;
    node.label.style.transform = (openingName || openingTrait)
      ? `translate3d(${x}px, ${y - 8}px, 0) translate(-50%, -100%)`
      : `translate3d(${x + 8}px, ${y - 2}px, 0)`;
  }
}

function updateOpeningText() {
  // Keyed to raw scroll, not story progress: progress stays pinned at 0 for
  // this whole section (the first cue point sits at its very bottom), so a
  // progress-based fade would only ever complete right as the sticky stage
  // is already releasing and scrolling away. Scroll-based timing finishes
  // the fade while it's still pinned, so it's gone before any motion.
  // The prologue section is 125svh with a 100svh sticky stage, so it starts
  // releasing (scrolling away normally) once scrollY passes 25svh. The
  // fade must be fully done well before that point.
  const prologueExit = range(scrollY, 0, height * .16);
  prologueStage.style.opacity = 1 - prologueExit;

  openingShot.style.opacity = range(progress, .975, .98) * (1 - range(progress, 1, 1.02));
}

// The dive: each line lands a beat deeper inside the dot, which reads as paper through the words.
const decisionBeats = [
  { in: [2.04, 2.12], out: [2.26, 2.34], scale: [1, 0, 2.12, 2.34] },
  { in: [2.3, 2.37], out: [2.48, 2.55], scale: [1, .08, 2.34, 2.55] },
  { in: [2.5, 2.56], out: [2.63, 2.68], scale: [.96, .1, 2.5, 2.68] },
  { in: [2.645, 2.7], out: [2.755, 2.8], scale: [.96, .1, 2.645, 2.8] },
  { in: [2.77, 2.82], out: [2.86, 2.89], scale: [.96, .12, 2.77, 2.89] },
  // Last beat: holds its size and simply fades away, rather than riding the
  // camera's zoom-out back to a node. That coupling made it shrink and drift
  // as the dot behind it moved, instead of reading as a clean fade. Fully
  // faded by 2.935, just before the sticky stage below releases (~2.95),
  // otherwise the tail of the fade rides along with the page's own scroll.
  { in: [2.885, 2.9], out: [2.9, 2.935], scale: [.96, 0, 2.885, 2.9] },
];

function updateDecision() {
  const view = camera.top - camera.bottom;
  const dotRadius = nodes.get("sindre").size / view * height;
  decisionBeats.forEach((beat, index) => {
    const line = decisionLines[index];
    if (!line) return;
    const scale = beat.scale[0] + range(progress, beat.scale[2], beat.scale[3]) * beat.scale[1];
    line.style.opacity = range(progress, ...beat.in) * (1 - range(progress, ...beat.out));
    line.style.transform = `translate(-50%, -50%) scale(${scale})`;
    line.style.setProperty("--dot", `${dotRadius / scale}px`);
  });
}

function updateEditorialLayers() {
  portugalIntro.style.opacity = range(progress, 1.015, 1.04);
  equations.style.opacity = range(progress, 3.44, 3.54) * (1 - range(progress, 3.7, 3.8));
  // Fully faded by 3.98. The sticky "people" stage un-pins around progress
  // 3.99, so finishing the fade before that keeps it a clean fade in place
  // instead of the tail end scrolling away while still visible.
  peopleLine.style.opacity = range(progress, 3.7, 3.78) * (1 - range(progress, 3.95, 3.98));
  const stripped = 1 - range(progress, 3.9, 3.96);
  for (const context of peopleContext) context.style.opacity = stripped;
  bubbleSentence.style.opacity = 1 - range(progress, 1.58, 1.7);
  updateDecision();
  const decisionFocus = range(progress, 2.02, 2.1) * (1 - range(progress, 2.94, 3.02));
  const closingFocus = range(progress, 11.18, 11.48) * (1 - range(progress, 11.72, 12.02)) * .42;
  canvas.style.opacity = THREE.MathUtils.lerp(reducedMotion ? .72 : .58, 1, Math.max(decisionFocus, closingFocus));
  const endingGrowth = range(progress, 11.9, 12.18);
  endingBubble.style.opacity = range(progress, 11.9, 12) * (1 - range(progress, 12.14, 12.18)) * .72;
  endingBubble.style.transform = `translate(-50%, -50%) scale(${.45 + endingGrowth * 1.35})`;
}

function render(time = 0) {
  progress += (targetProgress - progress) * (reducedMotion ? 1 : .06);
  updateCamera();
  updateNodes(time);
  updateSystemFrames();
  updateEdges(time);
  updateBubble();
  updateParticles(time);
  updateOpeningText();
  updateLabels();
  updateEditorialLayers();
  renderer.render(scene, camera);
  const livingGraph = progress > 7.12 && progress < 11.9;
  if (Math.abs(targetProgress - progress) > .001 || (!reducedMotion && livingGraph)) raf = requestAnimationFrame(render);
  else raf = 0;
}

function requestRender() {
  const nextProgress = storyProgress();
  targetProgress = nextProgress;
  if (!raf) raf = requestAnimationFrame(render);
}

function moveByCue(direction) {
  if (keyboardTargetIndex < 0) {
    const edge = scrollY + direction * 6;
    if (direction > 0) keyboardTargetIndex = keyboardCuePoints.findIndex(point => point.y > edge);
    else {
      for (let index = keyboardCuePoints.length - 1; index >= 0; index--) {
        if (keyboardCuePoints[index].y < edge) {
          keyboardTargetIndex = index;
          break;
        }
      }
    }
  } else {
    keyboardTargetIndex = clamp(keyboardTargetIndex + direction, 0, keyboardCuePoints.length - 1);
  }
  const destination = keyboardTargetIndex < 0 ? (direction > 0 ? document.documentElement.scrollHeight - height : 0) : keyboardCuePoints[keyboardTargetIndex].y;
  const targetY = clamp(destination ?? 0, 0, document.documentElement.scrollHeight - height);
  if (keyboardScrollRaf) cancelAnimationFrame(keyboardScrollRaf);
  if (reducedMotion) {
    scrollTo({ top: targetY, behavior: "instant" });
    return;
  }
  const startY = scrollY;
  const distance = targetY - startY;
  const duration = clamp(Math.abs(distance) * .75, 700, 1400);
  const startedAt = performance.now();
  const step = now => {
    const amount = smoother((now - startedAt) / duration);
    scrollTo({ top: startY + distance * amount, behavior: "instant" });
    if (amount < 1) keyboardScrollRaf = requestAnimationFrame(step);
    else keyboardScrollRaf = 0;
  };
  keyboardScrollRaf = requestAnimationFrame(step);
}

addEventListener("resize", () => { resize(); requestRender(); });
addEventListener("scroll", requestRender, { passive: true });
const cancelKeyboardScroll = () => {
  keyboardTargetIndex = -1;
  if (keyboardScrollRaf) cancelAnimationFrame(keyboardScrollRaf);
  keyboardScrollRaf = 0;
};
addEventListener("wheel", cancelKeyboardScroll, { passive: true });
addEventListener("touchstart", cancelKeyboardScroll, { passive: true });
addEventListener("keydown", event => {
  if (event.defaultPrevented || event.repeat || /input|textarea|select/i.test(event.target.tagName) || event.target.isContentEditable) return;
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  event.preventDefault();
  moveByCue(event.key === "ArrowRight" ? 1 : -1);
});

function setPointer(event) {
  pointerTarget.set(event.clientX / width * 2 - 1, 1 - event.clientY / height * 2);
  pointerInside = true;
}

function pickNode() {
  let nearest = null;
  let nearestDistance = NODE_HIT_RADIUS;
  for (const node of nodes.values()) {
    if (node.sprite.material.opacity < .08 || node.type === "anchor") continue;
    node.sprite.getWorldPosition(interactionWorldPosition).project(camera);
    if (interactionWorldPosition.z < -1 || interactionWorldPosition.z > 1) continue;
    const distance = Math.hypot(
      (interactionWorldPosition.x - pointerTarget.x) * width / 2,
      (interactionWorldPosition.y - pointerTarget.y) * height / 2,
    );
    if (distance < nearestDistance) {
      nearest = node;
      nearestDistance = distance;
    }
  }
  return nearest;
}

function pointOnDragPlane(target = dragPoint) {
  interactionRaycaster.setFromCamera(pointerTarget, camera);
  return interactionRaycaster.ray.intersectPlane(dragPlane, target);
}

addEventListener("pointerdown", event => {
  cancelKeyboardScroll();
  if (event.button !== 0 || graphInteraction() < .5) return;
  setPointer(event);
  activePointerId = event.pointerId;
  draggedNode = pickNode();
  dragStartOffset.copy(draggedNode ? draggedNode.interactionOffset : graphDragOffset);
  if (draggedNode) draggedNode.sprite.getWorldPosition(interactionWorldPosition);
  else interactionWorldPosition.copy(cameraTarget);
  camera.getWorldDirection(interactionDirection);
  dragPlane.setFromNormalAndCoplanarPoint(interactionDirection, interactionWorldPosition);
  pointOnDragPlane(dragStartPoint);
  document.body.classList.add("graph-dragging");
  canvas.setPointerCapture?.(event.pointerId);
  event.preventDefault();
}, { passive: false });

addEventListener("pointermove", event => {
  setPointer(event);
  if (event.pointerId === activePointerId && pointOnDragPlane()) {
    interactionDirection.copy(dragPoint).sub(dragStartPoint);
    if (draggedNode) {
      interactionDirection.applyQuaternion(inverseWorldQuaternion);
      draggedNode.interactionOffset.copy(dragStartOffset).add(interactionDirection).clampLength(0, 2.4);
    } else {
      graphDragOffset.copy(dragStartOffset).add(interactionDirection);
    }
    event.preventDefault();
  }
  requestRender();
}, { passive: false });

const endDrag = event => {
  if (event.pointerId !== activePointerId) return;
  activePointerId = null;
  draggedNode = null;
  document.body.classList.remove("graph-dragging");
  canvas.releasePointerCapture?.(event.pointerId);
  requestRender();
};
addEventListener("pointerup", endDrag);
addEventListener("pointercancel", endDrag);
addEventListener("pointerleave", () => {
  if (activePointerId == null) pointerInside = false;
  requestRender();
});
resize();
requestRender();

console.assert(rawEdges.every(([from, to]) => nodes.has(from) && nodes.has(to)), "Every edge must connect existing nodes");
console.assert(hubGrowthDone < 3.96 && cameraFrames.every((frame, index) => !index || frame.at > cameraFrames[index - 1].at), "Animation handoffs must stay ordered");
console.assert(interpolateFrames(6.9).position.distanceTo(new THREE.Vector3(-9, -3.2, 11)) < .001, "Camera holds must not bow between matching keyframes");
console.assert(cues.every((cue, index) => !index || Number(cue.dataset.progress) > Number(cues[index - 1].dataset.progress)), "Story cues must stay ordered");
console.assert(POINTER_RADIUS < Math.min(innerWidth, innerHeight) / 2, "Pointer interaction must stay local");
