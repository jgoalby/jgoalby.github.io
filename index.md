---
title: John Goalby — Software Engineer
description: Practical software for messy, real-world problems.
permalink: /
---

<section class="hero">
  <div class="hero-copy">
    <div class="eyebrow"><span>FIELD NOTE 001</span><i></i><span>SOFTWARE ENGINEER</span></div>
    <h1>I build practical software for <em>messy, real-world problems.</em></h1>
    <p>Working across AI, automation, and web products—with a bias toward useful tools, thoughtful systems, and learning by making.</p>
    <div class="hero-actions">
      <a class="primary-action" href="{{ '/work/' | relative_url }}">Explore selected work <span aria-hidden="true">→</span></a>
      <a href="{{ '/writing/' | relative_url }}">Read my notes</a>
    </div>
  </div>

  <figure class="idea-engine">
    <div class="figure-label">CONCEPT / BUILD / REFINE</div>
    <div class="figure-grid" aria-hidden="true"></div>
    <img src="{{ '/assets/lightbulb.png' | relative_url }}" alt="An intricate brass light bulb filled with gears">
    <figcaption>FIG. 01 — IDEA ENGINE</figcaption>
    <div class="hand-note" aria-hidden="true">start with the<br>real problem</div>
    <div class="useful-stamp" aria-hidden="true">BUILT TO BE<strong>USEFUL</strong></div>
  </figure>
</section>

<section class="home-section selected-work" id="work">
  <header class="section-heading">
    <span>SELECTED WORK / 01</span>
    <h2>Things I’ve made</h2>
    <a href="{{ '/work/' | relative_url }}">View all work <span aria-hidden="true">→</span></a>
  </header>

  <article class="featured-project">
    <div class="project-display" aria-label="A demonstration of log2div output">
      <div class="console-window">
        <div class="console-title"><i></i><i></i><i></i><span>log2div — mobile console</span></div>
        <code><b>[INFO]</b> Console connected</code>
        <code><b>[LOG]</b> Debug anywhere, even on iPad</code>
        <code><strong>[WARN]</strong> Developer tools not detected</code>
        <code><b>[LOG]</b> Sending output to page… <em>✓</em></code>
        <span class="console-cursor" aria-hidden="true"></span>
      </div>
    </div>
    <div class="project-summary">
      <div class="project-tags"><span>OPEN SOURCE</span><span>JAVASCRIPT</span><span>TOOLING</span></div>
      <h3>log2div</h3>
      <p>A lightweight, no-build-step developer console for browsers with limited developer tools.</p>
      <ul>
        <li>Designed for mobile and tablet debugging</li>
        <li>Single readable JavaScript file</li>
        <li>Interactive logs, filtering, and copying</li>
      </ul>
      <a href="{{ '/work/log2div/' | relative_url }}">Open the case study <span aria-hidden="true">→</span></a>
    </div>
  </article>
</section>

{% assign all_writing = site.articles | concat: site.thoughts | sort: 'date' | reverse %}
<section class="home-section recent-writing" id="writing">
  <header class="section-heading">
    <span>FROM THE NOTEBOOK / 02</span>
    <h2>Writing & observations</h2>
    <a href="{{ '/writing/' | relative_url }}">Browse the notebook <span aria-hidden="true">→</span></a>
  </header>

  <div class="writing-list">
    {% for post in all_writing limit: 3 %}
      <a href="{{ post.url | relative_url }}">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b %Y" | upcase }}</time>
        <strong>{{ post.title }}</strong>
        <span>{% if post.collection == 'articles' %}Field guide{% else %}Notebook{% endif %}</span>
        <b aria-hidden="true">↗</b>
      </a>
    {% endfor %}
  </div>
</section>

<section class="working-notes">
  <span>NOTE TO SELF</span>
  <blockquote>“Make it useful. Make it understandable. Then make it delightful.”</blockquote>
  <p>I’m interested in the space where engineering, product judgment, and curiosity overlap.</p>
  <a href="{{ '/about' | relative_url }}">A little more about me <span aria-hidden="true">→</span></a>
</section>
