<?php
/**
 * Created by PhpStorm.
 * User: lgmafra
 * Date: 29/03/19
 * Time: 15:11
 */

namespace app\controllers\api\v1;

use Yii;
use yii\rest\ActiveController;
use yii\filters\Cors;
use app\models\Favorite;
use app\models\FavoriteGenres;
use app\models\Genre;

class FavoriteController extends ActiveController
{
    public $modelClass = 'app\models\Favorite';

    public function behaviors()
    {
        return array_merge([
            'cors' => [
                'class' => Cors::className(),
                'cors' => [
                    'Origin' => ['*'],
                    'Access-Control-Request-Headers' => ['*']
                ]
            ],
        ], parent::behaviors());
    }

    public function actions()
    {
        $actions = parent::actions();

        // disable the "update" actions
        unset($actions['update'], $actions['create']);

        return $actions;
    }

    public function actionCreate(){
        $model = new Favorite();
        $params = Yii::$app->getRequest()->getBodyParams()['params'];

        $genres_id = $params['genre_ids'];
        unset($params['genre_ids']);

        $genres = Genre::find()->where(['in', 'genre_id', $genres_id])->all();

        foreach ($params as $key => $value) {
            $model[$key] = $value;
        }

        $model->save();

        foreach ($genres as $genre){
            $favGenre = new FavoriteGenres();

            $favGenre->favorite_id = $model->id;
            $favGenre->genre_id = $genre->id;

            $favGenre->save(false);
        }

        return $model;
    }

    public function actionSearch()
    {
//        var_dump(Yii::$app->request->queryParams['movie_id']);
//        exit();
        return Favorite::find()->where(['in', 'movie_id', Yii::$app->request->queryParams['movie_id']])->all();
    }

}