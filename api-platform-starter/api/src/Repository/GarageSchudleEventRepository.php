<?php

namespace App\Repository;

use App\Entity\GarageSchudleEvent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GarageSchudleEvent>
 *
 * @method GarageSchudleEvent|null find($id, $lockMode = null, $lockVersion = null)
 * @method GarageSchudleEvent|null findOneBy(array $criteria, array $orderBy = null)
 * @method GarageSchudleEvent[]    findAll()
 * @method GarageSchudleEvent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GarageSchudleEventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GarageSchudleEvent::class);
    }

    public function save(GarageSchudleEvent $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(GarageSchudleEvent $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return GarageSchudleEvent[] Returns an array of GarageSchudleEvent objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('g.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?GarageSchudleEvent
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
