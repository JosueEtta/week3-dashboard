const BASE_URL = "https://pokeapi.co/api/v2";

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Status ${response.status}`);
  }
  return response.json();
}

function getStat(data, name) {
  return data.stats.find((s) => s.stat.name === name).base_stat;
}

function toPokemon(data) {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
    hp: getStat(data, "hp"),
    attack: getStat(data, "attack"),
  };
}

export async function getPokemon(limit = 30) {
  const list = await getJson(`${BASE_URL}/pokemon?limit=${limit}`);
  const details = await Promise.all(list.results.map((p) => getJson(p.url)));
  return details.map(toPokemon);
}
