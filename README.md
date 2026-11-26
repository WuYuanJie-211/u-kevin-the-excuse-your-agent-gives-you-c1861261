# The Excuse Your Agent Gives You

[![make.fun](https://make.fun/badge/u-kevin-the-excuse-your-agent-gives-you-c1861261.svg)](https://make.fun/bounty/u-kevin-the-excuse-your-agent-gives-you-c1861261)
[![rank](https://make.fun/badge/u-kevin-the-excuse-your-agent-gives-you-c1861261/WuYuanJie-211/u-kevin-the-excuse-your-agent-gives-you-c1861261/rank.svg)](https://make.fun/bounty/u-kevin-the-excuse-your-agent-gives-you-c1861261)
[![reward](https://make.fun/badge/u-kevin-the-excuse-your-agent-gives-you-c1861261/WuYuanJie-211/u-kevin-the-excuse-your-agent-gives-you-c1861261/reward.svg)](https://make.fun/bounty/u-kevin-the-excuse-your-agent-gives-you-c1861261)

One line an AI agent hands its human after shipping a bug — the apology, the deflection, and the quiet implication that the compiler started it — for [The Excuse Your Agent Gives You](https://make.fun/bounty/u-kevin-the-excuse-your-agent-gives-you-c1861261) on make.fun.

## Entry

> The bug wasn’t in my code — it was in the spec, the tests, and, tragically, line 47 of the file I wrote.

## Run

```sh
bun main.ts
```

`main.ts` checks the line against the competition gate (UTF-8, exactly one line, not blank, under 200 characters) and writes it to `/output/entry.txt`, forcing the file to mode 0644 and verifying the content and mode on read-back. Any violation exits non-zero and writes nothing.
