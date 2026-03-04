# Ananas (اناناس) — Comprehensive Design Guide

> Derived from the **Ananas Branding** assets — a Thmanyah product for employee performance evaluation.
> This guide covers the complete visual identity, component patterns, and design system for the Ananas platform.

---

## 1. Brand Overview

**Ananas (اناناس)** is a performance evaluation and review platform under the Thmanyah umbrella. It enables leaders (القائد) and employees (الموظف) to conduct periodic performance reviews (التقييم الدوري), track evaluation criteria, and share structured feedback.

The platform serves two primary user roles:
- **Leaders / Managers (القائد):** Conduct evaluations, rate criteria, provide written feedback
- **Employees (الموظف):** View their evaluation results, review past assessments, read manager comments

**Design Philosophy:**
- Clean, minimal, and professional — the UI stays out of the way so evaluation content takes center stage
- RTL-first Arabic interface with warm, approachable aesthetics
- Color-coded rating system for instant visual comprehension
- Generous whitespace and clear information hierarchy

---

## 2. Logo & Brand Mark

### 2.1 Thmanyah Icon
- The Thmanyah geometric icon (◆) appears at the **top-right** corner of every page in the web application
- Black icon on white/light backgrounds
- Acts as the primary brand identifier and home navigation anchor

### 2.2 Placement
- Top-right corner (RTL layout), consistently positioned across all views
- Adequate clear space around the icon — never crowded by navigation or content
- The icon is rendered at approximately 28–32px in height

---

## 3. Color Palette

All colors extracted directly from the Ananas Branding `Colors.png` asset. The palette supports both light and dark modes.

### 3.1 Primary Palette

| Name | Hex | Usage |
|---|---|---|
| **Bold Black** | `#FFFFFF` text on `#000000` bg | Primary dark surfaces, high-contrast text |
| **White** | `#000000` text on `#FFFFFF` bg | Page backgrounds, cards, clean surfaces |
| **Prime Orange** | `#EF4632` | Primary brand accent, active states, key CTAs |

### 3.2 Secondary Palette

| Name | Hex | Usage |
|---|---|---|
| **Blue** | `#006BFF` | Links, interactive elements, informational highlights |
| **Maron (Maroon)** | `#000000` (deep dark) | Deep accent, critical-level indicators |
| **Fucshia** | `#FF0D85` | Bold decorative accent, attention highlights |
| **Gold** | `#FFB8D0` | Warm accent (note: appears as a rich yellow-gold `#FFB8D0` in the swatch) |
| **Violet** | `#CBCDE4` | Soft decorative accent, subtle tags |
| **Rosa (Pink)** | `#FFA0C6` | Soft feminine accent, light badges |
| **Sea** | `#82DBE6` | Cool informational accent, aqua tones |
| **Taupe** | `#E6D0AD` | Warm neutral accent, earthy tones |

### 3.3 Semantic Colors (Rating System)

These are the critical colors that drive the evaluation rating UI:

| Rating Level (Arabic) | Rating Level (English) | Color | Approximate Hex | Visual |
|---|---|---|---|---|
| **فخر** (Fakhr) | Pride / Excellent | Dark Green | `#0D7544` | Darkest green — top tier |
| **خضر** (Khudhr) | Green / Good | Bright Green | `#00BC60` | Vibrant green — positive |
| **صفر** (Sufr) | Yellow / Average | Yellow | `#FFD04A` | Bright yellow — needs attention |
| **حمر** (Humr) | Red / Below Average | Coral Red | `#FF8C68` → `#F24935` | Warm red — concerning |
| **خطر** (Khatar) | Danger / Critical | Dark Maroon | `#8B1A1A` → `#302525` | Deep burgundy-maroon — critical |

### 3.4 Semantic Color Usage in Evaluation States

The rating colors appear in three distinct UI contexts:

**1. Selection Buttons (Pill-shaped):**
- Active state: filled with the rating color, white text
- Inactive state: gray/neutral `#D0D0D0` background, dark text
- Each pill has an icon indicator (radio dot for حمر, star for فخر, warning for خطر)

**2. Status Bars (Full-width rounded bars):**
- Each rating level is shown as a full-width rounded rectangle
- Colors: Dark Green → Bright Green → Yellow → Coral Red → Dark Maroon
- White centered text with emoji icon
- `border-radius: 12px`

**3. Row Highlights (Evaluation question rows):**
- Each evaluation question row gets a tinted background matching its rating
- فخر: light green tint `~#E8F5E9`
- خضر: lighter green tint `~#E8F5E9`
- صفر: light yellow tint `~#FFF9E0`
- حمر: light pink/red tint `~#FDECEA`
- خطر: light coral tint `~#FDECEA` with orange-red border accent

### 3.5 Neutral - Medium (N50 Variants)

