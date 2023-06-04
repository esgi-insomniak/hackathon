<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class EntityResolver implements EventSubscriberInterface
{

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents(): array
    {
        return [
            //KernelEvents::VIEW => ['updateOnChange', EventPriorities::POST_VALIDATE],
            //KernelEvents::VIEW => ['updateOnCreate', EventPriorities::PRE_WRITE],
            KernelEvents::VIEW => [
                ['updateOnChange', EventPriorities::POST_VALIDATE],
                ['updateOnCreate', EventPriorities::PRE_WRITE],
            ],
        ];
    }


    public function updateOnChange(ViewEvent $event): void
    {
        $entity = $event->getControllerResult();
        $request = $event->getRequest();
        $method = $request->getMethod();

        //if entity as "updatedAt" property
        if(!property_exists($entity, 'updatedAt') && !method_exists($entity, 'setUpdatedAt')) {
            return;
        }
        if(!($method === Request::METHOD_POST || $method === Request::METHOD_PUT || $method === Request::METHOD_PATCH)) {
            return;
        }

        $entity->setUpdatedAt(new \DateTimeImmutable('now'));
    }

    public function updateOnCreate(ViewEvent $event): void
    {
        $entity = $event->getControllerResult();
        $request = $event->getRequest();
        $method = $request->getMethod();

        //if entity as "createdAt" property
        if(!property_exists($entity, 'createdAt') && !method_exists($entity, 'setCreatedAt')) {
            return;
        }
        if(!($method === Request::METHOD_POST)) {
            return;
        }

        $entity->setCreatedAt(new \DateTimeImmutable('now'));
    }
}
