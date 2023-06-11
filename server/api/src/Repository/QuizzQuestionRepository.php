<?php

namespace App\Repository;

use App\Entity\QuizzQuestion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<QuizzQuestion>
 *
 * @method QuizzQuestion|null find($id, $lockMode = null, $lockVersion = null)
 * @method QuizzQuestion|null findOneBy(array $criteria, array $orderBy = null)
 * @method QuizzQuestion[]    findAll()
 * @method QuizzQuestion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QuizzQuestionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, QuizzQuestion::class);
    }

    public function save(QuizzQuestion $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(QuizzQuestion $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return QuizzQuestion[] Returns an array of QuizzQuestion objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('q')
//            ->andWhere('q.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('q.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?QuizzQuestion
//    {
//        return $this->createQueryBuilder('q')
//            ->andWhere('q.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
