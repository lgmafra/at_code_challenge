<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "favorite".
 *
 * @property int $id
 * @property string $poster_path
 * @property string $title
 * @property string $release_date
 * @property int $movie_id
 *
 * @property FavoriteGenres[] $favoriteGenres
 */
class Favorite extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'favorite';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['poster_path', 'title', 'release_date', 'movie_id'], 'required'],
            [['movie_id'], 'integer'],
            [['poster_path'], 'string', 'max' => 150],
            [['title', 'release_date'], 'string', 'max' => 100],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'poster_path' => 'Poster Path',
            'title' => 'Title',
            'release_date' => 'Release Date',
            'movie_id' => 'Movie ID',
        ];
    }

    public function fields()
    {
        return [
            'id',
            'poster_path',
            'title',
            'release_date',
            'movie_id',
            'genres' => 'favoriteGenres'
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFavoriteGenres()
    {
        return $this->hasMany(FavoriteGenres::className(), ['favorite_id' => 'id']);
    }
}
