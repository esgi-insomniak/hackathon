<?php

namespace App\Controller\User;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class RecoveryAccountChangePasswordController extends AbstractController
{
    private $em;
    private $mailer;
    private $siteUrl;

    public function __construct(EntityManagerInterface $em, MailerInterface $mailer, private readonly UserPasswordHasherInterface $passwordHasher)
    {
        $this->em = $em;
        $this->mailer = $mailer;
        $this->siteUrl = $_ENV['SITE_URL'] ?? 'http://localhost:8080/';
    }

    public function __invoke(Request $request)
    {
        $payload = json_decode($request->getContent(), false);

        if (!isset($payload->recoveryToken))
            throw new \Exception('No token specified.');
        if (!isset($payload->password))
            throw new \Exception('No password specified.');
        if (!isset($payload->confirmPassword))
            throw new \Exception('No password confirmation specified.');

        /**
         * @var User
         */
        $user = $this->em->getRepository(User::class)->findOneBy(['recoveryToken' => $payload->recoveryToken]);

        if (!$user)
            throw new \Exception('invalid token.');
        if ($payload->password !== $payload->confirmPassword)
            throw new \Exception('Passwords do not match.');

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $payload->password
        );

        $user->setPassword($hashedPassword);
        $user->eraseCredentials();
        $user->setRecoveryToken(null);
        $this->em->flush();

        $email = (new TemplatedEmail())
            ->subject('Email de réinitialisation de mot de passe')
            ->html("<p>votre mot de passe vient d'être modifié.</p>")
            ->from($this->getParameter('sender_address'))
            ->to($user->getEmail());

        $this->mailer->send($email);

        return $this->json([
            'message' => 'your password has been changed.'
        ]);
    }
}
