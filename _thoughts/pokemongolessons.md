---
layout: default
title: "Pokémon Go Lessons"
date: 2024-02-23
---

# TL;DR:
There's a lot to be learned from Pokémon Go as a Product Manager and Product Engineer.
- You don't have just one type of user. New users are very different than power users.
- Be careful fixing "bugs" that users come to rely on.
- Listen to your users and show that you are listening.
- There is no substitute for watching people using your product.
- Very small annoyances can add up over time to frustrate your customers.

# Background
I have been playing Pokémon Go since it was released. Every day. It helps motivate me to go for a walk. I am invested in the game and like many things about it. However there is a lot I wish were different. I feel there are lessons that can be learned from my experience with the game.

Here are my observations and lessons learned from Pokémon Go in no particular order.

# Heal and Revive Pokémon
After battling with your Pokémon you will likely have some that need to be revived and healed. You need to select each item you want to use and then you can apply that item to each of the Pokémon that needs it. If you use the same Pokémon for battles you will typically be on top of this process and not need to do many at once.

In the past few days Niantic has added buttons on the revive and heal screens to make reviving and healing multiple Pokémon at once easier. A button was added at the bottom of each screen. This is a welcome improvement. This shows that Niantic are making usability changes to improve gamers experience.

# Zygarde cells
You can follow a route to collect all of the Zygarde cells. I typically walk the same route at the same time each day. From what I can tell, the cells will only appear on a specific route 24 hours after you last received one. This means that if you walk a little earlier on the following day, you will not receive the reward. Effectively you have to finish your walk a little later than the previous day. Obviously this cannot be sustained and you will end up missing a day. In practice I run into this every couple of days. I could plan my walks to optimize for this, but I don't want to have that much structure over when I go for a walk.

What is the reason for this? Well, I don't know what the product team is thinking, but I presume they want to create scarcity in the game so that people keep playing it more. If you could get all of the cells you needed quickly, there would be less incentive to play the game.

However, having a 24 hour period creates the issue I outlined above. It would seem to me that this could be solved quite simply be creating a shorter period. Even 23 hours would work, although I don't see why it couldn't be 12 hours. People have to sleep after all. I just presume that 24 hours was chosen because it is a round number and it is easy to understand.

When you are designing a product you need to understand how people will use it. Even something as seemingly benign as a 24 hour window can be frustrating to your users.

# Postcard Management
When exchanging gifts you can save the postcard to an album. The album has a limit of a couple hundred items and can fill up quite quickly. You have to manage the items in the album otherwise you cannot save future postcards. Right now you have to select each postcard one by one to delete them. It would be better to be able to select all of the postcards at once to delete, or even better have a delete all button.

Postcard management is not the primary mechanism of the game so users should not really be spending time managing their postcard albums. By making this difficult It makes the feature more frustrating to use and less enjoyable.

# Animations
Every time you evolve a Pokémon you get an animation of it evolving. This is wonderful the first time you evolve a new Pokémon. It is still fun after a few more times. It gets just plain annoying after evolving for the 100th time. It would be nice if you could skip the animaiont if you don't want to see it.

It seems to me that Niantic might not want players to be able to skip the animation because it would mean they could evolve more Pokémon in a shorter period of time. That directly affects income if you consider that many players will use a Lucky Egg to boost XP while evolving Pokémon. That Lucky Egg lasts for 30 minutes and can be bought with coins. If you could skip the animation, you wouldn't need to purchase as many Lucky Eggs to get the same benefit.

When developing a product, what should you do when improving the user experience will possibly reduce income?

# Inopportune Notifications
There are many notifications that popup in the game. Sometimes they popup at the top of the screen. Other times the show at the bottom right of the screen. And yet other times they show up in the middle of the screen. And sometimes they appear down the whole right side of the scren. There's probably other ones I am forgetting. Being consistent is preferable of course, but many of these notifications are notifying different information so I can see how it makes sense. That's not my issue with the notifications, although may be the underlying cause.

Unfortunately more often that not, the notifications cover up areas of the screen that you need to get to for your next action. So you have to wait for the notification to go away before you can move ahead. A dedicated notification area might solve this, or alternatively having areas of the screen designated as action areas and not showing notifications in those areas.

