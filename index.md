## Welcome

You never know what you are capable of when you are doing yesterday over again – will.i.am

<div class="content">
    <img class="left" src="/assets/brain.png" alt="Brain" width="350">

    <div class="thoughts">
        ## Thoughts

        Thoughts and opinions about pretty much anything that takes my fancy:

        {% for thought in site.thoughts %}
        * [{{ thought.title }}]({{ thought.url }})
        {% endfor %}
    </div>

    <img class="right" src="/assets/articles.png" alt="Brain" width="350">

    <div class="articles">
        ## Articles

        Fact-based longer writing usually technology related:

        {% for article in site.articles %}
        * [{{ article.title }}]({{ article.url }})
        {% endfor %}
    </div>
</div>
