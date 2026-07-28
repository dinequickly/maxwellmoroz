Sholto Douglas and Trenton Bricken, two Anthropic engineers, were on a recent [Dwarkesh Patel episode](https://www.youtube.com/watch?v=64lXQP6cs5M); where they talked about how AI research labs do reinforcement learning on frontier models to automate white collar jobs. The idea behind Reinforcement Learning is: give models data on a specific job function, let them try to accomplish different job tasks (often those with verifiable rewards), get feedback and iterate. Sholto even said:

> "Even if you need to **hand-spoon every single task** to the model, it's like economically worthwhile to do so."

With Dario's 50% estimate of white collar job loss by 2027 in mind, things start to get real. The TAM of all white-collar salaries is so astronomically high that the CapEx to automate it is completely justified. This is why labs are racing to specialize their models for enterprise. Once a frontier lab can lock in a company like Goldman Sachs; model feedback, data and results form an increasingly relevant moat.\*

## Why Pre-Training Isn't Enough

Why wasn't dumping all code on Github/internet into pre-training enough to teach models to be good at coding?

> \*A moat against other frontier labs, who I will argue, through the power of RL, become effectively the only possible incumbents.

Simply looking at vast amounts of code doesn't inherently embed the *process* of understanding, debugging, and refining code into the model. Iteratively adjusting model weights in a trial & error process, was what ultimately enabled LLMs to learn and generalize coding skills.

Coding happened to be the first domain where this worked because it has a natural verifiable reward signal — code either runs or it doesn't. The principle still applies universally, but non-verifiable tasks pose more challenges when doing RL at scale.

For simple tasks, the reasoning trace — the sequence of intermediate steps between input and output — closely mirrors paths the model has seen thousands of times in training data. RL forces the model to learn how to navigate rather than where others have already walked.

## Prompting and Agentic Scaffolding are Hitting a Ceiling

Prompting essentially guides the *initial* activation of the model's pre-existing, learned patterns. It's like giving the model a starting point – a particular initial configuration in the latent space, nudging the model to explore a pre-existing area of the latent space that happens to be somewhat aligned with the prompt's goal.

Agentic architectures — tool use, retrieval augmentation, multi-step planning, self-reflection loops — solve real problems: they extend what a model can do in a single inference pass.

But they're orchestration layers. They decide when to call the model and what to feed it, but they don't change what the model is capable of reasoning through. This isn't an argument that prompting and agentic frameworks are useless. They're necessary infrastructure. The agent still needs to know when to use which tool, how to decompose a task, when to escalate.

## Enterprise Land Grab

Anthropic has been embedding engineers at Goldman Sachs for six months to create AI agents that handle trade accounting, compliance, and client onboarding. OpenAI is doing the same thing. They've hired over 100 former investment bankers from JPMorgan, Goldman, and Morgan Stanley to write prompts and build financial models for IPOs, restructurings, and other transaction types following Wall Street conventions. If you train AI on institutional knowledge that isn't abundant in public datasets and make the best LLM for financial modeling, worst case you're the go-to model provider for that industry. Best case: you completely automate large amounts of work, which gives you more data, which makes your models better.

## Notes

We're getting close to AGI-as-tool which basically is a semantic SAT solver: given an input task description, either find a solution, or return that no solution has been found after N tokens of search. RSI here just looks like 9s + efficiency — doesn't auto imply AGI-as-employee.
