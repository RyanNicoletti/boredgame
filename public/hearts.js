export function createHeartSVG(type) {
  const heartSVG = document.createElement("div");
  heartSVG.classList.add("heart");

  if (type === "half") {
    heartSVG.classList.add("heart-half");
  }
  heartSVG.innerHTML = heartTemplates[type];

  return heartSVG;
}

export const heartTemplates = {
  full: `
    <svg width="20" height="18" viewBox="0 0 16 14">
      <rect x="2" y="1" width="2" height="2" fill="#ff6b6b"/>
      <rect x="6" y="1" width="2" height="2" fill="#ff6b6b"/>
      <rect x="1" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="9" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="1" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="9" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="2" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="4" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="6" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="8" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="11" width="2" height="2" fill="#ff6b6b"/>
    </svg>
  `,
  half: `
    <svg width="20" height="18" viewBox="0 0 16 14">
      <rect x="2" y="1" width="2" height="2" fill="#ff6b6b"/>
      <rect x="6" y="1" width="2" height="2" fill="#ff6b6b"/>
      <rect x="1" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="9" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="1" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="9" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="2" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="4" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="6" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="8" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="11" width="2" height="2" fill="#ff6b6b"/>
    </svg>
  `,
  empty: `
    <svg width="20" height="18" viewBox="0 0 16 14" class="heart-empty">
      <rect x="2" y="1" width="2" height="2"/>
      <rect x="6" y="1" width="2" height="2"/>
      <rect x="1" y="3" width="2" height="2"/>
      <rect x="3" y="3" width="2" height="2"/>
      <rect x="5" y="3" width="2" height="2"/>
      <rect x="7" y="3" width="2" height="2"/>
      <rect x="9" y="3" width="2" height="2"/>
      <rect x="1" y="5" width="2" height="2"/>
      <rect x="3" y="5" width="2" height="2"/>
      <rect x="5" y="5" width="2" height="2"/>
      <rect x="7" y="5" width="2" height="2"/>
      <rect x="9" y="5" width="2" height="2"/>
      <rect x="2" y="7" width="2" height="2"/>
      <rect x="4" y="7" width="2" height="2"/>
      <rect x="6" y="7" width="2" height="2"/>
      <rect x="8" y="7" width="2" height="2"/>
      <rect x="3" y="9" width="2" height="2"/>
      <rect x="5" y="9" width="2" height="2"/>
      <rect x="7" y="9" width="2" height="2"/>
      <rect x="5" y="11" width="2" height="2"/>
    </svg>
  `,
};
