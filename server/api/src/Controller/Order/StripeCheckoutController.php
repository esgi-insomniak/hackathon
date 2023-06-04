<?php

namespace App\Controller\Order;

use App\Entity\Order;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class StripeCheckoutController extends AbstractController
{
    private $em;
    private $siteUrl;
    private $stripePK;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->siteUrl = $_ENV['SITE_URL'] ?? 'http://localhost:8080/';
        $this->stripePK = $_ENV['STRIPE_PK'];
    }

    public function __invoke($id)
    {
        /**
         * @var Order
         */
        $order = $this->em->getRepository(Order::class)->find($id);
        /**
         * @var User
         */
        $user = $this->getUser();

        if (!$order)
            throw new \Exception('Order not found.');
        if ($order->getOrderer()->getId() !== $user->getId())
            throw new \Exception('You are not allowed to access this order.');
        if ($order->getStatus()->getSlug() !== 'waiting-for-payment')
            throw new \Exception('This order is not pending.');

        \Stripe\Stripe::setApiKey($this->stripePK);
        $checkout = \Stripe\Checkout\Session::create([
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'unit_amount_decimal' => $order->getCar()->getPrice() * 100,
                    'product_data' => [
                        'name' => "BMW " . $order->getCar()->getIdentity()->getCategory()->getName() . " " . $order->getCar()->getIdentity()->getName(),
                        'images' => [$order->getCar()->getIdentity()->getMainPicture()->getSrc()],
                    ],
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => "{$this->siteUrl}me/orders/{$id}/success/{CHECKOUT_SESSION_ID}",
        ]);

        $order->setStripe([$checkout]);
        $this->em->flush();

        return new JsonResponse(['url' => $checkout->url]);
    }
}