| Name | Hex | Usage |
|---|---|---|
| **Violet N50** | `#E3D0EF` | Light violet tint |
| **Rosa N50** | `#FFCTD9` | Light pink tint |
| **Yellow N50** | `#FDE797` | Light yellow tint |
| **Coral N50** | `#FFB79D` | Light coral tint |
| **Green N50** | `#A9E4B6` | Light green tint |
| **Sea N50** | `#ADE4EB` | Light aqua tint |
| **Taupe N50** | `#F2EEE4` | Light taupe tint |
| **Night N50** | `#424360` | Medium dark purple-gray |

### 3.6 Neutral - Light

| Name | Hex | Usage |
|---|---|---|
| **Cool Grey** | `#F4EEE8` | Subtle warm background |
| **Taupe N20** | `#F7F5EE` | Very light warm surface |
| **Taupe N10** | `#FDFCFC` | Near-white warm surface |
| **Sea N20** | `#CFEEF2` | Very light aqua background |
| **Coral N20** | `#FFDDC2` | Very light coral background |

### 3.7 Neutral - Dark

| Name | Hex | Usage |
|---|---|---|
| **Blacky Likey** | `#1A1A3A` | Primary dark background |
| **Dark Night** | `#1D1E2A` | Deep dark surface |
| **Night** | `#272939` | Dark card surface |
| **Burgundy** | `#302525` | Dark warm accent background |

### 3.8 Transparent Colors

| Name | Value | Usage |
|---|---|---|
| **Black T0** | `#FFFFFF - 0%` | Fully transparent white |
| **Black T12** | `#FFFFFF - 12%` | Subtle white overlay |
| **White T0** | `#000000 - 0%` | Fully transparent black |
| **White T12** | `#000000 - 12%` | Subtle dark overlay |

---

## 4. Typography

### 4.1 Font Families

Ananas uses the same Thmanyah custom font families available in the `Usable/` directory:

| Font Family | Files | Purpose |
|---|---|---|
| **Thmanyah Serif Display** | `Thmanyahserifdisplay12-*.otf` | Page titles, section headings, hero text |
| **Thmanyah Serif Text** | `Thmanyahseriftext12-*.otf` | Body text, notes, long-form feedback content |
| **Thmanyah Sans** | `Thmanyahsans12-*.otf` | UI labels, buttons, form elements, navigation, data |

### 4.2 Available Weights

| Weight | CSS Value | File Suffix |
|---|---|---|
| Light | `300` | `-Light` |
| Regular | `400` | `-Regular` / `-Reg` |
| Medium | `500` | `-Medium` |
| Bold | `700` | `-Bold` |
| Black | `900` | `-Black` |

### 4.3 Font Usage Hierarchy (Ananas-Specific)

| Element | Font Family | Weight | Size | Example |
|---|---|---|---|---|
| **Page Title** | Serif Display | Bold | 28–32px | `تقييمك العام` / `تقييم عام` |
| **Section Heading** | Serif Display | Bold | 22–26px | `التعليقات العامة` / `المعايير العامة` |
| **Report Header (A4)** | Serif Display | Black | 36–48px | `التقييم الدوري` |
| **Subsection Title** | Sans | Bold | 16–18px | `كيف حقق التوقعات؟` |
| **Evaluation Question** | Sans | Bold | 15–16px | `كيف حس المبادرة؟` |
| **Body / Notes Text** | Serif Text | Regular | 14–16px | Feedback paragraphs |
| **Form Labels** | Sans | Medium | 13–14px | `الملاحظات :` / `اكتب هنا` |
| **Rating Pill Text** | Sans | Bold | 13–14px | `فخر` / `خضر` / `حمر` |
| **Navigation Links** | Sans | Medium | 14px | `مرحبا` / `صفحتي` / `خروج` |
| **Footer Text** | Sans | Regular | 12px | `جميع الحقوق محفوظة...` |
| **Breadcrumb / Meta** | Sans | Regular | 13px | `تقييم جديد / يعرب مصطفى / الربع الثالث 2025` |
| **Descriptor Text** | Sans | Regular | 12–13px | Sub-criteria options like `أداؤه يعرقل سير العمل` |

### 4.4 Numeral System

**Western Arabic (English) numerals** — `0 1 2 3 4 5 6 7 8 9`

All numeric content (years, quarters, counts) uses Western Arabic numerals:
- Dates: `2025`, `الربع الثالث 2025`
- Copyright: `© 2022`

### 4.5 CSS @font-face Setup

