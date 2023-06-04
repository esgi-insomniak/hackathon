<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Recovery;
use App\Entity\Status;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class RecoveryResolver implements EventSubscriberInterface
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
                ['onCreateRecovery', EventPriorities::PRE_WRITE],
            ],
        ];
    }


    public function onCreateRecovery(ViewEvent $event): void
    {
        $entity = $event->getControllerResult();
        $request = $event->getRequest();
        $method = $request->getMethod();

        if(!($method === Request::METHOD_POST || $method === Request::METHOD_PUT || $method === Request::METHOD_PATCH)) {
            return;
        }

        if (!$entity instanceof Recovery) {
            return;
        }

        if($method === Request::METHOD_POST) {
            $status = $this->em->getRepository(Status::class)->findOneBy(['slug' => 'car-added']);
            $entity->setStatus($status);
            $this->em->persist($entity);
            $this->em->flush();
        }
    }
}
