export interface Role {
    id_role: number;
    name: string;
}

export interface Person {
    id_person: number;
    last_name: string;
    first_name: string;
    id_role: number;
    id_site?: number;
}

export interface Users {
    id_user: number;
    username: string;
    token: string;
    expires_at: Date;
    id_person: number;
}