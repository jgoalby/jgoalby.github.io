## Welcome

You never know what you are capable of when you are doing yesterday over again – will.i.am

<img align="left" src="/assets/brain.png" alt="Brain" width="250" style="padding: 15px 15px 0px 0px;">

## Thoughts

Shorter writing:

{% for thought in site.thoughts %}
* [{{ thought.title }}]({{ thought.url }})
{% endfor %}

<br>

## Articles

Longer writing:

{% for article in site.articles %}
* [{{ article.title }}]({{ article.url }})
{% endfor %}
