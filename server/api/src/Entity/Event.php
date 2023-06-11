<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\EventRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:event']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:event']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:event']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:event']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:event']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:event', 'item:get:event']],
    denormalizationContext: ['groups' => ['item:post:event', 'item:put:event', 'item:patch:event']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ORM\Entity(repositoryClass: EventRepository::class)]
class Event
{
    #[Groups(['collection:get:event', 'item:get:event'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:event', 'item:get:event'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:event', 'item:get:event'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:event', 'item:get:event', 'item:post:event', 'item:put:event', 'item:patch:event'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['collection:get:event', 'item:get:event', 'item:post:event', 'item:put:event', 'item:patch:event'])]
    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[Groups(['collection:get:event', 'item:get:event', 'item:post:event', 'item:put:event', 'item:patch:event'])]
    #[ORM\Column(length: 255)]
    private ?string $location = null;

    #[Groups(['collection:get:event', 'item:get:event', 'item:post:event', 'item:put:event', 'item:patch:event'])]
    #[ORM\Column]
    private ?bool $isInternal = null;

    #[Groups(['collection:get:event', 'item:get:event', 'item:post:event', 'item:put:event', 'item:patch:event'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $startedAt = null;

    #[Groups(['collection:get:event', 'item:get:event', 'item:post:event', 'item:put:event', 'item:patch:event'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $endedAt = null;

    #[Groups(['collection:get:event', 'item:get:event', 'item:post:event', 'item:put:event', 'item:patch:event'])]
    #[ORM\ManyToOne(inversedBy: 'events')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $planner = null;

    #[Groups(['collection:get:event', 'item:get:event'])]
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'events')]
    private Collection $participants;

    public function __construct()
    {
        $this->participants = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function isIsInternal(): ?bool
    {
        return $this->isInternal;
    }

    public function setIsInternal(bool $isInternal): self
    {
        $this->isInternal = $isInternal;

        return $this;
    }

    public function getStartedAt(): ?\DateTimeImmutable
    {
        return $this->startedAt;
    }

    public function setStartedAt(\DateTimeImmutable $startedAt): self
    {
        $this->startedAt = $startedAt;

        return $this;
    }

    public function getEndedAt(): ?\DateTimeImmutable
    {
        return $this->endedAt;
    }

    public function setEndedAt(\DateTimeImmutable $endedAt): self
    {
        $this->endedAt = $endedAt;

        return $this;
    }

    public function getPlanner(): ?User
    {
        return $this->planner;
    }

    public function setPlanner(?User $planner): self
    {
        $this->planner = $planner;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(User $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants->add($participant);
        }

        return $this;
    }

    public function removeParticipant(User $participant): self
    {
        $this->participants->removeElement($participant);

        return $this;
    }
}
