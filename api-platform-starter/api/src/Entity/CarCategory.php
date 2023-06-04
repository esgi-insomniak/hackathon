<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CarCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CarCategoryRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['collection:get:carCategory', 'id']],
        ),
        new Post(
            denormalizationContext: ['groups' => ['item:post:carCategory']],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Get(
            normalizationContext: ['groups' => ['item:get:carCategory', 'id']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['item:put:carCategory']],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Patch(
            denormalizationContext: ['groups' => ['item:patch:carCategory']],
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ],
    normalizationContext: ['groups' => ['collection:get:carCategory', 'item:get:carCategory']],
    denormalizationContext: ['groups' => ['item:post:carCategory', 'item:put:carCategory', 'item:patch:carCategory']],
    paginationClientEnabled: true,
    paginationClientItemsPerPage: 10,
    paginationMaximumItemsPerPage: 50,
)]
class CarCategory
{
    #[Groups(['collection:get:carCategory', 'item:get:carCategory', 'id'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['collection:get:carCategory', 'item:get:carCategory', 'item:post:carCategory', 'item:put:carCategory', 'item:patch:carCategory', 'id'])]
    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[Groups(['collection:get:carCategory', 'item:get:carCategory', 'item:post:carCategory', 'item:put:carCategory', 'item:patch:carCategory', 'id'])]
    #[ORM\Column(length: 80, unique: true)]
    private ?string $slug = null;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: CarIdentity::class, orphanRemoval: true)]
    private Collection $carIdentities;

    public function __construct()
    {
        $this->carIdentities = new ArrayCollection();
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

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * @return Collection<int, CarIdentity>
     */
    public function getCarIdentities(): Collection
    {
        return $this->carIdentities;
    }

    public function addCarIdentity(CarIdentity $carIdentity): self
    {
        if (!$this->carIdentities->contains($carIdentity)) {
            $this->carIdentities->add($carIdentity);
            $carIdentity->setCategory($this);
        }

        return $this;
    }

    public function removeCarIdentity(CarIdentity $carIdentity): self
    {
        // set the owning side to null (unless already changed)
        if ($this->carIdentities->removeElement($carIdentity) && $carIdentity->getCategory() === $this) {
            $carIdentity->setCategory(null);
        }

        return $this;
    }
}
