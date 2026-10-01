$html = Get-Content -Raw -Encoding UTF8 "index.html"
$oldFont = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700;800;900&display=swap" rel="stylesheet">'
$newFont = '<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
$html = $html.Replace($oldFont, $newFont)
Set-Content -Value $html -Path "index.html" -Encoding UTF8

$cssAppend = @"

/* ==========================================================================
   EDITORIAL LIGHT THEME OVERRIDES (GOG COLLECTIVE)
   ========================================================================== */

:root {
  /* Soft, Creamy Bone White Background */
  --bg-main: #F7F5F0; 
  --bg-surface: #FFFFFF; 
  --bg-card: #FFFFFF; 
  --bg-card-hover: #F0EEE9;
  --bg-glass: rgba(255, 255, 255, 0.95);

  /* GogCollective Logo Rust Red */
  --color-red: #B53628;
  --color-red-hover: #962A1F;
  --color-red-dark: #6C1E14;
  --color-red-glow: rgba(181, 54, 40, 0.15);
  --color-red-soft: rgba(181, 54, 40, 0.08);

  /* Deep Charcoal text instead of white */
  --color-white: #171719; /* Primary text */
  --color-white-off: #3A3A40; /* Secondary text */

  /* Grays flipped for light mode borders and subtle elements */
  --color-gray-100: #171719;
  --color-gray-300: #3A3A40;
  --color-gray-400: #5C5C66;
  --color-gray-500: #888894;
  --color-gray-700: #CCCCCC;
  --color-gray-800: #E6E3DB;
  --color-gray-900: #F0EEE9;

  --border-subtle: #E6E3DB;
  --border-focus: #B53628;

  /* Editorial Retro-Serif Font */
  --font-heading: 'Fraunces', serif;
}

/* Base resets for light theme */
body {
  color: var(--color-white);
  background: var(--bg-main);
}

/* Ensure buttons keep white text where appropriate */
.btn-primary {
  color: #FFFFFF !important;
}

.btn-primary svg {
  stroke: #FFFFFF !important;
}

/* Outline buttons should use charcoal text */
.btn-outline {
  color: var(--color-white);
  border-color: var(--color-gray-800);
}
.btn-outline:hover {
  background: var(--color-gray-900);
}

/* Cards and UI Elements */
.media-card {
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
}
.media-card-img-wrapper {
  border-radius: 12px 12px 0 0;
}
.media-info {
  background: var(--bg-card);
  border-radius: 0 0 12px 12px;
}
.media-title {
  color: var(--color-white);
  font-weight: 700;
  font-family: var(--font-heading);
}
.media-desc {
  color: var(--color-gray-400);
}

/* Header & Nav */
.site-header {
  border-bottom: 1px solid var(--border-subtle) !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}
.nav-link {
  color: var(--color-white-off);
}
.nav-link:hover, .nav-link.active {
  color: var(--color-red);
}

/* Category Chips */
.chip {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--color-white-off);
  border-radius: 20px;
}
.chip.active {
  background: var(--color-red);
  color: #FFFFFF;
  border-color: var(--color-red);
}

/* Mobile Nav */
.bottom-nav {
  background: var(--bg-glass);
  border-top: 1px solid var(--border-subtle);
}
.bottom-nav-item {
  color: var(--color-gray-400);
}
.bottom-nav-item.active {
  color: var(--color-red);
}
.bottom-nav-add-btn {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--color-white);
}
.bottom-add-circle {
  background: var(--color-red);
  color: #FFFFFF;
}

/* Ambient Glow adjustments - make them soft peach/cream */
.bg-ambient-glow {
  background: radial-gradient(circle at top right, rgba(181, 54, 40, 0.08) 0%, transparent 60%);
}
.bg-ambient-glow-bottom {
  background: radial-gradient(circle at bottom left, rgba(181, 54, 40, 0.05) 0%, transparent 60%);
}

/* Modals */
.modal-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}
.modal-header h3 {
  color: var(--color-white);
}

/* Form inputs */
.form-control {
  background: var(--bg-main);
  border: 1px solid var(--border-subtle);
  color: var(--color-white);
}
.form-control:focus {
  border-color: var(--color-red);
  box-shadow: 0 0 0 4px var(--color-red-soft);
}

/* Hero Section */
.hero-title {
  font-family: var(--font-heading);
  color: var(--color-white);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.hero-desc {
  color: var(--color-white-off);
}
.hero-card {
  box-shadow: 0 20px 50px rgba(0,0,0,0.06);
}

"@

Add-Content -Path "css\style.css" -Value $cssAppend -Encoding UTF8
