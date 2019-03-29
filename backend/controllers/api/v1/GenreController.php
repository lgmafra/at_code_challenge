<?php

namespace app\controllers\api\v1;

use Yii;
use yii\rest\ActiveController;
use app\models\Genre;
use yii\filters\Cors;

class GenreController extends ActiveController {

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

    public function actionSearch()
    {
        return Genre::find()->where(['in', 'genre_id', Yii::$app->request->queryParams['genre_id']])->all();
    }
}