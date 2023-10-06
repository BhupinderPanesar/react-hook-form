
interface CreateUser {
    username: string;
    email: string;
}

interface User extends CreateUser {
    userId: string;
}

export type { CreateUser, User };