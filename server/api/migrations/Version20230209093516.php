<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230209093516 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE garage_schudle_event_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE garage_schudle_event (id INT NOT NULL, associate_garage_id INT NOT NULL, associate_user_id INT NOT NULL, date_start TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, date_end TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, description VARCHAR(2048) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_7C0E9385B86058C ON garage_schudle_event (associate_garage_id)');
        $this->addSql('CREATE INDEX IDX_7C0E9385CEA04468 ON garage_schudle_event (associate_user_id)');
        $this->addSql('COMMENT ON COLUMN garage_schudle_event.date_start IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN garage_schudle_event.date_end IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN garage_schudle_event.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN garage_schudle_event.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE garage_schudle_event ADD CONSTRAINT FK_7C0E9385B86058C FOREIGN KEY (associate_garage_id) REFERENCES garage (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE garage_schudle_event ADD CONSTRAINT FK_7C0E9385CEA04468 FOREIGN KEY (associate_user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE garage_schudle_event_id_seq CASCADE');
        $this->addSql('ALTER TABLE garage_schudle_event DROP CONSTRAINT FK_7C0E9385B86058C');
        $this->addSql('ALTER TABLE garage_schudle_event DROP CONSTRAINT FK_7C0E9385CEA04468');
        $this->addSql('DROP TABLE garage_schudle_event');
    }
}
