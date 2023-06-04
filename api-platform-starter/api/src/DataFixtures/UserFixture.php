<?php

namespace App\DataFixtures;

use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class UserFixture extends Fixture
{
    private $pwd = "$2y$13$1LJzqnNyoUOY29DUzfigVu9.V09oruc3ynZX9413wNmlTGErr3I1G";
    private $faker;

    public function load(ObjectManager $manager): void
    {
        $this->faker = Factory::create('fr_FR');
        $fakeUser = $this->createFakeUser();
        $manager->persist($fakeUser);

        $fakeAdmin = $this->createFakeAdmin();
        $manager->persist($fakeAdmin);

        //create 100 fake users
        for ($i = 0; $i < 100; $i++) {
            $fakeUser = $this->createRandomUser();
            $manager->persist($fakeUser);

            if ($i % 10 === 0) {
                $fakeDealer = $this->createRandomUser(['ROLE_DEALER']);
                $manager->persist($fakeDealer);
            }
        }

        $manager->flush();
    }

    private function createRandomUser($roles = ['ROLE_USER']): User
    {
        $user = new User();
        $user->setEmail($this->faker->email);
        $user->setPassword($this->pwd);
        $user->setRoles($roles);
        $user->setFirstName($this->faker->firstName);
        $user->setLastName($this->faker->lastName);
        $user->setCoordinates([$this->faker->latitude, $this->faker->longitude]);
        $user->setVerifiedAt(new DateTimeImmutable());
        $user->setCreatedAt(DateTimeImmutable::createFromMutable($this->faker->dateTimeBetween('-1 years', 'now')));
        $user->setUpdatedAt(DateTimeImmutable::createFromMutable($this->faker->dateTimeBetween('-1 years', 'now')));
        return $user;
    }
    private function createFakeUser(): User
    {
        $fakeUser = new User();
        $fakeUser->setEmail("user@user.fr");
        $fakeUser->setPassword($this->pwd);
        $fakeUser->setRoles(['ROLE_USER']);
        $fakeUser->setFirstName("User");
        $fakeUser->setLastName("User");
        $fakeUser->setVerifiedAt(new DateTimeImmutable());
        $fakeUser->setCoordinates([2.342865,48.858705]);
        $fakeUser->setAddress("Paris, France");
        $fakeUser->setCreatedAt(new DateTimeImmutable());
        $fakeUser->setUpdatedAt(null);
        return $fakeUser;
    }

    private function createFakeAdmin(): User
    {
        $fakeAdmin = new User();
        $fakeAdmin->setEmail("admin@admin.fr");
        $fakeAdmin->setPassword($this->pwd);
        $fakeAdmin->setRoles(['ROLE_ADMIN']);
        $fakeAdmin->setFirstName("Admin");
        $fakeAdmin->setLastName("Admin");
        $fakeAdmin->setVerifiedAt(new DateTimeImmutable());
        $fakeAdmin->setCoordinates([2.342865,48.858705]);
        $fakeAdmin->setAddress("Paris, France");
        $fakeAdmin->setCreatedAt(new DateTimeImmutable());
        $fakeAdmin->setUpdatedAt(null);
        return $fakeAdmin;
    }
}
