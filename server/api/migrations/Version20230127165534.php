<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230127165534 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE status ADD width VARCHAR(30) DEFAULT \'100%\' NOT NULL');
        $this->addSql('ALTER TABLE status ADD bg_color VARCHAR(30) DEFAULT \'bg-blue-500/60\' NOT NULL');
        $this->addSql('ALTER TABLE status ADD can_cancel BOOLEAN DEFAULT false NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE status DROP width');
        $this->addSql('ALTER TABLE status DROP bg_color');
        $this->addSql('ALTER TABLE status DROP can_cancel');
    }
}
