<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\RecoveryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RecoveryRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:recovery', 'item:get:carIdentity', 'item:get:garage', 'item:get:status', 'item:get:user', 'id']],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:recovery']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:recovery', 'item:get:carIdentity', 'item:get:garage', 'item:get:status', 'item:get:user', 'id']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER') or object.getRecoverer() == user"
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:recovery']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER') or object.getRecoverer() == user"
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:recovery']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER') or object.getRecoverer() == user"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new GetCollection(
            uriTemplate: '/users/{id}/recoveries',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'recoveries',
                    fromClass: User::class
                )
            ],
            normalizationContext: ['groups' => ['collection:get:recovery', 'item:get:carIdentity', 'item:get:garage', 'item:get:status', 'item:get:user', 'id']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER') or id == user.getId()"
        ),
        new GetCollection(
            uriTemplate: '/garages/{id}/recoveries',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'recoveries',
                    fromClass: Garage::class
                )
            ],
            normalizationContext: ['groups' => ['collection:get:recovery', 'item:get:carIdentity', 'item:get:garage', 'item:get:status', 'item:get:user', 'id']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:recovery', 'item:get:recovery']],
    denormalizationContext: ['groups' => ['item:post:recovery', 'item:put:recovery', 'item:patch:recovery']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
class Recovery
{
    #[Groups(['collection:get:recovery', 'item:get:recovery', 'id'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery'])]
    #[ORM\ManyToOne(inversedBy: 'recoveries')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $recoverer = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery'])]
    #[ORM\ManyToOne(inversedBy: 'recoveries')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Garage $garage = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $carDescription = null;

    #[ApiProperty(securityPostDenormalize: "is_granted('ROLE_ADMIN')")]
    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Status $status = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\Column]
    private ?float $proposedPrice = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\ManyToOne(inversedBy: 'recoveries')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CarIdentity $carIdentity = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\Column(length: 255)]
    private ?string $year = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\Column(length: 255)]
    private ?string $kilometers = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\Column(length: 255)]
    private ?string $power = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\Column(length: 255)]
    private ?string $gearbox = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\Column(length: 255)]
    private ?string $fuel = null;

    #[Groups(['collection:get:recovery', 'item:get:recovery', 'item:post:recovery', 'item:put:recovery', 'item:patch:recovery'])]
    #[ORM\Column(length: 255)]
    private ?string $progression = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRecoverer(): ?User
    {
        return $this->recoverer;
    }

    public function setRecoverer(?User $recoverer): self
    {
        $this->recoverer = $recoverer;

        return $this;
    }

    public function getGarage(): ?Garage
    {
        return $this->garage;
    }

    public function setGarage(?Garage $garage): self
    {
        $this->garage = $garage;

        return $this;
    }

    public function getCarDescription(): ?string
    {
        return $this->carDescription;
    }

    public function setCarDescription(?string $carDescription): self
    {
        $this->carDescription = $carDescription;

        return $this;
    }

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(?Status $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getProposedPrice(): ?float
    {
        return $this->proposedPrice;
    }

    public function setProposedPrice(float $proposedPrice): self
    {
        $this->proposedPrice = $proposedPrice;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCarIdentity(): ?CarIdentity
    {
        return $this->carIdentity;
    }

    public function setCarIdentity(?CarIdentity $carIdentity): self
    {
        $this->carIdentity = $carIdentity;

        return $this;
    }

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear(string $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getKilometers(): ?string
    {
        return $this->kilometers;
    }

    public function setKilometers(string $kilometers): self
    {
        $this->kilometers = $kilometers;

        return $this;
    }

    public function getPower(): ?string
    {
        return $this->power;
    }

    public function setPower(string $power): self
    {
        $this->power = $power;

        return $this;
    }

    public function getGearbox(): ?string
    {
        return $this->gearbox;
    }

    public function setGearbox(string $gearbox): self
    {
        $this->gearbox = $gearbox;

        return $this;
    }

    public function getFuel(): ?string
    {
        return $this->fuel;
    }

    public function setFuel(string $fuel): self
    {
        $this->fuel = $fuel;

        return $this;
    }

    public function getProgression(): ?string
    {
        return $this->progression;
    }

    public function setProgression(string $progression): self
    {
        $this->progression = $progression;

        return $this;
    }
}
