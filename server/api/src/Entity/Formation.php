<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\FormationRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:formation']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:formation']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:formation']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:formation']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:formation']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:formation', 'item:get:formation']],
    denormalizationContext: ['groups' => ['item:post:formation', 'item:put:formation', 'item:patch:formation']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ORM\Entity(repositoryClass: FormationRepository::class)]
class Formation
{
    #[Groups(['collection:get:formation', 'item:get:formation'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:formation', 'item:get:formation'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:formation', 'item:get:formation'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:formation', 'item:get:formation', 'item:post:formation', 'item:put:formation', 'item:patch:formation'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['collection:get:formation', 'item:get:formation', 'item:post:formation', 'item:put:formation', 'item:patch:formation'])]
    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[Groups(['collection:get:formation', 'item:get:formation', 'item:post:formation', 'item:put:formation', 'item:patch:formation'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $htmlContent = null;

    #[Groups(['collection:get:formation', 'item:get:formation', 'item:post:formation', 'item:put:formation', 'item:patch:formation'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $source = null;

    #[Groups(['collection:get:formation', 'item:get:formation', 'item:post:formation', 'item:put:formation', 'item:patch:formation'])]
    #[ORM\ManyToOne(inversedBy: 'formations')]
    private ?Quizz $quizz = null;

    #[Groups(['collection:get:formation', 'item:get:formation'])]
    #[ORM\ManyToMany(targetEntity: Roadmap::class, mappedBy: 'formations')]
    private Collection $roadmaps;

    public function __construct()
    {
        $this->roadmaps = new ArrayCollection();
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

    public function getHtmlContent(): ?string
    {
        return $this->htmlContent;
    }

    public function setHtmlContent(?string $htmlContent): self
    {
        $this->htmlContent = $htmlContent;

        return $this;
    }

    public function getSource(): ?string
    {
        return $this->source;
    }

    public function setSource(?string $source): self
    {
        $this->source = $source;

        return $this;
    }

    public function getQuizz(): ?Quizz
    {
        return $this->quizz;
    }

    public function setQuizz(?Quizz $quizz): self
    {
        $this->quizz = $quizz;

        return $this;
    }

    /**
     * @return Collection<int, Roadmap>
     */
    public function getRoadmaps(): Collection
    {
        return $this->roadmaps;
    }

    public function addRoadmap(Roadmap $roadmap): self
    {
        if (!$this->roadmaps->contains($roadmap)) {
            $this->roadmaps->add($roadmap);
            $roadmap->addFormation($this);
        }

        return $this;
    }

    public function removeRoadmap(Roadmap $roadmap): self
    {
        if ($this->roadmaps->removeElement($roadmap)) {
            $roadmap->removeFormation($this);
        }

        return $this;
    }
}
