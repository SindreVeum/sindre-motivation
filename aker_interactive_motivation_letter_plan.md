# Aker Scholarship 2027 — Interactive Motivation Letter
## Creative Direction & Implementation Brief

**Project owner:** Sindre Veum  
**Purpose:** Interactive digital version of the Aker Scholarship 2027 motivation letter  
**Primary goal:** Deliver the exact motivation-letter content as a directed, immersive reading experience that feels more like moving through a living manuscript than visiting a website.

---

# 1. Core Concept

## The Living Manuscript

This should **not feel like a website**.

It should feel like:

> **A researcher's manuscript that gradually reveals the mind behind it.**

The visitor should open the page and immediately begin reading. There should be:

- no navbar
- no visible menus
- no conventional sections
- no cards
- no buttons in the main journey
- no dashboard-like UI
- no "explore" screen
- no onboarding instructions beyond perhaps a tiny "scroll to continue"
- no requirement to click anything
- no interaction required to understand the full letter

The **scroll itself is the narrative mechanism**.

The website should contain the complete motivation-letter text, in the intended order, and should take approximately the same amount of time to consume as reading the PDF version.

The digital experience should add meaning through:

- spatial composition
- typography
- camera movement
- subtle depth
- persistent visual motifs
- a gradually evolving node/connection system
- one major Three.js reveal near the intellectual climax

The experience should reward attention without punishing speed.

A rushed reviewer should still be able to scroll through the full experience quickly and read every word in order.

A curious reviewer should discover more nuance, movement, depth, and optional easter eggs.

---

# 2. North Star

The design principle for every implementation decision:

> **This should feel like reading something that happens to be alive, not navigating a website.**

A second principle:

> **Motion must support comprehension, not compete with it.**

A third principle:

> **At any given moment, only one thing should be asking for attention.**

If prose is being read, movement should be minimal.

If the camera moves, the prose should pause.

If a visual reveal occurs, the page should give it space.

If a node or connection forms, it should not happen simultaneously with several other animated effects.

The experience should feel **calm, intelligent, editorial, and slightly magical**.

Not flashy.

Not "AI startup."

Not "creative developer portfolio."

Not a Three.js demo.

---

# 3. Narrative Arc

The complete visual story is:

**ME → WORLD GETS BIGGER → PEOPLE → CURIOSITY → DATA → FINANCE → AI → COLLISION → QUESTION → PURPOSE → UNKNOWN**

The website should visually grow in complexity in parallel with the letter.

At the beginning:

- almost nothing exists
- one person
- one point
- simple typography
- lots of empty space

By the middle:

- places exist
- people exist
- ideas exist
- relationships form
- simple diagrams appear

By the research section:

- finance is a living network
- AI is a second network
- both exist spatially
- the reader discovers that these systems belong to the same 3D world

At the climax:

- the camera rotates
- two systems that appeared independent are revealed to intersect
- the research question appears

At the end:

- the system branches toward uncertain futures
- the camera pulls back
- the reader realizes the entire journey has existed inside one continuous map

Then everything simplifies again.

---

# 4. Source Motivation Letter

The website must preserve the following text in full and in order.

