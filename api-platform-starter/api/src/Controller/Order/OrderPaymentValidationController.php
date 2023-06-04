<?php

namespace App\Controller\Order;

use App\Entity\Order;
use App\Entity\Status;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class OrderPaymentValidationController extends AbstractController
{
    private $em;
    private $stripePK;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->stripePK = $_ENV['STRIPE_PK'];
    }

    public function __invoke($id, Request $request)
    {
        /**
         * @var Order
         */
        $order = $this->em->getRepository(Order::class)->find($id);
        /**
         * @var User
         */
        $user = $this->getUser();
        $payload = json_decode($request->getContent(), false);

        if (!$order)
            throw new \Exception('Order not found.');
        if ($order->getOrderer()->getId() !== $user->getId())
            throw new \Exception('You are not allowed to access this order.');
        if ($order->getStatus()->getSlug() !== 'waiting-for-payment')
            throw new \Exception('This order is not pending.');
        if (!isset($payload->sessionId))
            throw new \Exception('No sessionId specified.');

        $stripeData = (object)$order->getStripe()[0];

        if (!isset($stripeData->id))
            throw new \Exception('No payment found.');
        if ($stripeData->id !== $payload->sessionId)
            throw new \Exception('Invalid payment.');
        if ($stripeData->status !== 'open')
            throw new \Exception('Invalid payment.');

        \Stripe\Stripe::setApiKey($this->stripePK);
        $checkout = \Stripe\Checkout\Session::retrieve($payload->sessionId);

        if ($checkout->status !== 'complete')
            throw new \Exception('Payment not completed.');

        $order->setStripe([$checkout]);
        $order->setStatus($this->em->getRepository(Status::class)->findOneBy(['slug' => 'paid']));
        $order->setSold(true);
        $this->em->flush();

        return new JsonResponse($stripeData);
    }
}