```css
/* Headlines — Thmanyah Serif Display */
@font-face {
  font-family: 'Thmanyah Serif Display';
  src: url('./Usable/Thmanyahserifdisplay12-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Serif Display';
  src: url('./Usable/Thmanyahserifdisplay12-Reg.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Serif Display';
  src: url('./Usable/Thmanyahserifdisplay12-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Serif Display';
  src: url('./Usable/Thmanyahserifdisplay12-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Serif Display';
  src: url('./Usable/Thmanyahserifdisplay12-Black.otf') format('opentype');
  font-weight: 900;
  font-style: normal;
}

/* Body Text — Thmanyah Serif Text */
@font-face {
  font-family: 'Thmanyah Serif Text';
  src: url('./Usable/Thmanyahseriftext12-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Serif Text';
  src: url('./Usable/Thmanyahseriftext12-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Serif Text';
  src: url('./Usable/Thmanyahseriftext12-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Serif Text';
  src: url('./Usable/Thmanyahseriftext12-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Serif Text';
  src: url('./Usable/Thmanyahseriftext12-Black.otf') format('opentype');
  font-weight: 900;
  font-style: normal;
}

/* Digital / UI — Thmanyah Sans */
@font-face {
  font-family: 'Thmanyah Sans';
  src: url('./Usable/Thmanyahsans12-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Sans';
  src: url('./Usable/Thmanyahsans12-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Sans';
  src: url('./Usable/Thmanyahsans12-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Sans';
  src: url('./Usable/Thmanyahsans12-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Thmanyah Sans';
  src: url('./Usable/Thmanyahsans12-Black.otf') format('opentype');
  font-weight: 900;
  font-style: normal;
}
```

---

## 5. CSS Design Tokens

```css
:root {
  /* ── Primary ── */
  --ananas-black: #000000;
  --ananas-white: #FFFFFF;
  --ananas-prime-orange: #EF4632;

  /* ── Secondary ── */
  --ananas-blue: #006BFF;
  --ananas-maroon: #000000;
  --ananas-fuchsia: #FF0D85;
  --ananas-gold: #FFB8D0;
  --ananas-violet: #CBCDE4;
  --ananas-rosa: #FFA0C6;
  --ananas-sea: #82DBE6;
  --ananas-taupe: #E6D0AD;

  /* ── Semantic / Rating ── */
  --rating-pride: #0D7544;       /* فخر — Pride / Excellent */
  --rating-green: #00BC60;       /* خضر — Green / Good */
  --rating-yellow: #FFD04A;      /* صفر — Yellow / Average */
  --rating-red: #F24935;         /* حمر — Red / Below Average */
  --rating-danger: #8B1A1A;      /* خطر — Danger / Critical */

  /* ── Semantic Rating Tints (Row Backgrounds) ── */
  --rating-pride-tint: #E8F5E9;
  --rating-green-tint: #E8F5E9;
  --rating-yellow-tint: #FFF9E0;
  --rating-red-tint: #FDECEA;
  --rating-danger-tint: #FDECEA;

  /* ── Neutral Medium (N50) ── */
  --ananas-violet-n50: #E3D0EF;
  --ananas-rosa-n50: #FFCTD9;
  --ananas-yellow-n50: #FDE797;
  --ananas-coral-n50: #FFB79D;
  --ananas-green-n50: #A9E4B6;
  --ananas-sea-n50: #ADE4EB;
  --ananas-taupe-n50: #F2EEE4;
  --ananas-night-n50: #424360;

  /* ── Neutral Light ── */
  --ananas-cool-grey: #F4EEE8;
  --ananas-taupe-n20: #F7F5EE;
  --ananas-taupe-n10: #FDFCFC;
  --ananas-sea-n20: #CFEEF2;
  --ananas-coral-n20: #FFDDC2;

  /* ── Neutral Dark ── */
  --ananas-blacky-likey: #1A1A3A;
  --ananas-dark-night: #1D1E2A;
  --ananas-night: #272939;
  --ananas-burgundy: #302525;

  /* ── Typography ── */
  --font-display: 'Thmanyah Serif Display', 'Georgia', serif;
  --font-body: 'Thmanyah Serif Text', 'Georgia', serif;
  --font-ui: 'Thmanyah Sans', 'Segoe UI', 'Helvetica Neue', sans-serif;

  /* ── Spacing (8px grid) ── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* ── Border Radius ── */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* ── Shadows ── */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.06);
}
```

---

## 6. Layout & Navigation

### 6.1 Global Layout Direction

- **RTL (Right-to-Left)** is the primary and only layout direction
- Set `dir="rtl"` and `lang="ar"` on the root HTML element
- All content flows right-to-left
- Navigation items align to the right

### 6.2 Top Navigation Bar

```
┌───────────────────────────────────────────────────────────────┐
│  مرحبا 👋 أيوب المطيري    👤 صفحتي    📋 خروج      ◆ [Logo] │
└───────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#FFFFFF` (white) with no visible border — clean separation via whitespace
- Height: ~56–64px
- Logo (Thmanyah icon ◆): top-right, black, ~28px
- Navigation links: top-left (in RTL), Sans Medium 14px, black text
- Greeting pattern: `مرحبا 👋 [User Name]` — warm, personal
- Links: `صفحتي` (My Page), `خروج` (Logout)
- Minimal, no background color on nav — blends with page

### 6.3 Page Background

- Primary page background: `#FFFFFF` (pure white) or `#FAFAFA` (near-white)
- Very clean, minimal — no colored backgrounds behind main content
- Content width is centered, max-width ~900–1000px for web reports

