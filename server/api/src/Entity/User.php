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
use App\Controller\User\ConfirmationEmailController;
use App\Controller\User\RecoveryAccountChangePasswordController;
use App\Controller\User\RecoveryAccountController;
use App\Controller\User\ValidateAccountController;
use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert; // Symfony's built-in constraints

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:user','id']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:user']],
            processor: UserPasswordHasher::class
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:user', 'id']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:user']],
            security: "is_granted('ROLE_ADMIN') or object == user",
            processor: UserPasswordHasher::class
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:user']],
            security: "is_granted('ROLE_ADMIN') or object == user",
            processor: UserPasswordHasher::class
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Post(
            uriTemplate: '/users/{id}/send_confirmation_email',
            defaults: ['_api_receive' => false],
            controller: ConfirmationEmailController::class,
            openapiContext: [
                'requestBody' => [
                    'content' => [],
                ],
            ],
            security: "object == user",
            output: false
        ),
        new Post(
            uriTemplate: '/users/{id}/validate_account',
            defaults: ['_api_receive' => false],
            controller: ValidateAccountController::class,
            openapiContext: [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "confirmationCode" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            security: "object == user",
            output: false
        ),
        new Post(
            uriTemplate: '/users/recovery_account',
            defaults: ['_api_receive' => false],
            controller: RecoveryAccountController::class,
            openapiContext: [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "email" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            output: false,
        ),
        new Post(
            uriTemplate: '/users/recovery_account_change_password',
            defaults: ['_api_receive' => false],
            controller: RecoveryAccountChangePasswordController::class,
            openapiContext: [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "recoveryToken" => ["type" => "string"],
                                    "password" => ["type" => "string"],
                                    "confirmPassword" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            output: false,
        )
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
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups(['collection:get:user', 'item:get:user', 'id'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[Groups(['collection:get:user', 'item:get:user', 'item:post:user', 'item:put:user', 'item:patch:user'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ApiProperty(securityPostDenormalize: "is_granted('ROLE_ADMIN')")]
    #[Groups(['collection:get:user', 'item:get:user', 'item:put:user', 'item:patch:user'])]
    #[ORM\Column(type: 'json')]
    private array $roles;

    #[Assert\NotBlank(groups: ['item:post:user'])]
    #[Groups(['item:post:user', 'item:put:user', 'item:patch:user'])]
    private ?string $plainPassword = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $confirmationCode;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $recoveryToken;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    #[Groups(['item:get:user'])]
    private $haveRecoverToken = false;

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private string $password = '';

    #[Assert\NotBlank(groups: ['item:post:user'])]
    #[Groups(['collection:get:user', 'item:get:user', 'item:post:user', 'item:put:user', 'item:patch:user'])]
    #[ORM\Column(length: 50)]
    private ?string $firstName = null;


    #[Assert\NotBlank(groups: ['item:post:user'])]
    #[Groups(['collection:get:user', 'item:get:user', 'item:post:user', 'item:put:user', 'item:patch:user'])]
    #[ORM\Column(length: 50)]
    private ?string $lastName = null;

    #[Groups(['collection:get:user', 'item:get:user'])]
    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $verifiedAt = null;

    #[Groups(['collection:get:user', 'item:get:user'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['collection:get:user', 'item:get:user'])]
    #[ORM\Column(type: 'datetime_immutable', nullable: true, options: ['default' => null])]
    private ?DateTimeImmutable $updatedAt = null;

    #[ORM\OneToMany(mappedBy: 'planner', targetEntity: Event::class, orphanRemoval: true)]
    private Collection $events;

    public function __construct()
    {
        $this->roles = ['ROLE_USER'];
        $this->events = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string)$this->email;
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

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $painPassword): self
    {
        $this->plainPassword = $painPassword;

        return $this;
    }

    public function isActivated(): ?bool
    {
        return $this->verifiedAt !== null;
    }

    public function isHaveRecoverToken(): ?bool
    {
        return $this->haveRecoverToken;
    }

    public function activate(): self
    {
        $this->verifiedAt = new DateTimeImmutable();
        $this->confirmationCode = null;

        return $this;
    }

    public function getConfirmationCode(): ?string
    {
        return $this->confirmationCode;
    }

    public function setConfirmationCode(?string $confirmationCode): self
    {
        $this->confirmationCode = $confirmationCode;

        return $this;
    }

    public function getRecoveryToken(): ?string
    {
        return $this->recoveryToken;
    }

    public function setRecoveryToken(?string $recoveryToken): self
    {
        $this->recoveryToken = $recoveryToken;
        $this->haveRecoverToken = $recoveryToken !== null;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getVerifiedAt(): ?DateTimeImmutable
    {
        return $this->verifiedAt;
    }

    public function setVerifiedAt(?DateTimeImmutable $verifiedAt): self
    {
        $this->verifiedAt = $verifiedAt;

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

    /**
     * @return Collection<int, Event>
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Event $event): self
    {
        if (!$this->events->contains($event)) {
            $this->events->add($event);
            $event->setPlanner($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->removeElement($event)) {
            // set the owning side to null (unless already changed)
            if ($event->getPlanner() === $this) {
                $event->setPlanner(null);
            }
        }

        return $this;
    }
}
