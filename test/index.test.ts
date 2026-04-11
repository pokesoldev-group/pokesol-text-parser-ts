import { parse } from "../src/index.js";

describe("parse", () => {
  const expected = {
    pokemonName: "カイリュー",
    itemName: "あおぞらプレート",
    abilityName: "マルチスケイル",
    preMegaAbilityName: null,
    terastalName: "ステラ",
    natureName: "さみしがり",
    evs: {
      hp: 0,
      attack: 32,
      defense: 32,
      specialAttack: 0,
      specialDefense: 0,
      speed: 2,
    },
    actualValue: {
      hp: 166,
      attack: 204,
      defense: 132,
      specialAttack: 105,
      specialDefense: 105,
      speed: 101,
    },
    moveNames: ["じしん", "りゅうのまい", "テラバースト", "けたぐり"],
  };

  test("with full values", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("with whitespace", () => {
    const pokesolText = `カイリュー   @   あおぞらプレート
テラスタイプ  :   ステラ
特性  :   マルチスケイル
能力補正  :   さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん   /   りゅうのまい   /   テラバースト   /   けたぐり`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("without whitespace", () => {
    const pokesolText = `カイリュー@あおぞらプレート
テラスタイプ:ステラ
特性:マルチスケイル
能力補正:さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん/りゅうのまい/テラバースト/けたぐり`;
    expect(parse(pokesolText)).toEqual(expected);
  });

  test("with linebreaks", () => {
    const pokesolText = `カイリュー @ あおぞらプレート

テラスタイプ: ステラ

特性: マルチスケイル

能力補正: さみしがり

166-204(32)-132(32)-105-105-101(2)

じしん / りゅうのまい / テラバースト / けたぐり`;

    expect(parse(pokesolText)).toEqual(expected);
  });

  test("without item", () => {
    const pokesolText = `カイリュー
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({ ...expected, itemName: null });
  });

  test("without teratype", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: 
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({ ...expected, terastalName: null });
  });

  test("without teratype line", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({ ...expected, terastalName: null });
  });

  test("without ability", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性:
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({ ...expected, abilityName: null });
  });

  test("with pre-mega ability", () => {
    const pokesolText = `メガガブリアス @ ガブリアスナイト
特性: すなのちから(さめはだ)
能力補正: ようき
193(10)-200(10)-145(10)-135(10)-125(10)-140(16)
スケイルショット / だいちのちから / がんせきふうじ / ステルスロック`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "メガガブリアス",
      itemName: "ガブリアスナイト",
      abilityName: "すなのちから",
      preMegaAbilityName: "さめはだ",
      terastalName: null,
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
      moveNames: [
        "スケイルショット",
        "だいちのちから",
        "がんせきふうじ",
        "ステルスロック",
      ],
    });
  });

  test("without nature", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正:
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({ ...expected, natureName: null });
  });

  test("without EV", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204-132-105-105-101
じしん / りゅうのまい / テラバースト / けたぐり`;
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
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん`;
    expect(parse(pokesolText)).toEqual({ ...expected, moveNames: ["じしん"] });
  });

  test("with moves with alphabet", () => {
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
ＤＤラリアット`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      moveNames: ["ＤＤラリアット"],
    });
  });

  test("with pokemon name with kanji", () => {
    const pokesolText = `バドレックス(黒) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "バドレックス(黒)",
    });
  });

  test("with pokemon name with symbol (♂)", () => {
    const pokesolText = `パフュートン(♂) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "パフュートン(♂)",
    });
  });

  test("with pokemon name with symbol (・)", () => {
    const pokesolText = `カプ・コケコ @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "カプ・コケコ",
    });
  });

  test("with pokemon name with symbol (%)", () => {
    const pokesolText = `ジガルデ(50%) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ジガルデ(50%)",
    });
  });

  test("with pokemon name with number", () => {
    const pokesolText = `ジガルデ(10%) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ジガルデ(10%)",
    });
  });

  test("with pokemon name with full-width number", () => {
    const pokesolText = `ポリゴン２@ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ポリゴン２",
    });
  });

  test("with pokemon name with alphabet", () => {
    const pokesolText = `ミュウツー(メガX) @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ミュウツー(メガX)",
    });
  });

  test("with pokemon name with full-width alphabet", () => {
    const pokesolText = `ポリゴンＺ @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)
じしん / りゅうのまい / テラバースト / けたぐり`;
    expect(parse(pokesolText)).toEqual({
      ...expected,
      pokemonName: "ポリゴンＺ",
    });
  });

  test("without stats and moves line", () => {
    const pokesolText = `カイリュー
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり`;
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
    const pokesolText = `カイリュー
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
じしん / りゅうのまい / テラバースト / けたぐり`;
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
    const pokesolText = `カイリュー @ あおぞらプレート
テラスタイプ: ステラ
特性: マルチスケイル
能力補正: さみしがり
166-204(32)-132(32)-105-105-101(2)`;
    expect(parse(pokesolText)).toEqual({ ...expected, moveNames: [] });
  });

  test("with comments", () => {
    const pokesolText = `
// comment
カイリュー @ あおぞらプレート // comment
テラスタイプ: ステラ          // comment
特性: マルチスケイル          // comment
能力補正: さみしがり          // comment
// comment
166-204(32)-132(32)-105-105-101(2)    // comment
じしん / りゅうのまい / テラバースト / けたぐり// comment
// comment
`;
    expect(parse(pokesolText)).toEqual(expected);
  });
});
