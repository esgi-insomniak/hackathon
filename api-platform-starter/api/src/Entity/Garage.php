<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\GarageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: GarageRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:garage', 'item:get:user', 'item:get:car:isordered', 'id']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:garage']],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:garage', 'item:get:user', 'item:get:car:isordered', 'id']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:garage']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:garage']],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_DEALER')"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:garage', 'item:get:garage']],
    denormalizationContext: ['groups' => ['item:post:garage', 'item:put:garage', 'item:patch:garage']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 100,
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'name' => 'partial',
        'coordinates' => 'exact',
        'isOpen' => 'exact',
        'cars.identity.id' => 'exact',
        'owner.id' => 'exact',
    ],
)]
#[ApiFilter(
    OrderFilter::class,
    properties: [
        'isOpen',
        'cars.identity.id' => [
            'property' => 'cars.identity.id',
            'strategy' => 'COUNT',
        ],
    ],
)]
class Garage
{
    #[Groups(['collection:get:garage', 'item:get:garage', 'id'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:garage', 'item:get:garage', 'item:post:garage', 'item:put:garage', 'item:patch:garage'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['collection:get:garage', 'item:get:garage', 'item:post:garage', 'item:put:garage', 'item:patch:garage'])]
    #[ORM\Column(type: 'json')]
    private array $coordinates = [];

    #[Groups(['collection:get:garage', 'item:get:garage', 'item:post:garage', 'item:put:garage', 'item:patch:garage'])]
    #[ORM\Column]
    private ?bool $isOpen = null;

    #[ORM\OneToMany(mappedBy: 'garage', targetEntity: Order::class)]
    private Collection $orders;

    #[ORM\OneToMany(mappedBy: 'garage', targetEntity: Recovery::class)]
    private Collection $recoveries;

    #[Groups(['item:get:car:isordered'])]
    #[ORM\OneToMany(mappedBy: 'garage', targetEntity: Car::class)]
    private Collection $cars;

    #[ORM\OneToMany(mappedBy: 'associateGarage', targetEntity: GarageSchudleEvent::class, orphanRemoval: true)]
    private Collection $garageSchudleEvents;

    #[Groups(['collection:get:garage', 'item:get:garage', 'item:post:garage', 'item:put:garage', 'item:patch:garage'])]
    #[ORM\ManyToOne(inversedBy: 'garages')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner = null;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
        $this->recoveries = new ArrayCollection();
        $this->cars = new ArrayCollection();
        $this->garageSchudleEvents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCoordinates(): array
    {
        return $this->coordinates;
    }

    public function setCoordinates(array $coordinates): self
    {
        $this->coordinates = $coordinates;

        return $this;
    }

    public function isIsOpen(): ?bool
    {
        return $this->isOpen;
    }

    public function setIsOpen(bool $isOpen): self
    {
        $this->isOpen = $isOpen;

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
            $order->setGarage($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getGarage() === $this) {
                $order->setGarage(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Recovery>
     */
    public function getRecoveries(): Collection
    {
        return $this->recoveries;
    }

    public function addRecovery(Recovery $recovery): self
    {
        if (!$this->recoveries->contains($recovery)) {
            $this->recoveries->add($recovery);
            $recovery->setGarage($this);
        }

        return $this;
    }

    public function removeRecovery(Recovery $recovery): self
    {
        if ($this->recoveries->removeElement($recovery)) {
            // set the owning side to null (unless already changed)
            if ($recovery->getGarage() === $this) {
                $recovery->setGarage(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Car>
     */
    public function getCars(): Collection
    {
        return $this->cars;
    }

    public function addCar(Car $car): self
    {
        if (!$this->cars->contains($car)) {
            $this->cars->add($car);
            $car->setGarage($this);
        }

        return $this;
    }

    public function removeCar(Car $car): self
    {
        // set the owning side to null (unless already changed)
        if ($this->cars->removeElement($car) && $car->getGarage() === $this) {
            $car->setGarage(null);
        }

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
            $garageSchudleEvent->setAssociateGarage($this);
        }

        return $this;
    }

    public function removeGarageSchudleEvent(GarageSchudleEvent $garageSchudleEvent): self
    {
        if ($this->garageSchudleEvents->removeElement($garageSchudleEvent)) {
            // set the owning side to null (unless already changed)
            if ($garageSchudleEvent->getAssociateGarage() === $this) {
                $garageSchudleEvent->setAssociateGarage(null);
            }
        }

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
