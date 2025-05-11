export interface book {
    
    id: number;
    user_id: number;
    title: string;
    author: string;
    status: string;
    avaliation: number | null;
    conclusion_date: string | null;

}

export interface createBook {
    
    title: string;
    author?: string;
    status: string;
    avaliation?: number | null;

}

export interface updateBook {
    
    title?: string;
    author?: string;
    status?: string;
    avaliation?: number | null;

}

export enum BookStatus {
    
    QUERO_LER = "Quero Ler",
    LENDO = "Lendo",
    LIDO = "Lido",

}

