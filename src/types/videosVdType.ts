export interface VideoItem  {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoId: string;
}

export interface PlaylistVideosResponse {
    items: {
        snippet: {
            title: string;
            description: string;
            thumbnails: {
                high: {
                    url: string;
                }
            }
            resourceId: {
                videoId: string;
            }
        }
    }
}