export interface ValorDescritoPorSuasDimensoes    {
    D2N: string;
    MN: string;
    V: string | number;
}

export interface SidraResponse {
    ArrayOfValorDescritoPorSuasDimensoes: {
        ValorDescritoPorSuasDimensoes: ValorDescritoPorSuasDimensoes[];
    }
}