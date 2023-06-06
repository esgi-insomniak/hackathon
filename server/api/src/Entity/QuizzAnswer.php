<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\QuizzAnswerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuizzAnswerRepository::class)]
#[ApiResource]
class QuizzAnswer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $content = null;

    #[ORM\Column]
    private ?bool $isCorrect = null;

    #[ORM\ManyToOne(inversedBy: 'quizzAnswers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?QuizzQuestion $quizzQuestion = null;

    public function getId(): ?int
    {
        return $this->id;
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
