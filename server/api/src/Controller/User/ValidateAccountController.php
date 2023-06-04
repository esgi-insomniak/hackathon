<?php

namespace App\Controller\User;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;

#[AsController]
class ValidateAccountController extends AbstractController
{
    private $em;
    private $mailer;
    private $siteUrl;

    public function __construct(EntityManagerInterface $em, MailerInterface $mailer)
    {
        $this->em = $em;
        $this->mailer = $mailer;
        $this->siteUrl = $_ENV['SITE_URL'] ?? 'http://localhost:8080/';
    }

    public function __invoke($id, Request $request)
    {
        /**
         * @var User
         */
        $user = $this->getUser();
        $payload = json_decode($request->getContent(), false);

        if((int)$id !== $user->getId() || $user->getConfirmationCode() === null)
            throw new \Exception('Your are not allowed to activate your account.');
        if($user->isActivated())
            throw new \Exception('Your account is already activated.');
        if(!isset($payload->confirmationCode))
            throw new \Exception('No confirmation code specified.');
        if($payload->confirmationCode !== $user->getConfirmationCode())
            throw new \Exception('Invalid confirmation code.');

        $user->activate();
        $this->em->flush();

        $email = (new TemplatedEmail())
            ->subject('Email de validation de compte')
            ->html("<p>votre compte est maintenant activé.</br>cliquez sur <a href='" . $this->siteUrl . "'>ce lien</a> pour être rediriger vers le site.</p>")
            ->from($this->getParameter('sender_address'))
            ->to($user->getEmail());

        $this->mailer->send($email);

        return $this->json([
            'message' => 'Your account is now activated.'
        ]);
    }
}