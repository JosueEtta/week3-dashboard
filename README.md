# Pokédex Dashboard

A responsive Pokémon dashboard built as a Week 3 API-driven mini-dashboard project. It retrieves Pokémon data from the public PokéAPI and presents it in a searchable, filterable and sortable table.

**Created by:** Atabe Sikadi Josue Etta

## Technologies

- HTML5 for the page structure and accessible controls.
- CSS3 for the responsive layout, table, loading skeletons and visual styling.
- Vanilla JavaScript with ES modules for API requests, application state, filtering, sorting and DOM updates.
- [PokéAPI](https://pokeapi.co/) as the data source. No API key is required.
- Google Fonts for the Chakra Petch and Russo One typefaces.

## How it is implemented

The JavaScript is separated into three modules so that data retrieval, rendering and application behaviour are not mixed together.

### 1. Data retrieval — `js/api.js`

- `getJson(url)` sends requests with the browser's `fetch()` API.
- It checks `response.ok` and throws an error when the server responds with an unsuccessful HTTP status.
- `getPokemon(limit = 30)` first requests a list of Pokémon, then uses `Promise.all()` to request the details for each Pokémon concurrently.
- `toPokemon()` converts the API response into a smaller object containing the ID, name, image, types, HP and attack statistic.

### 2. Rendering and interface states — `js/ui.js`

This module selects the HTML elements and contains the functions that update the interface.

- `renderRows()` creates table rows from the Pokémon data using `map()`.
- `renderTypeOptions()` creates the type-filter options.
- `renderSkeleton()` displays placeholder rows while data is loading.
- Image placeholders are removed when each image loads or fails.
- `setLoading()` updates the table's `aria-busy` state and temporarily disables the controls.
- `showError()` and `hideError()` control the error message and retry interface.
- An empty-state row is displayed when no Pokémon match the selected filters.

### 3. Application logic — `js/script.js`

This is the entry point of the application.

- It stores the complete data and the current search, type and sort selections in one state object.
- `filterPokemon()` uses `filter()` to match the search text and selected Pokémon type.
- `sortPokemon()` sorts a copy of the filtered list by name, HP or attack. Copying the list prevents sorting from mutating the original data.
- `uniqueTypes()` uses `reduce()` to collect the available types without duplicates.
- `averageHp()` uses `reduce()` to calculate the average HP of the currently displayed Pokémon.
- The `update()` function applies the current filters and sort order, renders the result and updates the status text.
- The retry button runs the loading process again if the API request fails.

## Project structure

```text
week3-dashboard/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── api.js
    ├── ui.js
    └── script.js
```

## Features

- Loads the first 30 Pokémon from PokéAPI.
- Displays each Pokémon's image, name, types, HP and attack.
- Searches Pokémon by name.
- Filters the table by Pokémon type.
- Sorts by name, HP or attack.
- Shows the number of visible Pokémon and their average HP.
- Displays skeleton placeholders while loading.
- Handles failed requests and provides a retry button.
- Uses a responsive layout; the table can scroll horizontally on narrow screens.
- Includes accessible labels and status/error announcements.

## Run locally

The project uses JavaScript ES modules, so open it through a local web server rather than double-clicking `index.html`.

**Option 1 — VS Code Live Server**

1. Open the project folder in VS Code.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

**Option 2 — Python**

Run this command from the project folder:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## API

- API base URL: `https://pokeapi.co/api/v2`
- Endpoint used for the initial list: `/pokemon?limit=30`
- Each result's URL is then used to retrieve its detailed Pokémon data.

The dashboard requires an internet connection to retrieve API data and remote Pokémon images.
