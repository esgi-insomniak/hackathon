<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\QuizzQuestionRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:quizz_question']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:quizz_question']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:quizz_question']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:quizz_question']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:quizz_question']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:quizz_question', 'item:get:quizz_question']],
    denormalizationContext: ['groups' => ['item:post:quizz_question', 'item:put:quizz_question', 'item:patch:quizz_question']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ORM\Entity(repositoryClass: QuizzQuestionRepository::class)]
class QuizzQuestion
{
    #[Groups(['collection:get:quizz_question', 'item:get:quizz_question'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:quizz_question', 'item:get:quizz_question'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:quizz_question', 'item:get:quizz_question'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:quizz_question', 'item:get:quizz_question', 'item:post:quizz_question', 'item:put:quizz_question', 'item:patch:quizz_question'])]
    #[ORM\Column(length: 255)]
    private ?string $content = null;

    #[Groups(['collection:get:quizz_question', 'item:get:quizz_question'])]
    #[ORM\OneToMany(mappedBy: 'quizzQuestion', targetEntity: QuizzAnswer::class, orphanRemoval: true)]
    private Collection $quizzAnswers;

    public function __construct()
    {
        $this->quizzAnswers = new ArrayCollection();
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

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    /**
     * @return Collection<int, QuizzAnswer>
     */
    public function getQuizzAnswers(): Collection
    {
        return $this->quizzAnswers;
    }

    public function addQuizzAnswer(QuizzAnswer $quizzAnswer): self
    {
        if (!$this->quizzAnswers->contains($quizzAnswer)) {
            $this->quizzAnswers->add($quizzAnswer);
            $quizzAnswer->setQuizzQuestion($this);
        }

        return $this;
    }

    public function removeQuizzAnswer(QuizzAnswer $quizzAnswer): self
    {
        if ($this->quizzAnswers->removeElement($quizzAnswer)) {
            // set the owning side to null (unless already changed)
            if ($quizzAnswer->getQuizzQuestion() === $this) {
                $quizzAnswer->setQuizzQuestion(null);
            }
        }

        return $this;
    }
}