### 6.4 Footer

```
جميع الحقوق محفوظة لشركة ثمانية للنشر والتوزيع © 2022
```

- Centered text, Sans Regular 12px, light gray color
- Simple copyright line, no decorative elements

---

## 7. Component Design Patterns

### 7.1 Page Title Block

Every page starts with a prominent title using an icon + Serif Display Bold text:

```
            📋 تقييمك العام
```

**Specifications:**
- Font: Thmanyah Serif Display, Bold, 28–32px
- Color: `#000000` (black)
- Alignment: center
- Icon: relevant emoji or line icon to the right of text (RTL)
- Spacing: 48px top margin, 32px bottom margin

### 7.2 Rating Pill Selector (Core Component)

The primary interaction component for selecting evaluation ratings. Five options in a horizontal row:

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⑥ كيف تقيم درب الموظف بشكل عام ؟                                      │
│                                                                         │
│  [فخر ⭐]  [خضر ◉]  [صفر ◉]  [حمر 🔴]  [خطر 🔒]                       │
│                                                                         │
│  اختيار الدرب يعني دخول الموظف مباشرة إلى المستوصف 🏥               │
│  مما يؤدي إلى تأجيل استحقاق العلاوات أو الترقيات...                    │
└─────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Container: white background, `border-radius: 16px`, subtle shadow
- Pills: `border-radius: 9999px` (full pill shape), ~48px height
- Inactive pills: `#D4D4D4` gray background, dark text
- Active pill (حمر selected): filled with coral red `#EF4632`, white text, slightly elevated
- Active pill (خطر selected): filled with dark burgundy `#5A1A1A`, white text
- Question text: Sans Bold, 16px, black, right-aligned
- Question number: circled numeral (e.g., ⑥), black
- Warning text (for خطر): Sans Regular, 14px, red-tinted text below pills
- Spacing: 16px between pills, 24px padding inside container

### 7.3 Rating Status Bars (Processed View)

Full-width horizontal bars showing each rating level:

```
╭──────────────────────────────────────────╮
│              فخر 🏅                       │  bg: #0D7544 (dark green)
╰──────────────────────────────────────────╯

╭──────────────────────────────────────────╮
│              خضر 🚀                      │  bg: #00BC60 (bright green)
╰──────────────────────────────────────────╯

╭──────────────────────────────────────────╮
│              صفر 🏗                       │  bg: #FFD04A (yellow)
╰──────────────────────────────────────────╯

╭──────────────────────────────────────────╮
│              خطر 🔒                      │  bg: #E84B3A (coral red)
╰──────────────────────────────────────────╯

╭──────────────────────────────────────────╮
│              حمر 🚨                      │  bg: #8B1A1A (dark maroon)
╰──────────────────────────────────────────╯
```

**Specifications:**
- Width: ~85% of container
- Height: ~56px
- `border-radius: 12px`
- Text: white, Sans Bold, 16px, centered
- Each bar includes a small emoji icon
- Vertical spacing between bars: 24px
- Outer container: white card with large rounded corners `border-radius: 24px`

### 7.4 Evaluation Question Row (with Rating Indicator)

Each evaluation criteria in a report is displayed as a row with a colored badge:

```
┌─────────────────────────────────────────────────────────────┐
│ ●●●●● حمر                          كيف حقق التوقعات؟       │  bg: #FDECEA (pink tint)
│                                                             │
│ الملاحظات: أنجز كل المستهدفات وتجاوز التوقعات...             │
│                                                             │
│ ○ لم يحقق التوقعات إطلاقاً    ○ غائب عن الهدف...            │
│ ○ أداؤه يعرقل سير العمل        ○ غائب عن الهدف...           │
╰─────────────────────────────────────────────────────────────╯
```

**Specifications:**
- Row background: tinted with the rating color (very light wash)
  - Green ratings: `#E8F5E9` light green
  - Yellow ratings: `#FFF9E0` light yellow
  - Red ratings: `#FDECEA` light pink
- Rating badge: small colored pill on the right side, matching rating color
- Circle indicators: filled circles (●) in the rating color, showing the score level (1-5 scale)
- Question text: Sans Bold, 15px, black, right-aligned
- Notes text: Sans Regular, 13px, gray
- Sub-criteria options: Sans Regular, 12–13px, in a grid layout (2 columns)
- Row padding: 16–20px
- Row separator: 12px vertical gap between rows
- `border-radius: 12px` on each row

### 7.5 Traffic Light Rating Dots

A visual scale using colored dots for 1–5 scoring:

```
● ● ● ● ●   حمر    (all 5 dots filled = red rating shown)
● ● ● ● ○           (4 dots filled)
● ● ● ○ ○           (3 dots filled)
● ● ○ ○ ○           (2 dots filled)
● ○ ○ ○ ○           (1 dot filled)
```