> My name is Sindre Veum. I’m 24 years old, overly positive, chronically curious, at times maybe a little too rational. I'm constantly thinking of everything from financial theory to music theory. I can get carried away when I talk about things I find interesting, maybe even a bit grandiose. And I’m shooting my shot at the 2027 Aker Scholarship.
>
> My CV will tell you most of my academic and professional background, so I’d rather try to tell you some things that aren’t there. Hopefully, you can get a little glimpse of me that makes you hungry for more.
>
> After high school, I took a gap year and travelled to pretty much the only country I could find without COVID quarantine restrictions: Portugal. I went there and had what many would call the “Bærums bubble” explode as I met people from all over the world. The way people lived, their views and actions, were so different from what I was used to. From simple things like eating dinner at 9 p.m. to people you had met two days earlier driving you to Lisbon to stay with them in a tiny apartment.
>
> I decided I wanted more of that. So I went to a “travel school”: three years, three countries and a solid degree. Sign me up!
>
> I spent those three years studying in Lisbon, Paris and Berlin. This is also where I started to become more, “academically ambitious” you could say. The people at this school were brilliant and passionate, and that kind of environment was amazingly contagious. We ended up spending a lot of time working together, solving problems, and correcting each other’s work. We would sit in a room where the walls were whiteboards and fill them with differential equations, even signing our masterpieces when we finished. I owe a lot to these people.
>
> After graduating, I got my dream job working for a Dutch data and AI startup before coming home to start my master’s at BI. Now I’m here writing a letter about why I want to do a PhD.
>
> The funny thing is, when I started my degree in data science, I didn’t fully know what I was getting myself into. I feel like many people pick their degrees thinking they know exactly what they want to do, only to realise along the way that it’s not for them. I consider myself extremely lucky because I picked mine without really knowing what it was and ended up falling completely in love with it.
>
> As I learned more statistics, maths and data science, I started looking more at financial markets. Finance was this almost infinite dataset attached to a living system. There’s always another relationship to investigate, another model to test, another question to ask. Even better, the numbers represent real decisions, companies, commodities, expectations, fear, optimism and information. On top of that its own findings feed back into itself creating this massive complex and unsolvable system.
>
> Then generative AI showed up. I remember building a website that generated these weird particle spaces from mathematical functions. It wasn’t really useful, but it was incredibly cool. By my third year, those experiments had turned into building AI into another company’s existing product. Through that project I met Zypp, where I currently work (the aforementioned “dream job”). My literal job is now to keep up with developments in AI and use them to build increasingly capable systems, and somehow I’m still regularly surprised by what’s now become possible.
>
> Somewhere along the way, these two interests inevitably had to cross paths. What happens when increasingly capable AI meets a living system like this? It’s a beautifully complex question, likely without any single true answer, and one I can’t seem to let go.
>
> But it’s also not just something that fascinates me. AI is already becoming part of how people make financial decisions, and every day I get a wave of the “massive risks of AI” while also hearing about its “endless possibilities”. Whether the eventual impact is positive or negative will of course depend largely on companies, governments and probably a bit of luck, but also on how well we understand and utilise these systems. I hope that whatever research I contribute to can help move the needle towards something more positive. I don’t believe this utopian future some preach about is just going to happen by itself, and I don’t want to sit back and hope for it to happen. I want to be part of the future direction of AI, even if my impact may be small.
>
> I’m not applying because I’m unhappy with where I am. Quite the opposite: I love my degree and my job. I’m applying because there is still so much I want to learn, and because some of the questions I’m now most curious about are ones where the answers simply don’t exist yet, answers which I also believe are important. And that’s kind of the point. I could actually design the models and experiments that help create the answers I’m looking for. Instead of only searching for an answer, I get to try finding it myself.
>
> I don’t know exactly what life will look like afterwards. Maybe I’ll stay in research, maybe I’ll go back into industry, maybe I’ll build something myself. I do know that I’ll keep looking for new things to learn and problems I find interesting, and that I want to keep meeting the kinds of people who broaden and challenge the way I view the world.

---

# 5. Storyboard

# ACT I — THIS IS ME

## Narrative purpose

Introduce Sindre as a person before introducing accomplishments.

The first impression should be personal, slightly playful, confident, curious, and unforced.

## Visual state

Nearly empty screen.

Warm paper background.

Almost-black typography.

No obvious Three.js scene yet.

No diagram.

No visual spectacle.

## Opening

Start directly with:

**My name is Sindre Veum.**

Large editorial serif.

Then reveal the opening paragraph naturally.

Possible typographic treatment:

- "overly positive" gets subtle emphasis
- "chronically curious" gets subtle emphasis
- "a little too rational" perhaps aligned slightly differently
- "financial theory" and "music theory" can sit in slight visual tension
- "And I'm shooting my shot at the 2027 Aker Scholarship." gets its own breathing room

Do not animate every phrase.

The text should feel composed rather than animated.

## First recurring object

When "chronically curious" appears, introduce a tiny circle/node:

`○`

This is the first persistent visual object in the experience.

The visitor does not yet need to understand what it represents.

This is the seed of the entire spatial map.

---

# ACT II — THE WORLD GETS BIGGER

## Narrative section

"My CV will tell you..." through Portugal and the "Bærums bubble."

## Narrative purpose

Show that the first major transformation in the story came from people and exposure to different ways of living.

## Visual metaphor

At first:

```text
        ○
      Sindre
```

A very subtle circular boundary may surround the node.

When the text reaches:

> "the 'Bærums bubble' explode"

the boundary breaks.

Not literally with a loud explosion.

Instead:

- circle fragments
- fades
- disperses
- opens outward

Other small nodes begin appearing around Sindre.

```text
       ○

                 ○

           ○ Sindre

   ○                     ○

                  ○
```

These nodes represent **people**.

No need to label them.

The point is not identity.

The point is exposure.

## Memory fragments

Tiny editorial annotations may briefly appear at the edges:

- `21:00`
- `Lisbon →`
- `two days earlier`
- `tiny apartment`

These should feel like remembered details in the margins of a manuscript.

They should not interrupt reading.

---

# ACT III — "I DECIDED I WANTED MORE OF THAT"

This line should get space.

Let the prior prose disappear.

Keep a few people-nodes faintly present.

Then:

> **I decided I wanted more of that.**

Large.

Quiet.

Then:

