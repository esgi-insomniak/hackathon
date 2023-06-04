<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CarRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CarRepository::class)]
#[ORM\Table(name: 'car')]
#[UniqueEntity('slug')]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:car', 'item:get:garage', 'item:get:carIdentity', 'id']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:car']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:car', 'item:get:garage', 'item:get:carIdentity', 'id']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:car']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:car']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new GetCollection(
            uriTemplate: '/garages/{id}/cars',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'cars',
                    fromClass: Garage::class
                )
            ],
            normalizationContext: ['groups' => ['collection:get:car', 'item:get:garage', 'item:get:carIdentity', 'id']],
        ),
        new GetCollection(
            uriTemplate: '/car_identities/{id}/cars',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'cars',
                    fromClass: CarIdentity::class
                )
            ],
            normalizationContext: ['groups' => ['collection:get:car', 'item:get:garage', 'item:get:carIdentity', 'item:get:car:isordered', 'id']],
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:car', 'item:get:car']],
    denormalizationContext: ['groups' => ['item:post:car', 'item:put:car', 'item:patch:car']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'id' => 'exact',
        'slug' => 'exact',
        'year' => 'exact',
        'isOrdered' => 'exact',
        'identity.id' => 'exact'
    ]
)]
class Car
{
    #[Groups(['collection:get:car', 'item:get:car', 'id'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car', 'id'])]
    #[ORM\Column(length: 255, unique: true)]
    private ?string $slug = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column(length: 20)]
    private ?string $fuel = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column(nullable: true)]
    private ?int $power = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column]
    private ?int $weight = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column]
    private ?float $speeding = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column(nullable: true)]
    private ?float $consumption = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column]
    private ?float $price = null;

    #[ORM\OneToMany(mappedBy: 'car', targetEntity: Order::class)]
    private Collection $orders;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column]
    private ?int $year = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column(type: 'json')]
    private array $options = [];

    #[Groups(['collection:get:car', 'item:get:car'])]
    #[ORM\ManyToMany(targetEntity: Image::class)]
    private Collection $images;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column(length: 10)]
    private ?string $gearboxType = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\Column]
    private ?int $mileage = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\ManyToOne(inversedBy: 'cars')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CarIdentity $identity = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:post:car', 'item:put:car', 'item:patch:car'])]
    #[ORM\ManyToOne(inversedBy: 'cars')]
    private ?Garage $garage = null;

    #[Groups(['collection:get:car', 'item:get:car', 'item:get:car:isordered'])]
    #[ORM\Column(options: ['default' => false])]
    private ?bool $isOrdered = null;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
        $this->images = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

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

    public function getPower(): ?int
    {
        return $this->power;
    }

    public function setPower(?int $power): self
    {
        $this->power = $power;

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(int $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getSpeeding(): ?float
    {
        return $this->speeding;
    }

    public function setSpeeding(float $speeding): self
    {
        $this->speeding = $speeding;

        return $this;
    }

    public function getConsumption(): ?float
    {
        return $this->consumption;
    }

    public function setConsumption(?float $consumption): self
    {
        $this->consumption = $consumption;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setCar($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        // set the owning side to null (unless already changed)
        if ($this->orders->removeElement($order) && $order->getCar() === $this) {
            $order->setCar(null);
        }

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getOptions(): array
    {
        return $this->options;
    }

    public function setOptions(?array $options): self
    {
        $this->options = $options;

        return $this;
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images->add($image);
        }

        return $this;
    }

    public function removeImage(Image $image): self
    {
        $this->images->removeElement($image);

        return $this;
    }

    public function getGearboxType(): ?string
    {
        return $this->gearboxType;
    }

    public function setGearboxType(string $gearboxType): self
    {
        $this->gearboxType = $gearboxType;

        return $this;
    }

    public function getMileage(): ?int
    {
        return $this->mileage;
    }

    public function setMileage(int $mileage): self
    {
        $this->mileage = $mileage;

        return $this;
    }

    public function getIdentity(): ?CarIdentity
    {
        return $this->identity;
    }

    public function setIdentity(?CarIdentity $identity): self
    {
        $this->identity = $identity;

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

    public function isIsOrdered(): ?bool
    {
        return $this->isOrdered;
    }

    public function setIsOrdered(bool $isOrdered): self
    {
        $this->isOrdered = $isOrdered;

        return $this;
    }
}
