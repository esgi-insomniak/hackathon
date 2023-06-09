<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Ignore;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:user']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:user']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:user']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:user']],
            security: "is_granted('ROLE_ADMIN') or object == user",
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:user']],
            security: "is_granted('ROLE_ADMIN') or object == user",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:user', 'item:get:user']],
    denormalizationContext: ['groups' => ['item:post:user', 'item:put:user', 'item:patch:user']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity('email')]
class User implements UserInterface
{
    #[Groups(['collection:get:user', 'item:get:user'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ApiProperty(securityPostDenormalize: "is_granted('ROLE_ADMIN')")]
    #[Groups(['collection:get:user', 'item:get:user', 'item:put:user', 'item:patch:user'])]
    #[ORM\Column(type: 'json')]
    private array $roles;

    #[Groups(['collection:get:user', 'item:get:user'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:user', 'item:get:user'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:user', 'item:get:user'])]
    #[ORM\Column(length: 255)]
    private ?string $clerkUserId = null;

    #[Groups(['collection:get:user', 'item:get:user', 'item:put:user', 'item:patch:user'])]
    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'subordinates')]
    private ?self $manager = null;

    #[Groups(['collection:get:user', 'item:get:user'])]
    #[ORM\OneToMany(mappedBy: 'manager', targetEntity: self::class)]
    private Collection $subordinates;

    public function __construct()
    {
        $this->roles = ['ROLE_USER'];
        $this->createdAt = new DateTimeImmutable('now');
        $this->subordinates = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
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

    public function getClerkUserId(): ?string
    {
        return $this->clerkUserId;
    }

    public function setClerkUserId(string $clerkUserId): self
    {
        $this->clerkUserId = $clerkUserId;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     * @Ignore
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->clerkUserId;
    }

    public function getManager(): ?self
    {
        return $this->manager;
    }

    public function setManager(?self $manager): self
    {
        $this->manager = $manager;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getSubordinates(): Collection
    {
        return $this->subordinates;
    }

    public function addSubordinate(self $subordinate): self
    {
        if (!$this->subordinates->contains($subordinate)) {
            $this->subordinates->add($subordinate);
            $subordinate->setManager($this);
        }

        return $this;
    }

    public function removeSubordinate(self $subordinate): self
    {
        if ($this->subordinates->removeElement($subordinate)) {
            // set the owning side to null (unless already changed)
            if ($subordinate->getManager() === $this) {
                $subordinate->setManager(null);
            }
        }

        return $this;
    }
}