# Purified Pokémon
Part of the allure of Pokémon Go is collecting all of the different types of Pokémon. There are many different types of Pokémon such as Shiny, Shadow, Purified, etc. In the Pokédex you can see the different types as collections. When viewing a Pokémon you can directly see if you have a Shiny or a Shadow version because the button shows an image of the resulting Pokémon. This is not the case for the purified Pokémon. To know if you have a purified version of a Pokémon you have to go to the Pokédex, change to the purified collection and search for that Pokémon. It would be much better if the purified Pokémon were shown on the buttons just like Shiny and Shadow versions.

# Assessment of abilities
Not all Pokémon are the same. You can appraise a Pokémon and see a 3 bar display for Attack, Defense, and HP. Higher is better. Unfortunately you have to convert those 3 bars into a number you can compare yourself. Worse than that though, is that for Player vs Player, it is not as simple as larger values. Depending on the specific Pokémon, some stats are better when the Attack is low and the Defense and HP are high. The details for this are beyond this article, but it is not simple to determine and varies on numerous factors. There are websites that can help you determine a numeric value for Raid and for PvP, so it seems that Niantic could add that within the game.

# Non selectable area
In the main game, at the bottom of the screen just above the Pokéball is a dead spot where anything on the screen cannot be selected. Sometimes a Pokémon will be in that area or a Pokéstop. You have to rotate your view to select the item. Not a game breaker by any means, but surely someone would have noticed this and fixed it. I can't imagine there being a good technical reason for not allowing selection in that area.

# Quick catch
If you play Pokémon normally, when catching a Pokémon you have to wait for the game to show you an animation of the Pokémon being caught. This is completely pointless from the player point of view as the element of surprise has long evaporated. You can though bypass this using a technique where you hold on to the ball menu on-screen while you throw the ball. It is a tricky little maneuver that is easy once you get the hang of it. The trick allows you to not wait while the Pokémon is caught. This is essential if you are catching many Pokémon such as at a Community Day event.

This is not an intended feature, but thankfully Niantic has not removed it. Users can get used to whatever your product throws at them, and you need to be aware of how they are using your product so you don't inadvertently "fix" a feature.

# Returning to where you were
There are times in the game where you enter an area, select an item or a reward and then once you have done that you are put back at the main screen. Keeping the location of the player consistent is important. Often I am completing field research and catch a Pokémon and then am put back at the main screen rather than the research page.

# Scatterbugs and Vivillon are hard to distinguish
The Scatterbug Pokémon are all identical despite evolving into many different types of Vivillon. The Vivillon are different patterns and colors but it can still be difficult to distinguish them. You do get notified of the type of Scatterbug when you catch it, but that's the only in game indication of the habitat type. Your best bet is to tag the Pokémon at that point if you have a tag for each of the different habitats. It makes management of these Pokémon difficult.

I don't think it is intentional to make distinguishing these Pokémon difficult. When showing information in your applications, make sure it is clear what the user is looking at.

# Tag management
Applying a tag to a Pokémon is quite simple. You can select from a responsive list of tags that is quick to navigate. It was changed in the past from a slow list to a much snappier list. Managing the tags though still uses the slower clunkier list. Getting to the bottom of the list of tags is painful. This clunkiness is likely because in the tag page you can see a list of the Pokémon with that tag. That list is limited to 11 with a button to see all of the Pokémon with that tag. I think showing the 11 Pokémon with that tag as a preview is not helpful and being able to click the tag to see all of the Pokémon with that tag would be sufficient. You have to scroll manually to get back to the top of the tags. Reordering tags is really painful because of the clunkiness and because the each tag takes up a lot of room.

Obviously tag management is not a central part of the game and maybe doesn't get the usability attention that other areas may get. Even so, it is painful to organize tags and could be made much better with a simple change. Having a QA process for all areas of the game would improve areas like this, making simple usability changes.

