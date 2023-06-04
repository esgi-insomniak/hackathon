<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Put;
use App\Repository\GarageSchudleEventRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: GarageSchudleEventRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:get:user','item:get:carIdentity','id']],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:garageSchudleEvent']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:garageSchudleEvent', 'item:get:garageSchudleEvent','item:get:user', 'item:get:carIdentity', 'id']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER') or object.getAssociateUser() == user"
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:garageSchudleEvent']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:garageSchudleEvent']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new GetCollection(
            uriTemplate: '/garages/{id}/garage_schudle_events',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'garageSchudleEvents',
                    fromClass: Garage::class
                )
            ],
            normalizationContext: ['groups' => ['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:get:user', 'item:get:carIdentity', 'item:get:order', 'id']],
        ),
        new GetCollection(
            uriTemplate: '/users/{id}/garage_schudle_events',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'garageSchudleEvents',
                    fromClass: User::class
                )
            ],
            normalizationContext: ['groups' => ['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'id']],
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent']],
    denormalizationContext: ['groups' => ['item:post:garageSchudleEvent', 'item:put:garageSchudleEvent', 'item:patch:garageSchudleEvent']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ApiFilter(
    OrderFilter::class,
    properties: ["createdAt", "updatedAt", "dateStart", "dateEnd"]
)]
#[ApiFilter(
    DateFilter::class,
    properties: ["dateStart", "dateEnd"],
)]
class GarageSchudleEvent
{
    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'id'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent', 'item:put:garageSchudleEvent', 'item:patch:garageSchudleEvent'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $dateStart = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent', 'item:put:garageSchudleEvent', 'item:patch:garageSchudleEvent'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $dateEnd = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent', 'item:put:garageSchudleEvent', 'item:patch:garageSchudleEvent'])]
    #[ORM\Column(length: 2048, nullable: true)]
    private ?string $description = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent'])]
    #[ORM\ManyToOne(inversedBy: 'garageSchudleEvents')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Garage $associateGarage = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent'])]
    #[ORM\ManyToOne(inversedBy: 'garageSchudleEvents')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $associateUser = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent', 'item:put:garageSchudleEvent', 'item:patch:garageSchudleEvent'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reason = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent', 'item:put:garageSchudleEvent', 'item:patch:garageSchudleEvent'])]
    #[ORM\ManyToOne(inversedBy: 'garageSchudleEvents')]
    private ?CarIdentity $carIdentity = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent', 'item:put:garageSchudleEvent', 'item:patch:garageSchudleEvent'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $kilometers = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent', 'item:put:garageSchudleEvent', 'item:patch:garageSchudleEvent'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fuel = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent', 'item:put:garageSchudleEvent', 'item:patch:garageSchudleEvent'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $gearbox = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent', 'id'])]
    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[Groups(['collection:get:garageSchudleEvent', 'item:get:garageSchudleEvent', 'item:post:garageSchudleEvent'])]
    #[ORM\ManyToOne(inversedBy: 'garageSchudleEvents')]
    private ?Order $associateOrder = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateStart(): ?\DateTimeImmutable
    {
        return $this->dateStart;
    }

    public function setDateStart(\DateTimeImmutable $dateStart): self
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    public function getDateEnd(): ?\DateTimeImmutable
    {
        return $this->dateEnd;
    }

    public function setDateEnd(\DateTimeImmutable $dateEnd): self
    {
        $this->dateEnd = $dateEnd;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

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

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getAssociateGarage(): ?Garage
    {
        return $this->associateGarage;
    }

    public function setAssociateGarage(?Garage $associateGarage): self
    {
        $this->associateGarage = $associateGarage;

        return $this;
    }

    public function getAssociateUser(): ?User
    {
        return $this->associateUser;
    }

    public function setAssociateUser(?User $associateUser): self
    {
        $this->associateUser = $associateUser;

        return $this;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(?string $reason): self
    {
        $this->reason = $reason;

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

    public function getKilometers(): ?string
    {
        return $this->kilometers;
    }

    public function setKilometers(?string $kilometers): self
    {
        $this->kilometers = $kilometers;

        return $this;
    }

    public function getFuel(): ?string
    {
        return $this->fuel;
    }

    public function setFuel(?string $fuel): self
    {
        $this->fuel = $fuel;

        return $this;
    }

    public function getGearbox(): ?string
    {
        return $this->gearbox;
    }

    public function setGearbox(?string $gearbox): self
    {
        $this->gearbox = $gearbox;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getAssociateOrder(): ?Order
    {
        return $this->associateOrder;
    }

    public function setAssociateOrder(?Order $associateOrder): self
    {
        $this->associateOrder = $associateOrder;

        return $this;
    }
}
