

export interface CategoriaDespesas {
    nomes: number[];
    qtde: string[];
}

export interface ReturnRelatorioMensal {
    categoria_despesas: CategoriaDespesas;
    despesa: number;
    lucro: number;
    message: string;
    recebimento: number;
    refreshToken: string;
}

