import { ASTKinds, parse as pegParse } from "./parser.js";

type PokesolTextParseReult = {
  pokemonName: string | null;
  itemName: string | null;
  abilityName: string | null;
  terastalName: string | null;
  natureName: string | null;
  ivs: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  evs: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  actualValue: {
    hp: number | null;
    attack: number | null;
    defense: number | null;
    specialAttack: number | null;
    specialDefense: number | null;
    speed: number | null;
  };
  moveNames: string[];
};

export const parse = (pokesolText: string): PokesolTextParseReult => {
  const result = pegParse(pokesolText);

  if (!result.ast) {
    throw new Error(result.errs.join(","));
  }

  const pokemonName = result.ast.line1.pokemon;
  const itemName =
    result.ast.line1.kind === ASTKinds.POKEMON_AND_ITEM_LINE
      ? result.ast.line1.item
      : null;

  const terastalName = result.ast.line2.teratype || null;
  const abilityName = result.ast.line3.ability || null;
  const natureName = result.ast.line4.nature || null;

  const evs = {
    hp:
      result.ast.line5.stats.h.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.stats.h.effort)
        : 0,
    attack:
      result.ast.line5.stats.a.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.stats.a.effort)
        : 0,
    defense:
      result.ast.line5.stats.b.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.stats.b.effort)
        : 0,
    specialAttack:
      result.ast.line5.stats.c.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.stats.c.effort)
        : 0,
    specialDefense:
      result.ast.line5.stats.d.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.stats.d.effort)
        : 0,
    speed:
      result.ast.line5.stats.s.kind === ASTKinds.ACTUAL_AND_EFFORT
        ? Number(result.ast.line5.stats.s.effort)
        : 0,
  };

  const actualValue = {
    hp: Number(result.ast.line5.stats.h.actual),
    attack: Number(result.ast.line5.stats.a.actual),
    defense: Number(result.ast.line5.stats.b.actual),
    specialAttack: Number(result.ast.line5.stats.c.actual),
    specialDefense: Number(result.ast.line5.stats.d.actual),
    speed: Number(result.ast.line5.stats.s.actual),
  };

  const ivs = {
    hp: 31,
    attack: 31,
    defense: 31,
    specialAttack: 31,
    specialDefense: 31,
    speed: 31,
  };
  if (result.ast.line5.kind === ASTKinds.STATS_AND_IV_LINE) {
    result.ast.line5.individuals.split(",").forEach((iv) => {
      const ivStatus = iv.match(/[HABCDS]/);
      const ivValue = iv.match(/\d+/);
      if (ivStatus !== null && ivValue !== null) {
        switch (ivStatus[0]) {
          case "H":
            ivs.hp = Number(ivValue[0]);
            break;
          case "A":
            ivs.attack = Number(ivValue[0]);
            break;
          case "B":
            ivs.defense = Number(ivValue[0]);
            break;
          case "C":
            ivs.specialAttack = Number(ivValue[0]);
            break;
          case "D":
            ivs.specialDefense = Number(ivValue[0]);
            break;
          case "S":
            ivs.speed = Number(ivValue[0]);
            break;
        }
      }
    });
  }

  const moveNames = [];
  if (result.ast.line6.kind === ASTKinds.MOVES_FOUR) {
    moveNames.push(result.ast.line6.move1);
    moveNames.push(result.ast.line6.move2);
    moveNames.push(result.ast.line6.move3);
    moveNames.push(result.ast.line6.move4);
  } else if (result.ast.line6.kind === ASTKinds.MOVES_THREE) {
    moveNames.push(result.ast.line6.move1);
    moveNames.push(result.ast.line6.move2);
    moveNames.push(result.ast.line6.move3);
  } else if (result.ast.line6.kind === ASTKinds.MOVES_TWO) {
    moveNames.push(result.ast.line6.move1);
    moveNames.push(result.ast.line6.move2);
  } else if (result.ast.line6.kind === ASTKinds.MOVES_ONE) {
    moveNames.push(result.ast.line6.move1);
  }

  return {
    pokemonName,
    itemName,
    abilityName,
    terastalName,
    natureName,
    ivs,
    evs,
    actualValue,
    moveNames,
  };
};
