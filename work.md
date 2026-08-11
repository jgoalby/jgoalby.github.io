---
title: Work
description: Selected projects and engineering case studies by John Goalby.
permalink: /work/
section: Project Index
---

# Work

Useful software starts with a real problem. These are projects where I explored an idea, worked within practical constraints, and built something people can use.

<div class="index-list" markdown="0">
{% assign sorted_projects = site.projects | sort: 'date' | reverse %}
{% for project in sorted_projects %}
  <a class="index-entry" href="{{ project.url | relative_url }}">
    <span class="index-number">0{{ forloop.index }}</span>
    <span class="index-copy">
      <strong>{{ project.title }}</strong>
      <small>{{ project.description }}</small>
    </span>
    <time datetime="{{ project.date | date_to_xmlschema }}">{{ project.date | date: "%Y" }}</time>
    <b aria-hidden="true">↗</b>
  </a>
{% endfor %}
</div>

