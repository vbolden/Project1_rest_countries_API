# Frontend Mentor - REST Countries API with color theme switcher solution

This is my solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)
  - [Reflection](#reflection)


## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*


### Links

- Live Site URL: (https://vbolden.github.io/Project1_rest_countries_API/ )

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Bootstrap
- JavaScript


### Useful resources

- Module 5 Lesson 6 (Per Scholas)
- Module 6 (Per Scholas)
- MDN (https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams): introduced me to and helped me understand URLSearchParams interface
- MDN (https://developer.mozilla.org/en-US/docs/Web/API/Window): helped me find very helpful window interface instance properties
- W3Schools (https://www.w3schools.com/html/html_form_input_types.asp): helped me brush up on input types
- Frontend Mentor Challenge (https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca): provided starter files

# Reflection

My development process for this project was a little rough starting out. I restructured my folders and files a lot throughout this project, but eventually I came up with a project plan to help me organize better. My first step was creating a simple HTML layout for the main page and basic CSS styling to give the page structure. Then I moved on to JS, where I started with writing my fetch, render, theme, and search and filter functions. After I was finished with those I moved on to the details page and again gave it a simple HTML layout and basic CSS styling. I then moved my theme function to its own js file since it would be the only function shared between the 2 HTML pages. I then moved on to writing the functionality of the details page in another js file. I faced a lot of challenges especially with the API fetching, I had to refer back to notes and the lessons for most of it. Writing the functionality for the details was probably the biggest challenge because it was more intricate. Especially when it came to fetching data that had objects nested in arrays, but using my resources I was able to look up different methods and utilites to help me write the functions. For future projects I'll need to work on spending a little more time on planning out my project before I start creating any folders or files to avoid deleting and moving them multiple times. Also, I'll continue researching and learning about more JavaScript methods.

Code snippets I want to highlight:

```html
<div style="max-width: 350px; width: 100%;">
                    <div id="search-container" class="d-flex align-items-center gap-2 p-1 shadow-sm rounded">
                        <ion-icon name="search-outline" id="search-icon"></ion-icon>
                        <input type="text" id="search" class="form-control border-0"
                            placeholder="Search for a country...">
                    </div>
                </div>
```
```css
body.dark-mode #theme-text {
    color: hsl(0, 0%, 100%);
}
```
```js
async function getBorderCountries(data) {
    const borders = data.borders || [];

    if (borders.length === 0) return [];

    const borderNames = [];

    for (let i = 0; i < borders.length; i++) {
        const code = borders[i];

        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            const data = await response.json();

            const name = data[0].name.common;
            const countryCode = data[0].cca3;

            borderNames.push({ name, code: countryCode });

        } catch (error) {
            console.error("Error: ", error);
        }
    }
    return borderNames;
}
```