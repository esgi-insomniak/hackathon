<?php

namespace App\DataFixtures;

use App\Entity\Garage;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Provider\Fakecar;

class RecoveryFixture extends Fixture implements DependentFixtureInterface
{
    private $faker;
    public function load(ObjectManager $manager): void
    {
        $this->faker = Factory::create('fr_FR');
        $this->faker->addProvider(new Fakecar($this->faker));

        $garages = $manager->getRepository(Garage::class)->findAll();


        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            GarageFixture::class,
        ];
    }
}