> So I went to a "travel school": three years, three countries and a solid degree. Sign me up!

This section should feel slightly playful and energetic.

No elaborate animation is necessary.

The personality in the writing should carry it.

---

# ACT IV — LISBON → PARIS → BERLIN

## Narrative purpose

Show how environment, people, collaboration, and academic ambition became connected.

## Spatial movement

Introduce three locations:

```text
LISBON ○ ───────── ○ PARIS ───────── ○ BERLIN
```

Do not render this as a conventional horizontal timeline.

Instead, place the locations spatially in the 3D scene and move the camera through them while keeping the experience visually flat.

The camera may drift gently as the visitor scrolls.

## People become connections

The earlier people-nodes reappear.

As the prose reaches:

> "The people at this school were brilliant and passionate..."

connections begin forming between nodes.

```text
           ○
          / \
         /   \
    ○───○────○
     \  │   /
      \ │  /
        ○
```

This is the first time the graph becomes relational rather than merely spatial.

## Whiteboard sequence

When the letter reaches:

> "walls were whiteboards and fill them with differential equations..."

the background becomes subtly populated by mathematical notation.

Important:

- use real-looking mathematical notation
- keep opacity low
- avoid fake sci-fi equations
- avoid Matrix aesthetics
- make it feel like an actual university whiteboard

Possible elements:

- differential equations
- derivatives
- integrals
- stochastic notation
- linear algebra fragments
- crossed-out terms
- arrows
- tiny corrections

The viewport should gradually feel like a whiteboard.

At:

> "...signing our masterpieces when we finished."

include a tiny handwritten-style `Sindre` somewhere.

Then clear the mathematical layer.

Keep the **human network**.

At:

> "I owe a lot to these people."

pause.

This line should land emotionally.

---

# ACT V — FAST-FORWARD TO THE PRESENT

## Narrative section

Dream job → return to Norway → BI → PhD letter.

## Purpose

Compress time and transition from biography into intellectual motivation.

## Visual behavior

Camera accelerates through the existing spatial world.

Locations and prior nodes drift past.

Possible conceptual path:

`Lisbon → Paris → Berlin → Zypp → BI`

Do not necessarily label all of these.

The important sensation is forward movement.

Then hard stop.

At:

> "Now I'm here writing a letter about why I want to do a PhD."

return to an almost empty page.

This is a subtle fourth-wall moment.

Potentially reveal the manuscript itself for a fraction of a second:

- page boundary
- cursor
- line
- writing space

Then continue.

---

# ACT VI — FALLING IN LOVE WITH DATA SCIENCE

## Narrative purpose

Transition from biography into intellectual curiosity.

This section should remain largely textual.

The anecdote works because it is honest and slightly self-deprecating.

Avoid over-visualizing it.

## New type of node: ideas

Introduce:

```text
       mathematics ○

                 ╲
                  ○ Sindre
                 ╱
       statistics ○

             data ○
```

Unlike the earlier people nodes, these represent conceptual interests.

The graph is still clean.

Still sparse.

Still visually 2D.

Then:

> "...I started looking more at financial markets."

Introduce:

`○ finance`

Quietly.

No major reveal.

---

# ACT VII — FINANCE AS A LIVING SYSTEM

## Narrative purpose

This is the first major intellectual escalation.

Finance should transform from a single interest into a complex network.

## Build sequence

Start with:

`○ finance`

Then progressively add relationships as the prose progresses.

Possible concepts:

- companies
- commodities
- people
- expectations
- information
- fear
- optimism
- models
- prices

Do not label all of them simultaneously.

The prose already names them.

The visualization should imply the same complexity.

## Scroll-driven relationship growth

At:

> "another relationship to investigate"

draw a connection.

At:

> "another model to test"

another structure forms.

At:

> "another question to ask"

another branch extends.

As the paragraph continues, the system grows.

## Feedback

At:

> "its own findings feed back into itself"

introduce the first loop.

Connections begin returning to earlier nodes.

The graph ceases to look like a simple tree.

It becomes recursive.

## Mini-reveal

At:

> "massive complex and unsolvable system"

pull the camera back slightly.

The visitor realizes the graph extends farther into depth than the flat view suggested.

This is not the main Three.js reveal.

It is only a hint that the world has depth.

Then calm the scene.

---

# ACT VIII — "THEN GENERATIVE AI SHOWED UP"

This should be a clean narrative cut.

Large text:

# Then generative AI showed up.

The finance network moves out of the immediate focal plane.

It should remain in the same world.

Do not destroy it.

## Particle-space callback

Recreate the spirit of:

> "a website that generated these weird particle spaces from mathematical functions"

A small mathematical particle field appears.

This should feel beautiful, curious, and somewhat pointless.

The perfect tone is:

