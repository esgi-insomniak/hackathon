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
use App\Controller\Order\OrderPaymentValidationController;
use App\Controller\Order\StripeCheckoutController;
use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:order', 'item:get:car', 'item:get:status', 'item:get:carIdentity', 'id']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:order']],
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:order', 'item:get:car', 'item:get:status', 'item:get:carIdentity', 'id']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER') or object.getOrderer() == user"
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:order']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER') or object.getOrderer() == user"
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:order']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER') or object.getOrderer() == user"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new Post(
            uriTemplate: '/orders/{id}/checkout',
            defaults: ['_api_receive' => false],
            controller: StripeCheckoutController::class,
            openapiContext: [
                'requestBody' => [
                    'content' => [
                        'application/ld+json' => [
                            'schema' => [],
                        ],
                    ],
                ],
            ],
            output: false,
        ),
        new Post(
            uriTemplate: '/orders/{id}/payment_validation',
            defaults: ['_api_receive' => false],
            controller: OrderPaymentValidationController::class,
            openapiContext: [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "sessionId" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ),
        new GetCollection(
            uriTemplate: '/users/{id}/orders',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'orders',
                    fromClass: User::class
                )
            ],
            normalizationContext: ['groups' => ['collection:get:order', 'item:get:car', 'item:get:status', 'item:get:carIdentity', 'id']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER') or id == user.getId()"
        ),
        new GetCollection(
            uriTemplate: '/garages/{id}/orders',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'orders',
                    fromClass: Garage::class
                )
            ],
            normalizationContext: ['groups' => ['collection:get:order', 'item:get:car', 'item:get:status', 'item:get:carIdentity', 'item:get:user', 'id']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new GetCollection(
            uriTemplate: '/cars/{id}/orders',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'orders',
                    fromClass: Car::class
                )
            ],
            normalizationContext: ['groups' => ['collection:get:order', 'item:get:car', 'item:get:status', 'item:get:carIdentity', 'id']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:order', 'item:get:order']],
    denormalizationContext: ['groups' => ['item:post:order', 'item:put:order', 'item:patch:order']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
class Order
{
    #[Groups(['collection:get:order', 'item:get:order', 'id'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:order', 'item:get:order', 'item:post:order'])]
    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $orderer = null;

    #[Groups(['collection:get:order', 'item:get:order', 'item:post:order', 'item:put:order', 'item:patch:order'])]
    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Car $car = null;

    #[Groups(['collection:get:order', 'item:get:order', 'item:post:order', 'item:put:order', 'item:patch:order'])]
    #[ORM\ManyToOne(inversedBy: 'orders')]
    private ?Garage $garage = null;

    #[Groups(['collection:get:order', 'item:get:order', 'item:post:order', 'item:put:order', 'item:patch:order'])]
    #[ORM\Column(type: Types::FLOAT, nullable: true)]
    private ?float $totalPrice = null;

    #[Groups(['collection:get:order', 'item:get:order', 'item:put:order', 'item:patch:order'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $appointmentDate = null;

    #[Groups(['collection:get:order', 'item:get:order'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['collection:get:order', 'item:get:order'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Groups(['collection:get:order', 'item:get:order', 'item:put:order', 'item:patch:order'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $finalisedAt = null;

    #[ApiProperty(securityPostDenormalize: "is_granted('ROLE_ADMIN')")]
    #[Groups(['collection:get:order', 'item:get:order', 'item:put:order', 'item:patch:order'])]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Status $status = null;

    #[Groups(['collection:get:order', 'item:get:order', 'item:put:order', 'item:patch:order'])]
    #[ORM\Column(nullable: false, options: ['default' => 'in-progress'])]
    private ?string $progression = null;

    #[ORM\Column(nullable: true)]
    private array $stripe = [];

    #[Groups(['collection:get:order', 'item:get:order', 'item:put:order', 'item:patch:order'])]
    #[ORM\Column(type: Types::BOOLEAN, options: ['default' => false])]
    private ?bool $sold = null;

    #[ORM\OneToMany(mappedBy: 'associateOrder', targetEntity: GarageSchudleEvent::class)]
    private Collection $garageSchudleEvents;

    public function __construct()
    {
        $this->garageSchudleEvents = new ArrayCollection();
        $this->sold = false;
        $this->progression = 'in-progress';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrderer(): ?User
    {
        return $this->orderer;
    }

    public function setOrderer(?User $orderer): self
    {
        $this->orderer = $orderer;

        return $this;
    }

    public function getCar(): ?Car
    {
        return $this->car;
    }

    public function setCar(?Car $car): self
    {
        $this->car = $car;

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

    public function getTotalPrice(): ?float
    {
        return $this->totalPrice;
    }

    public function setTotalPrice(?float $totalPrice): self
    {
        $this->totalPrice = $totalPrice;

        return $this;
    }

    public function getAppointmentDate(): ?\DateTimeInterface
    {
        return $this->appointmentDate;
    }

    public function setAppointmentDate(?\DateTimeInterface $appointmentDate): self
    {
        $this->appointmentDate = $appointmentDate;

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

    public function getFinalisedAt(): ?\DateTimeImmutable
    {
        return $this->finalisedAt;
    }

    public function setFinalisedAt(?\DateTimeImmutable $finalisedAt): self
    {
        $this->finalisedAt = $finalisedAt;

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

    public function getProgression(): string
    {
        return $this->progression;
    }

    public function setProgression(string $progression): self
    {
        $this->progression = $progression;

        return $this;
    }

    public function getStripe(): array
    {
        return $this->stripe;
    }

    public function setStripe(?array $stripe): self
    {
        $this->stripe = $stripe;

        return $this;
    }

    public function isSold(): ?bool
    {
        return $this->sold;
    }

    public function setSold(bool $sold): self
    {
        $this->sold = $sold;

        return $this;
    }

    /**
     * @return Collection<int, GarageSchudleEvent>
     */
    public function getGarageSchudleEvents(): Collection
    {
        return $this->garageSchudleEvents;
    }

    public function addGarageSchudleEvent(GarageSchudleEvent $garageSchudleEvent): self
    {
        if (!$this->garageSchudleEvents->contains($garageSchudleEvent)) {
            $this->garageSchudleEvents->add($garageSchudleEvent);
            $garageSchudleEvent->setAssociateOrder($this);
        }

        return $this;
    }

    public function removeGarageSchudleEvent(GarageSchudleEvent $garageSchudleEvent): self
    {
        if ($this->garageSchudleEvents->removeElement($garageSchudleEvent)) {
            // set the owning side to null (unless already changed)
            if ($garageSchudleEvent->getAssociateOrder() === $this) {
                $garageSchudleEvent->setAssociateOrder(null);
            }
        }

        return $this;
    }
}
