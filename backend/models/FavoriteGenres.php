<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "favorite_genres".
 *
 * @property int $favorite_id
 * @property int $genre_id
 *
 * @property Favorite $genre
 * @property Genre $favorite
 */
class FavoriteGenres extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'favorite_genres';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['favorite_id', 'genre_id'], 'required'],
            [['favorite_id', 'genre_id'], 'integer'],
            [['genre_id'], 'exist', 'skipOnError' => true, 'targetClass' => Favorite::className(), 'targetAttribute' => ['genre_id' => 'id']],
            [['favorite_id'], 'exist', 'skipOnError' => true, 'targetClass' => Genre::className(), 'targetAttribute' => ['favorite_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'favorite_id' => 'Favorite ID',
            'genre_id' => 'Genre ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getGenre()
    {
        return $this->hasOne(Favorite::className(), ['id' => 'genre_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFavorite()
    {
        return $this->hasOne(Genre::className(), ['id' => 'favorite_id']);
    }
}
