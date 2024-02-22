---
layout: default
title: "Building the GPT Tokenizer"
date: 2024-02-22
---

# TL;DR:
Andrej Karpathy released a 2 1/4 hour video on tokenization for GPTs. The details are fascinating if you are into that sort of thing. It is very approachable and if you know some Python I think you can follow along. Andrej is very good at explaining technical subjects.

I am going to distill the video. If you want to watch the whole thing you can find it at [Andrej Karpathy - Let's Build the GPT Tokenizer](https://www.youtube.com/watch?v%253DzduSFxRajkE)

# Useful links
- [TikTokenizer](https://tiktokenizer.vercel.app/)
- [Jupyter Notebook](https://colab.research.google.com/drive/1y0KnCFZvGVf_odSfcNAws6kcDD7HsI0L?usp%253Dsharing)
- [GPT-2 Tokenization](https://github.com/openai/gpt-2/blob/master/src/encoder.py)
- [Mini BPE](https://github.com/karpathy/minbpe)
- [Sentence Piece](https://github.com/google/sentencepiece)
- [TikToken](https://github.com/openai/tiktoken)

# Introduction
TODO

Tokenization is at the heart of much weirdness of LLMs. Do not brush it off.
Why can't LLM spell words? Tokenization.
Why can't LLM do super simple string processing tasks like reversing a string? Tokenization.
Why is LLM worse at non-English languages (e.g. Japanese)? Tokenization.
Why is LLM bad at simple arithmetic? Tokenization.
Why did GPT-2 have more than necessary trouble coding in Python? Tokenization.
Why did my LLM abruptly halt when it sees the string "<|endoftext|>"? Tokenization.
What is this weird warning I get about a "trailing whitespace"? Tokenization.
Why the LLM break if I ask it about "SolidGoldMagikarp"? Tokenization.
Why should I prefer to use YAML over JSON with LLMs? Tokenization.
Why is LLM not actually end-to-end language modeling? Tokenization.
What is the real root of suffering? Tokenization.

# Conclusion
TODO
