const l = 0.5
const w = 0.4
const z = 0.2
const d = 0.05

var triplePlane = [
    // vertical plane
    // 1. front side
    -w,-l,-z,   w,-l,-z,  w,-l+d,-z,   -w,-l+d,-z,
    -w,l,-z,   w,l,-z,   w,l-d,-z,  -w,l-d,-z,
    -w,-l,-z,  -w+d,-l,-z,  -w+d,l,-z,  -w,l,-z,
    w,-l,-z,  w-d,-l,-z,  w-d,l,-z,  w,l,-z,
    // 2. back side
    -w,-l,-z-d,   w,-l,-z-d,  w,-l+d,-z-d,   -w,-l+d,-z-d,
    -w,l,-z-d,   w,l,-z-d,   w,l-d,-z-d,  -w,l-d,-z-d,
    -w,-l,-z-d,  -w+d,-l,-z-d,  -w+d,l,-z-d,  -w,l,-z-d,
    w,-l,-z-d,  w-d,-l,-z-d,  w-d,l,-z-d,  w,l,-z-d,
    // 3. edge out side
    -w,-l,-z-d,  w,-l,-z-d,  w,-l,-z,  -w,-l,-z,
    -w,l,-z,  w,l,-z,  w,l,-z-d,  -w,l,-z-d,
    -w,-l,-z-d,  -w,-l,-z,  -w,l,-z,  -w,l,-z-d,
    w,-l,-z-d,  w,-l,-z,  w,l,-z,  w,l,-z-d,
    // 3. edge in side
    -w,-l+d,-z-d,  w,-l+d,-z-d,  w,-l+d,-z,  -w,-l+d,-z,
    -w,l-d,-z,  w,l-d,-z,  w,l-d,-z-d,  -w,l-d,-z-d,
    -w+d,-l,-z-d,  -w+d,-l,-z,  -w+d,l,-z,  -w+d,l,-z-d,
    w-d,-l,-z-d,  w-d,-l,-z,  w-d,l,-z,  w-d,l,-z-d,
];
