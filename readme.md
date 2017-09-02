<img src="https://raw.githubusercontent.com/jeffreylowy/guardians-of-the-galaxy-rpg/master/assets/images/logo.png" width="400">

### RPG game homework for week 4

[PLAY](https://jeffreylowy.github.io/guardians-of-the-galaxy-rpg/)

## $(document).on(ready) & $(window).on("load")
I use document/ready to overwrite some basic HTML in the page, then load the gifs. I created gifs using clips form the Guardians of the Galaxy trailer. The loading screen should disappear once the window has loaded. window/load handles the remainder of the page setup, then calls the chooseCharacter method.


## Choosing a character

I organized the game code as an object - everything lives under the rpg object. The game begins once two characters have been chosen by the user. For the interface, I used flexbox to layout the character images, I then listen for a transition on the flex property for each character. The background images are initially set as a jpg, then swapped for the gif version when the user hovers.

To display the character name, I add and animate [:before and :after](LINE 136) content in the character span.

## Animating Characters 

I downloaded these gifs from Dribble. I opened them in photoshop and [laid out all of the frames](https://raw.githubusercontent.com/jeffreylowy/guardians-of-the-galaxy-rpg/master/assets/images/groot.png) next to each other. When a game is started, I set these long png images as the background and then animate the background by using css' step function, which you can see [here on line 245 of style.css]().

The effect is triggered every time the [attack](LINE204) button is pressed.

<img src="https://raw.githubusercontent.com/jeffreylowy/guardians-of-the-galaxy-rpg/master/assets/images/character_gif_psd/rocket.gif" width="150">

## External libraries

I used the TypeIt library for jQuery to animate the messages that are displayed on screen. I created [my own function](LINE 240) that wraps around the library code, which made it a little easier for me to read and call in other functions.

For the attack/reset buttons, I borrowed code from this [Codepen](https://codepen.io/nw/pen/GqBzJ?limit=all&page=10&q=button)

Finally, for the pulse effect on the attack button, I borrowed these lines of code from animate.css. I just wanted the pulse effect, so rather than load the entire library I just [use this code](LINE 33).

## Resources
[CSS Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[CSS Tricks - Restart CSS Animation](https://css-tricks.com/restart-css-animation/)

[Treehouse - CSS Sprite Sheet Animations with steps()](http://blog.teamtreehouse.com/css-sprite-sheet-animations-steps)

[MDN - background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)

[Stack Overflow - $(window).on("load")](https://stackoverflow.com/questions/544993/official-way-to-ask-jquery-wait-for-all-images-to-load-before-executing-somethin)

[TypeIt - jQuery typing plugin](https://macarthur.me/typeit/)

[Codepen - Shiny button effect](https://codepen.io/nw/pen/GqBzJ?limit=all&page=10&q=button)