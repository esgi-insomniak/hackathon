<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230604133751 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE car_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE car_category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE car_identity_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE garage_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE image_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE order_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE recovery_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE status_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE garage_schudle_event_id_seq CASCADE');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT fk_f34393c9c4fff555');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT fk_f34393c96bf700bd');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT fk_f34393c9d792c9ef');
        $this->addSql('ALTER TABLE recovery DROP CONSTRAINT fk_f34393c995bc2bd4');
        $this->addSql('ALTER TABLE car_identity DROP CONSTRAINT fk_e5a3dcc012469de2');
        $this->addSql('ALTER TABLE car_identity DROP CONSTRAINT fk_e5a3dcc0d6bdc9dc');
        $this->addSql('ALTER TABLE garage_schudle_event DROP CONSTRAINT fk_7c0e9385b86058c');
        $this->addSql('ALTER TABLE garage_schudle_event DROP CONSTRAINT fk_7c0e9385cea04468');
        $this->addSql('ALTER TABLE garage_schudle_event DROP CONSTRAINT fk_7c0e938595bc2bd4');
        $this->addSql('ALTER TABLE garage_schudle_event DROP CONSTRAINT fk_7c0e93854efa2d0e');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f5299398df123119');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f5299398c3c6f69f');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f5299398c4fff555');
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f52993986bf700bd');
        $this->addSql('ALTER TABLE car DROP CONSTRAINT fk_773de69dff3ed4a8');
        $this->addSql('ALTER TABLE car DROP CONSTRAINT fk_773de69dc4fff555');
        $this->addSql('ALTER TABLE image DROP CONSTRAINT fk_c53d045fa2b28fe8');
        $this->addSql('ALTER TABLE car_image DROP CONSTRAINT fk_1a968188c3c6f69f');
        $this->addSql('ALTER TABLE car_image DROP CONSTRAINT fk_1a9681883da5256d');
        $this->addSql('ALTER TABLE garage DROP CONSTRAINT fk_9f26610b7e3c61f9');
        $this->addSql('DROP TABLE car_category');
        $this->addSql('DROP TABLE recovery');
        $this->addSql('DROP TABLE car_identity');
        $this->addSql('DROP TABLE garage_schudle_event');
        $this->addSql('DROP TABLE "order"');
        $this->addSql('DROP TABLE car');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE car_image');
        $this->addSql('DROP TABLE status');
        $this->addSql('DROP TABLE garage');
        $this->addSql('ALTER TABLE "user" DROP coordinates');
        $this->addSql('ALTER TABLE "user" DROP address');
        $this->addSql('ALTER TABLE "user" DROP phone');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE car_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE car_category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE car_identity_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE garage_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE image_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE order_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE recovery_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE status_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE garage_schudle_event_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE car_category (id INT NOT NULL, name VARCHAR(50) NOT NULL, slug VARCHAR(80) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX uniq_897a2cc5989d9b62 ON car_category (slug)');
        $this->addSql('CREATE TABLE recovery (id INT NOT NULL, garage_id INT NOT NULL, status_id INT NOT NULL, recoverer_id INT NOT NULL, car_identity_id INT NOT NULL, car_description VARCHAR(255) DEFAULT NULL, proposed_price DOUBLE PRECISION NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, year VARCHAR(255) NOT NULL, kilometers VARCHAR(255) NOT NULL, power VARCHAR(255) NOT NULL, gearbox VARCHAR(255) NOT NULL, fuel VARCHAR(255) NOT NULL, progression VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_f34393c995bc2bd4 ON recovery (car_identity_id)');
        $this->addSql('CREATE INDEX idx_f34393c9d792c9ef ON recovery (recoverer_id)');
        $this->addSql('CREATE INDEX idx_f34393c96bf700bd ON recovery (status_id)');
        $this->addSql('CREATE INDEX idx_f34393c9c4fff555 ON recovery (garage_id)');
        $this->addSql('COMMENT ON COLUMN recovery.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN recovery.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE car_identity (id INT NOT NULL, category_id INT NOT NULL, main_picture_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_e5a3dcc0d6bdc9dc ON car_identity (main_picture_id)');
        $this->addSql('CREATE INDEX idx_e5a3dcc012469de2 ON car_identity (category_id)');
        $this->addSql('CREATE TABLE garage_schudle_event (id INT NOT NULL, associate_garage_id INT NOT NULL, associate_user_id INT NOT NULL, car_identity_id INT DEFAULT NULL, associate_order_id INT DEFAULT NULL, date_start TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, date_end TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, description VARCHAR(2048) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, reason VARCHAR(255) DEFAULT NULL, kilometers VARCHAR(255) DEFAULT NULL, fuel VARCHAR(255) DEFAULT NULL, gearbox VARCHAR(255) DEFAULT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_7c0e93854efa2d0e ON garage_schudle_event (associate_order_id)');
        $this->addSql('CREATE INDEX idx_7c0e938595bc2bd4 ON garage_schudle_event (car_identity_id)');
        $this->addSql('CREATE INDEX idx_7c0e9385cea04468 ON garage_schudle_event (associate_user_id)');
        $this->addSql('CREATE INDEX idx_7c0e9385b86058c ON garage_schudle_event (associate_garage_id)');
        $this->addSql('COMMENT ON COLUMN garage_schudle_event.date_start IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN garage_schudle_event.date_end IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN garage_schudle_event.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN garage_schudle_event.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE "order" (id INT NOT NULL, orderer_id INT NOT NULL, car_id INT NOT NULL, garage_id INT DEFAULT NULL, status_id INT NOT NULL, total_price DOUBLE PRECISION DEFAULT NULL, appointment_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, finalised_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, stripe JSON DEFAULT NULL, sold BOOLEAN DEFAULT false NOT NULL, progression VARCHAR(255) DEFAULT \'in-progress\' NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_f52993986bf700bd ON "order" (status_id)');
        $this->addSql('CREATE INDEX idx_f5299398c4fff555 ON "order" (garage_id)');
        $this->addSql('CREATE INDEX idx_f5299398c3c6f69f ON "order" (car_id)');
        $this->addSql('CREATE INDEX idx_f5299398df123119 ON "order" (orderer_id)');
        $this->addSql('COMMENT ON COLUMN "order".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "order".updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "order".finalised_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE car (id INT NOT NULL, identity_id INT NOT NULL, garage_id INT DEFAULT NULL, slug VARCHAR(255) NOT NULL, fuel VARCHAR(20) NOT NULL, power INT DEFAULT NULL, weight INT NOT NULL, speeding DOUBLE PRECISION NOT NULL, consumption DOUBLE PRECISION DEFAULT NULL, price DOUBLE PRECISION NOT NULL, year INT NOT NULL, options JSON NOT NULL, gearbox_type VARCHAR(10) NOT NULL, mileage INT NOT NULL, is_ordered BOOLEAN DEFAULT false NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_773de69dc4fff555 ON car (garage_id)');
        $this->addSql('CREATE INDEX idx_773de69dff3ed4a8 ON car (identity_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_773de69d989d9b62 ON car (slug)');
        $this->addSql('CREATE TABLE image (id INT NOT NULL, uploaded_by_id INT NOT NULL, src VARCHAR(1500) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_c53d045fa2b28fe8 ON image (uploaded_by_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_c53d045f6044248d ON image (src)');
        $this->addSql('COMMENT ON COLUMN image.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN image.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE car_image (car_id INT NOT NULL, image_id INT NOT NULL, PRIMARY KEY(car_id, image_id))');
        $this->addSql('CREATE INDEX idx_1a9681883da5256d ON car_image (image_id)');
        $this->addSql('CREATE INDEX idx_1a968188c3c6f69f ON car_image (car_id)');
        $this->addSql('CREATE TABLE status (id INT NOT NULL, name VARCHAR(50) NOT NULL, slug VARCHAR(50) NOT NULL, width VARCHAR(30) DEFAULT \'100%\' NOT NULL, bg_color VARCHAR(30) DEFAULT \'bg-blue-500/60\' NOT NULL, can_cancel BOOLEAN DEFAULT false NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE garage (id INT NOT NULL, owner_id INT NOT NULL, name VARCHAR(255) NOT NULL, coordinates JSON NOT NULL, is_open BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_9f26610b7e3c61f9 ON garage (owner_id)');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT fk_f34393c9c4fff555 FOREIGN KEY (garage_id) REFERENCES garage (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT fk_f34393c96bf700bd FOREIGN KEY (status_id) REFERENCES status (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT fk_f34393c9d792c9ef FOREIGN KEY (recoverer_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE recovery ADD CONSTRAINT fk_f34393c995bc2bd4 FOREIGN KEY (car_identity_id) REFERENCES car_identity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car_identity ADD CONSTRAINT fk_e5a3dcc012469de2 FOREIGN KEY (category_id) REFERENCES car_category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car_identity ADD CONSTRAINT fk_e5a3dcc0d6bdc9dc FOREIGN KEY (main_picture_id) REFERENCES image (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE garage_schudle_event ADD CONSTRAINT fk_7c0e9385b86058c FOREIGN KEY (associate_garage_id) REFERENCES garage (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE garage_schudle_event ADD CONSTRAINT fk_7c0e9385cea04468 FOREIGN KEY (associate_user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE garage_schudle_event ADD CONSTRAINT fk_7c0e938595bc2bd4 FOREIGN KEY (car_identity_id) REFERENCES car_identity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE garage_schudle_event ADD CONSTRAINT fk_7c0e93854efa2d0e FOREIGN KEY (associate_order_id) REFERENCES "order" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f5299398df123119 FOREIGN KEY (orderer_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f5299398c3c6f69f FOREIGN KEY (car_id) REFERENCES car (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f5299398c4fff555 FOREIGN KEY (garage_id) REFERENCES garage (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f52993986bf700bd FOREIGN KEY (status_id) REFERENCES status (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT fk_773de69dff3ed4a8 FOREIGN KEY (identity_id) REFERENCES car_identity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT fk_773de69dc4fff555 FOREIGN KEY (garage_id) REFERENCES garage (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT fk_c53d045fa2b28fe8 FOREIGN KEY (uploaded_by_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car_image ADD CONSTRAINT fk_1a968188c3c6f69f FOREIGN KEY (car_id) REFERENCES car (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE car_image ADD CONSTRAINT fk_1a9681883da5256d FOREIGN KEY (image_id) REFERENCES image (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE garage ADD CONSTRAINT fk_9f26610b7e3c61f9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "user" ADD coordinates JSON NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD address VARCHAR(60) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD phone VARCHAR(10) DEFAULT NULL');
    }
}
