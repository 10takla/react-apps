export interface Client {
    id: number,
    name: string,
    password: string,
    avatar?: string,
}

export type PublicClient = Pick<Client, 'id' | 'name' | 'avatar'>
