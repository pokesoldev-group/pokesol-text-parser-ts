import { parse } from "../src/index.js";

describe("parse", () => {
  const expected = {
    pokemonName: "メガガブリアス",
    itemName: "ガブリアスナイト",
    abilityName: "すなのちから",
    preMegaAbilityName: "さめはだ",
    terastalName: "ステラ",
    natureName: "ようき",
    evs: {
      hp: 10,
      attack: 10,
      defense: 10,
      specialAttack: 10,
      specialDefense: 10,
      speed: 16,
    },
    actualValue: {
      hp: 193,
      attack: 200,
      defense: 145,
      specialAttack: 135,
      specialDefense: 125,
      speed: 140,
    },
    moveNames: ["スケイルショット", "だいちのちから", "がんせきふうじ", "ステルスロック"],
  };

  test("with full values", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("with whitespace", () => {
    const pokesolText = `メガガブリアス   @   ガブリアスナイト
テラスタイプ  :   ステラ
特性  :   すなのちから    (さめはだ)
能力補正  :   ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット   /   だいちのちから   /   がんせきふうじ   /   ステルスロック`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("without whitespace", () => {
    const pokesolText = `メガガブリアス@ガブリアスナイト
テラスタイプ:ステラ
特性:すなのちから(さめはだ)
能力補正:ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット/だいちのちから/がんせきふうじ/ステルスロック`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("with linebreaks", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト

テラスタイプ: ステラ

特性: すなのちから(さめはだ)

能力補正: ようき

193(10)-200(10)-145(10)-135(10)-125(10)-140(16)

スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;

    expect(parse(pokesolText)).toEqual(expected);
  });

  test("without item", () => {
    const pokesolText = `メガガブリアス
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({ ...expected, itemName: null });
  });

  test("without teratype", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
テラスタイプ:
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({ ...expected, terastalName: null });
  });

  test("without teratype line", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({ ...expected, terastalName: null });
  });

  test("without ability", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
テラスタイプ: ステラ
特性:
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({ ...expected, abilityName: null, preMegaAbilityName: null });
  });

  test("without pre-mega ability", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("without nature", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正:
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({ ...expected, natureName: null });
  });

  test("without EV", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193-200-145-135-125-140
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      evs: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
    });
  });

  test("with partial moves", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット`;
    expect(parse(pokesolText)).toEqual({ ...expected, moveNames: ["スケイルショット"] });
  });

  test("with moves with alphabet", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
ＤＤラリアット`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      moveNames: ["ＤＤラリアット"],
    });
  });

  test("with pokemon name with kanji", () => {
    const pokesolText = `バドレックス(黒) @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "バドレックス(黒)",
    });
  });

  test("with pokemon name with symbol (♂)", () => {
    const pokesolText = `パフュートン(♂) @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "パフュートン(♂)",
    });
  });

  test("with pokemon name with symbol (・)", () => {
    const pokesolText = `カプ・コケコ @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "カプ・コケコ",
    });
  });

  test("with pokemon name with symbol (%)", () => {
    const pokesolText = `ジガルデ(50%) @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ジガルデ(50%)",
    });
  });

  test("with pokemon name with number", () => {
    const pokesolText = `ジガルデ(10%) @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ジガルデ(10%)",
    });
  });

  test("with pokemon name with full-width number", () => {
    const pokesolText = `ポリゴン２@ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ポリゴン２",
    });
  });

  test("with pokemon name with alphabet", () => {
    const pokesolText = `ミュウツー(メガX) @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ミュウツー(メガX)",
    });
  });

  test("with pokemon name with full-width alphabet", () => {
    const pokesolText = `ポリゴンＺ @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ポリゴンＺ",
    });
  });

  test("without stats and moves line", () => {
    const pokesolText = `メガガブリアス
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      itemName: null,
      evs: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
      actualValue: {
        hp: null,
        attack: null,
        defense: null,
        specialAttack: null,
        specialDefense: null,
        speed: null,
      },
      moveNames: [],
    });
  });

  test("without stats line", () => {
    const pokesolText = `メガガブリアス
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      itemName: null,
      evs: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
      actualValue: {
        hp: null,
        attack: null,
        defense: null,
        specialAttack: null,
        specialDefense: null,
        speed: null,
      },
    });
  });

  test("without moves line", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
テラスタイプ: ステラ
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)`;
    expect(parse(pokesolText)).toEqual({ ...expected, moveNames: [] });
  });

  test("with comments", () => {
    const pokesolText = `
// comment
メガガブリアス @ ガブリアスナイト // comment
テラスタイプ: ステラ          // comment
特性: すなのちから(さめはだ)          // comment
能力補正: ようき          // comment
// comment
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)    // comment
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック// comment
// comment
`;
    expect(parse(pokesolText)).toEqual(expected);
  });
});
