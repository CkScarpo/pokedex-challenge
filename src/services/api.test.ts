import { getAllPokemons } from "./api";

describe("getAllPokemons", () => {
  test("should fetch a list of Pokémon", async () => {
    const result = await getAllPokemons(10);
    expect(result.results.length).toBe(10);
  });
});