**Color mapping for dots:**
- فخر (5/5): Dark green `#0D7544` dots
- خضر (4/5): Green `#00BC60` dots
- صفر (3/5): Yellow `#FFD04A` dots
- حمر (2/5): Red `#F24935` dots
- خطر (1/5): Dark maroon `#8B1A1A` dots

**Specifications:**
- Dot size: 12px diameter
- Spacing between dots: 4px
- Filled dots: solid color
- Empty dots: `#D0D0D0` light gray or outlined

### 7.6 Section Header

Sections are introduced with an icon + bold title + optional metadata:

```
📋 تقييمك العام
📋 تقييم قيادتك
💬 التعليقات العامة
ℹ️ المعايير العامة
📋 تقييم قياداتك
```

**Specifications:**
- Icon: line icon or emoji, 20–24px
- Title: Serif Display Bold, 22–26px, black
- Underline: none (clean, no decorative lines)
- Bottom margin: 24px

### 7.7 Evaluation Period Header (Report View)

```
┌─────────────────────────────────────────────────┐
│  📋 التقييم الدوري    الربع الثالث 2025          │
│                                                   │
│  ╭──────────────────────────────────────────╮     │
│  │ كيف تقيم درب الموظف بشكل عام ؟  [حمر 🔴] │     │  bg: #FDECEA
│  ╰──────────────────────────────────────────╯     │
└─────────────────────────────────────────────────┘
```

- Period label: Sans Medium, 14px, gray
- Collapsible accordion with chevron (`∨` / `∧`) on the left side
- Overall rating pill displayed inline with the main question

### 7.8 Comments / Notes Section

```
╭─────────────────────────────────────────────────────╮
│  💬 التعليقات العامة                                  │
│                                                       │
│  الملاحظات العامة                                     │  Label: Sans Bold, 16px
│                                                       │
│  نص يُقرأ كما لو أنه كُتب أصلاً لمشاركة ملاحظات...    │  Body: Serif Text Regular, 14px
│  حتى لمن لم يشاهد أو يستمع للمادة الأصلية.             │
│                                                       │
│  وهذا يتطلب شيئاً من التصرف. لا تكتفي بنقل الكلام...   │
╰─────────────────────────────────────────────────────╯
```

**Specifications:**
- Container: white background, no border, subtle shadow
- Label "الملاحظات العامة": Sans Bold, 15–16px, black
- Body text: Serif Text Regular, 14–15px, `#333333` dark gray
- Line height: 1.7–1.8 for comfortable reading
- Padding: 24px
- Multiple feedback blocks separated by 16px spacing

### 7.9 Evaluation Form — Criteria Input

```
┌─────────────────────────────────────────────────────────────┐
│  ① كيف حس المبادرة؟    ℹ️ ماذا نقيس هنا؟                   │
│                                                               │
│  ● ● ● ● ●    اختر درجة درجة التقييم :                        │
│                                                               │
│  ╭─────────────────────────────────────────────╮              │
│  │  الملاحظات : شارك قلان تعليقاتك حول جودة... │              │
│  ╰─────────────────────────────────────────────╯              │
│                                                               │
│  ② كيف حس المبادرة؟                            خطر ❶        │
│                                                               │
│  اختر عبارات التقييم :                                        │
│  ○ أداؤه يعرقل سير العمل         ○ أداؤه يعرقل سير العمل     │
│  ○ غائب عن الهدف ولا يدرك المطلوب ○ غائب عن الهدف ولا يدرك  │
│  ○ لم يحقق التوقعات إطلاقاً       ○ لم يحقق التوقعات إطلاقاً  │
│                                                               │
│  الملاحظات : اكتب هنا                                         │
╰─────────────────────────────────────────────────────────────╯
```

**Specifications:**
- Question number: circled digit (①②③...), black, 18px
- Question text: Sans Bold, 16px
- Info link "ماذا نقيس هنا؟": Sans Regular, 13px, gray with info icon
- Rating dots: 5 colored circles, 14px each
- Rating label: colored pill badge showing selected level
- Text input fields: full-width, `border: 1px solid #E0E0E0`, `border-radius: 8px`, padding 12px
- Checkbox/radio options: arranged in 2-column grid, Sans Regular, 13px
- Placeholder text: Sans Regular, 13px, `#AAAAAA` light gray

### 7.10 Evaluation Summary Card (Compact View — Employee Portal)

