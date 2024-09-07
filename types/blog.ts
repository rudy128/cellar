interface BlogData{
    Headline: string,
    Content: string,
    Comments: Record<string, string>,
    Date: {
        seconds: number,
        nanoseconds: number
    },
}

export type {BlogData}