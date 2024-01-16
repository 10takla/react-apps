enum TypeMon {
    name,
    rating,
    price,
    screenSize,
    resolution,
    refreshRate,
    responseTimme,
    pixelType,
    aspectRatio,
    ppi,
    releaseYear,
    diagonal,
    contrast,
}

export interface Monitor extends Record<TypeMon, any> {
    name: string
    'image': string
    'link': string
    'rating': {
        'reviews'?: number,
        'stars'?: Partial<Record<string, number | null>>
    },
    'price': number,
    'resolution': [
        number,
        number
    ],
    'refreshRate': number,
    'responseTimme': number,
    'pixelType': 'IPS' | 'VA' | 'OLED',
    'aspectRatio': [
        number,
        number
    ],
    'ppi'?: number,
    'releaseYear': number,
    'diagonal': number,
    'contrast': [
        number,
        number
    ],
}
