import localApi from './localApi'

export default class Favorite {

    static saveFavorite = async (movie) => {
        let favorite = await localApi.get('favorite/search', {
            params: {
                movie_id: movie.movie_id
            },
        })

        if(favorite.data.length === 0){
            favorite = await localApi.post('favorite/create', {
                params: movie
            })
        }
    }
}
