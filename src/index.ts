import { ASTKinds, parse as pegParse } from "./parser.js"

type PokesolTextParseReult = {
  pokemonName:  string | null;
  itemName:     string | null;
  abilityName:  string | null;
  terastalName: string | null;
  natureName:   string | null;
  ivs: {
    hp:             number;
    attack:         number;
    defense:        number;
    specialAttack:  number;
    specialDefense: number;
    speed:          number;
  };
  evs: {
    hp:             number;
    attack:         number;
    defense:        number;
    specialAttack:  number;
    specialDefense: number;
    speed:          number;
  };
  actualValue: {
    hp:             number | null;
    attack:         number | null;
    defense:        number | null;
    specialAttack:  number | null;
    specialDefense: number | null;
    speed:          number | null;
  };
  moveNames: string[];
};

export const parse = (pokesolText: string): PokesolTextParseReult => {
  const result = pegParse(pokesolText)

  if (!result.ast) {
    throw new Error()
  }

  const pokemonName = result.ast.line1.pokemon

  const itemName =
    result.ast.line1.kind === ASTKinds.POKEMON_AND_ITEM_LINE
    ? result.ast.line1.item
    : null

  const abilityName =
    result.ast.line2.kind === ASTKinds.ABILITY_AND_TERATYPE_LINE ||
    result.ast.line2.kind === ASTKinds.ABILITY_LINE
    ? result.ast.line2.ability.value
    : null

  const terastalName =
    result.ast.line2.kind === ASTKinds.ABILITY_AND_TERATYPE_LINE ||
    result.ast.line2.kind === ASTKinds.TERATYPE_LINE
    ? result.ast.line2.teratype.value
    : null

  const natureName =
    result.ast.line3.kind === ASTKinds.NATURE_AND_IV_LINE ||
    result.ast.line3.kind === ASTKinds.NATURE_LINE
    ? result.ast.line3.nature.value
    : null

  const ivs =
    result.ast.line3.kind === ASTKinds.NATURE_AND_IV_LINE ||
    result.ast.line3.kind === ASTKinds.IV_LINE
    ? {
      hp:             result.ast.line3.iv.h ? Number(result.ast.line3.iv.h.value) : 31,
      attack:         result.ast.line3.iv.a ? Number(result.ast.line3.iv.a.value) : 31,
      defense:        result.ast.line3.iv.b ? Number(result.ast.line3.iv.b.value) : 31,
      specialAttack:  result.ast.line3.iv.c ? Number(result.ast.line3.iv.c.value) : 31,
      specialDefense: result.ast.line3.iv.d ? Number(result.ast.line3.iv.d.value) : 31,
      speed:          result.ast.line3.iv.s ? Number(result.ast.line3.iv.s.value) : 31,
    }
    : {
      hp:             31,
      attack:         31,
      defense:        31,
      specialAttack:  31,
      specialDefense: 31,
      speed:          31,
    }

  const evs = {
    hp:             result.ast.line4.h.kind === ASTKinds.ACTUAL_AND_EV ? Number(result.ast.line4.h.ev) : 0,
    attack:         result.ast.line4.a.kind === ASTKinds.ACTUAL_AND_EV ? Number(result.ast.line4.a.ev) : 0,
    defense:        result.ast.line4.b.kind === ASTKinds.ACTUAL_AND_EV ? Number(result.ast.line4.b.ev) : 0,
    specialAttack:  result.ast.line4.c.kind === ASTKinds.ACTUAL_AND_EV ? Number(result.ast.line4.c.ev) : 0,
    specialDefense: result.ast.line4.d.kind === ASTKinds.ACTUAL_AND_EV ? Number(result.ast.line4.d.ev) : 0,
    speed:          result.ast.line4.s.kind === ASTKinds.ACTUAL_AND_EV ? Number(result.ast.line4.s.ev) : 0,
  }

  const actualValue = {
    hp:             Number(result.ast.line4.h.value),
    attack:         Number(result.ast.line4.a.value),
    defense:        Number(result.ast.line4.b.value),
    specialAttack:  Number(result.ast.line4.c.value),
    specialDefense: Number(result.ast.line4.d.value),
    speed:          Number(result.ast.line4.s.value),
  }

  const moveNames = []
  if (result.ast.line5.kind === ASTKinds.FOUR_MOVES) {
    moveNames.push(result.ast.line5.move1)
    moveNames.push(result.ast.line5.move2)
    moveNames.push(result.ast.line5.move3)
    moveNames.push(result.ast.line5.move4)
  } else if (result.ast.line5.kind === ASTKinds.THREE_MOVES) {
    moveNames.push(result.ast.line5.move1)
    moveNames.push(result.ast.line5.move2)
    moveNames.push(result.ast.line5.move3)
  } else if (result.ast.line5.kind === ASTKinds.TWO_MOVES) {
    moveNames.push(result.ast.line5.move1)
    moveNames.push(result.ast.line5.move2)
  } else if (result.ast.line5.kind === ASTKinds.ONE_MOVE) {
    moveNames.push(result.ast.line5.move1)
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
  }
}
