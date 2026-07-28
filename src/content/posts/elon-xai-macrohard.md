# Android Env & Macrohard — Incumbents Moving Towards Browser-Use

## Macrohard

Elon Musk has mentioned Macrohard, the inverse of Microsoft, on X and I occasionally see news about the project as well; but for a while it was hard to say exactly what the company planned to do besides: "Our goal is to create a company that can do anything short of manufacturing physical objects directly, but will be able to do so indirectly" — Elon via X.

This was until **Sulaiman Ghori**, an outspoken, young XAI employee, did an interview discussing XAI, Tesla, Macrohard and Elon. Sulaiman was infamously fired shortly after this interview but did give us interesting insights into what may be going on at XAI.

Macrohard was described as a **"human emulator,"** capable of performing any digital task a human can do by directly emulating human inputs — specifically looking at a screen and using a keyboard and mouse.

To me this suggests that Elon believes in the future of "Computer-Use" agents, which is basically where an LLM drives an actual computer screen, interacting with the interface by pointing the mouse and taking screenshots to understand what was going on. I have to admit that I am initially skeptical of this; while browser agents are interesting and useful currently, I have always thought that was because the infrastructure to support agentic interaction with the internet was not yet scaffolded. No doubt, in comparison of a single task, computer use agents are less efficient than a properly sandboxed agent built to interact with its environment.

## AndroidEnv & a Slightly Different Google Approach

The foundational training infrastructure created by scientists at DeepMind that wraps the Android Operating System (OS) into a compliant Reinforcement Learning environment is called AndroidEnv; I believe it has been critical in the success of Gemini on vision benchmarks. Interestingly, at the time I wrote this piece Google did not even have agentic vision, basically just manipulating a photo to get more info from it (ex: crop top right), but still was doing amazing on benchmarks. OpenAI introduced this feature with o3 back in late January of 2025.

The agent does not receive a parsed DOM tree or an accessibility layer XML but instead receives raw pixel arrays. This forces the model to learn "functional vision" — identifying a button not because the code says `<button>`, but because it *looks* pressable.

Traditional VLMs (Vision Language Models) are trained on a "Next Token Prediction" objective:

![The next-token-prediction training objective](/blog/elon-next-token-prediction.png)

The model looks at a screenshot and predicts the description. It acts as a spectator. This seems complicated but it is just changing how we send data of what is happening on a screen to the model.

![Spectator vs. agentic vision objective](/blog/elon-vlm-objective.png)

Structured data is messy, noisy and confusing and screenshot loops are expensive and slow. This new model enabled Google to train better models and gather data in a new, more efficient way.

Elon could be of the same opinion as me, and simply not care to build out the scaffolding necessary to enable "Macrohard" to brute force its way through the corpus of economically attractive tasks on the internet.

I'm excited to see more from XAI. I found Grok 4 to be surprisingly good in the context of the model landscape of when it was released, and Grok 4 Heavy (letting 4 instances of Grok talk to each other and compare findings before returning info to the user) to be very useful for specific use cases.

## On Grok

Elon has made bold claims about the mathematical prowess of Grok 4.2 (the upcoming model expected to be released soon) but said it would fall short of Opus 4.5 in coding ability. This was in reference to GPT-5.2-xhigh allegedly solving a few [Erdős math problems](https://www.erdosproblems.com/). Apparently (via X), cold temperatures in Texas have delayed the training run of Grok 4.2 so I don't expect to see it for at least another month.

It seems to me that Google — who a) owns 14% of Anthropic, b) offers Anthropic models on Vertex, and c) now allows Dario to train on TPUs — is also happy to let Anthropic win the first leg of the race with coding. The winner of the race to the top with LLMs does not equate to winning the race to AGI, or whatever we will be looking to see from frontier labs in the next 5 years.

Elon publicly announcing that Grok 4.2 would not surpass Opus 4.5 in coding, with Sonnet 4.6 and eventually Opus 4.6 expected soon (which will no doubt be better at coding), would suggest that 2 of 5 model providers simply aren't pushing as hard on SWE as Anthropic is.

OpenRouter's most used model in 2025 was grok-code-fast, so it may be that Elon is allowing Anthropic to run ahead a little bit and plans to catch up with matched ability + speed. This seems to be Elon's mindset on winning the AI race: that model latency is incredibly important, and I agree. One of the biggest complaints I see on X about Codex — which is generally around the same capability as Claude Code (even though I love CC and hate Codex) — is that Codex often takes 3x longer than CC, which kills the user experience. As code quality starts to peak, hopefully pretty soon, and all the foundation models catch up to Anthropic, product differentiation will be based off taste and speed.

Grok Imagine, image and video models, now support local audio generation and are served very quickly. They definitely don't compare to OpenAI image-edit / nano-banana-pro or Veo 3.1 in quality, but far surpass them in latency.

I see latency in media also being incredibly important in the future — see OAI, Cerebras & NVIDIA-Groq acquisitions — especially for provider-user interaction. We see that mainstream AI consumers care less about intelligence and more about latency. Sora, Grok Imagine and Meta Vibes all represent proofs of concept for AI-generated media consumption, and in this space latency is incredibly important.

By the end of the year, XAI will have the most available compute, which may enable them to do larger training runs, faster iteration and serve more customers. Elon has mentioned using Teslas as edge nodes to add compute to the XAI network, but it is unclear yet whether this will happen.

## Alpha Arena & RL Differentiation "Towards Truth"

The Alpha Arena trading competition ended on December 3rd with Grok 4.2 getting a 12.11% aggregate return. This is a pretty stark difference from GPT-5.1 (2nd) and Gemini 3 (3rd), which could be accounted for by Grok's access to information on X; but I suspect it can be attributed to a different RL / post-training strategy from the XAI team.

![Alpha Arena results — Grok 4.2 leads aggregate return](/blog/elon-alpha-arena.png)

## Tesla

Elon Musk recently announced the discontinuation of the Model S & X lines to free up manufacturing to focus on:

1. Producing fully autonomous cars without a steering wheel or pedals. These are already driving around Austin, TX without any human oversight (physical nor virtual), and will be replacing one of the lines.
2. I expect XAI, SpaceX and ultimately Tesla to converge into one company after a merger then IPO (this includes X) shortly. Maybe Tesla acquires, or a merger; unsure and uninterested in researching the possibilities of stockholders and contracts. Grok already is in Teslas.
3. Elon will launch many satellites into orbit for energy scaling, fast network speeds and inference.
4. Tesla will use the other factory line to produce Optimus robots that he intends to scale to billions to automate human labor.
5. See earlier Macrohard talks of replacing many economically viable computer tasks.
