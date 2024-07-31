export default <T>(callback?: (acc: T, texture: string, ...args: string[]) => void, ret?: T) => {
    const rootDir = "/src/market/shared/assets/textures/"

    const getClearTexture = (texture: string) => {
        return texture.replace(rootDir, '').split('/')
    }


    const textures = Object.keys(import.meta.glob(`/src/market/shared/assets/textures/**/*`))
        .filter((texture) => getClearTexture(texture).length === 4);


    return (
        [
            textures,
            getClearTexture,
            textures.reduce((acc, texture) => {
                callback?.(acc, texture, ...getClearTexture(texture))

                return acc
            }, ret as T)
        ]
    )

}