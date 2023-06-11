<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230606101441 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE event_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE formation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE quizz_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE quizz_answer_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE quizz_question_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE roadmap_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE skill_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE skill_level_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE event (id INT NOT NULL, planner_id INT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, is_internal BOOLEAN NOT NULL, started_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, ended_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3BAE0AA75346EAE1 ON event (planner_id)');
        $this->addSql('COMMENT ON COLUMN event.started_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN event.ended_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE event_user (event_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(event_id, user_id))');
        $this->addSql('CREATE INDEX IDX_92589AE271F7E88B ON event_user (event_id)');
        $this->addSql('CREATE INDEX IDX_92589AE2A76ED395 ON event_user (user_id)');
        $this->addSql('CREATE TABLE formation (id INT NOT NULL, quizz_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, html_content VARCHAR(255) DEFAULT NULL, source VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_404021BFBA934BCD ON formation (quizz_id)');
        $this->addSql('CREATE TABLE quizz (id INT NOT NULL, skill_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7C77973D5585C142 ON quizz (skill_id)');
        $this->addSql('CREATE TABLE quizz_answer (id INT NOT NULL, quizz_question_id INT NOT NULL, content VARCHAR(255) NOT NULL, is_correct BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_80226C343832395C ON quizz_answer (quizz_question_id)');
        $this->addSql('CREATE TABLE quizz_question (id INT NOT NULL, content VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE roadmap (id INT NOT NULL, quizz_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_63C3EEF3BA934BCD ON roadmap (quizz_id)');
        $this->addSql('CREATE TABLE roadmap_formation (roadmap_id INT NOT NULL, formation_id INT NOT NULL, PRIMARY KEY(roadmap_id, formation_id))');
        $this->addSql('CREATE INDEX IDX_4A24FBED135345B2 ON roadmap_formation (roadmap_id)');
        $this->addSql('CREATE INDEX IDX_4A24FBED5200282E ON roadmap_formation (formation_id)');
        $this->addSql('CREATE TABLE skill (id INT NOT NULL, skill_level_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, icon VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5E3DE4771D192655 ON skill (skill_level_id)');
        $this->addSql('CREATE TABLE skill_level (id INT NOT NULL, name VARCHAR(255) NOT NULL, weight INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, roles JSON NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, clerk_user_id VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN "user".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "user".updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA75346EAE1 FOREIGN KEY (planner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_user ADD CONSTRAINT FK_92589AE271F7E88B FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE event_user ADD CONSTRAINT FK_92589AE2A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE formation ADD CONSTRAINT FK_404021BFBA934BCD FOREIGN KEY (quizz_id) REFERENCES quizz (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE quizz ADD CONSTRAINT FK_7C77973D5585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE quizz_answer ADD CONSTRAINT FK_80226C343832395C FOREIGN KEY (quizz_question_id) REFERENCES quizz_question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE roadmap ADD CONSTRAINT FK_63C3EEF3BA934BCD FOREIGN KEY (quizz_id) REFERENCES quizz (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE roadmap_formation ADD CONSTRAINT FK_4A24FBED135345B2 FOREIGN KEY (roadmap_id) REFERENCES roadmap (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE roadmap_formation ADD CONSTRAINT FK_4A24FBED5200282E FOREIGN KEY (formation_id) REFERENCES formation (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE4771D192655 FOREIGN KEY (skill_level_id) REFERENCES skill_level (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE event_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE formation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE quizz_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE quizz_answer_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE quizz_question_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE roadmap_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE skill_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE skill_level_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE event DROP CONSTRAINT FK_3BAE0AA75346EAE1');
        $this->addSql('ALTER TABLE event_user DROP CONSTRAINT FK_92589AE271F7E88B');
        $this->addSql('ALTER TABLE event_user DROP CONSTRAINT FK_92589AE2A76ED395');
        $this->addSql('ALTER TABLE formation DROP CONSTRAINT FK_404021BFBA934BCD');
        $this->addSql('ALTER TABLE quizz DROP CONSTRAINT FK_7C77973D5585C142');
        $this->addSql('ALTER TABLE quizz_answer DROP CONSTRAINT FK_80226C343832395C');
        $this->addSql('ALTER TABLE roadmap DROP CONSTRAINT FK_63C3EEF3BA934BCD');
        $this->addSql('ALTER TABLE roadmap_formation DROP CONSTRAINT FK_4A24FBED135345B2');
        $this->addSql('ALTER TABLE roadmap_formation DROP CONSTRAINT FK_4A24FBED5200282E');
        $this->addSql('ALTER TABLE skill DROP CONSTRAINT FK_5E3DE4771D192655');
        $this->addSql('DROP TABLE event');
        $this->addSql('DROP TABLE event_user');
        $this->addSql('DROP TABLE formation');
        $this->addSql('DROP TABLE quizz');
        $this->addSql('DROP TABLE quizz_answer');
        $this->addSql('DROP TABLE quizz_question');
        $this->addSql('DROP TABLE roadmap');
        $this->addSql('DROP TABLE roadmap_formation');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE skill_level');
        $this->addSql('DROP TABLE "user"');
    }
}
