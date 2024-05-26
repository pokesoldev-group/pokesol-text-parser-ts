/* AutoGenerated Code, changes may be overwritten
* INPUT GRAMMAR:
* POKESOL_TEXT :=
*   line1={ POKEMON_AND_ITEM_LINE | POKEMON_LINE } '\n'
*   line2=TERATYPE_LINE '\n'
*   line3=ABILITY_LINE '\n'
*   line4=NATURE_LINE
*   line5={ '\n' body={ STATS_AND_IV_LINE | STATS_LINE } }?
*   line6={ '\n' body=MOVES_LINE }?
* // 1 行目
* POKEMON_AND_ITEM_LINE := pokemon=POKEMON_VALUE _ '@' _ item=ITEM_VALUE
* POKEMON_LINE          := pokemon=POKEMON_VALUE
* POKEMON_VALUE         := '[0-9a-zA-Zぁ-んァ-ヶー一-龠・()♂♀%]+'
* ITEM_VALUE            := '[ぁ-んァ-ヶー]+'
* // 2 行目
* TERATYPE_LINE  := 'テラスタイプ' _ ':' _ teratype=TERATYPE_VALUE?
* TERATYPE_VALUE := '[ぁ-んァ-ヶー]*'
* // 3 行目
* ABILITY_LINE  := '特性' _ ':' _ ability=ABILITY_VALUE?
* ABILITY_VALUE := '[ぁ-んァ-ヶー]+'
* // 4 行目
* NATURE_LINE  := '性格' _ ':' _ nature=NATURE_VALUE?
* NATURE_VALUE := '[ぁ-ん]+'
* // 5 行目
* STATS_AND_IV_LINE := stats=STATS _ '\*' _ individuals=INDIVIDUALS
* STATS_LINE        := stats=STATS
* STATS             := h=STAT '-' a=STAT '-' b=STAT '-' c=STAT '-' d=STAT '-' s=STAT
* STAT              := ACTUAL_AND_EFFORT | ACTUAL
* ACTUAL_AND_EFFORT := actual=ACTUAL_VALUE '\(' effort=EFFORT_VALUE '\)'
* ACTUAL            := actual=ACTUAL_VALUE
* ACTUAL_VALUE      := '[1-9][0-9]*'
* EFFORT_VALUE      := '[1-9][0-9]*'
* INDIVIDUALS       := '[HABCDS0-9, ]+' // TODO: ちゃんとパースする
* // 6 行目
* MOVES_LINE  := MOVES_FOUR | MOVES_THREE | MOVES_TWO | MOVES_ONE
* MOVES_FOUR  := move1=MOVE_VALUE _ '/' _ move2=MOVE_VALUE _ '/' _ move3=MOVE_VALUE _ '/' _ move4=MOVE_VALUE
* MOVES_THREE := move1=MOVE_VALUE _ '/' _ move2=MOVE_VALUE _ '/' _ move3=MOVE_VALUE
* MOVES_TWO   := move1=MOVE_VALUE _ '/' _ move2=MOVE_VALUE
* MOVES_ONE   := move1=MOVE_VALUE
* MOVE_VALUE  := '[０-９A-Zぁ-んァ-ヶー・]+'
* // 空白
* _ := '[ \t]*'
*/
type Nullable<T> = T | null;
type $$RuleType<T> = () => Nullable<T>;
export interface ASTNodeIntf {
    kind: ASTKinds;
}
export enum ASTKinds {
    POKESOL_TEXT = "POKESOL_TEXT",
    POKESOL_TEXT_$0_1 = "POKESOL_TEXT_$0_1",
    POKESOL_TEXT_$0_2 = "POKESOL_TEXT_$0_2",
    POKESOL_TEXT_$1 = "POKESOL_TEXT_$1",
    POKESOL_TEXT_$1_$0_1 = "POKESOL_TEXT_$1_$0_1",
    POKESOL_TEXT_$1_$0_2 = "POKESOL_TEXT_$1_$0_2",
    POKESOL_TEXT_$2 = "POKESOL_TEXT_$2",
    POKEMON_AND_ITEM_LINE = "POKEMON_AND_ITEM_LINE",
    POKEMON_LINE = "POKEMON_LINE",
    POKEMON_VALUE = "POKEMON_VALUE",
    ITEM_VALUE = "ITEM_VALUE",
    TERATYPE_LINE = "TERATYPE_LINE",
    TERATYPE_VALUE = "TERATYPE_VALUE",
    ABILITY_LINE = "ABILITY_LINE",
    ABILITY_VALUE = "ABILITY_VALUE",
    NATURE_LINE = "NATURE_LINE",
    NATURE_VALUE = "NATURE_VALUE",
    STATS_AND_IV_LINE = "STATS_AND_IV_LINE",
    STATS_LINE = "STATS_LINE",
    STATS = "STATS",
    STAT_1 = "STAT_1",
    STAT_2 = "STAT_2",
    ACTUAL_AND_EFFORT = "ACTUAL_AND_EFFORT",
    ACTUAL = "ACTUAL",
    ACTUAL_VALUE = "ACTUAL_VALUE",
    EFFORT_VALUE = "EFFORT_VALUE",
    INDIVIDUALS = "INDIVIDUALS",
    MOVES_LINE_1 = "MOVES_LINE_1",
    MOVES_LINE_2 = "MOVES_LINE_2",
    MOVES_LINE_3 = "MOVES_LINE_3",
    MOVES_LINE_4 = "MOVES_LINE_4",
    MOVES_FOUR = "MOVES_FOUR",
    MOVES_THREE = "MOVES_THREE",
    MOVES_TWO = "MOVES_TWO",
    MOVES_ONE = "MOVES_ONE",
    MOVE_VALUE = "MOVE_VALUE",
    _ = "_",
}
export interface POKESOL_TEXT {
    kind: ASTKinds.POKESOL_TEXT;
    line1: POKESOL_TEXT_$0;
    line2: TERATYPE_LINE;
    line3: ABILITY_LINE;
    line4: NATURE_LINE;
    line5: Nullable<POKESOL_TEXT_$1>;
    line6: Nullable<POKESOL_TEXT_$2>;
}
export type POKESOL_TEXT_$0 = POKESOL_TEXT_$0_1 | POKESOL_TEXT_$0_2;
export type POKESOL_TEXT_$0_1 = POKEMON_AND_ITEM_LINE;
export type POKESOL_TEXT_$0_2 = POKEMON_LINE;
export interface POKESOL_TEXT_$1 {
    kind: ASTKinds.POKESOL_TEXT_$1;
    body: POKESOL_TEXT_$1_$0;
}
export type POKESOL_TEXT_$1_$0 = POKESOL_TEXT_$1_$0_1 | POKESOL_TEXT_$1_$0_2;
export type POKESOL_TEXT_$1_$0_1 = STATS_AND_IV_LINE;
export type POKESOL_TEXT_$1_$0_2 = STATS_LINE;
export interface POKESOL_TEXT_$2 {
    kind: ASTKinds.POKESOL_TEXT_$2;
    body: MOVES_LINE;
}
export interface POKEMON_AND_ITEM_LINE {
    kind: ASTKinds.POKEMON_AND_ITEM_LINE;
    pokemon: POKEMON_VALUE;
    item: ITEM_VALUE;
}
export interface POKEMON_LINE {
    kind: ASTKinds.POKEMON_LINE;
    pokemon: POKEMON_VALUE;
}
export type POKEMON_VALUE = string;
export type ITEM_VALUE = string;
export interface TERATYPE_LINE {
    kind: ASTKinds.TERATYPE_LINE;
    teratype: Nullable<TERATYPE_VALUE>;
}
export type TERATYPE_VALUE = string;
export interface ABILITY_LINE {
    kind: ASTKinds.ABILITY_LINE;
    ability: Nullable<ABILITY_VALUE>;
}
export type ABILITY_VALUE = string;
export interface NATURE_LINE {
    kind: ASTKinds.NATURE_LINE;
    nature: Nullable<NATURE_VALUE>;
}
export type NATURE_VALUE = string;
export interface STATS_AND_IV_LINE {
    kind: ASTKinds.STATS_AND_IV_LINE;
    stats: STATS;
    individuals: INDIVIDUALS;
}
export interface STATS_LINE {
    kind: ASTKinds.STATS_LINE;
    stats: STATS;
}
export interface STATS {
    kind: ASTKinds.STATS;
    h: STAT;
    a: STAT;
    b: STAT;
    c: STAT;
    d: STAT;
    s: STAT;
}
export type STAT = STAT_1 | STAT_2;
export type STAT_1 = ACTUAL_AND_EFFORT;
export type STAT_2 = ACTUAL;
export interface ACTUAL_AND_EFFORT {
    kind: ASTKinds.ACTUAL_AND_EFFORT;
    actual: ACTUAL_VALUE;
    effort: EFFORT_VALUE;
}
export interface ACTUAL {
    kind: ASTKinds.ACTUAL;
    actual: ACTUAL_VALUE;
}
export type ACTUAL_VALUE = string;
export type EFFORT_VALUE = string;
export type INDIVIDUALS = string;
export type MOVES_LINE = MOVES_LINE_1 | MOVES_LINE_2 | MOVES_LINE_3 | MOVES_LINE_4;
export type MOVES_LINE_1 = MOVES_FOUR;
export type MOVES_LINE_2 = MOVES_THREE;
export type MOVES_LINE_3 = MOVES_TWO;
export type MOVES_LINE_4 = MOVES_ONE;
export interface MOVES_FOUR {
    kind: ASTKinds.MOVES_FOUR;
    move1: MOVE_VALUE;
    move2: MOVE_VALUE;
    move3: MOVE_VALUE;
    move4: MOVE_VALUE;
}
export interface MOVES_THREE {
    kind: ASTKinds.MOVES_THREE;
    move1: MOVE_VALUE;
    move2: MOVE_VALUE;
    move3: MOVE_VALUE;
}
export interface MOVES_TWO {
    kind: ASTKinds.MOVES_TWO;
    move1: MOVE_VALUE;
    move2: MOVE_VALUE;
}
export interface MOVES_ONE {
    kind: ASTKinds.MOVES_ONE;
    move1: MOVE_VALUE;
}
export type MOVE_VALUE = string;
export type _ = string;
export class Parser {
    private readonly input: string;
    private pos: PosInfo;
    private negating: boolean = false;
    private memoSafe: boolean = true;
    constructor(input: string) {
        this.pos = {overallPos: 0, line: 1, offset: 0};
        this.input = input;
    }
    public reset(pos: PosInfo) {
        this.pos = pos;
    }
    public finished(): boolean {
        return this.pos.overallPos === this.input.length;
    }
    public clearMemos(): void {
    }
    public matchPOKESOL_TEXT($$dpth: number, $$cr?: ErrorTracker): Nullable<POKESOL_TEXT> {
        return this.run<POKESOL_TEXT>($$dpth,
            () => {
                let $scope$line1: Nullable<POKESOL_TEXT_$0>;
                let $scope$line2: Nullable<TERATYPE_LINE>;
                let $scope$line3: Nullable<ABILITY_LINE>;
                let $scope$line4: Nullable<NATURE_LINE>;
                let $scope$line5: Nullable<Nullable<POKESOL_TEXT_$1>>;
                let $scope$line6: Nullable<Nullable<POKESOL_TEXT_$2>>;
                let $$res: Nullable<POKESOL_TEXT> = null;
                if (true
                    && ($scope$line1 = this.matchPOKESOL_TEXT_$0($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:\n)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$line2 = this.matchTERATYPE_LINE($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:\n)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$line3 = this.matchABILITY_LINE($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:\n)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$line4 = this.matchNATURE_LINE($$dpth + 1, $$cr)) !== null
                    && (($scope$line5 = this.matchPOKESOL_TEXT_$1($$dpth + 1, $$cr)) || true)
                    && (($scope$line6 = this.matchPOKESOL_TEXT_$2($$dpth + 1, $$cr)) || true)
                ) {
                    $$res = {kind: ASTKinds.POKESOL_TEXT, line1: $scope$line1, line2: $scope$line2, line3: $scope$line3, line4: $scope$line4, line5: $scope$line5, line6: $scope$line6};
                }
                return $$res;
            });
    }
    public matchPOKESOL_TEXT_$0($$dpth: number, $$cr?: ErrorTracker): Nullable<POKESOL_TEXT_$0> {
        return this.choice<POKESOL_TEXT_$0>([
            () => this.matchPOKESOL_TEXT_$0_1($$dpth + 1, $$cr),
            () => this.matchPOKESOL_TEXT_$0_2($$dpth + 1, $$cr),
        ]);
    }
    public matchPOKESOL_TEXT_$0_1($$dpth: number, $$cr?: ErrorTracker): Nullable<POKESOL_TEXT_$0_1> {
        return this.matchPOKEMON_AND_ITEM_LINE($$dpth + 1, $$cr);
    }
    public matchPOKESOL_TEXT_$0_2($$dpth: number, $$cr?: ErrorTracker): Nullable<POKESOL_TEXT_$0_2> {
        return this.matchPOKEMON_LINE($$dpth + 1, $$cr);
    }
    public matchPOKESOL_TEXT_$1($$dpth: number, $$cr?: ErrorTracker): Nullable<POKESOL_TEXT_$1> {
        return this.run<POKESOL_TEXT_$1>($$dpth,
            () => {
                let $scope$body: Nullable<POKESOL_TEXT_$1_$0>;
                let $$res: Nullable<POKESOL_TEXT_$1> = null;
                if (true
                    && this.regexAccept(String.raw`(?:\n)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$body = this.matchPOKESOL_TEXT_$1_$0($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.POKESOL_TEXT_$1, body: $scope$body};
                }
                return $$res;
            });
    }
    public matchPOKESOL_TEXT_$1_$0($$dpth: number, $$cr?: ErrorTracker): Nullable<POKESOL_TEXT_$1_$0> {
        return this.choice<POKESOL_TEXT_$1_$0>([
            () => this.matchPOKESOL_TEXT_$1_$0_1($$dpth + 1, $$cr),
            () => this.matchPOKESOL_TEXT_$1_$0_2($$dpth + 1, $$cr),
        ]);
    }
    public matchPOKESOL_TEXT_$1_$0_1($$dpth: number, $$cr?: ErrorTracker): Nullable<POKESOL_TEXT_$1_$0_1> {
        return this.matchSTATS_AND_IV_LINE($$dpth + 1, $$cr);
    }
    public matchPOKESOL_TEXT_$1_$0_2($$dpth: number, $$cr?: ErrorTracker): Nullable<POKESOL_TEXT_$1_$0_2> {
        return this.matchSTATS_LINE($$dpth + 1, $$cr);
    }
    public matchPOKESOL_TEXT_$2($$dpth: number, $$cr?: ErrorTracker): Nullable<POKESOL_TEXT_$2> {
        return this.run<POKESOL_TEXT_$2>($$dpth,
            () => {
                let $scope$body: Nullable<MOVES_LINE>;
                let $$res: Nullable<POKESOL_TEXT_$2> = null;
                if (true
                    && this.regexAccept(String.raw`(?:\n)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$body = this.matchMOVES_LINE($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.POKESOL_TEXT_$2, body: $scope$body};
                }
                return $$res;
            });
    }
    public matchPOKEMON_AND_ITEM_LINE($$dpth: number, $$cr?: ErrorTracker): Nullable<POKEMON_AND_ITEM_LINE> {
        return this.run<POKEMON_AND_ITEM_LINE>($$dpth,
            () => {
                let $scope$pokemon: Nullable<POKEMON_VALUE>;
                let $scope$item: Nullable<ITEM_VALUE>;
                let $$res: Nullable<POKEMON_AND_ITEM_LINE> = null;
                if (true
                    && ($scope$pokemon = this.matchPOKEMON_VALUE($$dpth + 1, $$cr)) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:@)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && ($scope$item = this.matchITEM_VALUE($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.POKEMON_AND_ITEM_LINE, pokemon: $scope$pokemon, item: $scope$item};
                }
                return $$res;
            });
    }
    public matchPOKEMON_LINE($$dpth: number, $$cr?: ErrorTracker): Nullable<POKEMON_LINE> {
        return this.run<POKEMON_LINE>($$dpth,
            () => {
                let $scope$pokemon: Nullable<POKEMON_VALUE>;
                let $$res: Nullable<POKEMON_LINE> = null;
                if (true
                    && ($scope$pokemon = this.matchPOKEMON_VALUE($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.POKEMON_LINE, pokemon: $scope$pokemon};
                }
                return $$res;
            });
    }
    public matchPOKEMON_VALUE($$dpth: number, $$cr?: ErrorTracker): Nullable<POKEMON_VALUE> {
        return this.regexAccept(String.raw`(?:[0-9a-zA-Zぁ-んァ-ヶー一-龠・()♂♀%]+)`, "", $$dpth + 1, $$cr);
    }
    public matchITEM_VALUE($$dpth: number, $$cr?: ErrorTracker): Nullable<ITEM_VALUE> {
        return this.regexAccept(String.raw`(?:[ぁ-んァ-ヶー]+)`, "", $$dpth + 1, $$cr);
    }
    public matchTERATYPE_LINE($$dpth: number, $$cr?: ErrorTracker): Nullable<TERATYPE_LINE> {
        return this.run<TERATYPE_LINE>($$dpth,
            () => {
                let $scope$teratype: Nullable<Nullable<TERATYPE_VALUE>>;
                let $$res: Nullable<TERATYPE_LINE> = null;
                if (true
                    && this.regexAccept(String.raw`(?:テラスタイプ)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?::)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && (($scope$teratype = this.matchTERATYPE_VALUE($$dpth + 1, $$cr)) || true)
                ) {
                    $$res = {kind: ASTKinds.TERATYPE_LINE, teratype: $scope$teratype};
                }
                return $$res;
            });
    }
    public matchTERATYPE_VALUE($$dpth: number, $$cr?: ErrorTracker): Nullable<TERATYPE_VALUE> {
        return this.regexAccept(String.raw`(?:[ぁ-んァ-ヶー]*)`, "", $$dpth + 1, $$cr);
    }
    public matchABILITY_LINE($$dpth: number, $$cr?: ErrorTracker): Nullable<ABILITY_LINE> {
        return this.run<ABILITY_LINE>($$dpth,
            () => {
                let $scope$ability: Nullable<Nullable<ABILITY_VALUE>>;
                let $$res: Nullable<ABILITY_LINE> = null;
                if (true
                    && this.regexAccept(String.raw`(?:特性)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?::)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && (($scope$ability = this.matchABILITY_VALUE($$dpth + 1, $$cr)) || true)
                ) {
                    $$res = {kind: ASTKinds.ABILITY_LINE, ability: $scope$ability};
                }
                return $$res;
            });
    }
    public matchABILITY_VALUE($$dpth: number, $$cr?: ErrorTracker): Nullable<ABILITY_VALUE> {
        return this.regexAccept(String.raw`(?:[ぁ-んァ-ヶー]+)`, "", $$dpth + 1, $$cr);
    }
    public matchNATURE_LINE($$dpth: number, $$cr?: ErrorTracker): Nullable<NATURE_LINE> {
        return this.run<NATURE_LINE>($$dpth,
            () => {
                let $scope$nature: Nullable<Nullable<NATURE_VALUE>>;
                let $$res: Nullable<NATURE_LINE> = null;
                if (true
                    && this.regexAccept(String.raw`(?:性格)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?::)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && (($scope$nature = this.matchNATURE_VALUE($$dpth + 1, $$cr)) || true)
                ) {
                    $$res = {kind: ASTKinds.NATURE_LINE, nature: $scope$nature};
                }
                return $$res;
            });
    }
    public matchNATURE_VALUE($$dpth: number, $$cr?: ErrorTracker): Nullable<NATURE_VALUE> {
        return this.regexAccept(String.raw`(?:[ぁ-ん]+)`, "", $$dpth + 1, $$cr);
    }
    public matchSTATS_AND_IV_LINE($$dpth: number, $$cr?: ErrorTracker): Nullable<STATS_AND_IV_LINE> {
        return this.run<STATS_AND_IV_LINE>($$dpth,
            () => {
                let $scope$stats: Nullable<STATS>;
                let $scope$individuals: Nullable<INDIVIDUALS>;
                let $$res: Nullable<STATS_AND_IV_LINE> = null;
                if (true
                    && ($scope$stats = this.matchSTATS($$dpth + 1, $$cr)) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:\*)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && ($scope$individuals = this.matchINDIVIDUALS($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.STATS_AND_IV_LINE, stats: $scope$stats, individuals: $scope$individuals};
                }
                return $$res;
            });
    }
    public matchSTATS_LINE($$dpth: number, $$cr?: ErrorTracker): Nullable<STATS_LINE> {
        return this.run<STATS_LINE>($$dpth,
            () => {
                let $scope$stats: Nullable<STATS>;
                let $$res: Nullable<STATS_LINE> = null;
                if (true
                    && ($scope$stats = this.matchSTATS($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.STATS_LINE, stats: $scope$stats};
                }
                return $$res;
            });
    }
    public matchSTATS($$dpth: number, $$cr?: ErrorTracker): Nullable<STATS> {
        return this.run<STATS>($$dpth,
            () => {
                let $scope$h: Nullable<STAT>;
                let $scope$a: Nullable<STAT>;
                let $scope$b: Nullable<STAT>;
                let $scope$c: Nullable<STAT>;
                let $scope$d: Nullable<STAT>;
                let $scope$s: Nullable<STAT>;
                let $$res: Nullable<STATS> = null;
                if (true
                    && ($scope$h = this.matchSTAT($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:-)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$a = this.matchSTAT($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:-)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$b = this.matchSTAT($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:-)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$c = this.matchSTAT($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:-)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$d = this.matchSTAT($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:-)`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$s = this.matchSTAT($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.STATS, h: $scope$h, a: $scope$a, b: $scope$b, c: $scope$c, d: $scope$d, s: $scope$s};
                }
                return $$res;
            });
    }
    public matchSTAT($$dpth: number, $$cr?: ErrorTracker): Nullable<STAT> {
        return this.choice<STAT>([
            () => this.matchSTAT_1($$dpth + 1, $$cr),
            () => this.matchSTAT_2($$dpth + 1, $$cr),
        ]);
    }
    public matchSTAT_1($$dpth: number, $$cr?: ErrorTracker): Nullable<STAT_1> {
        return this.matchACTUAL_AND_EFFORT($$dpth + 1, $$cr);
    }
    public matchSTAT_2($$dpth: number, $$cr?: ErrorTracker): Nullable<STAT_2> {
        return this.matchACTUAL($$dpth + 1, $$cr);
    }
    public matchACTUAL_AND_EFFORT($$dpth: number, $$cr?: ErrorTracker): Nullable<ACTUAL_AND_EFFORT> {
        return this.run<ACTUAL_AND_EFFORT>($$dpth,
            () => {
                let $scope$actual: Nullable<ACTUAL_VALUE>;
                let $scope$effort: Nullable<EFFORT_VALUE>;
                let $$res: Nullable<ACTUAL_AND_EFFORT> = null;
                if (true
                    && ($scope$actual = this.matchACTUAL_VALUE($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:\()`, "", $$dpth + 1, $$cr) !== null
                    && ($scope$effort = this.matchEFFORT_VALUE($$dpth + 1, $$cr)) !== null
                    && this.regexAccept(String.raw`(?:\))`, "", $$dpth + 1, $$cr) !== null
                ) {
                    $$res = {kind: ASTKinds.ACTUAL_AND_EFFORT, actual: $scope$actual, effort: $scope$effort};
                }
                return $$res;
            });
    }
    public matchACTUAL($$dpth: number, $$cr?: ErrorTracker): Nullable<ACTUAL> {
        return this.run<ACTUAL>($$dpth,
            () => {
                let $scope$actual: Nullable<ACTUAL_VALUE>;
                let $$res: Nullable<ACTUAL> = null;
                if (true
                    && ($scope$actual = this.matchACTUAL_VALUE($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.ACTUAL, actual: $scope$actual};
                }
                return $$res;
            });
    }
    public matchACTUAL_VALUE($$dpth: number, $$cr?: ErrorTracker): Nullable<ACTUAL_VALUE> {
        return this.regexAccept(String.raw`(?:[1-9][0-9]*)`, "", $$dpth + 1, $$cr);
    }
    public matchEFFORT_VALUE($$dpth: number, $$cr?: ErrorTracker): Nullable<EFFORT_VALUE> {
        return this.regexAccept(String.raw`(?:[1-9][0-9]*)`, "", $$dpth + 1, $$cr);
    }
    public matchINDIVIDUALS($$dpth: number, $$cr?: ErrorTracker): Nullable<INDIVIDUALS> {
        return this.regexAccept(String.raw`(?:[HABCDS0-9, ]+)`, "", $$dpth + 1, $$cr);
    }
    public matchMOVES_LINE($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVES_LINE> {
        return this.choice<MOVES_LINE>([
            () => this.matchMOVES_LINE_1($$dpth + 1, $$cr),
            () => this.matchMOVES_LINE_2($$dpth + 1, $$cr),
            () => this.matchMOVES_LINE_3($$dpth + 1, $$cr),
            () => this.matchMOVES_LINE_4($$dpth + 1, $$cr),
        ]);
    }
    public matchMOVES_LINE_1($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVES_LINE_1> {
        return this.matchMOVES_FOUR($$dpth + 1, $$cr);
    }
    public matchMOVES_LINE_2($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVES_LINE_2> {
        return this.matchMOVES_THREE($$dpth + 1, $$cr);
    }
    public matchMOVES_LINE_3($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVES_LINE_3> {
        return this.matchMOVES_TWO($$dpth + 1, $$cr);
    }
    public matchMOVES_LINE_4($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVES_LINE_4> {
        return this.matchMOVES_ONE($$dpth + 1, $$cr);
    }
    public matchMOVES_FOUR($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVES_FOUR> {
        return this.run<MOVES_FOUR>($$dpth,
            () => {
                let $scope$move1: Nullable<MOVE_VALUE>;
                let $scope$move2: Nullable<MOVE_VALUE>;
                let $scope$move3: Nullable<MOVE_VALUE>;
                let $scope$move4: Nullable<MOVE_VALUE>;
                let $$res: Nullable<MOVES_FOUR> = null;
                if (true
                    && ($scope$move1 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:/)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && ($scope$move2 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:/)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && ($scope$move3 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:/)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && ($scope$move4 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.MOVES_FOUR, move1: $scope$move1, move2: $scope$move2, move3: $scope$move3, move4: $scope$move4};
                }
                return $$res;
            });
    }
    public matchMOVES_THREE($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVES_THREE> {
        return this.run<MOVES_THREE>($$dpth,
            () => {
                let $scope$move1: Nullable<MOVE_VALUE>;
                let $scope$move2: Nullable<MOVE_VALUE>;
                let $scope$move3: Nullable<MOVE_VALUE>;
                let $$res: Nullable<MOVES_THREE> = null;
                if (true
                    && ($scope$move1 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:/)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && ($scope$move2 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:/)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && ($scope$move3 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.MOVES_THREE, move1: $scope$move1, move2: $scope$move2, move3: $scope$move3};
                }
                return $$res;
            });
    }
    public matchMOVES_TWO($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVES_TWO> {
        return this.run<MOVES_TWO>($$dpth,
            () => {
                let $scope$move1: Nullable<MOVE_VALUE>;
                let $scope$move2: Nullable<MOVE_VALUE>;
                let $$res: Nullable<MOVES_TWO> = null;
                if (true
                    && ($scope$move1 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:/)`, "", $$dpth + 1, $$cr) !== null
                    && this.match_($$dpth + 1, $$cr) !== null
                    && ($scope$move2 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.MOVES_TWO, move1: $scope$move1, move2: $scope$move2};
                }
                return $$res;
            });
    }
    public matchMOVES_ONE($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVES_ONE> {
        return this.run<MOVES_ONE>($$dpth,
            () => {
                let $scope$move1: Nullable<MOVE_VALUE>;
                let $$res: Nullable<MOVES_ONE> = null;
                if (true
                    && ($scope$move1 = this.matchMOVE_VALUE($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.MOVES_ONE, move1: $scope$move1};
                }
                return $$res;
            });
    }
    public matchMOVE_VALUE($$dpth: number, $$cr?: ErrorTracker): Nullable<MOVE_VALUE> {
        return this.regexAccept(String.raw`(?:[０-９A-Zぁ-んァ-ヶー・]+)`, "", $$dpth + 1, $$cr);
    }
    public match_($$dpth: number, $$cr?: ErrorTracker): Nullable<_> {
        return this.regexAccept(String.raw`(?:[ \t]*)`, "", $$dpth + 1, $$cr);
    }
    public test(): boolean {
        const mrk = this.mark();
        const res = this.matchPOKESOL_TEXT(0);
        const ans = res !== null;
        this.reset(mrk);
        return ans;
    }
    public parse(): ParseResult {
        const mrk = this.mark();
        const res = this.matchPOKESOL_TEXT(0);
        if (res)
            return {ast: res, errs: []};
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.clearMemos();
        this.matchPOKESOL_TEXT(0, rec);
        const err = rec.getErr()
        return {ast: res, errs: err !== null ? [err] : []}
    }
    public mark(): PosInfo {
        return this.pos;
    }
    // @ts-ignore: loopPlus may not be called
    private loopPlus<T>(func: $$RuleType<T>): Nullable<[T, ...T[]]> {
        return this.loop(func, 1, -1) as Nullable<[T, ...T[]]>;
    }
    private loop<T>(func: $$RuleType<T>, lb: number, ub: number): Nullable<T[]> {
        const mrk = this.mark();
        const res: T[] = [];
        while (ub === -1 || res.length < ub) {
            const preMrk = this.mark();
            const t = func();
            if (t === null || this.pos.overallPos === preMrk.overallPos) {
                break;
            }
            res.push(t);
        }
        if (res.length >= lb) {
            return res;
        }
        this.reset(mrk);
        return null;
    }
    private run<T>($$dpth: number, fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn()
        if (res !== null)
            return res;
        this.reset(mrk);
        return null;
    }
    // @ts-ignore: choice may not be called
    private choice<T>(fns: Array<$$RuleType<T>>): Nullable<T> {
        for (const f of fns) {
            const res = f();
            if (res !== null) {
                return res;
            }
        }
        return null;
    }
    private regexAccept(match: string, mods: string, dpth: number, cr?: ErrorTracker): Nullable<string> {
        return this.run<string>(dpth,
            () => {
                const reg = new RegExp(match, "y" + mods);
                const mrk = this.mark();
                reg.lastIndex = mrk.overallPos;
                const res = this.tryConsume(reg);
                if(cr) {
                    cr.record(mrk, res, {
                        kind: "RegexMatch",
                        // We substring from 3 to len - 1 to strip off the
                        // non-capture group syntax added as a WebKit workaround
                        literal: match.substring(3, match.length - 1),
                        negated: this.negating,
                    });
                }
                return res;
            });
    }
    private tryConsume(reg: RegExp): Nullable<string> {
        const res = reg.exec(this.input);
        if (res) {
            let lineJmp = 0;
            let lind = -1;
            for (let i = 0; i < res[0].length; ++i) {
                if (res[0][i] === "\n") {
                    ++lineJmp;
                    lind = i;
                }
            }
            this.pos = {
                overallPos: reg.lastIndex,
                line: this.pos.line + lineJmp,
                offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind - 1)
            };
            return res[0];
        }
        return null;
    }
    // @ts-ignore: noConsume may not be called
    private noConsume<T>(fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn();
        this.reset(mrk);
        return res;
    }
    // @ts-ignore: negate may not be called
    private negate<T>(fn: $$RuleType<T>): Nullable<boolean> {
        const mrk = this.mark();
        const oneg = this.negating;
        this.negating = !oneg;
        const res = fn();
        this.negating = oneg;
        this.reset(mrk);
        return res === null ? true : null;
    }
    // @ts-ignore: Memoise may not be used
    private memoise<K>(rule: $$RuleType<K>, memo: Map<number, [Nullable<K>, PosInfo]>): Nullable<K> {
        const $scope$pos = this.mark();
        const $scope$memoRes = memo.get($scope$pos.overallPos);
        if(this.memoSafe && $scope$memoRes !== undefined) {
        this.reset($scope$memoRes[1]);
        return $scope$memoRes[0];
        }
        const $scope$result = rule();
        if(this.memoSafe)
        memo.set($scope$pos.overallPos, [$scope$result, this.mark()]);
        return $scope$result;
    }
}
export function parse(s: string): ParseResult {
    const p = new Parser(s);
    return p.parse();
}
export interface ParseResult {
    ast: Nullable<POKESOL_TEXT>;
    errs: SyntaxErr[];
}
export interface PosInfo {
    readonly overallPos: number;
    readonly line: number;
    readonly offset: number;
}
export interface RegexMatch {
    readonly kind: "RegexMatch";
    readonly negated: boolean;
    readonly literal: string;
}
export type EOFMatch = { kind: "EOF"; negated: boolean };
export type MatchAttempt = RegexMatch | EOFMatch;
export class SyntaxErr {
    public pos: PosInfo;
    public expmatches: MatchAttempt[];
    constructor(pos: PosInfo, expmatches: MatchAttempt[]) {
        this.pos = pos;
        this.expmatches = [...expmatches];
    }
    public toString(): string {
        return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Expected one of ${this.expmatches.map(x => x.kind === "EOF" ? " EOF" : ` ${x.negated ? 'not ': ''}'${x.literal}'`)}`;
    }
}
class ErrorTracker {
    private mxpos: PosInfo = {overallPos: -1, line: -1, offset: -1};
    private regexset: Set<string> = new Set();
    private pmatches: MatchAttempt[] = [];
    public record(pos: PosInfo, result: any, att: MatchAttempt) {
        if ((result === null) === att.negated)
            return;
        if (pos.overallPos > this.mxpos.overallPos) {
            this.mxpos = pos;
            this.pmatches = [];
            this.regexset.clear()
        }
        if (this.mxpos.overallPos === pos.overallPos) {
            if(att.kind === "RegexMatch") {
                if(!this.regexset.has(att.literal))
                    this.pmatches.push(att);
                this.regexset.add(att.literal);
            } else {
                this.pmatches.push(att);
            }
        }
    }
    public getErr(): SyntaxErr | null {
        if (this.mxpos.overallPos !== -1)
            return new SyntaxErr(this.mxpos, this.pmatches);
        return null;
    }
}