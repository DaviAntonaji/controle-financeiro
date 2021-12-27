

    export interface CategoriaDespesas {
        nomes: number[];
        qtde: string[];
    }

    export interface ReturnRelatorioAnual {
        categoria_despesas: CategoriaDespesas;
        despesas: number[];
        lucros: number[];
        message: string;
        recebimentos: number[];
        refreshToken: string;
    }

