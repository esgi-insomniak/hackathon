<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\QuizzAnswerRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:quizz_answer']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:quizz_answer']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:quizz_answer']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:quizz_answer']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:quizz_answer']],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:quizz_answer', 'item:get:quizz_answer']],
    denormalizationContext: ['groups' => ['item:post:quizz_answer', 'item:put:quizz_answer', 'item:patch:quizz_answer']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ORM\Entity(repositoryClass: QuizzAnswerRepository::class)]
class QuizzAnswer
{
    #[Groups(['collection:get:quizz_answer', 'item:get:quizz_answer'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:quizz_answer', 'item:get:quizz_answer'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:quizz_answer', 'item:get:quizz_answer'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:quizz_answer', 'item:get:quizz_answer', 'item:post:quizz_answer', 'item:put:quizz_answer', 'item:patch:quizz_answer'])]
    #[ORM\Column(length: 255)]
    private ?string $content = null;

    #[Groups(['collection:get:quizz_answer', 'item:get:quizz_answer', 'item:post:quizz_answer', 'item:put:quizz_answer', 'item:patch:quizz_answer'])]
    #[ORM\Column]
    private ?bool $isCorrect = null;

    #[ORM\ManyToOne(inversedBy: 'quizzAnswers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?QuizzQuestion $quizzQuestion = null;

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

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function isIsCorrect(): ?bool
    {
        return $this->isCorrect;
    }

    public function setIsCorrect(bool $isCorrect): self
    {
        $this->isCorrect = $isCorrect;

        return $this;
    }

    public function getQuizzQuestion(): ?QuizzQuestion
    {
        return $this->quizzQuestion;
    }

    public function setQuizzQuestion(?QuizzQuestion $quizzQuestion): self
    {
        $this->quizzQuestion = $quizzQuestion;

        return $this;
    }
}
