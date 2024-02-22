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

# Why tokenize?
Computers are not good at understanding language or text. They are good at understanding numbers. Even the letters you see on the screen are represented as numbers. Tokenization is the process of converting text to and from numbers.

Large Language Models work with numbers. They are trained on massive amounts of text which is converted to numbers (tokens). Your prompts that are passed to the LLM are also converted to the same numbers. The LLM then does its thing and returns a list of numbers. These numbers are then converted back to text and returned to you.

# Trade-offs
Andrej has shown in a previous video as well as summarizing in this video, tokenizing each character. You take your source corpus of text, figure out all of the characters used, and assign a token to each one. This is a very simple but has some general issues:
- It does not compress the text
- It does not generalize
- It does not handle unknown characters
- It does not handle non-English languages
- It does not handle non-text data

The other end of the spectrum is to tokenize each word. This is also simple but has some different issues:
- It does not handle unknown words
- Unknown words can be non-English
- Unknown words can be misspellings
- The size of the vocabulary is very large

The size of the vocabulary is a big issue. The larger the vocabulary, the more memory and computation is required. We would like to have a smaller vocabulary. Many things in computer programming are about trade-offs. We want to have a small vocabulary but we also want to be able to handle all of the text we might encounter.

# Current solutions
You can tokenize chunks of characters. These chunks are the most common parts in the text. Andrej goes through how you determine the chunks. Basically you run the tokenizer on a sample of your data and capture the most common chunks and assign tokens (numbers) to them. The text "the" becomes a token.

# Complications
Text is actually quite complicated. We have capitalization, punctuation, sentences, abbreviations, misspellings, and more. Words mean different things in different contexts. We also have different languages. Not just human languages, but programming languages. Andrej touches on other modalities like images and audio, which you can basically convert to numbers and then use the same mechanisms.

Andrej presents the following as weirdness of LLMs:
- Why can't LLM spell words? Tokenization.
- Why can't LLM do super simple string processing tasks like reversing a string? Tokenization.
- Why is LLM worse at non-English languages (e.g. Japanese)? Tokenization.
- Why is LLM bad at simple arithmetic? Tokenization.
- Why did GPT-2 have more than necessary trouble coding in Python? Tokenization.
- Why did my LLM abruptly halt when it sees the string "&lt;\|endoftext\|&gt;"? Tokenization.
- What is this weird warning I get about a "trailing whitespace"? Tokenization.
- Why the LLM break if I ask it about "SolidGoldMagikarp"? Tokenization.
- Why should I prefer to use YAML over JSON with LLMs? Tokenization.
- Why is LLM not actually end-to-end language modeling? Tokenization.
- What is the real root of suffering? Tokenization.

While the last bullet is tongue in cheek, the rest are real issues that are caused by tokenization. Andrej goes into each of them in the video. I definitely recommend watching it.

The issues raised will make sense once you undeerstand that you have a system that only understands tokens as numbers. For a concrete example, let's assume that the LLM sees the word "hello" as token 123. If you ask the LLM to reverse that text, it has no idea what "hello" is. It only knows 123.

If you ask an LLM to do simple arithmetic, it has no idea what these texutal representations of numbers are. It only knows the numeric tokens. The text "123" may be represented as an arbitrary token, such as 44312.

# Summary
If you consider that you have a machine that is incredibly fast at working with numbers (thanks to GPUs) and all it knows is these numbers, you can see why tokenization is important. But you can also see why it is problematic and why LLMs trip over seemingly simple tasks.

The source data for creating the tokenizer has a large impact on how it behaves. The internet consists of a lot of English text. This is why LLMs are currently worse at non-English languages.
