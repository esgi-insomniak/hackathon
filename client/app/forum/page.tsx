'use client'
import Link from 'next/link';



export default function Page() {
    return (
        <div className="flex justify-start items-start h-screen flex-col mx-12">
            <div className="w-full mt-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl">Bienvenue sur notre Forum</h1>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3.333a.833.833 0 01.833.833v5.834h5.834a.833.833 0 010 1.666H10.833v5.834a.833.833 0 01-1.666 0V11.666H3.333a.833.833 0 010-1.666h5.834V4.166a.833.833 0 01.833-.833z" />
                        </svg>
                        Ajouter un topic
                    </button>
                </div>
            </div>
            <p className="text-2xl">Ici vous pouvez discuter de tout et de rien</p>
            <div className="w-full mt-8">
                <div className="flex justify-start items-start">
                    <div className="max-w-xl w-full bg-white shadow-md rounded-lg overflow-hidden mr-8">
                        <div className="p-6">
                            <h2 className="text-2xl font-medium mb-2">Lorem Ipsum Dolor</h2>
                            <span className="inline-block bg-blue-300 text-white px-2 py-1 rounded-full text-sm font-semibold mb-4">Développement</span>
                            <p className="text-gray-600 text-sm italic mb-4">Posté le 6 juin 2023 à 14h30</p>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra, diam et facilisis aliquam, arcu neque blandit dolor, a maximus diam ligula vitae risus. Mauris justo ligula, malesuada id tellus ut, rutrum euismod lacus. Suspendisse vitae sodales nibh, non tincidunt elit.</p>
                            <Link href="/forum/view">
                                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Accéder</button>
                            </Link>
                        </div>
                    </div>

                    <div className="max-w-xl w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-medium mb-2">Lorem Ipsum Dolor</h2>
                            <span className="inline-block bg-purple-500 text-white px-2 py-1 rounded-full text-sm font-semibold mb-4">Jeux Vidéos</span>
                            <p className="text-gray-600 text-sm italic mb-4">Posté le 6 juin 2023 à 14h30</p>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra, diam et facilisis aliquam, arcu neque blandit dolor, a maximus diam ligula vitae risus. Mauris justo ligula, malesuada id tellus ut, rutrum euismod lacus. Suspendisse vitae sodales nibh, non tincidunt elit.</p>
                            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Accéder</button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-start mt-8">
                    <div className="max-w-xl w-full bg-white shadow-md rounded-lg overflow-hidden mr-8">
                        <div className="p-6">
                            <h2 className="text-2xl font-medium mb-2">Lorem Ipsum Dolor</h2>
                            <span className="inline-block bg-orange-300 text-white px-2 py-1 rounded-full text-sm font-semibold mb-4">Réseau</span>
                            <p className="text-gray-600 text-sm italic mb-4">Posté le 6 juin 2023 à 14h30</p>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra, diam et facilisis aliquam, arcu neque blandit dolor, a maximus diam ligula vitae risus. Mauris justo ligula, malesuada id tellus ut, rutrum euismod lacus. Suspendisse vitae sodales nibh, non tincidunt elit.</p>
                            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Accéder</button>
                        </div>
                    </div>

                    <div className="max-w-xl w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-medium mb-2">Lorem Ipsum Dolor</h2>
                            <span className="inline-block bg-pink-500 text-white px-2 py-1 rounded-full text-sm font-semibold mb-4">Formations</span>
                            <p className="text-gray-600 text-sm italic mb-4">Posté le 6 juin 2023 à 14h30</p>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra, diam et facilisis aliquam, arcu neque blandit dolor, a maximus diam ligula vitae risus. Mauris justo ligula, malesuada id tellus ut, rutrum euismod lacus. Suspendisse vitae sodales nibh, non tincidunt elit.</p>
                            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Accéder</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}