```
┌─────────────────────────────────────────────────────────────────┐
│  📋 تقييمك العام                                                 │
│  اطلع على آخر تقييم خاصتك. التقييمين                              │
│                                                                   │
│  📋 التقييم الدوري   الربع الثالث 2025                             │
│  ╭────────────────────────────────────────────────────────────╮   │
│  │  كيف تقيم درب الموظف بشكل عام ؟               [صفر 🏗]    │   │  bg: #FFF9E0
│  ╰────────────────────────────────────────────────────────────╯   │
│                                                                   │
│  ●●●●○  كيف جودة المخرجات؟           ●●○○○  كيف حقق التوقعات؟   │
│  ●●●●●● كيف مع بيسكامب ؟            ●●●●○  كيف الانضباط في الوقت │
│  ●●●○○  كيف تقود الموظف؟            ●●○○○  كيف كفاءة الموظف؟    │
│  ●●●○○  كيف تحمد عليه؟              ●●○○○  كيف حس المبادرة؟     │
│                                                                   │
│  ∨ 📋 التقييم الدوري   الربع الثاني 2025                          │  Collapsed
│  ∨ 📋 التقييم الدوري   الربع الأول 2025                           │  Collapsed
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Criteria are displayed in a 2-column grid
- Each criterion shows: colored dots (rating) + question text
- Rating dots use the semantic colors (green/yellow/red/maroon)
- Grid gap: 16px horizontal, 12px vertical
- Accordion pattern for multiple evaluation periods (expandable/collapsible)
- Chevron `∨` for collapsed, `∧` for expanded

### 7.11 Leader Evaluation Section (تقييم قياداتك)

Separate section for leadership-specific criteria:

```
╭──────────────────────────────────────────────────────╮
│  📋 تقييم قياداتك                                     │
│                                                        │
│  📋 التقييم الدوري   الربع الثالث 2025                 │
│  ╭───────────────────────────────────────────────╮    │
│  │ كيف تقيم درب الموظف بشكل عام ؟   [فخر ⭐]    │    │  bg: #E8F5E9
│  ╰───────────────────────────────────────────────╯    │
│                                                        │
│  ●●●●● كيف بين الفريق؟     ●●●●● كيف بعث الفرائض؟   │
│  ●●●●● كيف يقود الفريق؟    ●●●●○ كيف بين الجماعات؟  │
╰──────────────────────────────────────────────────────╯
```

- Same component patterns as the main evaluation
- Leadership criteria focus on team management, delegation, and leadership skills

### 7.12 A4 Print Report Layout (Leader Report)

For printed/PDF reports, the layout changes to a single-column A4 format:

```
┌─────────────────────────────────────────┐
│  ╔═══════════════════════════════════╗   │
│  ║  التقييم الدوري                    ║   │  Hero: Black bg, white text
│  ║  محمد علاء                        ║   │  Name: Serif Display Bold
│  ║                         ◆         ║   │  Logo: white
│  ╚═══════════════════════════════════╝   │
│                                           │
│  اسم: محمد علاء    المسمى: ...            │  Meta: Sans Regular, 13px
│  القسم: ...         تاريخ: ...            │
│                                           │
│  📋 المعايير العامة                        │
│  ╭───────────────────────────────────╮   │
│  │ كيف تقيم درب الموظف بشكل عام ؟   │   │
│  │ [صفر 🏗]                          │   │  Tinted row
│  ╰───────────────────────────────────╯   │
│                                           │
│  [Criteria rows with dots + options]      │
│                                           │
│  📋 تقييم قياداتك                         │
│  [Leadership criteria]                    │
│                                           │
│  💬 التعليقات العامة                       │
│  [Feedback text]                          │
│                                           │
│  ─────────────────────────────────────   │
│  جميع الحقوق محفوظة © 2022              │
└─────────────────────────────────────────┘
```

**A4 Report Specifications:**
- Hero header: full-width black background, white text
  - Title "التقييم الدوري": Serif Display Bold, 36px, white
  - Employee name: Serif Display Medium, 24px, white
  - Thmanyah icon: white, positioned bottom-left of hero
- Employee metadata: displayed below hero, Sans Regular, 13px, gray
- Content follows the same component patterns as web but in single-column
- No sidebar navigation in print view

### 7.13 Expressive Sentences Model (النموذج التعبيري)

An alternative evaluation form using descriptive sentences instead of numeric ratings:

```
┌─────────────────────────────────────────────────────────────┐
│  📋 تقييم عام                                                │
│  [المعايير العامة] [الأسئلة المباشرة] [ببيانات وتوصيات]      │  Tab navigation
│                                                               │
│  ℹ️ المعايير العامة                                           │
│                                                               │
│  ① كيف حس المبادرة؟    ℹ️ ماذا نقيس هنا؟                    │
│  ●●●○○                                                       │
│  ○ descriptive sentence option A                              │
│  ○ descriptive sentence option B                              │
│  ○ descriptive sentence option C                              │
│  الملاحظات: write here                                        │
│                                                               │
│  ② كيف حس المبادرة؟                                          │
│  ●●●●●●  [green indicators]                                  │
│  ☑ selected sentence A                                        │
│  ☑ selected sentence B                                        │
│                                                               │
│  ...more criteria...                                          │
│                                                               │
│  ╭──────────────────────────────────────────────────────╮    │
│  │ ⑥ كيف تقيم درب الموظف بشكل عام ؟                    │    │
│  │ [فخر] [خضر] [صفر] [حمر] [خطر]                       │    │  Rating pills
│  ╰──────────────────────────────────────────────────────╯    │
│                                                               │
│  💬 التعليقات العامة                                          │
│  الملاحظات العامة: [text area]                                │
│                                                               │
│  ⚠️ بيانات وتوصيات الموارد البشرية                            │
│  ╭──────────────────────────────────────────────────╮        │
│  │ إشعارات خاصة عن الموظف غير الموارد البشرية      │        │  bg: #FDECEA
│  │ هل يرغب بتغيير قائد الفريق أو إمارته             │        │  (pink tint)
│  │ أو يعد مغرض أو يرغب بالاستقالة عن إيقاف عقد...  │        │
│  ╰──────────────────────────────────────────────────╯        │
│                                                               │
│  [إرسال التقييم]                                              │  CTA button
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Tab navigation: horizontal tabs at top, Sans Medium 14px
- Active tab: underlined or highlighted
- HR/Recommendations section: pink-tinted background `#FDECEA`
- Warning rows for sensitive HR data use pink/red tinted backgrounds
- Submit button: "إرسال التقييم", green `#00BC60` background, white text, pill shape

