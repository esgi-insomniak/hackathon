<?php

namespace App\DataFixtures;

use App\Entity\CarCategory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Provider\Fakecar;

class CarCategoryFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $faker->addProvider(new Fakecar($faker));
        for ($i = 0; $i < 8; $i++) {
            $vehicleType = $faker->unique()->vehicleType;
            $vehicleTypeSlug = uniqid("", true);
            $carCategory = new CarCategory();
            $carCategory->setName($vehicleType);
            $carCategory->setSlug($vehicleTypeSlug);
            $manager->persist($carCategory);
        }
        $manager->flush();
    }
}
