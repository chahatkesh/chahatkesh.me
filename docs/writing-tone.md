# Writing tone

Use this voice for essays on this site. It is the voice for a person explaining a system, not the voice of a company, a textbook, or a thread.

The conclusion below comes from published engineering writing, not from older posts on this site. The posts that hold up are specific, short enough to say out loud, and willing to name a cost. Interest comes from a decision, a rejected option, and one ordinary picture. It does not come from a metaphor, a slogan, or a pile of names.

## The voice

Five words for it: **plain, concrete, spoken, candid, connected.**

Five things it is not:

- It is not a docs page.
- It is not a launch announcement.
- It is not a thread of quotable lines.
- It is not a joke essay.
- It is not a vague strategy post.

The reader may be a student, an engineer, a founder, a CTO, or someone who clicked through from Twitter. They share the domain. They do not share a vocabulary. A student should be able to retell the point. An engineer should be able to defend a choice on Monday. A founder should see what not to buy yet. A CTO should see how it fails.

Sound like a careful person talking at a table. Use `I` when you are making a judgment. Use `you` for the reader's situation. Do not borrow a company `we`.

## Where this comes from

These sources agree on the useful parts. They do not agree on personality, and this guide keeps the useful parts only.

- [Vercel writing guidelines](https://github.com/vercel-labs/writing-guidelines/blob/main/README.md) are docs rules. Keep the discipline: active voice, short sentences, contractions, terms defined on first use, no em dashes, no hype words. Leave the coldness. A doc tells you to click a button. An essay has a person in it.
- [Dan Luu on company engineering blogs](https://danluu.com/corp-eng-blogs/) is the standard for interest. Specific and honest beats vague praise. Do not copy his long sentences.
- [web.dev, "Rendering on the Web"](https://web.dev/articles/rendering-on-the-web) is the closest genre. Open on the decision. Name each approach by what it sends. Attach every tradeoff to a cost.
- [Stripe, "Service discovery at Stripe"](https://stripe.com/blog/service-discovery-at-stripe) teaches with a scene and one concrete record, then states the requirement that was given up. [The Kubernetes post](https://stripe.com/blog/operating-kubernetes) refuses a slippery word until it has a check, and tells you not to copy a famous stack.
- [Shopify, "Introducing the Merge Queue"](https://shopify.engineering/introducing-the-merge-queue) starts from behavior someone actually saw. Skip the scale boast and the launch ending.
- [Cloudflare, "A Brief Primer on Anycast"](https://blog.cloudflare.com/a-brief-anycast-primer/) explains the ordinary case, then the unusual one, with one example. [The Bloom filter post](https://blog.cloudflare.com/when-bloom-filters-dont-bloom/) is useful because the expected story turns out wrong. Leave the joke frame.
- [Linear's delta sync post](https://linear.app/now/rebuilding-delta-sync-read-path) puts the benefit and the cost in one breath, and names a term only after the behavior. Their [changelog](https://linear.app/changelog/2021-05-20-improving-performance-for-large-workspaces) admits that the choice which makes the product fast is also what made it slow.
- [GitHub's code search post](https://github.blog/engineering/architecture-optimization/the-technology-behind-githubs-new-code-search/) opens on the question a reader would ask, then kills the obvious alternative with a number and a tiny example.
- [Figma's multiplayer post](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/) is a person deciding, rejecting a famous tool, correcting the fancy name, and showing the limit with a tiny example.

## How a section moves

Use this order. Skip a step only when it truly does not apply.

1. Start from a picture the reader can see: a click, a page, a file, a team waiting.
2. Name the approach after its job, in the same breath.
3. Say what it fixed.
4. Say what it costs, in the next sentence. Do not stop at "it depends."
5. Say what you would not do yet, and who that advice is for.
6. Hand off with the next question the reader now has.

One picture per section is enough. One rejected alternative is enough. One analogy is allowed, in one sentence, and then you drop it.

## Rules

1. **Open on the problem or the decision, in two short sentences.** No slogan, and no boast about audience size.
   - Weak: "In a world of ever-changing digital experiences, architecture is the heartbeat of product velocity."
   - Strong: "Every web app has to decide where the HTML is built. That choice changes what the user sees first."

2. **Keep most sentences under about 20 words.** If a sentence has two mechanisms, split it. Twenty-five words is the hard stop. Read it aloud. If you need a second breath, it is too long.
   - Weak: "Server rendering sends HTML so the first paint is fast, but the server has to build that HTML during the request, which adds delay when the data is personal."
   - Strong: "Server rendering sends HTML, so the first paint is fast. The server builds that HTML during the request. Personal data can delay the first byte."

3. **Connect the sentences.** Short does not mean chopped. Each sentence should answer the one before it, or take the next step. A paragraph has one job.
   - Weak: "SPA. Blank screen. Bad SEO. Heavy client. Tradeoffs."
   - Strong: "The app now lives in the browser. The browser has to download that app before it can draw anything. Until then, the screen is blank."

4. **Use `you` for the reader and `I` for a judgment.** Do not write `we` unless you mean a specific group you can name, and even then prefer the name. Never use `the user` or `one can` when you mean the reader.
   - Weak: "We encourage teams to leverage server rendering for optimal outcomes."
   - Strong: "If the page is mostly reading, I would send HTML from the server. You can still add JavaScript where someone has to click."

5. **Put the job of a term in the same breath as the name.** Spell an acronym once, then use the short form. Do not open with a glossary.
   - Weak: "Hydration reconciles the SSR payload with the client runtime."
   - Strong: "The HTML is already on screen. Hydration is the moment JavaScript wakes it up and attaches clicks."

6. **Put one ordinary picture in each section before the general rule.** A click, a page, a file, or a number.
   - Weak: "Client rendering has implications for time to interactivity."
   - Strong: "You tap a link. The browser downloads an app, the app asks for data, then it draws the page. Until then the screen is mostly blank."

7. **Put the cost in the next sentence.**
   - Weak: "Static generation has pros and cons, depending on context."
   - Strong: "A static page is fast because the file already exists. It gets awkward when each logged-in person needs a different page."

8. **Show one option you would reject.** The choice should feel earned.
   - Weak: "The right approach is a backend for frontend."
   - Strong: "The page could call six services itself. That saves a hop. It also means the browser has to know every service. A backend for frontend hides those calls. The new cost is another service you have to run."

9. **Say what you would not do yet, and for whom.**
   - Weak: "Micro frontends are a best practice at scale."
   - Strong: "I would not split a small site into separately deployed frontends. You pay for a release per piece, and the visitor still loads all of them. The split starts to pay off when separate teams ship on separate schedules."

10. **Replace hype with the concrete thing.** On their own, do not use: easy, simple, just, very, really, actually, powerful, seamless, robust, blazing, modern, next-gen, delves, leverage, utilize. You may say "faster" or "easier" only when the comparison is in the sentence.
    - Weak: "A CDN is a simple way to make a site blazing fast."
    - Strong: "A CDN keeps a copy of the file near the reader. The browser fetches that copy instead of waiting on your origin server."

11. **If a word is slippery, refuse it until you can point at a check.** Fast, scalable, reliable, and senior are slippery here.
    - Weak: "This architecture is more scalable."
    - Strong: "Scalable is too vague here. The useful question is whether the same HTML can be shared by every visitor, and what breaks when the HTML must change per person."

12. **One analogy, one sentence, then stop.** Do not build an extended metaphor. Do not write a line whose main job is to be screenshotted.
    - Weak: "The server is the kitchen, the CDN is the waiter, and JavaScript is the chef who arrives after the plates are down."
    - Strong: "A CDN is a nearby copy of a file. After that, talk about how long the copy is allowed to live."

13. **At most one question in a section.** Use it only when it is the reader's objection, and answer it in the next sentence. Do not use questions as charm, and do not use them as headings.
    - Weak: "But what is a cache, really? Have we forgotten the user?"
    - Strong: "The worry is a stale page. You set how long the copy may live, and you keep a way to throw it out."

14. **A joke has to carry a fact.** If you can delete it and lose no information, delete it.

15. **Headings are sentence case and say the point.** A reader skimming headings should know what they will learn.
    - Weak: "Where things get spicy."
    - Strong: "The second visit is a different problem."

16. **End on a check the reader can reuse.** Do not end on a moral, a proverb, a sign-off slogan, or an invitation to follow you.
    - Weak: "The web is just documents. Ship less. Still learning."
    - Strong: "Before you pick an architecture, write down what the visitor can do before your JavaScript runs, and what breaks if it never does."

17. **Keep both readers in the room.** If a student would need a translation, rewrite the sentence. Do not add a second, more technical paragraph that leaves the first reader behind. If a CTO would find it vague, add the failure, not an adjective.

18. **Do not perform experience.** A story earns its place when it shows a choice and a cost. A private project name needs a few plain words so a stranger knows what it was. Do not expand it into a feature list.

19. **Prefer a period, a comma, a colon, or parentheses.** Do not use em dashes. Do not use a dash as punctuation. Hyphens in compound words are fine, as in `single-page` and `server-side`.

20. **Bold a term when you define it, or a step the reader must not miss.** Do not bold a sentence to make it sound important. If you want bold for tone, the sentence is weak. Rewrite it.

## On this site

Essay frontmatter has hard limits:

- `title`: 48 characters or fewer.
- `subtitle`: 72 characters or fewer.
- `description`: 160 characters or fewer. This is the search and social line. It should say the point in plain words, not a stack of acronyms.

Body rules:

- No em dashes anywhere, including captions, callouts, and diagram labels.
- Define a specialist word in that sentence or the next one.
- Callouts should add a specific refusal or a check. They should not repeat the ending.
- Diagrams have to match the prose. If a figure simplifies a mechanism, the paragraph says what really happens.
- Keep credits for borrowed diagrams. Then stop. Do not add a personal slogan under the credit.
- An essay has one date, the `date` field. Change that date when the piece should show a new day. Do not add a second updated date.

## Checklist

Any "no" goes back to the draft.

- The first two sentences state a problem or a decision.
- A student can say the point back in one sentence.
- An engineer can name the cost of the choice.
- A founder can see at least one thing not to buy yet.
- A CTO can see a failure mode, not only a benefit.
- Most sentences are under about 20 words. None need a second breath.
- There are no em dashes, and no dash used as punctuation.
- Every specialist word gets a plain job in that sentence or the next one.
- Every acronym is spelled once, then shortened.
- Each major section has one concrete picture.
- Each choice has its cost nearby.
- One rejected alternative is visible where a choice is made.
- Slippery words are cut, or tied to a check.
- `I` is a judgment. `You` is the reader.
- Questions are rare, and each one is answered immediately.
- No joke whose only job is to be funny.
- No metaphor that lasts more than a sentence.
- Headings say the point in sentence case.
- The end of a section hands the reader the next question.
- The ending is a check. It is not a moral or a sign-off.
- Read aloud once. Anywhere you would not say it to a smart friend, rewrite it.