If you want to add a new tag to Pokémon, you need to scroll down the list of existing tags to get to the Add New Tag option. That could be positioned at the top of the page next to the image of the Pokémon so that it doesn't take up room and is easier to access. Then once you create a new tag it is actually not added to the Pokémon automatically. Often I add a new tag and then forget to actually add it to the Pokémon. This could be solved many ways. Simply having 2 buttons for adding a new tag is one solution where one of the buttons specifically adds a new tag and assigns it to the Pokémon as part of the same step.

# Raid Wait Time
When joining a raid there is a timer for 2 minutes before the raid begins. Quite often I want to participate in a single person raid. Up until recently you could not indicate you were ready for the raid to begin without waiting the full 2 minutes. This is different when multiple people join a raid. If multiple people join and all indicate they are ready, then the raid can begin.

The idea behind this feature is to allow other players time to get in on the raid. You don't want to have a raid that requires multiple people to complete and be left out from participating. This is a good feature. However, in the case of a single player, the raid has to be low difficulty and can easily be completed by a single player. I would actually pass on doing raids because I was on a walk and didn't want to stand around the area for 2 minutes waiting while nothing is happening.

Niantic did update the game to reduce the wait when a single player wants to join a raid. It is 30 seconds I believe. A welcome addition. I am not sure why it cannot just be 10 seconds, but I can wait for 30.

# Search feature
The game has a quite extensive search feature. You can search for Pokémon using various terms as well as using boolean operators to combine terms. This is impressive and very useful. The only issue I have with the search feature is the lack of discoverability. Even as someone that knows the feature exists, unless I use a particular search term often I easily forget it. It would be nice if there was a way to see in-game what search terms are possible.

# Rocket Hot Air Balloon
There is a hot air baloon that appears at certain times of the day. It has a habit of hovering over the middle of the screen, right over a Pokémon or Pokéstop that you want to click. I realize that it wants to get our attention, but it would be nice if it would go somewhere less annoying.

# Items screen delete
On the items screen you can delete items from your inventory. There is a pretty small trash can in the top corner of the icon for the item. You tap this to delete some items. Unfortunately while walking it is very easy to miss the trash can. When you miss the trash can you get a message saying that the item cannot be used here. The item is disabled, so it is obvious it cannot be used here. So, rather than allowing the user to achieve what they wanted to do, you show a message that just adds to the frustration of not being able to select the trash icon. Given that there's a confirmation in the delete screen anyway, it would not be a problem just to show the delete screen when you are close to pressing the trash icon on a disabled icon. Alternatively providing a little bigger trash icon or more room around the icon could improve the UX.

# Mega Evolution restrictions
Note that you can only contribute to an individual Pokémon's Mega Level once per day. The help center tells you that. The game doesn't. No indication given when day ends or that there's a limitation.

# Mega Evolve Confirmations
When mega evolving a Pokémon you click once to indicate you want to Mega Evolve, then a button to confirm you want to Mega Evolve, then another button to actually do the Mega Evolve, and then if you already have a Pokémon mega evolved, you need to confirm that you no longer want that mega Pokémon evolved. So, 4 confirmations.

Frequent players will work on mega evolving multiple Pokémon to get the best Pokédex, often mega evolving 10s or even possibly 100s of Pokémon at a time. You can imagine that confirming 4 times for each one can get a little draining. And then each evolution incurs waiting for the animation to complete (see below).

When there are multiple confirmations required in a sequence, it can be more efficient to provide more information and possibly alternative buttons on the first screen. So a Mega Evolve button and below it, a Mega Evolve Replace Existing button that bypasses all of the confirmations. The game could check ahead of time if this is a Pokémon that has been mega evolved and does not require extra Mega candy to prevent a mistake costing the gamer.

# Mega evolve animation every time
Every time you mega evolve a Pokémon you have to watch the animation. Much like the regular evolution animation. Not a surprise really. You have to mega evolve Pokémon each over 30 times to get to the highest level, so this animation takes up time, not to mention a small drain on power every time for every player, adding nothing to the experience for the player.

# Summary
There's a lot that goes into creating a product. Having people in-house that use the product is important. It is essential though to see how your actual customers are using it to really understand what is working and how to improve it.

# Some Questions / Todos
How does Niantic attract new users?
Would focus groups be useful?
Go out with users on watch them.
Use the game themselves (maybe they do).
Look on forums like Reddit.
