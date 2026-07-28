# Meta Earnings Call

## Notes & Figures

Meta's stock jumped **9.83% in the first 6 hours** after the beginning of their earnings call. Here are some statistics from the call I found interesting:

| Area | Metric |
| --- | --- |
| Financial performance | Q4 2025 revenue: **$59.9B (+24% YoY)** |
| User scale | **3.5B+ daily users** across Meta apps |
| Capital investment | 2026 CapEx: **$115–135B (historic high)** |
| Advertising efficiency | **+3% conversion rates** |
| Reels engagement | **+30% YoY watch time** (US & global) |
| Ad supply | **+18% YoY ad impressions served** |

While ad impressions significantly increased, the decrease in price per ad suggests Meta's strategy focuses on increasing ad volume in platforms like Reels rather than solely on improved targeting (which would typically lead to higher prices).

Meta is turning CapEx into a revenue growth lever since the discovery that ad load elasticity in short-form video is far higher than expected, which means revenue can scale without increasing CPMs.

![Ad load elasticity in short-form video](/blog/meta-ad-load.png)

While clearly there is some investor concern in regards to cash flow allocation, I believe that user retention in the context of screentime-share with competing content delivery platforms will be important. Specifically, TikTok — which now serves American viewers content from an American-owned arm — should allow them to capture more market share and face less regulation.

