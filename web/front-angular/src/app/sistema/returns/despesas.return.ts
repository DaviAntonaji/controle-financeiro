

export interface Despesa {
    despesa_categoria_id: string;
    despesa_categoria_nome: string;
    despesa_data: string;
    despesa_descricao: string;
    despesa_id: string;
    despesa_valor: number;
    user_id: string;
}

export interface ReturnDespesas {
    despesas: Despesa[];
    message: string;
    refreshToken: string;
    total_gasto: number;
}

