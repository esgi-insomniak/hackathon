<?php

namespace App\Filter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;

class GarageFilter extends AbstractFilter
{

    /**
     * @inheritDoc
     */
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        // otherwise filter is applied to order and page as well
        if ($property !== 'distance') {
            return;
        }

        [$lat, $lng, $radius] = explode(',', $value);

        // add distance in DQL based on filter location point
        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder
            ->addSelect('(6371000 * acos(cos(radians(' . $lat . ')) * cos(radians(JSON_GET('.$rootAlias.'.coordinates, 0))) * cos(radians(JSON_GET('.$rootAlias.'.coordinates, 1)) - radians(' . $lng . ')) + sin(radians(' . $lat . ')) * sin(radians(JSON_GET('.$rootAlias.'.coordinates,0))))) AS distance')
            ->having('distance <= :radius')
            ->setParameter('radius', $radius)
            ->orderBy('distance')
        ;
    }

    /**
     * @inheritDoc
     */
    public function getDescription(string $resourceClass): array
    {
        return [
            'distance' => [
                'property' => 'distance',
                'type' => 'string',
                'required' => false,
                'swagger' => [
                    'description' => 'Filter garages by distance from a point',
                    'name' => 'distance',
                    'type' => 'string',
                    'format' => 'lat,lng,radius',
                    'example' => '48.856614,2.3522219,10000',
                ],
            ],
        ];
    }
}
