<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\QuizzQuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuizzQuestionRepository::class)]
#[ApiResource]
class QuizzQuestion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $content = null;

    #[ORM\OneToMany(mappedBy: 'quizzQuestion', targetEntity: QuizzAnswer::class, orphanRemoval: true)]
    private Collection $quizzAnswers;

    public function __construct()
    {
        $this->quizzAnswers = new ArrayCollection();
    }

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
