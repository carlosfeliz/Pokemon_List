export interface IFavorites{
    name: string;
    alias: string;
    createdAt: Date;
}

export interface IPokemon{
    name: string;
    url: string;
    isFavorite: boolean;
}