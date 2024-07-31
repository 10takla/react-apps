export type Fields = 'name' | 'password'

export interface InvalidInputError {
    message: string,
    type: 'invalid_input'
    fields: Array<Fields>
}

export interface NotValidError {
    message: string,
    type: 'not_valid'
    fields: Partial<Record<Fields, { min: number, max: number }>>
}