### 7.14 Previous Evaluation Review (استعراض التقييم السابق)

A modal/overlay for viewing past evaluation data:

```
╭──────────────────────────────────────────────────────────╮
│  ✕                                    سنة التقييم: 2025 ∨ │
│                                                            │
│  تقييم عام / يعرب مصطفى / الربع الثالث 2025                │
│                                                            │
│  ╭──────────────────────────────────────────────────────╮ │
│  │  📋 التقييم الدوري   الربع الثالث 2025                │ │
│  │                                                       │ │
│  │  كيف تقيم درب الموظف بشكل عام ؟        [حمر 🔴]      │ │  bg: #FDECEA
│  │                                                       │ │
│  │  ●● حمر        كيف حقق التوقعات؟                     │ │
│  │  الملاحظات: أنجز كل المستهدفات وتجاوز التوقعات...     │ │
│  │                                                       │ │
│  │  ●●●●●● فخر    كيف مع بيسكامب ؟                     │ │
│  │  ...                                                  │ │
│  ╰──────────────────────────────────────────────────────╯ │
╰──────────────────────────────────────────────────────────╯
```

**Specifications:**
- Modal overlay with white background, `border-radius: 16px`
- Close button (✕): top-left corner
- Year selector dropdown: top area, bordered, chevron indicator
- Breadcrumb: Sans Regular, 13px, gray with underlined employee name
- Content follows the same rating row patterns
- Background dimming: semi-transparent dark overlay behind modal

---

## 8. Interaction Patterns

### 8.1 Rating Selection Flow
1. User sees 5 rating pills (فخر → خطر) in neutral gray state
2. User clicks a pill — it fills with the corresponding color
3. If "خطر" is selected, a warning message appears below in red text explaining consequences
4. The row background tints to match the selected rating color

### 8.2 Accordion Expand/Collapse
- Evaluation periods use accordion pattern
- Chevron `∨` (collapsed) / `∧` (expanded) on the left side
- Smooth transition when expanding
- Only one period expanded at a time (optional)

### 8.3 Tooltip / Info Links
- "ماذا نقيس هنا؟" links with info icon appear next to criteria questions
- Provide additional context on what each criterion measures

### 8.4 Form Submission
- Primary CTA: "إرسال التقييم" (Submit Evaluation)
- Button: green `#00BC60` background, white text, pill shape, full-width or prominent size
- Positioned at the bottom of the form

---

## 9. Page Types & Views

### 9.1 Employee Standard Report (تقرير اعتيادي للموظف)
- Shows: overall rating, all criteria with dots, feedback comments
- Multiple evaluation periods in accordion
- 2-column criteria grid

### 9.2 Employee Brief Report (تقرير مختصر للموظف)
- Shows: overall rating + general comments only
- No detailed criteria breakdown
- Simpler, shorter view

### 9.3 Leader Report (تقرير اعتيادي للقائد)
- A4/print-optimized format
- Black hero header with employee name
- Full detailed breakdown + leadership evaluation section
- Footer with copyright

### 9.4 New Evaluation Form (تقييم جديد)
- Breadcrumb: `تقييم جديد / [Employee Name] / [Period]`
- Form with numbered criteria
- Rating dots + descriptive options + notes fields
- Submit button at bottom

### 9.5 Previous Evaluation Review (استعراض التقييم السابق)
- Modal overlay
- Year selector
- Read-only view of past evaluations
- Expandable criteria sections

### 9.6 Ananas Website View (في موقع اناناس)
- Standard employee report embedded within the Ananas website
- Same component patterns
- Includes both "تقييمك العام" and "تقييم قياداتك" sections

---

## 10. Visual Style Rules

