

export interface User {
    user_id: string;
    user_login: string;
    user_name: string;
    user_status: number;
}

export interface ReturnLogin {
    message: string;
    token: string;
    user: User;
}

