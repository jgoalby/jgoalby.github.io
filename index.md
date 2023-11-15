## Welcome

You never know what you are capable of when you are doing yesterday over again – will.i.am

<img class="left" src="/assets/brain.png" alt="Brain" width="350">

## Thoughts

Thoughts and opinions about pretty much anything that takes my fancy:

{% for thought in site.thoughts %}
* [{{ thought.title }}]({{ thought.url }})
{% endfor %}

<img class="right" src="/assets/articles.png" alt="Articles" width="350">

## Articles

Fact-based longer writing usually technology related:

{% for article in site.articles %}
* [{{ article.title }}]({{ article.url }})
{% endfor %}
