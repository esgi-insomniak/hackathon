<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\StatusRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: StatusRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:status', 'id']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:status']],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:status', 'id']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:status']],
            security: "is_granted('ROLE_ADMIN')"

        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:status']],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:status', 'item:get:status']],
    denormalizationContext: ['groups' => ['item:post:status', 'item:put:status', 'item:patch:status']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'name' => 'partial',
        'slug' => 'partial',
    ],
)]
class Status
{
    #[Groups(['collection:get:status', 'item:get:status', 'id'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:status', 'item:get:status', 'item:post:status', 'item:put:status', 'item:patch:status'])]
    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[Groups(['collection:get:status', 'item:get:status', 'item:post:status', 'item:put:status', 'item:patch:status', 'id'])]
    #[ORM\Column(length: 50)]
    private ?string $slug = null;

    #[Groups(['collection:get:status', 'item:get:status', 'item:post:status', 'item:put:status', 'item:patch:status'])]
    #[ORM\Column(type: 'string', length: 30, options: ['default' => '100%'])]
    private ?string $width = null;

    #[Groups(['collection:get:status', 'item:get:status', 'item:post:status', 'item:put:status', 'item:patch:status'])]
    #[ORM\Column(type: 'string', length: 30, options: ['default' => 'bg-blue-500/60'])]
    private ?string $bgColor = null;

    #[Groups(['collection:get:status', 'item:get:status', 'item:post:status', 'item:put:status', 'item:patch:status'])]
    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    private ?bool $canCancel = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getWidth(): ?string
    {
        return $this->width;
    }

    public function setWidth(string $width): self
    {
        $this->width = $width;

        return $this;
    }

    public function getBgColor(): ?string
    {
        return $this->bgColor;
    }

    public function setBgColor(string $bgColor): self
    {
        $this->bgColor = $bgColor;

        return $this;
    }

    public function getCanCancel(): ?bool
    {
        return $this->canCancel;
    }

    public function setCanCancel(bool $canCancel): self
    {
        $this->canCancel = $canCancel;

        return $this;
    }
}
