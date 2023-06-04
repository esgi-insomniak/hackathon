<?php

namespace App\DataFixtures;

use App\Entity\CarCategory;
use App\Entity\CarIdentity;
use App\Entity\Image;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Provider\Fakecar;

class CarIdentityFixture extends Fixture implements DependentFixtureInterface
{
    private $faker;
    public function load(ObjectManager $manager): void
    {
        $this->faker = Factory::create('fr_FR');
        $this->faker->addProvider(new Fakecar($this->faker));

        $categories = $manager->getRepository(CarCategory::class)->findAll();
        $imgs = $manager->getRepository(Image::class)->findAll();
        for ($i = 0; $i < 30; $i++){
            $carName = $this->faker->unique()->vehicleModel('BMW');
            $category = $categories[array_rand($categories)];
            $car = new CarIdentity();
            $car->setName($carName);
            $car->setCategory($category);
            $car->setMainPicture($imgs[array_rand($imgs)]);
            $manager->persist($car);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            ImagesFixture::class,
            CarCategoryFixture::class,
        ];
    }
}
