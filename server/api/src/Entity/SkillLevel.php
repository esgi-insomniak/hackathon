<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\SkillLevelRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:skill_level']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:skill_level']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:skill_level']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:skill_level']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:skill_level']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:skill_level', 'item:get:skill_level']],
    denormalizationContext: ['groups' => ['item:post:skill_level', 'item:put:skill_level', 'item:patch:skill_level']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ORM\Entity(repositoryClass: SkillLevelRepository::class)]
class SkillLevel
{
    #[Groups(['collection:get:skill_level', 'item:get:skill_level'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:skill_level', 'item:get:skill_level'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:skill_level', 'item:get:skill_level'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:skill_level', 'item:get:skill_level', 'item:post:skill_level', 'item:put:skill_level', 'item:patch:skill_level'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['collection:get:skill_level', 'item:get:skill_level', 'item:post:skill_level', 'item:put:skill_level', 'item:patch:skill_level'])]
    #[ORM\Column]
    private ?int $weight = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable('now');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
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

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(int $weight): self
    {
        $this->weight = $weight;

        return $this;
    }
}
