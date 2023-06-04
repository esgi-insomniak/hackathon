<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230209214834 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE garage_schudle_event ADD associate_order_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE garage_schudle_event ADD CONSTRAINT FK_7C0E93854EFA2D0E FOREIGN KEY (associate_order_id) REFERENCES "order" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_7C0E93854EFA2D0E ON garage_schudle_event (associate_order_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE garage_schudle_event DROP CONSTRAINT FK_7C0E93854EFA2D0E');
        $this->addSql('DROP INDEX IDX_7C0E93854EFA2D0E');
        $this->addSql('ALTER TABLE garage_schudle_event DROP associate_order_id');
    }
}
