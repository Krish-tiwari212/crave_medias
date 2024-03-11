
export type SiteData = {
    availablity_date: string
}

export type WorkData = {
    id: string,
    title: string,
    details: {
        description: string,
        summary: string
    },
    date: string,
    roles: string[],
    links: {
        type: "web" | "android" | "ios" | undefined,
        text: string,
        link: string
    }[]
}[]

export type TestimonialData = {
    review: string,
    avatar: string,
    name: string,
    designation: string,
    company: string
}[]