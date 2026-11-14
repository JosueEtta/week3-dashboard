# Pokédex Dashboard

Week 3 assignment: API-Driven Mini Dashboard.

## API used

[PokéAPI](https://pokeapi.co/) (free, no key needed). The app loads the first 30 Pokémon and shows image, name, types, HP and attack.

## How to run

ES modules only work through a server, so do not double-click `index.html`.

- VS Code: right-click `index.html` and choose **Open with Live Server**.
- Or from this folder: `python -m http.server 8000`, then open http://localhost:8000

## Features

- Search by name, filter by type, sort by name, HP or attack
- Skeleton rows and image skeletons while loading, plus a spinner and a status line
- Error message with a Try again button (checks `response.ok`)
- Responsive layout (the table scrolls sideways on small screens)

## Where each requirement is

- `js/api.js`: `fetch`, `response.ok`, `Promise.all`
- `js/ui.js`: rendering with `map`, loading and error states
- `js/script.js`: `filter`, `sort`, `find` (in `api.js`), `reduce` (unique types and average HP)

## Screenshot

Add one screenshot here before submitting.