> "It wasn't really useful, but it was incredibly cool."

The visualization should almost acknowledge that line humorously.

Possible implementation:

- mathematical attractor
- parametric field
- noise-driven particle motion
- deterministic seed
- soft monochrome ink particles
- very restrained density

Do not turn this into neon shader art.

Stay inside the warm-paper / black-ink aesthetic.

---

# ACT IX — AI GROWS UP

## Narrative purpose

Show the shift from experimentation to serious systems-building and professional work.

The particle field slowly becomes structured.

Randomness turns into relationships.

Possible conceptual evolution:

```text
            ○ memory
               \
    tools ○────○────○ reasoning
               /
      information ○
```

AI becomes its own network.

This network should feel conceptually different from finance.

Possible distinction:

- slightly tighter geometry
- more regular spacing
- cleaner topology
- subtle procedural behavior

But retain the same visual grammar:

- nodes
- lines
- ink
- paper
- minimal labels

By the time the paragraph reaches Zypp and increasingly capable systems, the AI graph should feel mature.

---

# ACT X — THE COLLISION

## This is the central visual climax.

The entire experience should have been quietly preparing for this.

## Narrative trigger

> "Somewhere along the way, these two interests inevitably had to cross paths."

## Spatial reveal

Until this point, the visitor believes both finance and AI have been separate visual scenes.

In reality, both have existed inside the same 3D world.

They were positioned on different planes or orientations.

For example:

- finance network approximately on XY plane
- AI network on another plane offset in Z and slightly rotated
- orthographic camera hid this spatial relationship

At the trigger sentence, begin a slow camera rotation.

Only now does the user perceive actual depth.

The finance system is still there.

The AI system is still there.

The two structures rotate into mutual visibility.

The visitor realizes:

> **They were always part of the same world.**

Then a small number of connections form between the two networks.

Do not overdo it.

Three or four meaningful connecting lines may be stronger than fifty.

## Main research question

Then present:

# What happens when increasingly capable AI meets a living system like this?

Give this line the viewport.

Let the network sit behind it.

Pause motion.

This is the intellectual and visual climax.

The reader should have enough time to understand both the sentence and the reveal.

Then continue with:

> "It's a beautifully complex question..."

Keep the system visible but subdued.

---

# ACT XI — FROM FASCINATION TO RESPONSIBILITY

## Narrative purpose

Move from "this is interesting" to "this matters."

This section should be quieter again.

The visitor has just seen the largest reveal.

Do not compete with it.

## Visual treatment

The full interconnected system remains faintly in the background.

At:

> "massive risks of AI"

the system may subtly drift one direction.

At:

> "endless possibilities"

it may subtly drift another.

Avoid symbolic red-vs-green, dark-vs-light clichés.

The ambiguity is the point.

At:

> "help move the needle towards something more positive"

allow a single path or connection to shift.

Small movement.

At:

> "even if my impact may be small"

subtly emphasize one small node.

That node is Sindre.

Do not make it brighter than everything else.

Do not make it heroic.

The point is:

**one small participant inside a large system can still choose where to contribute.**

---

# ACT XII — WHY A PhD?

## Narrative purpose

Research changes Sindre from observer to participant.

Until now he has been looking at these systems.

Now he chooses to step into the process of understanding them.

## Visual metaphor

Initially:

```text
                 complex system

            ○──○────○──○
           /  /      \  \
          ○──○──○────○──○

                 ↑
                 │
              ○ Sindre
```

At:

> "I could actually design the models and experiments..."

draw the first explicit research connection.

At:

> "Instead of only searching for an answer, I get to try finding it myself."

Sindre joins the network.

Not as the center.

Not as the solution.

As a participant.

This should be one of the most conceptually satisfying visual moments.

---

# ACT XIII — THE UNKNOWN

## Narrative section

Research / industry / build something / continued curiosity / people.

## Narrative purpose

End without pretending the future is predetermined.

The final act should celebrate uncertainty.

## Visual metaphor

The path forward branches.

Possible initial structure:

```text
                        ○ research
                       /
                      /
             ○ Sindre ───────── ○ industry
                      \
                       \
                        ○ build something
```

But keep labels subtle.

They can appear briefly.

The branches should continue beyond the viewport.

The important message:

> the future is not a single path.

## Final pullback

As the final sentence plays, begin the largest camera pullback of the experience.

Slowly reveal:

- Portugal
- people
- Lisbon
- Paris
- Berlin
- mathematics
- statistics
- data
- finance
- markets
- AI
- Zypp
- research
- future branches

The reader realizes:

> **Everything encountered during the letter has remained inside one continuous world.**

This is the final structural reveal.

It should feel less spectacular than the AI × finance rotation, but more emotionally complete.

At the center is:

`○ Sindre`

One node among many.

