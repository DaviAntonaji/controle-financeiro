

export interface Recebimento {
    recebimento_data: string;
    recebimento_descricao: string;
    recebimento_id: string;
    recebimento_valor: number;
    user_id: string;
}

export interface ReturnRecebimentos {
    message: string;
    recebimentos: Recebimento[];
    refreshToken: string;
    total_recebido: number;
}

