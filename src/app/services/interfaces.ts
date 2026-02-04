export interface IFavorites {
    id: number;
    name: string;
    image: string;
    alias: string;
    createdAt: Date;
}

export interface IPokemon {
    id: number;
    name: string;
    url: string;
    image: string;
    isFavorite: boolean;
}