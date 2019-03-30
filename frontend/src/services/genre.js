import localApi from './localApi'

export default class Genre {

    static insertGenresIfNotExists = async (genre) => {
        const g = await localApi.get('genre/search', {
            params: {
                genre_id: genre.id
            },
        })
        
        if(g.data.length === 0){
            await localApi.post('genre/create', {
                genre_id: genre.id,
                name: genre.name
            })
        }
    }

    static getGenreNames = async (genre_id) => {
        if(genre_id.length > 0){
            let g = await localApi.get('genre/search', {
                params: {
                    genre_id: genre_id
                },
            })
    
            return g
        }

        return {}
    }
}