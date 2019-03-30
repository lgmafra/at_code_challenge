<?php
/**
 * Created by PhpStorm.
 * User: lgmafra
 * Date: 30/03/19
 * Time: 02:26
 */

namespace app\controllers\v1;

use Yii;
use yii\rest\ActiveController;
use yii\httpclient\Client;
use yii\filters\Cors;

class ApiController extends ActiveController
{
    public $modelClass = 'app\models\Genre';

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

        unset(
            $actions['index'], $actions['update'],
            $actions['create'], $actions['delete'],
            $actions['view']
        );

        return $actions;
    }

    public function actionListupcoming(){
        $client = new Client();
        $response = $client->createRequest()
            ->setMethod('GET')
            ->setUrl('https://api.themoviedb.org/3/movie/upcoming')
            ->setData(Yii::$app->getRequest()->getQueryParams())
            ->send();

        return $response->data;
    }

    public function actionSearchmovie(){
        $client = new Client();
        $response = $client->createRequest()
            ->setMethod('GET')
            ->setUrl('https://api.themoviedb.org/3/search/movie')
            ->setData(Yii::$app->getRequest()->getQueryParams())
            ->send();

        return $response->data;
    }

    public function actionMoviedetail($id){
        $query = Yii::$app->getRequest()->getQueryParams();
        unset($query['id']);
        $client = new Client();
        $response = $client->createRequest()
            ->setMethod('GET')
            ->setUrl("https://api.themoviedb.org/3/movie/{$id}")
            ->setData($query)
            ->send();

        return $response->data;
    }
}