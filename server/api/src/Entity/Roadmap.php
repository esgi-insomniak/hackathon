<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\RoadmapRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:roadmap']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:roadmap']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:roadmap']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:roadmap']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:roadmap']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:roadmap', 'item:get:roadmap']],
    denormalizationContext: ['groups' => ['item:post:roadmap', 'item:put:roadmap', 'item:patch:roadmap']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ORM\Entity(repositoryClass: RoadmapRepository::class)]
class Roadmap
{
    #[Groups(['collection:get:roadmap', 'item:get:roadmap'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:roadmap', 'item:get:roadmap'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:roadmap', 'item:get:roadmap'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;
    
    #[Groups(['collection:get:roadmap', 'item:get:roadmap', 'item:post:roadmap', 'item:put:roadmap', 'item:patch:roadmap'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['collection:get:roadmap', 'item:get:roadmap', 'item:post:roadmap', 'item:put:roadmap', 'item:patch:roadmap'])]
    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[Groups(['collection:get:roadmap', 'item:get:roadmap', 'item:post:roadmap', 'item:put:roadmap', 'item:patch:roadmap'])]
    #[ORM\ManyToOne(inversedBy: 'roadmaps')]
    private ?Quizz $quizz = null;

    #[Groups(['collection:get:roadmap', 'item:get:roadmap'])]
    #[ORM\ManyToMany(targetEntity: Formation::class, inversedBy: 'roadmaps')]
    private Collection $formations;

    public function __construct()
    {
        $this->formations = new ArrayCollection();
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
     * @return Collection<int, Formation>
     */
    public function getFormations(): Collection
    {
        return $this->formations;
    }

    public function addFormation(Formation $formation): self
    {
        if (!$this->formations->contains($formation)) {
            $this->formations->add($formation);
        }

        return $this;
    }

    public function removeFormation(Formation $formation): self
    {
        $this->formations->removeElement($formation);

        return $this;
    }
}
