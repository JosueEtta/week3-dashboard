const SKELETON_ROWS = 8;

export const el = {
  rows: document.querySelector(".js-rows"),
  table: document.querySelector(".js-table"),
  status: document.querySelector(".js-status"),
  error: document.querySelector(".js-error"),
  errorText: document.querySelector(".js-error-text"),
  retry: document.querySelector(".js-retry"),
  search: document.querySelector(".js-search"),
  type: document.querySelector(".js-type"),
  sort: document.querySelector(".js-sort"),
};

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function chipsHtml(types) {
  return types.map((t) => `<span class="chip">${capitalize(t)}</span>`).join("");
}

function imageHtml(pokemon) {
  if (!pokemon.image) {
    return `<div class="thumb thumb-loaded"></div>`;
  }
  return `
    <div class="thumb skeleton">
      <img class="thumb-img" src="${pokemon.image}" alt="${capitalize(pokemon.name)}" width="64" height="64">
    </div>`;
}

function rowHtml(pokemon) {
  return `
    <tr class="row">
      <td class="cell cell-image">${imageHtml(pokemon)}</td>
      <td class="cell name">${capitalize(pokemon.name)}</td>
      <td class="cell"><div class="types">${chipsHtml(pokemon.types)}</div></td>
      <td class="cell value">${pokemon.hp}</td>
      <td class="cell value">${pokemon.attack}</td>
    </tr>`;
}

function skeletonRowHtml() {
  return `
    <tr class="row">
      <td class="cell cell-image"><div class="thumb skeleton"></div></td>
      <td class="cell"><div class="skeleton skeleton-line"></div></td>
      <td class="cell"><div class="skeleton skeleton-line skeleton-line-short"></div></td>
      <td class="cell"><div class="skeleton skeleton-line skeleton-line-short"></div></td>
      <td class="cell"><div class="skeleton skeleton-line skeleton-line-short"></div></td>
    </tr>`;
}

function emptyHtml() {
  return `<tr><td class="cell empty" colspan="5">No Pokémon match your search.</td></tr>`;
}

function markLoaded(img) {
  img.parentElement.classList.remove("skeleton");
  img.parentElement.classList.add("thumb-loaded");
}

function watchImages() {
  el.rows.querySelectorAll(".thumb-img").forEach((img) => {
    if (img.complete) {
      markLoaded(img);
      return;
    }
    img.addEventListener("load", () => markLoaded(img));
    img.addEventListener("error", () => markLoaded(img));
  });
}

export function renderRows(list) {
  el.rows.innerHTML = list.length ? list.map(rowHtml).join("") : emptyHtml();
  watchImages();
}

export function renderSkeleton() {
  el.rows.innerHTML = skeletonRowHtml().repeat(SKELETON_ROWS);
}

export function clearRows() {
  el.rows.innerHTML = "";
}

export function renderTypeOptions(types) {
  const options = types.map((t) => `<option value="${t}">${capitalize(t)}</option>`);
  el.type.innerHTML = `<option value="all">All types</option>${options.join("")}`;
}

export function setStatus(text) {
  el.status.textContent = text;
}

export function setLoading(isLoading) {
  el.table.setAttribute("aria-busy", String(isLoading));
  [el.search, el.type, el.sort].forEach((control) => {
    control.disabled = isLoading;
  });
}

export function showError(message) {
  el.errorText.textContent = message;
  el.error.classList.remove("is-hidden");
}

export function hideError() {
  el.error.classList.add("is-hidden");
}