Many lines behind.

Several lines continuing forward.

---

# FINAL FRAME

Everything gradually clears.

Return to warm paper.

Almost-black serif.

Leave the ending:

> "...the kinds of people who broaden and challenge the way I view the world."

Then:

**Sindre Veum**

Optional tiny line:

*Thanks for reading.*

Nothing else.

No CTA.

No portfolio links.

No social icons.

No giant footer.

No "Made with Three.js."

End quietly.

---

# 6. Visual System

## Aesthetic

**Academic notebook × editorial magazine × living research diagram**

The interface should feel analog in surface and modern in behavior.

The contrast is important.

Avoid stereotypical futuristic AI visuals.

## Background

Warm off-white / paper tone.

Starting candidates:

- `#F2EFE8`
- `#F4F0E8`
- `#EFECE5`

Do not finalize until tested with typography.

The background may contain extremely subtle procedural grain.

The grain should:

- be barely visible
- prevent the page from feeling digitally flat
- not look like a Photoshop paper texture
- not visibly repeat

## Primary ink

Almost black, not true black.

Candidates:

- `#171715`
- `#1A1917`
- `#1D1B18`

## Secondary ink

Used for annotations, faint nodes, past/future context.

Examples:

- rgba equivalent around 45–65% opacity
- much lighter for background diagrams

Avoid adding a large color palette.

The experience should be essentially monochrome.

If one accent color is ever introduced, it should have a strong conceptual reason.

Default recommendation: **no accent color**.

---

# 7. Typography

Typography is one of the most important parts of the project.

The page must feel editorial, not UI-driven.

## Narrative serif

Choose a beautiful editorial serif with:

- high readability
- strong large-size personality
- good italics
- good quotation marks
- elegant punctuation
- support for long-form reading

Potential directions to test:

- Instrument Serif
- Cormorant Garamond
- EB Garamond
- Source Serif 4
- Newsreader
- Libre Caslon
- another licensed editorial serif if available

Do not choose purely based on trend.

Test full paragraphs.

## Secondary sans / mono

Use sparingly.

Suitable for:

- dates
- geographic labels
- tiny annotations
- research-like notes
- coordinate-style labels
- diagram metadata

Potential directions:

- IBM Plex Mono
- Geist Mono
- Inter
- DM Mono
- JetBrains Mono

The secondary face should feel technical without making the site look like a developer portfolio.

## Scale

Narrative paragraphs:

- desktop: roughly 28–42px depending on viewport
- line-height generous
- narrow enough measure for comfortable reading

Major lines:

- 64–120px desktop depending on sentence length

Tiny annotations:

- 11–14px

Use fluid type via `clamp()`.

## Measure

Aim around:

- 55–75 characters per line for long prose
- narrower during high-emphasis sections

Do not render the full letter in tiny 16px web-copy sizing.

This should read like editorial design.

---

# 8. Three.js Visual Language

## Core principle

The node network is **actually 3D but normally perceived as 2D**.

The user should not immediately think:

> "This is a 3D website."

Instead:

> "This is a beautifully animated diagram."

Depth should reveal itself gradually.

## Camera

Prefer an **OrthographicCamera**.

Reasons:

- preserves flat editorial appearance
- avoids obvious perspective scaling
- allows true XYZ composition
- enables later reveal through rotation
- makes 3D feel diagrammatic

Perspective may be introduced only if experimentation proves it improves the climax.

Default: orthographic.

## Nodes

Nodes should be minimal.

Possible implementation:

- small circles
- thin ring geometry
- tiny points
- subtle custom shader
- no glossy sphere materials
- no reflections
- no gradient glass
- no metallic materials

Visual inspiration:

**ink dots / diagram points**, not sci-fi particles.

## Connections

Connections should feel like hairline ink.

Possible implementation:

- Line2 / fat lines where necessary for consistency
- custom shader line
- simple BufferGeometry
- Bezier paths for specific connections

Line motion should be subtle.

No electric pulses.

No glowing neon.

## Labels

Prefer DOM labels when readable text is necessary.

Avoid rendering important prose inside WebGL.

Diagram labels may be either:

- DOM overlays synchronized to world coordinates
- troika-three-text if needed

Default: DOM where possible for clarity and accessibility.

---

# 9. DOM + WebGL Architecture

The experience should use two synchronized layers.

## DOM layer

Responsible for:

- all motivation-letter prose
- major headings
- annotations
- labels where practical
- accessibility
- selectable text
- responsive typography
- SEO / metadata

## WebGL layer

Responsible for:

- nodes
- connections
- spatial relationships
- camera movement
- depth
- particles
- finance network
- AI network
- final world reveal

## Layering

Suggested:

```text
<body>
  <canvas class="webgl-world" />
  <main class="story">
    <section />
    <section />
    ...
  </main>
</body>
```

