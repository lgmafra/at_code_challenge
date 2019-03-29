<?php

use yii\db\Migration;

/**
 * Class m190328_033453_genre
 */
class m190328_033453_genre extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable("genre", [
            'id' => $this->primaryKey(),
            'genre_id' => $this->integer()->notNull(),
            'name' => $this->string(60)->notNull()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable("genre");
    }
}
