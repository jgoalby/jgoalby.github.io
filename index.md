## Welcome

You never know what you are capable of when you are doing yesterday over again – will.i.am

<img align="left" src="/assets/brain.png" alt="Brain" width="350" style="padding: 15px 15px 0px 0px;">

## Thoughts

Thoughts an opinions about pretty much anything that takes my fancy:

{% for thought in site.thoughts %}
* [{{ thought.title }}]({{ thought.url }})
{% endfor %}

<br><br><br><br><br><br>

<img align="right" src="/assets/articles.png" alt="Brain" width="350" style="padding: 0px 0px 15px 15px;">

## Articles

Fact-based longer writing usually technology related:

{% for article in site.articles %}
* [{{ article.title }}]({{ article.url }})
{% endfor %}

