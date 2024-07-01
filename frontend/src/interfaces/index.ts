export interface iContactItem {
    first_name?: string,
    last_name?: string,
    full_name?: string;
    email?: string,
    gender?: string,
    language?: string,
    avatar?: string,
    birthdate?: string,
    age?: number;
    layoutMode?: string;
}


export interface iSearchContext {
    term?: string;
}