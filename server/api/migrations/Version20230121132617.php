<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230121132617 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "user" ADD confirmation_code VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD recovery_token VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD have_recover_token BOOLEAN DEFAULT false NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" DROP confirmation_code');
        $this->addSql('ALTER TABLE "user" DROP recovery_token');
        $this->addSql('ALTER TABLE "user" DROP have_recover_token');
    }
}
