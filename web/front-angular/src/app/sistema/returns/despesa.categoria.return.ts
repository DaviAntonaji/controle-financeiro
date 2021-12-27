

export interface Categoria {
    despesa_categoria_id: string;
    despesa_categoria_nome: string;
}

export interface ReturnCategoriaDespesa {
    categorias: Categoria[];
    message: string;
    refreshToken: string;
}

