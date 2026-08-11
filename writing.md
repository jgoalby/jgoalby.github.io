---
title: Writing
description: Field notes, technical guides, product observations, and experiments by John Goalby.
permalink: /writing/
section: Notebook Index
---

# Writing

Field notes on software, AI, product design, working differently, and anything else worth examining closely.

{% assign all_writing = site.articles | concat: site.thoughts | sort: 'date' | reverse %}
<div class="index-list writing-index" markdown="0">
{% for post in all_writing %}
  <a class="index-entry" href="{{ post.url | relative_url }}">
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b %Y" | upcase }}</time>
    <span class="index-copy">
      <strong>{{ post.title }}</strong>
      <small>{% if post.collection == 'articles' %}Field guide{% else %}Notebook{% endif %}</small>
    </span>
    <b aria-hidden="true">↗</b>
  </a>
{% endfor %}
</div>