Content consumption (I'm not sure if I would even call Instagram a social media platform at this point) is going nowhere; and I even expect its importance, relevance and scale to continue to grow exponentially over the next 10–15 years.

## Scalable Recommendation Model… a Novel Use of Transformers

The **Generative Ads Model (GEM)** stands as the most compelling justification for this massive spending.

- **Why it matters:** Susan Li explained that GEM scales with compute just like an LLM. This means if you throw more GPUs at it, it gets smarter at targeting ads.
- **The potential:** The GEM model, if it continues to scale, enables Meta to transform revenue growth into a direct function of available compute power.

## Reality Labs, Ray-Ban Glasses & Genie 3

Despite significant investment, **Reality Labs reported a loss of $6.02 billion in Q4 2025, with revenue down 12% YoY.** Historically, Wall Street has punished Meta for Reality Labs investment; but Mark Zuckerberg's willingness to keep his foot on the gas with Reality Labs suggests he expects a coming shift in technological capability that would enable Reality Labs to capitalize on many years of investment.

> I think that we're at a moment similar to when smartphones arrived... It's hard to imagine a world in several years where most glasses that people wear aren't AI glasses.
> **— Mark Zuckerberg**

- **Meta Neural Band** (a wristband detecting muscle signals) solves the very crucial input problem in moving away from the computer-screen paradigm. Computer interfaces have previously used mice, trackpads, and most recently just screens. In order to give users the same degree of control over their devices, the next "computing" paradigm must introduce a novel interaction style.

> I used the neural band as part of my Orion demo, and it's extraordinary: **it's one of those experiences that seems obvious, like multitouch for smartphones, or the mouse for the PC.** It also seems so futuristic that I was genuinely surprised the price point came in where it did.
> **— Ben Thompson**

**Read more:**

- [Brain-to-Text Decoding: A Non-invasive Approach via Typing — Research, AI at Meta](https://ai.meta.com/research/publications/brain-to-text-decoding-a-non-invasive-approach-via-typing/)
- [From Thought to Action: How a Hierarchy of Neural Dynamics Supports Language Production — Research, AI at Meta](https://ai.meta.com/research/publications/from-thought-to-action-how-a-hierarchy-of-neural-dynamics-supports-language-production/)

## Apple Vision Pro

Apple Vision Pro & all AR/VR Meta ventures mean that, despite all of the doubt and haters, the largest hardware & media incumbents respectively believe in this technology. Meta's 2014 acquisition of Oculus may have been slightly early in terms of product-market fit, but gave them access to the bleeding edge of the talent and technology at the time.

Essentially, I argue their acquisition is best justified in the context of today; where large incumbents are buying up talent, users and market expertise to carve out well-defended verticals in fields likely to become more relevant in a new era redefined by AGI & other technological advancements.

- Anthropic acquisitions of Bun, Humanloop (team)
- NVIDIA acquisition of Groq (team)
- OpenAI acquisitions of Prism, iO, Alex, Torch, Q2, Statsig, Neptune, Roi, Multi, etc.

> By acquiring companies in related industries to their fundamental product, these companies gain the experience and knowledge of experts in specific niches. This enables them to build out verticals that enhance their fundamental product offering without taking team bandwidth away from current focuses.
>
> Specifically, OAI's acquisition of Torch (a health startup) enables them to begin to build out ChatGPT for health, with Anthropic following suit a few days later after the OAI announcement. This will be a common theme from me for the rest of the year, but I believe SamA is coming for blood for a lot of companies, in a way that Silicon Valley has not begun to wrap their minds around.
>
> I think Meta has employed a similar strategy with the 2014 acquisition of Oculus. Mark Z clearly has a vision for the future of computer-human interfaces and has been planning to execute when software finally catches up with hardware. DeepMind's recent release of Genie 3 marks a point in history where software is finally beginning to catch up with hardware and consumer expectations.

Some other things to consider:

- AR/VR technology is still in its infancy. We can expect world models, conversational AI, and coding models to expand the potential use cases of this technology, ex:
- World model generates novel and/or personalized AR/VR experiences
- Conversational AI lets users interact with technology infinitely more with customizable characters, across languages, etc.
- Coding models lower the barrier to entry for developers to create experiences for users
- Additionally, compute scaling worldwide will lead to an increase in the ratio of compute used / person.

## The Phone / Computer Won't Last Forever… or at Least I Hope Not

Carrying a phone/computer around leads to a user-interface disconnect in that phones, at best, occupy approximately 5% of a user's field of view (FOV), while computers might cover around 20% — and users can't look at their device 24 hours a day.

As ads begin to become more embedded in digital interactions and harder to distinguish from normal content, as a firm, I now have to compete for attention with the rest of the user's FOV, in and outside of the device.

I urge readers to go demo Genie 3 if possible, or just scroll through X for 30 seconds. It is very clear to me that this technology, in conjunction with VR glasses, is the future of our media consumption.

### Genie 3 marks a significantly large step in world-model generation

![Genie 3 world generation](/blog/meta-genie3.png)

Google officially released Genie 3, their world generation model, to US AI Ultra subscribers after announcing it ~six months ago. The newest videos I've seen are much more impressive than what was shown in the official release. World models offer many different important use cases including:

- Content Creation
- Video Game Creation
- Infinitely (to the constraint of GPU count) scalable RL environments for training agents to interact with our real-world physics
- Physics simulation to gain understanding of particle interactions

This technology threatens to disrupt many current domains and I am very excited to watch scaling efforts continue. In an end-of-year podcast, Demis Hassabis talked about fusing or merging their video model Veo with Genie. Although I am unsure how this would work — is Veo utilizing Genie for physics adherence, or Genie utilizing Veo for ideation? — the prospect of this excites me both from a nerdy architecture perspective but, more importantly, for the future of this domain.

Fei-Fei Li and Yann LeCun, among others, have talked about the importance of world models. Fei-Fei Li created World Labs, which offers a similar product to Genie but instead uses Gaussian splatting to generate worlds. Currently their technology is far surpassed by current Genie 3, and likely the checkpoint of when Genie 3 was announced as well.

In this [Dwarkesh Patel episode](https://www.youtube.com/watch?v=21EYKqUsPfg), Richard Sutton (the Godfather of RL) seems to believe fusing LLMs to world models offers an interesting path to AGI. Although I can't pretend to understand how this would work whatsoever, I too am excited about the future of world models.

## Future of Advertising & Content Consumption

It is my belief that generative AI will soon usher in an age of advertising like none we have ever seen. I see the potential for embedded ads inside content — for example, a can in the background is changed from Coke → Pepsi → Sprite depending on user preferences, ad supply and a company's intended customers. I think content customization and personalization with GenAI will begin to make huge impacts on the field.

To learn more about this concept, check out a paper I wrote at [maxwellmoroz.com/adpipelinepaper.pdf](/adpipelinepaper.pdf), or to see a (very basic) demonstration of how this technology might work go to [the demo feed](https://adembeddings.vercel.app/feed). Here is a screenshot from the site: the same image may be served to two different users, but one may show [Monday.com](https://monday.com) on the screen, while the other shows a [ClickUp](https://clickup.com) ad.

![Ad variant — version A](/blog/meta-ad-variant-1.png)

![Ad variant — version B](/blog/meta-ad-variant-2.png)

## Other Exciting MetaAI Technology

- **Manus** — Personally I use Manus frequently for a lot of Agent→Web interactions. For example, I recently told it I needed a video transcribed; it took over the tab and used a transcription tool. I think this was a great acquisition by Meta and represents a broader theme of frontier labs acquiring specialized talent for a specific market they're looking to conquer. This allows labs to move towards becoming full-stack AI ecosystem players.
- **SAM3 Vision & Audio** — these tools can not only be very well integrated into internal pipelines, as well as content-creation platforms, but also have a wide berth of use cases.
- [Introducing V-JEPA 2](https://ai.meta.com/vjepa/)

## Tidbits

- [Inside our in-house data agent](https://openai.com/index/inside-our-in-house-data-agent/)
- [On Small Language Models](https://www.youtube.com/watch?v=eBf9OwlwLLo)
- [Substacker on the Future of Software](https://newsletter.terminalprompt.com/p/software-in-a-post-abundance-world)
- [Anthropic CEO says AI "6 to 12 months" away from doing software engineers' jobs](https://www.youtube.com/watch?v=J2w9-4sa1_c)

> A conventional narrative you might come across is that AI is too far along for a new, research-focused startup to outcompete and outexecute the incumbents of AI. This is exactly the sentiment I listened to often when OpenAI started ("how could the few of you possibly compete with Google?") and 1) it was very wrong, and then 2) it was very wrong again with a whole other round of startups who are now challenging OpenAI in turn, and imo it still continues to be wrong today.
> **— Andrej Karpathy on** [Flapping Airplanes](https://flappingairplanes.com/)

# Thank You So Much for Reading This Far

I am so incredibly grateful for you taking the time to hear my thoughts and perspective. PLEASE reach out to chat about any of this. We are in an incredibly exciting time and I am always excited to hear more about anything.
