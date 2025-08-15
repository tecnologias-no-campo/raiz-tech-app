export interface ValorDescritoPorSuasDimensoes    {
    D1C: string | number;
    D1N: string;
    D2C: string;
    D2N: string;
    D3C: string;
    D3N: string | number;
    D4C: string;
    D4N: string;
    D5C: string;
    D5N: string;
    D6C: string;
    D6N: string;
    D7C: string;
    D7N: string;
    D8C: string;
    D8N: string;
    D9C: string;
    D9N: string;
    MC: string;
    MN: string;
    NC: string | number;
    NN: string;
    V: string | number;
}

export interface SidraResponse {
    ArrayOfValorDescritoPorSuasDimensoes: {
        ValorDescritoPorSuasDimensoes: ValorDescritoPorSuasDimensoes[];
    }
}