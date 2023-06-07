<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Unirest\Request as UnirestRequest;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Symfony\Component\DependencyInjection\ContainerInterface;
use UnexpectedValueException;

class ClerkAuthenticator extends AbstractAuthenticator
{
    private $clerkApiEndpointUrl;

    public function __construct(ContainerInterface $container, private EntityManagerInterface $entityManager){
        $this->clerkApiEndpointUrl = $container->getParameter('clerk_api_endpoint_url');
    }

    public function supports(Request $request): ?bool
    {
        if ('api_entrypoint' !== $request->attributes->get('_route')) {
            return true;
        }
        return false;
    }

    public function authenticate(Request $request): Passport
    {
        $jwtToken = $request->headers->get('Authorization');
        $decodedToken = null;

        if (null === $jwtToken) {
            throw new CustomUserMessageAuthenticationException('Missing JWT token');
        }

        try {
            // api call to clerk to get public key
            $clerkJWKS = json_decode(UnirestRequest::get("$this->clerkApiEndpointUrl/.well-known/jwks.json")->raw_body, true);
            // decode the tohen
            $decodedToken = JWT::decode($jwtToken, JWK::parseKeySet($clerkJWKS));

            if (null === $decodedToken->sub) {
                throw new CustomUserMessageAuthenticationException('Invalid JWT token');
            }

            // check if user exists in db
            // if not, create user
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['clerkUserId' => $decodedToken->sub]);

            if (!$user) {
                $user = new User();
                $user->setClerkUserId($decodedToken->sub);
                $this->entityManager->persist($user);
                $this->entityManager->flush();
            }

            return new SelfValidatingPassport(new UserBadge($decodedToken->sub));
        } catch (ExpiredException $e) {
            throw new CustomUserMessageAuthenticationException('JWT token expired');
        } catch (UnexpectedValueException $e) {
            throw new CustomUserMessageAuthenticationException('Invalid JWT token');
        }
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $data = [
            'message' => $exception->getMessage()
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
}