Canvas likely:

```css
position: fixed;
inset: 0;
pointer-events: none;
```

DOM content scrolls above it.

Specific WebGL interactions can temporarily enable pointer events if easter eggs are later added.

---

# 10. Recommended Technology Stack

## Application

Recommended:

- Next.js
- TypeScript
- React

Alternative:

- Vite + React if simplicity is preferred

Do not use Next.js features just because they exist.

This is essentially a single highly-crafted route.

## WebGL

- `three`
- optionally `@react-three/fiber`
- optionally `@react-three/drei`

### Recommendation

If the coding agent is comfortable with React Three Fiber, use it.

R3F provides:

- React lifecycle integration
- clean componentization
- easier scene-state coordination
- helpers via drei

If raw Three.js provides more exact control with less abstraction for the agent, raw Three.js is also completely valid.

The end result matters more than framework ideology.

## Motion

### GSAP

Use:

- `gsap`
- `ScrollTrigger`

GSAP should be the main orchestration engine.

Responsibilities:

- section progress
- DOM transforms
- camera interpolation
- node transitions
- connection timing
- pauses
- scene choreography

Avoid mixing several animation systems unnecessarily.

## Smooth scroll

Use:

- `lenis`

Lenis should control scroll feel.

Integrate Lenis properly with GSAP ScrollTrigger.

Do not make scroll overly sluggish.

The reviewer must still be able to move quickly.

Smooth scrolling should feel invisible.

## Text animation

Possible:

- GSAP SplitText if licensed/available
- SplitType as alternative

Use sparingly.

Do not animate every word.

Text splitting is useful for:

- one major line
- subtle paragraph entrances
- specific phrase transitions

## Shaders

Custom GLSL only where justified.

Potential applications:

- particle-space section
- subtle procedural grain
- soft point rendering

Do not turn the project into shader experimentation.

## Utility

Potentially:

- `zustand` for small global narrative state
- `leva` during development only for tuning scene values
- `stats.js` or similar during performance profiling only

Do not ship dev controls.

---

# 11. Scroll Architecture

Each act should correspond to scroll progress but should not feel like card-based page sections.

The visitor experiences one continuous canvas.

Use large invisible/semantic DOM sections to define scroll distance.

For example:

```text
Act I     0–8%
Act II    8–17%
Act III   17–22%
Act IV    22–34%
Act V     34–39%
Act VI    39–47%
Act VII   47–59%
Act VIII  59–66%
Act IX    66–73%
Act X     73–81%
Act XI    81–88%
Act XII   88–94%
Act XIII  94–100%
```

These are starting points only.

Tune against actual reading pace.

## Critical rule

Do not lock the user into scroll-jacking.

Avoid full-screen snapping unless a specific moment strongly benefits.

The user must remain in control.

Scrolling quickly should advance quickly.

Scrolling slowly should reveal choreography.

---

# 12. Motion Language

## General motion

Prefer:

- slow ease
- gentle drift
- line drawing
- camera translation
- subtle camera rotation
- objects coming into focus
- opacity shifts
- spatial reveal

Avoid:

- bouncing
- elastic UI
- excessive spring physics
- exaggerated parallax
- 360° rotations
- cursor gimmicks
- hover wobble
- overshoot
- fast zooms
- spinning 3D objects

## Easing

Use restrained easing.

Potential GSAP starting points:

- `power2.out`
- `power1.inOut`
- `sine.inOut`

Custom cubic Bezier may be better for the camera.

## One-attention rule

At any moment:

- prose
- camera
- diagram
- transition

Only one should dominate.

This is essential.

---

# 13. The One Major Three.js Reveal

This should receive disproportionate implementation attention.

## Setup

Finance network and AI network are built independently.

Both exist in the same world.

The camera orientation makes them appear unrelated.

## Example geometry

Finance:

- centered left / behind
- distributed largely across one plane
- irregular network topology

AI:

- centered right / foreground
- another plane rotated perhaps 70–90 degrees
- more structured topology

Camera:

- orthographic
- aligned such that depth relationship remains hidden

## Trigger

Exact sentence:

> "Somewhere along the way, these two interests inevitably had to cross paths."

## Motion

1. Prose enters.
2. Existing movement slows.
3. Camera begins rotating.
4. AI plane gains visible depth.
5. Finance system re-enters view.
6. Viewer perceives shared coordinate space.
7. Two systems spatially align.
8. A few inter-system edges draw.
9. Camera settles.
10. Research question appears.

## Target emotion

Not:

> "Cool 3D."

Instead:

> **"Oh. That's why the site has been structured like this."**

That recognition is the payoff.

---

# 14. Pacing

The target experience length should roughly equal the normal reading time of the letter.

Approximate:

