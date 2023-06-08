<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\SkillRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:skill']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:skill']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:skill']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:skill']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:skill']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:skill', 'item:get:skill']],
    denormalizationContext: ['groups' => ['item:post:skill', 'item:put:skill', 'item:patch:skill']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ORM\Entity(repositoryClass: SkillRepository::class)]
class Skill
{
    #[Groups(['collection:get:skill', 'item:get:skill'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:skill', 'item:get:skill'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:skill', 'item:get:skill'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:skill', 'item:get:skill', 'item:post:skill', 'item:put:skill', 'item:patch:skill'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['collection:get:skill', 'item:get:skill', 'item:post:skill', 'item:put:skill', 'item:patch:skill'])]
    #[ORM\Column(length: 255)]
    private ?string $icon = null;

    #[Groups(['collection:get:skill', 'item:get:skill', 'item:post:skill', 'item:put:skill', 'item:patch:skill'])]
    #[ORM\ManyToOne]
    private ?SkillLevel $skillLevel = null;

    #[Groups(['collection:get:skill', 'item:get:skill', 'item:post:skill', 'item:put:skill', 'item:patch:skill'])]
    #[ORM\OneToOne(mappedBy: 'skill', cascade: ['persist', 'remove'])]
    private ?Quizz $quizz = null;

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

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    public function getSkillLevel(): ?SkillLevel
    {
        return $this->skillLevel;
    }

    public function setSkillLevel(?SkillLevel $skillLevel): self
    {
        $this->skillLevel = $skillLevel;

        return $this;
    }

    public function getQuizz(): ?Quizz
    {
        return $this->quizz;
    }

    public function setQuizz(Quizz $quizz): self
    {
        // set the owning side of the relation if necessary
        if ($quizz->getSkill() !== $this) {
            $quizz->getSkill($this);
        }

        $this->quizz = $quizz;

        return $this;
    }
}
