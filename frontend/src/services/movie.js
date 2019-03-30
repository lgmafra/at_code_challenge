import localApi from './localApi'
import Utils from './utils'

export default class MovieService {

    static getUpcomingMovies = async (page) => {
        const response = await localApi.get('api/listupcoming',{
            params: {
                api_key: Utils.getAuthToken(),
                page: page
            }
        })

        return response
    }

    static searchMovie = async (page, filter) => {
        const response = await localApi.get('api/searchmovie',{
            params: {
                api_key: Utils.getAuthToken(),
                query: filter,
                page: page
            }
        })

        return response
    }

    static getMovieDetail = async (id) => {
        const response = await localApi.get(`api/moviedetail?id=${id}`, {
            params: {
                api_key: Utils.getAuthToken()
            }
        })

        return response
    }
}