- fast reader: 3–4 minutes
- normal reader: 5–7 minutes
- curious reader: 8–12 minutes

Do not require a fixed duration.

The site must adapt to the reader.

## Rhythm

Overall rhythm:

```text
quiet
↓
personal
↓
small movement
↓
people
↓
quiet
↓
academic energy
↓
quiet
↓
ideas
↓
finance complexity
↓
pause
↓
AI curiosity
↓
AI structure
↓
MAJOR REVEAL
↓
quiet
↓
purpose
↓
research
↓
open future
↓
quiet
```

The contrast between calm and complexity is what gives the dramatic moments weight.

---

# 15. Interaction Model

The entire experience must work through **scroll alone**.

Optional layers can exist.

## Level 1 — Scroll

Required.

Contains 100% of the letter.

Controls:

- text progression
- scene progression
- camera
- networks
- narrative timing

## Level 2 — Hover

Optional.

Potential small personality details:

- bass/music annotation
- tiny whiteboard note
- Lisbon memory
- a research footnote

Hover interactions must never contain essential content.

## Level 3 — Click

Optional and rare.

Possible later additions:

- mini AI-market experiment
- old particle project recreation
- proposal title
- musical easter egg

Do not implement these until the core experience is excellent.

The MVP should not need clicks.

---

# 16. Simplicity Rules

To protect the elegance of the project:

## Never have

- navbar
- hamburger menu
- site logo
- pricing-style cards
- buttons surrounding content
- glowing gradients
- glassmorphism
- neon
- generic AI blobs
- 3D chrome spheres
- giant mouse-follow effects
- scroll percentage text
- floating dock
- autoplay audio
- mandatory audio
- "best viewed on desktop" blocker
- loading experience longer than necessary
- fake terminal UI
- cursor replacement unless later proven genuinely useful

## Be extremely cautious with

- particles
- handwritten font
- grain
- text splitting
- section labels
- decorative equations
- hover interactions
- sound
- blur
- shader effects

One instance can feel intentional.

Ten instances feel gimmicky.

---

# 17. Responsiveness

The design must work on:

- desktop
- laptop
- tablet
- mobile

However desktop can be the richest version.

## Desktop

Full spatial composition.

3D rotation reveal.

Large editorial typography.

## Mobile

Do not simply scale down desktop.

Recompose.

Potential strategy:

- reduce node count
- reduce world depth
- simplify camera motion
- preserve the AI × finance reveal
- use larger relative typography
- stack prose more vertically

The narrative must remain intact.

No message saying "open on desktop."

---

# 18. Accessibility

Important because the experience contains a complete scholarship letter.

## Required

- all prose in semantic HTML
- selectable text
- correct heading hierarchy
- readable contrast
- keyboard-compatible page
- screen-reader logical order
- `prefers-reduced-motion` support

## Reduced motion mode

For users with reduced motion:

- remove camera rotations
- remove particle movement
- replace line animation with static diagrams
- fade between narrative states
- preserve all prose
- preserve all conceptual relationships

Reduced-motion mode should still look beautiful.

---

# 19. Performance

A scholarship reviewer should never wait for visual spectacle.

## Priorities

1. Text appears immediately.
2. Page can be read even before the Three.js scene is fully initialized.
3. Avoid blocking font loads.
4. Lazy-init heavy scene components where possible.
5. Keep texture payload tiny.
6. Limit particle count.
7. Reuse geometries/materials.
8. Avoid React rerenders on every scroll frame.
9. Profile GPU and memory usage.
10. Aim for consistent 60fps on normal laptops.

## Loading

No cinematic loader.

If Three.js takes time:

- show the prose immediately
- progressively enhance with visuals

The experience must degrade gracefully.

---

# 20. Scene Data Model

Represent the persistent visual world declaratively.

Possible model:

```ts
type NodeType =
  | "person"
  | "place"
  | "idea"
  | "finance"
  | "ai"
  | "research"
  | "future";

type StoryNode = {
  id: string;
  type: NodeType;
  position: [number, number, number];
  radius: number;
  label?: string;
  visibleFrom: number;
  visibleTo?: number;
};

type StoryEdge = {
  id: string;
  from: string;
  to: string;
  visibleFrom: number;
  visibleTo?: number;
  style?: "normal" | "feedback" | "cross-system" | "future";
};
```

Use normalized story progress `0 → 1` to drive visibility and transforms.

This makes the experience maintainable.

Do not hardcode random imperative mutations throughout components.

---

# 21. Camera System

Create a camera timeline separate from prose layout.

Possible camera-keyframe model:

```ts
type CameraKeyframe = {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  zoom: number;
  rotation?: [number, number, number];
};
```

Interpolate between keyframes.

Major camera states:

