<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\QuizzRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:quizz']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:quizz']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:quizz']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:quizz']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:quizz']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:quizz', 'item:get:quizz']],
    denormalizationContext: ['groups' => ['item:post:quizz', 'item:put:quizz', 'item:patch:quizz']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ORM\Entity(repositoryClass: QuizzRepository::class)]
class Quizz
{
    #[Groups(['collection:get:quizz', 'item:get:quizz'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:quizz', 'item:get:quizz'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:quizz', 'item:get:quizz'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:quizz', 'item:get:quizz', 'item:post:quizz', 'item:put:quizz', 'item:patch:quizz'])]
    #[ORM\OneToOne(inversedBy: 'quizz', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Skill $skill = null;

    #[Groups(['collection:get:quizz', 'item:get:quizz', 'item:post:quizz', 'item:put:quizz', 'item:patch:quizz'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['collection:get:quizz', 'item:get:quizz'])]
    #[ORM\OneToMany(mappedBy: 'quizz', targetEntity: Formation::class)]
    private Collection $formations;

    #[Groups(['collection:get:quizz', 'item:get:quizz'])]
    #[ORM\OneToMany(mappedBy: 'quizz', targetEntity: Roadmap::class)]
    private Collection $roadmaps;

    public function __construct()
    {
        $this->formations = new ArrayCollection();
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

    public function getSkill(): ?Skill
    {
        return $this->skill;
    }

    public function setSkill(Skill $skill): self
    {
        $this->skill = $skill;

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
            $formation->setQuizz($this);
        }

        return $this;
    }

    public function removeFormation(Formation $formation): self
    {
        if ($this->formations->removeElement($formation)) {
            // set the owning side to null (unless already changed)
            if ($formation->getQuizz() === $this) {
                $formation->setQuizz(null);
            }
        }

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
            $roadmap->setQuizz($this);
        }

        return $this;
    }

    public function removeRoadmap(Roadmap $roadmap): self
    {
        if ($this->roadmaps->removeElement($roadmap)) {
            // set the owning side to null (unless already changed)
            if ($roadmap->getQuizz() === $this) {
                $roadmap->setQuizz(null);
            }
        }

        return $this;
    }
}
