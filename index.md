## Welcome

The beginning...

The humble start to a new chapter of web publishing.

## Articles

Longer writing:

* [Swift Playground](./articles/SwiftPlayground.md)

<ul>
  {% for article in site.articles %}
    <li><span>{{ article.date | date_to_string }}</span> » <a href="{{ article.url }}" title="{{ article.title }}">{{ article.title }}</a></li>
  {% endfor %}
</ul>

{% for article in site.articles %}
* [{{ article.title }}]({{ article.url }})
{% endfor %}