1. Sindre
2. Portugal / people
3. Lisbon / Paris / Berlin
4. conceptual nodes
5. finance network
6. AI region
7. collision rotation
8. research participation
9. final pullback

This separation is useful because layout and camera choreography will require different tuning.

---

# 22. Narrative Text Components

Avoid splitting every paragraph into tiny React components unless necessary.

Useful abstractions:

```text
StorySection
StoryParagraph
HeroSentence
MarginNote
SpatialLabel
ResearchQuestion
```

Each section should contain:

- prose
- scroll range
- optional sticky behavior
- optional visual-scene state

The prose should remain easy to edit without touching Three.js code.

---

# 23. Suggested File Structure

```text
src/
  app/
    page.tsx
    layout.tsx

  components/
    story/
      Story.tsx
      StorySection.tsx
      StoryParagraph.tsx
      HeroSentence.tsx
      MarginNote.tsx

    world/
      WorldCanvas.tsx
      CameraRig.tsx
      Node.tsx
      Edge.tsx
      NodeNetwork.tsx
      FinanceNetwork.tsx
      AINetwork.tsx
      ParticleField.tsx
      FinalWorld.tsx

  data/
    story.ts
    nodes.ts
    edges.ts
    camera.ts

  hooks/
    useStoryProgress.ts
    useReducedMotion.ts

  lib/
    gsap.ts
    lenis.ts
    interpolation.ts

  styles/
    globals.css
    typography.css
```

---

# 24. Development Workflow

Do not build the whole site before validating the visual grammar.

## Phase 1 — Typography Prototype

Build:

- warm paper
- serif typography
- opening paragraph
- long-form paragraph
- major sentence
- final sentence

Goal:

The site should already feel beautiful with **zero Three.js**.

If the typography-only version feels weak, do not proceed.

## Phase 2 — Minimal WebGL Layer

Build:

- orthographic camera
- 3 nodes
- 2 edges
- camera movement
- DOM/WebGL alignment

Goal:

Prove that 3D can look like a 2D editorial diagram.

## Phase 3 — Portugal + People

Implement:

- Sindre node
- bubble
- bubble opening
- people nodes
- first persistent spatial state

Goal:

Prove the visual metaphor.

## Phase 4 — Lisbon / Paris / Berlin + Whiteboard

Implement:

- spatial journey
- people connections
- equation layer
- whiteboard atmosphere

## Phase 5 — Finance Network

Implement:

- network growth
- recursive feedback edge
- subtle depth reveal

## Phase 6 — AI Network

Implement:

- particle-space experiment
- particles becoming structured
- AI network

## Phase 7 — Collision Prototype

Build this in isolation if necessary.

This is the hardest and most important interaction.

Iterate until it feels inevitable rather than flashy.

## Phase 8 — Research + Final Pullback

Implement:

- Sindre connecting into system
- future branching
- final world reveal
- final quiet frame

## Phase 9 — Polish

Only now add:

- grain
- hover easter eggs
- handwritten accents
- subtle cursor behavior if needed
- page metadata
- loading refinement
- responsive tuning

---

# 25. Quality Bar

Before adding any visual effect, ask:

1. Does this help tell the story?
2. Does this help the reader understand Sindre?
3. Does this make the next sentence land harder?
4. Does this reward attention without slowing the reviewer down?
5. Would the page be stronger if this effect were removed?

If #5 is yes, remove it.

---

# 26. What Makes the Experience Memorable

The site should not be memorable because:

- it uses Three.js
- it has fancy scroll animations
- it has particles
- it looks expensive

It should be memorable because the interaction and structure **mirror the content of the letter**.

The geometry tells the same story as the prose:

```text
ME
 │
WORLD
 │
PEOPLE
 │
KNOWLEDGE
 │
FINANCE
 │
LIVING SYSTEM
 │
AI
 │
INTERSECTION
 │
QUESTION
 │
RESEARCH
 │
UNKNOWN FUTURE
```

At the beginning, Sindre is one node.

He encounters people.

People connect.

Ideas connect.

Finance becomes a network.

AI becomes another network.

The two systems intersect.

He chooses to connect himself into the problem through research.

The future branches outward.

That is the conceptual spine.

---

# 27. Final Design Statement

The finished experience should feel like someone began reading a beautifully typeset letter on a sheet of warm paper and, almost without noticing, gradually entered the writer's mental model of the world.

The first minute should feel intimate.

The middle should feel increasingly connected.

The AI × finance intersection should feel inevitable.

The research section should feel purposeful.

The ending should feel open.

And when the visitor reaches the final line, they should understand not only **why Sindre wants to pursue this PhD**, but something about **how his mind moves from people, to ideas, to systems, to questions**.

The strongest possible reaction is not:

> "That was a cool website."

It is:

> **"I want to meet this person."**
