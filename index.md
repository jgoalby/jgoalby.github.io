## Welcome

You never know what you are capable of when you are doing yesterday over again – will.i.am

## Thoughts

Shorter writing:

{% for thought in site.thoughts %}
* [{{ thought.title }}]({{ thought.url }})
{% endfor %}


## Articles

Longer writing:

{% for article in site.articles %}
* [{{ article.title }}]({{ article.url }})
{% endfor %}
