import { getPokemon } from "./api.js";
import {
  el,
  renderRows,
  renderSkeleton,
  clearRows,
  renderTypeOptions,
  setStatus,
  setLoading,
  showError,
  hideError,
} from "./ui.js";

const state = { all: [], search: "", type: "all", sort: "name" };

function filterPokemon(list) {
  const query = state.search.trim().toLowerCase();
  return list.filter((p) => {
    const matchesName = p.name.includes(query);
    const matchesType = state.type === "all" || p.types.includes(state.type);
    return matchesName && matchesType;
  });
}

function sortPokemon(list) {
  const sorters = {
    name: (a, b) => a.name.localeCompare(b.name),
    hp: (a, b) => b.hp - a.hp,
    attack: (a, b) => b.attack - a.attack,
  };
  return [...list].sort(sorters[state.sort]);
}

function uniqueTypes(list) {
  const types = list.reduce((found, p) => {
    p.types.forEach((t) => {
      if (!found.includes(t)) found.push(t);
    });
    return found;
  }, []);
  return types.sort();
}

function averageHp(list) {
  return list.reduce((sum, p) => sum + p.hp, 0) / list.length;
}

function statusText(list) {
  if (!list.length) return "No Pokémon found";
  return `Showing ${list.length} Pokémon · Average HP ${averageHp(list).toFixed(1)}`;
}

function update() {
  const visible = sortPokemon(filterPokemon(state.all));
  renderRows(visible);
  setStatus(statusText(visible));
}

function onSearch(event) {
  state.search = event.target.value;
  update();
}

function onType(event) {
  state.type = event.target.value;
  update();
}

function onSort(event) {
  state.sort = event.target.value;
  update();
}

async function loadPokemon() {
  hideError();
  setLoading(true);
  setStatus("Loading Pokémon...");
  renderSkeleton();
  try {
    state.all = await getPokemon();
    renderTypeOptions(uniqueTypes(state.all));
    update();
  } catch (error) {
    clearRows();
    setStatus("");
    showError(`Could not load Pokémon. ${error.message}`);
  } finally {
    setLoading(false);
  }
}

function bindEvents() {
  el.search.addEventListener("input", onSearch);
  el.type.addEventListener("change", onType);
  el.sort.addEventListener("change", onSort);
  el.retry.addEventListener("click", loadPokemon);
}

bindEvents();
loadPokemon();
