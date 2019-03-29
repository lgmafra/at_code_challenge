<?php

use yii\db\Migration;

/**
 * Class m190329_174204_favorite
 */
class m190329_174204_favorite extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable("favorite", [
            'id' => $this->primaryKey(),
            'poster_path' => $this->string(150)->notNull(),
            'title' => $this->string(100)->notNull(),
            'release_date' => $this->string(100)->notNull(),
            'movie_id' => $this->integer()->notNull(),
        ]);

        $this->createTable("favorite_genres", [
            'favorite_id' => $this->integer()->notNull() . " references genre(id)",
            'genre_id' => $this->integer()->notNull() . " references favorite(id)"
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable("favorite_genres");
        $this->dropTable("favorite");
    }
}
