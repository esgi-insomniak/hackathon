<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Order;
use App\Entity\Status;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class OrderResolver implements EventSubscriberInterface
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => [
                ['updateCarOnEditOrder', EventPriorities::PRE_WRITE],
            ],
        ];
    }


    public function updateCarOnEditOrder(ViewEvent $event): void
    {
        $entity = $event->getControllerResult();
        $request = $event->getRequest();
        $method = $request->getMethod();

        if(!($method === Request::METHOD_POST || $method === Request::METHOD_PUT || $method === Request::METHOD_PATCH)) {
            return;
        }

        if (!$entity instanceof Order) {
            return;
        }

        if ($method === Request::METHOD_POST) {
            $status = $this->em->getRepository(Status::class)->findOneBy(['slug' => 'waiting-for-payment']);
            $entity->setStatus($status);
            $entity->getCar()->setIsOrdered(true);
            $this->em->persist($entity);
            $this->em->flush();
            return;
        }

        if ($method === Request::METHOD_PATCH && $entity->getStatus()->getSlug() === 'delivered-and-finished') {
            $entity->setProgression('completed');
            $entity->setFinalisedAt(new \DateTimeImmutable());
            $this->em->flush();
            return;
        }

        if ($entity->getProgression() === 'canceled') {
            $entity->getCar()->setIsOrdered(false);
            $this->em->flush();
            return;
        }
    }
}
