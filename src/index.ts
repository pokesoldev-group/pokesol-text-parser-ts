import { ASTKinds, parse as pegParse } from "./parser.js";

type ActualValue = {
  hp: number | null;
  attack: number | null;
  defense: number | null;
  specialAttack: number | null;
  specialDefense: number | null;
  speed: number | null;
};

export type PokesolTextParseReult = {
  pokemonName: string | null;
  itemName: string | null;
  abilityName: string | null;
  preMegaAbilityName: string | null;
  terastalName: string | null;
  natureName: string | null;
  evs: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  actualValue: ActualValue;
  moveNames: string[];
};

export const parse = (pokesolText: string): PokesolTextParseReult => {
  const result = pegParse(chomp(pokesolText));

  if (!result.ast) {
    throw new Error(
      `Failed to parse Pokesol Text: ${JSON.stringify(result.errs)}`
    );
  }

  const pokemonName = result.ast.line1.pokemon;
  const itemName =
    result.ast.line1.kind === ASTKinds.POKEMON_AND_ITEM_LINE
      ? result.ast.line1.item
      : null;

  const terastalName = result.ast.line2?.body.teratype || null;
  const abilityName = result.ast.line3.ability || null;
  const preMegaAbilityName = result.ast.line3.preMega?.body || null;
  const natureName = result.ast.line4.nature || null;

  const evs = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };
  const actualValue: ActualValue = {
    hp: null,
    attack: null,
    defense: null,
    specialAttack: null,
    specialDefense: null,
    speed: null,
  };

  if (result.ast.line5 !== null) {
    evs.hp =
      result.ast.line5.body.stats.h.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.body.stats.h.effort)
        : 0;
    evs.attack =
      result.ast.line5.body.stats.a.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.body.stats.a.effort)
        : 0;
    evs.defense =
      result.ast.line5.body.stats.b.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.body.stats.b.effort)
        : 0;
    evs.specialAttack =
      result.ast.line5.body.stats.c.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.body.stats.c.effort)
        : 0;
    evs.specialDefense =
      result.ast.line5.body.stats.d.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.body.stats.d.effort)
        : 0;
    evs.speed =
      result.ast.line5.body.stats.s.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.body.stats.s.effort)
        : 0;
    actualValue.hp = Number(result.ast.line5.body.stats.h.actual);
    actualValue.attack = Number(result.ast.line5.body.stats.a.actual);
    actualValue.defense = Number(result.ast.line5.body.stats.b.actual);
    actualValue.specialAttack = Number(result.ast.line5.body.stats.c.actual);
    actualValue.specialDefense = Number(result.ast.line5.body.stats.d.actual);
    actualValue.speed = Number(result.ast.line5.body.stats.s.actual);
  }

  const moveNames = [];
  if (result.ast.line6 !== null) {
    if (result.ast.line6.body.kind === ASTKinds.MOVES_FOUR) {
      moveNames.push(result.ast.line6.body.move1);
      moveNames.push(result.ast.line6.body.move2);
      moveNames.push(result.ast.line6.body.move3);
      moveNames.push(result.ast.line6.body.move4);
    } else if (result.ast.line6.body.kind === ASTKinds.MOVES_THREE) {
      moveNames.push(result.ast.line6.body.move1);
      moveNames.push(result.ast.line6.body.move2);
      moveNames.push(result.ast.line6.body.move3);
    } else if (result.ast.line6.body.kind === ASTKinds.MOVES_TWO) {
      moveNames.push(result.ast.line6.body.move1);
      moveNames.push(result.ast.line6.body.move2);
    } else if (result.ast.line6.body.kind === ASTKinds.MOVES_ONE) {
      moveNames.push(result.ast.line6.body.move1);
    }
  }

  return {
    pokemonName,
    itemName,
    abilityName,
    preMegaAbilityName,
    terastalName,
    natureName,
    evs,
    actualValue,
    moveNames,
  };
};

const chomp = (text: string): string => {
  return text
    .split('\n')                      // for each line
    .map(line => line.split('//')[0]) // - remove comment
    .map(line => line.trim())         // - remove trailing whitespace
    .filter(line => line.length > 0)  // - remove empty line
    .join('\n');                      // then concat
}
