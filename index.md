## Welcome

You never know what you are capable of when you are doing yesterday over again – will.i.am

<div class="content">

<div class="projects" markdown="1">
<img class="right" src="/assets/lightbulb.png" alt="Projects" width="350">
## Projects

Personal projects I am working on:

{% for project in site.projects %}
* [{{ project.title }}]({{ project.url }})
  * {{ project.description }}
{% endfor %}
</div>

<div class="thoughts" markdown="1">
<img class="left" src="/assets/brain.png" alt="Brain" width="350" style="padding: 15px 15px 0px 0px;">

## Thoughts

Thoughts and opinions about pretty much anything that takes my fancy:

{% for thought in site.thoughts %}
* [{{ thought.title }}]({{ thought.url }})
{% endfor %}
</div>

<div class="articles" markdown="1">
<img class="right" src="/assets/articles.png" alt="Articles" width="350">
## Articles

Fact-based longer writing usually technology related:

{% for article in site.articles %}
* [{{ article.title }}]({{ article.url }})
{% endfor %}
</div>

</div>
