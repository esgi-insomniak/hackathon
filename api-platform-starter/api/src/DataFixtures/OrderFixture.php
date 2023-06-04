<?php

namespace App\DataFixtures;

use App\Entity\Car;
use App\Entity\Garage;
use App\Entity\Order;
use App\Entity\Status;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class OrderFixture extends Fixture implements DependentFixtureInterface
{
    private $faker;
    public function load(ObjectManager $manager): void
    {
        $this->faker = Factory::create('fr_FR');
        $users = $manager->getRepository(User::class)->findAll();
        $cars = $manager->getRepository(Car::class)->findAll();
        $status = $manager->getRepository(Status::class)->findAll();
        for ($i = 0; $i < 1000; $i++) {
            $created_at = $this->faker->dateTimeBetween('-3 year', 'now');
            $updated_at = $this->faker->dateTimeBetween($created_at, 'now');
            $appointment = $this->faker->dateTimeBetween($created_at, 'now');

            $sold = false;
            $car = $cars[array_rand($cars)];
            $finalised_at = (random_int(0, 1) === 1) ? $this->faker->dateTimeBetween($appointment, 'now') : null;
            $stripe = [];
            if ($finalised_at){
                $stripe_status = $this->faker->randomElement(['succeeded', 'failed']);
                $stripe = [
                    'id' => $this->faker->uuid,
                    'amount' => $this->faker->randomFloat(2, 1000, 100000),
                    'currency' => $this->faker->currencyCode,
                    'created' => $this->faker->unixTime,
                    'payment_method' => $this->faker->creditCardType,
                    'payment_method_details' => [
                        'type' => $this->faker->creditCardType,
                        'card' => [
                            'brand' => $this->faker->creditCardType,
                            'checks' => [
                                'address_line1_check' => $this->faker->boolean,
                                'address_postal_code_check' => $this->faker->boolean,
                                'cvc_check' => $this->faker->boolean,
                            ],
                            'country' => $this->faker->countryCode,
                            'exp_month' => $this->faker->month,
                            'exp_year' => $this->faker->year,
                            'fingerprint' => $this->faker->uuid,
                            'funding' => $this->faker->creditCardType,
                            'last4' => $this->faker->creditCardNumber,
                            'three_d_secure_usage' => [
                                'supported' => $this->faker->boolean,
                            ],
                            'wallet' => null,
                        ],
                        'card_present' => null,
                        'ideal' => null,
                        'sepa_debit' => null,
                        'sofort' => null,
                    ],
                    'receipt_url' => $this->faker->url,
                    'status' => $stripe_status,
                ];
                if ($stripe_status === 'failed'){
                    $stripe['failure_code'] = $this->faker->randomElement(['card_declined', 'expired_card', 'incorrect_cvc', 'incorrect_number', 'incorrect_zip', 'insufficient_funds', 'invalid_cvc', 'invalid_expiry_year', 'invalid_number', 'lost_card', 'stolen_card', 'processing_error']);
                    $stripe['failure_message'] = $this->faker->sentence;
                    $order_status = array_filter($status, static function (Status $statu) {
                        return $statu->getSlug() === 'payment-error';
                    });
                }else{
                    $possible_status = [
                        'technical-control',
                        'delivery',
                        'delivered-and-finished'
                    ];
                    $order_status = array_filter($status, static function (Status $statu) use ($possible_status) {
                        return in_array($statu->getSlug(), $possible_status, true);
                    });

                    // delete car from cars
                    $cars = array_filter($cars, static function (Car $carToRemove) use ($car) {
                        return $carToRemove->getId() !== $car->getId();
                    });
                    $sold = true;
                }
            }else{
                $possible_status = [
                    'appointment',
                    'missed-appointment',
                    'appointment-done'
                ];
                $order_status = array_filter($status, static function(Status $statu) use ($possible_status) {
                    return in_array($statu->getSlug(), $possible_status, true);
                });

                //$order_status = array_search($this->faker->randomElement($possible_status), array_column($status, 'slug'));
            }


            if (empty($order_status)){
                throw new \RuntimeException('Order status not found');
            }

            $final_status = $order_status[array_rand($order_status)];
            $progression = [
                'in-progress',
                'completed',
                'canceled',
            ];

            $order = new Order();
            $order->setCreatedAt(DateTimeImmutable::createFromMutable($created_at));
            $order->setUpdatedAt(DateTimeImmutable::createFromMutable($updated_at));
            $order->setAppointmentDate(DateTimeImmutable::createFromMutable($appointment));
            $order->setStripe($stripe);
            $order->setTotalPrice($stripe['amount'] ?? null);

            $order->setGarage($car->getGarage());
            $order->setCar($car);
            $order->setOrderer($users[array_rand($users)]);
            $order->setStatus($final_status);
            $order->setProgression($progression[array_rand($progression)]);
            $order->setSold($sold);
            $order->setFinalisedAt($finalised_at ? DateTimeImmutable::createFromMutable($finalised_at) : null);
            $manager->persist($order);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixture::class,
            CarFixture::class,
            StatusFixture::class,
            GarageFixture::class,
        ];
    }
}
