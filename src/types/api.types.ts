export interface APIResponse<T>{
    data: T,
    status: number,
    message?:string,
}

export interface PaginatedResponse<T>{
    results: T[];
    count: number,
    next: string | null;
    previous: string | null;
}