<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230120133539 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE car_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE car_category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE car_identity_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE garage_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE greeting_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE image_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "order_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE recovery_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE status_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE car (id INT NOT NULL, identity_id INT NOT NULL, garage_id INT DEFAULT NULL, slug VARCHAR(255) NOT NULL, fuel VARCHAR(20) NOT NULL, power INT DEFAULT NULL, weight INT NOT NULL, speeding DOUBLE PRECISION NOT NULL, consumption DOUBLE PRECISION DEFAULT NULL, price DOUBLE PRECISION NOT NULL, year INT NOT NULL, options JSON NOT NULL, gearbox_type VARCHAR(10) NOT NULL, mileage INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_773DE69D989D9B62 ON car (slug)');
        $this->addSql('CREATE INDEX IDX_773DE69DFF3ED4A8 ON car (identity_id)');
        $this->addSql('CREATE INDEX IDX_773DE69DC4FFF555 ON car (garage_id)');
        $this->addSql('CREATE TABLE car_image (car_id INT NOT NULL, image_id INT NOT NULL, PRIMARY KEY(car_id, image_id))');
        $this->addSql('CREATE INDEX IDX_1A968188C3C6F69F ON car_image (car_id)');
        $this->addSql('CREATE INDEX IDX_1A9681883DA5256D ON car_image (image_id)');
        $this->addSql('CREATE TABLE car_category (id INT NOT NULL, name VARCHAR(50) NOT NULL, slug VARCHAR(80) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_897A2CC5989D9B62 ON car_category (slug)');
        $this->addSql('CREATE TABLE car_identity (id INT NOT NULL, category_id INT NOT NULL, main_picture_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E5A3DCC012469DE2 ON car_identity (category_id)');
        $this->addSql('CREATE INDEX IDX_E5A3DCC0D6BDC9DC ON car_identity (main_picture_id)');
        $this->addSql('CREATE TABLE garage (id INT NOT NULL, name VARCHAR(255) NOT NULL, coordinates JSON NOT NULL, is_open BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE greeting (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE image (id INT NOT NULL, uploaded_by_id INT NOT NULL, src VARCHAR(1500) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C53D045F6044248D ON image (src)');
        $this->addSql('CREATE INDEX IDX_C53D045FA2B28FE8 ON image (uploaded_by_id)');
        $this->addSql('COMMENT ON COLUMN image.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN image.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE "order" (id INT NOT NULL, orderer_id INT NOT NULL, car_id INT NOT NULL, garage_id INT DEFAULT NULL, status_id INT NOT NULL, total_price DOUBLE PRECISION DEFAULT NULL, appointment_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, finalised_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, stripe JSON DEFAULT NULL, uuid UUID NOT NULL, sold BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_F5299398D17F50A6 ON "order" (uuid)');
        $this->addSql('CREATE INDEX IDX_F5299398DF123119 ON "order" (orderer_id)');
        $this->addSql('CREATE INDEX IDX_F5299398C3C6F69F ON "order" (car_id)');
        $this->addSql('CREATE INDEX IDX_F5299398C4FFF555 ON "order" (garage_id)');
        $this->addSql('CREATE INDEX IDX_F52993986BF700BD ON "order" (status_id)');
        $this->addSql('COMMENT ON COLUMN "order".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "order".updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "order".finalised_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE recovery (id INT NOT NULL, car_id INT NOT NULL, recover_id INT NOT NULL, garage_id INT NOT NULL, status_id INT NOT NULL, car_description VARCHAR(255) DEFAULT NULL, proposed_price DOUBLE PRECISION NOT NULL, total_price DOUBLE PRECISION NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F34393C9C3C6F69F ON recovery (car_id)');
        $this->addSql('CREATE INDEX IDX_F34393C9F0C700B8 ON recovery (recover_id)');
        $this->addSql('CREATE INDEX IDX_F34393C9C4FFF555 ON recovery (garage_id)');
        $this->addSql('CREATE INDEX IDX_F34393C96BF700BD ON recovery (status_id)');
        $this->addSql('COMMENT ON COLUMN recovery.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN recovery.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE status (id INT NOT NULL, name VARCHAR(30) NOT NULL, slug VARCHAR(50) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, verified_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, coordinates JSON NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('COMMENT ON COLUMN "user".verified_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "user".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "user".updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69DFF3ED4A8 FOREIGN KEY (identity_id) REFERENCES car_identity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69DC4FFF555 FOREIGN KEY (garage_id) REFERENCES garage (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car_image ADD CONSTRAINT FK_1A968188C3C6F69F FOREIGN KEY (car_id) REFERENCES car (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car_image ADD CONSTRAINT FK_1A9681883DA5256D FOREIGN KEY (image_id) REFERENCES image (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car_identity ADD CONSTRAINT FK_E5A3DCC012469DE2 FOREIGN KEY (category_id) REFERENCES car_category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car_identity ADD CONSTRAINT FK_E5A3DCC0D6BDC9DC FOREIGN KEY (main_picture_id) REFERENCES image (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045FA2B28FE8 FOREIGN KEY (uploaded_by_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F5299398DF123119 FOREIGN KEY (orderer_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F5299398C3C6F69F FOREIGN KEY (car_id) REFERENCES car (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F5299398C4FFF555 FOREIGN KEY (garage_id) REFERENCES garage (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT FK_F52993986BF700BD FOREIGN KEY (status_id) REFERENCES status (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT FK_F34393C9C3C6F69F FOREIGN KEY (car_id) REFERENCES car (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT FK_F34393C9F0C700B8 FOREIGN KEY (recover_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT FK_F34393C9C4FFF555 FOREIGN KEY (garage_id) REFERENCES garage (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT FK_F34393C96BF700BD FOREIGN KEY (status_id) REFERENCES status (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE car_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE car_category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE car_identity_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE garage_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE greeting_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE image_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "order_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE recovery_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE status_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE car DROP CONSTRAINT FK_773DE69DFF3ED4A8');
        $this->addSql('ALTER TABLE car DROP CONSTRAINT FK_773DE69DC4FFF555');
        $this->addSql('ALTER TABLE car_image DROP CONSTRAINT FK_1A968188C3C6F69F');
        $this->addSql('ALTER TABLE car_image DROP CONSTRAINT FK_1A9681883DA5256D');
        $this->addSql('ALTER TABLE car_identity DROP CONSTRAINT FK_E5A3DCC012469DE2');
        $this->addSql('ALTER TABLE car_identity DROP CONSTRAINT FK_E5A3DCC0D6BDC9DC');
        $this->addSql('ALTER TABLE image DROP CONSTRAINT FK_C53D045FA2B28FE8');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F5299398DF123119');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F5299398C3C6F69F');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F5299398C4FFF555');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT FK_F52993986BF700BD');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT FK_F34393C9C3C6F69F');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT FK_F34393C9F0C700B8');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT FK_F34393C9C4FFF555');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT FK_F34393C96BF700BD');
        $this->addSql('DROP TABLE car');
        $this->addSql('DROP TABLE car_image');
        $this->addSql('DROP TABLE car_category');
        $this->addSql('DROP TABLE car_identity');
        $this->addSql('DROP TABLE garage');
        $this->addSql('DROP TABLE greeting');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE "order"');
        $this->addSql('DROP TABLE recovery');
        $this->addSql('DROP TABLE status');
        $this->addSql('DROP TABLE "user"');
    }
}
