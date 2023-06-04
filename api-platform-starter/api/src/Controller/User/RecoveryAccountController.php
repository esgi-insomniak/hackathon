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
class RecoveryAccountController extends AbstractController
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

    public function __invoke(Request $request)
    {
        $payload = json_decode($request->getContent(), false);

        if (!isset($payload->email))
            throw new \Exception('No email specified.');

        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $payload->email]);

        if ($user) {
            $token = bin2hex(random_bytes(32));
            /**
             * @var User
             */
            $user->setRecoveryToken($token);

            $this->em->flush();

            $email = (new TemplatedEmail())
                ->subject('Email de réinitialisation de mot de passe')
                ->html("<p>vous avez fait une demande de réinitialisation de mot de passe.</br>cliquez sur <a href='" . $this->siteUrl . "account_recovery/" . $user->getRecoveryToken() . "'>ce lien</a> pour en choisir un nouveau.</p>")
                ->from($this->getParameter('sender_address'))
                ->to($user->getEmail());

            $this->mailer->send($email);
        }

        return $this->json([
            'message' => 'An email has been sent if the account exists.'
        ]);
    }
}