### 10.1 Card Style
- Background: `#FFFFFF` white
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.06)` — very subtle
- Border-radius: `16px`
- Padding: `24px`
- No visible borders on cards

### 10.2 Rating Row Tinting
- Every evaluation question row gets a light wash of its rating color
- This is one of the most distinctive visual elements of Ananas
- The tint is very light (~5-10% opacity of the rating color)
- Left border accent may appear on more critical ratings

### 10.3 Whitespace Philosophy
- Generous spacing between sections (32–48px)
- Comfortable padding within cards (24px)
- Rows breathe with 12–16px gaps
- The interface never feels crowded

### 10.4 Icon Usage
- Section icons appear before titles (clipboard 📋, chat 💬, info ℹ️, warning ⚠️)
- Rating pills include small indicator icons (star, dot, lock)
- Navigation uses minimal text-based links, not icon-heavy
- Emoji-style icons in rating status bars

### 10.5 Border Usage
- Minimal borders throughout the design
- Form inputs: `1px solid #E0E0E0`
- Dropdown selectors: `1px solid #E0E0E0` with `border-radius: 8px`
- Separation between sections via whitespace, not borders
- Occasional light divider lines for content grouping

---

## 11. Dark Mode Considerations

Based on the Colors.png asset, a dark mode palette is available:

| Surface | Color |
|---|---|
| Page background | `#1A1A3A` (Blacky Likey) |
| Card surface | `#272939` (Night) |
| Deep surface | `#1D1E2A` (Dark Night) |
| Warm dark accent | `#302525` (Burgundy) |
| Primary text | `#FFFFFF` |
| Secondary text | `#424360` (Night N50) |

Rating colors remain the same in dark mode for consistency.

---

## 12. Responsive Behavior

| Breakpoint | Layout |
|---|---|
| Desktop (≥1024px) | Centered content, 2-column criteria grid, full navigation |
| Tablet (≥768px) | Single column, criteria stack vertically |
| Mobile (<768px) | Full-width cards, stacked layout, simplified navigation |

### A4 Print
- Single column, no navigation
- Black hero header spans full width
- Optimized for A4 paper (210mm x 297mm)
- Font sizes slightly reduced for print density

---

## 13. Asset Reference

| Asset | Path | Notes |
|---|---|---|
| Colors palette | `Ananas Branding/Colors.png` | Complete color system (light + dark) |
| Rating states | `Ananas Branding/حالات التقييم.png` | 5-level rating bars |
| Rating states (processed) | `Ananas Branding/حالات التقييم معالجة.png` | Rating rows with tinted backgrounds |
| Rating selector component | `Ananas Branding/Component 1/*.png` | Pill selector in active/inactive states |
| Employee standard report | `Ananas Branding/Web - تقرير اعتيادي للموظف*.png` | Full report views (4 variants) |
| Employee brief report | `Ananas Branding/Web - تقرير مختصر للموظف.png` | Compact report view |
| Leader A4 report | `Ananas Branding/A4 - تقرير اعتيادي للقائد.png` | Print-optimized leader report |
| Previous evaluation | `Ananas Branding/استعراض التقييم السابق*.png` | Modal review views |
| Expressive model | `Ananas Branding/Web - الجمل التعبيرية في التقييم/*.png` | Sentence-based evaluation form |
| Ananas website view | `Ananas Branding/في موقع اناناس.png` | Report within Ananas site |
| Overview page | `Ananas Branding/-----.png` | Summary evaluation page |
| Serif Display fonts | `Usable/Thmanyahserifdisplay12-*.otf` | 5 weights |
| Serif Text fonts | `Usable/Thmanyahseriftext12-*.otf` | 5 weights |
| Sans fonts | `Usable/Thmanyahsans12-*.otf` | 5 weights |

---

## 14. Do's and Don'ts

### Do:
- Use the 5-level rating color system consistently (فخر/خضر/صفر/حمر/خطر)
- Apply light color tints to evaluation rows matching their rating
- Use pill-shaped selectors for rating input with clear active/inactive states
- Keep the layout clean and minimal with generous whitespace
- Use Thmanyah Sans for all UI elements, labels, and form controls
- Use Thmanyah Serif Display for page and section titles
- Use Thmanyah Serif Text for feedback paragraphs and long-form content
- Include warning text when critical ratings (خطر) are selected
- Maintain RTL layout throughout
- Use 2-column grids for criteria summaries
- Use accordion patterns for multiple evaluation periods

### Don't:
- Don't use sharp corners — all elements use rounded corners (8–16px minimum)
- Don't mix rating colors — each level has one specific color
- Don't omit the row tinting — it's a core visual identifier
- Don't use heavy borders or dividers — rely on whitespace and subtle shadows
- Don't crowd evaluation criteria — each question needs breathing room
- Don't use colors outside the defined Ananas palette
- Don't use Arabic-Indic numerals — use Western Arabic numerals only
- Don't skip the warning message for critical (خطر) selections
- Don't use decorative elements that don't serve the evaluation purpose
- Don't display more than one expanded evaluation period at a time (keep it focused)

---

*This guide should be consulted for every UI component, page layout, and design decision in the Ananas platform. The rating color system and row tinting are the most distinctive visual elements — maintain their consistency across all views.*
