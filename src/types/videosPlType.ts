export interface PlaylistItem   {
    id: string;
    title: string;
}

export interface PlaylistResponse   {
    items: {
        id: string;
        snippet: {
            title: string;
        }
    }[];

}