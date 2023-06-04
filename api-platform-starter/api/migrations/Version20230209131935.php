<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230209131935 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE garage_schudle_event ADD car_identity_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE garage_schudle_event ADD reason VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE garage_schudle_event ADD kilometers VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE garage_schudle_event ADD fuel VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE garage_schudle_event ADD gearbox VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE garage_schudle_event ADD CONSTRAINT FK_7C0E938595BC2BD4 FOREIGN KEY (car_identity_id) REFERENCES car_identity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_7C0E938595BC2BD4 ON garage_schudle_event (car_identity_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE garage_schudle_event DROP CONSTRAINT FK_7C0E938595BC2BD4');
        $this->addSql('DROP INDEX IDX_7C0E938595BC2BD4');
        $this->addSql('ALTER TABLE garage_schudle_event DROP car_identity_id');
        $this->addSql('ALTER TABLE garage_schudle_event DROP reason');
        $this->addSql('ALTER TABLE garage_schudle_event DROP kilometers');
        $this->addSql('ALTER TABLE garage_schudle_event DROP fuel');
        $this->addSql('ALTER TABLE garage_schudle_event DROP gearbox');
    }
}
