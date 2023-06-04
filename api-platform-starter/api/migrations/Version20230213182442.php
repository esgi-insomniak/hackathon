<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230213182442 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT fk_f34393c9c3c6f69f');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT fk_f34393c9f0c700b8');
        $this->addSql('DROP INDEX idx_f34393c9f0c700b8');
        $this->addSql('DROP INDEX idx_f34393c9c3c6f69f');
        $this->addSql('ALTER TABLE recovery ADD recoverer_id INT NOT NULL');
        $this->addSql('ALTER TABLE recovery ADD car_identity_id INT NOT NULL');
        $this->addSql('ALTER TABLE recovery ADD year VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE recovery ADD kilometers VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE recovery ADD power VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE recovery ADD gearbox VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE recovery ADD fuel VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE recovery DROP car_id');
        $this->addSql('ALTER TABLE recovery DROP recover_id');
        $this->addSql('ALTER TABLE recovery DROP total_price');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT FK_F34393C9D792C9EF FOREIGN KEY (recoverer_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT FK_F34393C995BC2BD4 FOREIGN KEY (car_identity_id) REFERENCES car_identity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F34393C9D792C9EF ON recovery (recoverer_id)');
        $this->addSql('CREATE INDEX IDX_F34393C995BC2BD4 ON recovery (car_identity_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT FK_F34393C9D792C9EF');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT FK_F34393C995BC2BD4');
        $this->addSql('DROP INDEX IDX_F34393C9D792C9EF');
        $this->addSql('DROP INDEX IDX_F34393C995BC2BD4');
        $this->addSql('ALTER TABLE recovery ADD car_id INT NOT NULL');
        $this->addSql('ALTER TABLE recovery ADD recover_id INT NOT NULL');
        $this->addSql('ALTER TABLE recovery ADD total_price DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE recovery DROP recoverer_id');
        $this->addSql('ALTER TABLE recovery DROP car_identity_id');
        $this->addSql('ALTER TABLE recovery DROP year');
        $this->addSql('ALTER TABLE recovery DROP kilometers');
        $this->addSql('ALTER TABLE recovery DROP power');
        $this->addSql('ALTER TABLE recovery DROP gearbox');
        $this->addSql('ALTER TABLE recovery DROP fuel');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT fk_f34393c9c3c6f69f FOREIGN KEY (car_id) REFERENCES car (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT fk_f34393c9f0c700b8 FOREIGN KEY (recover_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_f34393c9f0c700b8 ON recovery (recover_id)');
        $this->addSql('CREATE INDEX idx_f34393c9c3c6f69f ON recovery (car_id)');
    }
}
