import chroma from "chroma-js";

const hexToOklchChroma = (hexColor: string): string => {
  try {
    const color = chroma(hexColor);
    const oklch = color.oklch();
    return `oklch(${oklch[0].toFixed(3)} ${oklch[1].toFixed(
      3
    )} ${oklch[2].toFixed(1)})`;
  } catch (error) {
    console.error("Error converting hex to OKLCH with chroma-js:", error);
    return hexColor;
  }
};

const getOklchValues = (
  hexColor: string
): { l: number; c: number; h: number } | null => {
  try {
    const color = chroma(hexColor);
    const oklch = color.oklch();
    return {
      l: oklch[0],
      c: oklch[1],
      h: oklch[2],
    };
  } catch (error) {
    console.error("Error getting OKLCH values:", error);
    return null;
  }
};

export const updatePrimaryColor = (hexColor: string) => {
  if (typeof window === "undefined") return;

  const oklchColor = hexToOklchChroma(hexColor);

  const oklchValues = getOklchValues(hexColor);
  const lightness = oklchValues?.l || 0.5;

  const root = document.documentElement;
  root.style.setProperty("--primary", oklchColor);
  root.style.setProperty("--ring", oklchColor);
  root.style.setProperty("--sidebar-primary", oklchColor);
  root.style.setProperty("--sidebar-ring", oklchColor);

  const isLight = lightness > 0.5;
  const foregroundColor = isLight
    ? "oklch(0.141 0.005 285.823)"
    : "oklch(0.98 0.016 73.684)";
  root.style.setProperty("--primary-foreground", foregroundColor);
  root.style.setProperty("--sidebar-primary-foreground", foregroundColor);
};
