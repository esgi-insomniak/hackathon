<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\GarageSchudleEvent;
use App\Entity\Order;
use App\Entity\Status;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class GarageSchudleEventResolver implements EventSubscriberInterface
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
                ['updateOnChange', EventPriorities::POST_WRITE],
            ],
        ];
    }


    public function updateOnChange(ViewEvent $event): void
    {
        $entity = $event->getControllerResult();
        $request = $event->getRequest();
        $method = $request->getMethod();

        if($method !== Request::METHOD_POST) {
            return;
        }

        if (!$entity instanceof GarageSchudleEvent) {
            return;
        }

        if($entity->getType() !== 'commande'){
            return;
        }
        
        $order = $entity->getAssociateOrder();

        if($order === null){
            return;
        }

        if($order->getStatus()->getSlug() !== 'waiting-for-appointment'){
            return;
        }

        $status = $this->em->getRepository(Status::class)->findOneBy(['slug' => 'appointment-taken']);
        $order->setStatus($status);
        $order->setAppointmentDate($entity->getDateStart());
        $this->em->flush();
    }
}
