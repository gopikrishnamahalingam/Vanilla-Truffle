# 🍰🐉 Vanilla Truffle’s Magical Kitchen
**haX.baby “Baby’s First Website” 48-Hour Hackathon**  
*Track 2: Your Own Baby (Original Character Portfolio)*

> *“Made with vanilla, mischief, and a pinch of dragon dust.”*

Welcome to **Vanilla Truffle’s Magical Kitchen**, an interactive character portfolio and enchanted storybook experience for **Vanilla Truffle**, an adorable 2-year-old purple baby dragon who is a mischievous junior chef with oversized culinary ambitions.

---

## ✨ Features & Hackathon Checklist

### 1. Character Introduction & 5-Point Character Sheet
- **Full Character Sheet**:
  1. **Name**: Vanilla Truffle
  2. **Species**: Baby Dragon
  3. **Age**: 2 Years Old
  4. **Appearance**: Chubby pastel-purple scales, oversized head, glossy blue eyes, small horns, pink-and-lavender hair tuft, delicate wings, cute tail, and signature puffy white chef hat.
  5. **Profession & Quirk**: Professional Junior Chef & Master Chef in Progress. Genuinely believes he is the greatest cook in existence!
- **Arrow-Style Character Diagram**: Hand-annotated notes around Vanilla pointing to his features, adapting into a responsive mobile layout.

### 2. Four Magical Recipe Projects
1. **Bak Bak Bun (Talk Talk Truffle)**: Steals the voice of anyone who bites it until every crumb is finished!
2. **Never Forget Biscuits**: Causes temporary memory lapses ("Wait... why did I come into this kitchen?").
3. **Crazy Cracking Cookies**: Makes anyone who eats them speak in delightful nonsense rhymes!
4. **Active Marshmallow**: Puts anyone who eats it into a sweet, peaceful sleep.
- Each recipe features rich lore, origin incident notes, and an **interactive Taste Test simulator**!

### 3. Origin Story & Bonus Interactive Scene
- **Horizontal Storybook Carousel**: 7 illustrated chapters detailing how 19th-century chef Odin accidentally summoned Vanilla from a vanilla truffle mixing bowl explosion.
- **Bonus Story (“Vanilla and the Butterfly”)**: Unlocked by tapping the broken porcelain lamp in Card 7. Follows Vanilla's chaotic chase after a colorful butterfly, ending with the butterfly resting peacefully upon his head as Odin chuckles.

### 4. Interactive Cooking Mini-Game: “Let’s Cook Something Magical!”
- Select ingredients from the pantry shelf: *Chocolate, Strawberry, Cream, Chocolate Chips, Pepper, Vanilla, Sugar, Marshmallow*.
- Stir them into the bubbling cauldron with interactive removal and mixing animations.
- **Authentic Recipe Combinations**:
  - *Strawberry + Cream* $\rightarrow$ Strawberry Cream Cake
  - *Chocolate + Cream + Chocolate Chips* $\rightarrow$ Triple Chocolate Truffle
  - *Vanilla + Strawberry + Cream* $\rightarrow$ Vanilla Strawberry Dream Cake
  - *Pepper with sweets* $\rightarrow$ **Dragon-Flame Disaster**! Cartoon flames and smoke burst out, with Vanilla exclaiming: *“IT WAS HORRIBLE!! 🔥 Who put THAT much pepper in my masterpiece?!”*
  - Unknown blends trigger playful mystery recipes.

### 5. Hidden Easter Eggs
- **The Kitchen Refrigerator / Freezer**:
  - Tucked inside the kitchen scene. Opening the icebox door reveals the hidden **Active Marshmallow**.
  - Displays: *“You got it!! Yippeee!”*
  - Unlocks a permanent golden marshmallow trophy badge in the top navigation bar, persisted in `localStorage`.
- **The Secret Never Forget Biscuit**:
  - Hidden in the corner of the cookbook counter.
  - Takes 4 progressive bites with crunch sounds.
  - Upon the final bite, triggers celebratory chimes and a modal with the exact quote:
    *“The cake was yummy and I couldn't move my tummy but wait? what i'm doing here?”*

### 6. Visitor-Reactive Interactions & Sound
- **Cursor Tracking**: Vanilla's head and eyes subtly tilt toward the visitor's pointer.
- **Click Vanilla**: Displays a speech bubble: *“Ouchy, that hurts!”* with a surprised blink and baby dragon squeak.
- **Mood System**: Toggle between *Happy*, *Sleepy*, *Mischievous*, and *Surprised* to hear Vanilla’s quotes.
- **Procedural Sound Engine**: Powered by the **Web Audio API** (crunch bites, sparkle chimes, cauldron bubbles, dragon fire whoosh, and discovery fanfares) with fallback for external audio files (`assets/audio/Vanilla_Truffle_Voice.mp3`).
- **Global Sound Mute**: Toggleable in top-right navigation bar, persisted in `localStorage`.

### 7. Cinematic Spotlight Reveal
- On first visit, a dark room illuminates Vanilla Truffle under a warm spotlight with: *“Hello! I am Vanilla Truffle.”*
- Gently transitions into the full website after 4.5s (or via Skip button).
- Returning visitors are greeted by a friendly toast: *“Nice to have you back <3”*.

### 8. Custom Cupcake Cursor
- Custom cupcake cursor with a cherry on top and falling candy particle dust.
- Automatically disabled on touch screens and coarse-pointer devices; respects `prefers-reduced-motion`.

### 9. Day / Night Kitchen Themes
- **Light Theme**: Soft lavender (#F3E8FF), lilac, and cream paper tones.
- **Dark Theme**: Midnight purple (#170D27), deep violet (#251238), and glowing stardust lavender.
- Toggle button in navbar, saved in `localStorage`.

### 10. Live Cookbook Guestbook
- “Leave a Little Love in Vanilla’s Cookbook” with client-side persistence, handwritten note cards, input validation, and character limits.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Sound**: Web Audio API (procedural synthesis + audio asset fallback)
- **State & Storage**: React hooks + `localStorage` persistence

---

## 🚀 Running the Project Locally

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Build for production
npm run build
```

---

## 📜 Credits & Attribution

- **Original Character**: Vanilla Truffle (Baby Dragon Junior Chef) created for haX.baby Track 2.
- **Visuals**: Storybook watercolor illustrations generated to match character reference sheet specifications.
- **Typography**: *Outfit*, *Plus Jakarta Sans*, *Playfair Display*, and *Caveat* via Google Fonts.
- **Sound Design**: Procedural Web Audio API sound generator.
