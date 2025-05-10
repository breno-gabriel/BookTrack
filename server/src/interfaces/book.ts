export interface createBook {
    
    title: string;
    author?: string;
    status: string;
    avaliation?: number | null;

}

export enum BookStatus {
    
    QUERO_LER = "Quero Ler",
    LENDO = "Lendo",
    LIDO = "Lido",

}

