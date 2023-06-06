'use client'

import React from 'react';

export default function Page() {
    return (
        <div className="flex justify-start items-start h-screen flex-col mx-12">
            <div className="w-full mt-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl mt-8">Titre du topic</h1>
                </div>
            </div>
            <div className="w-full mt-8">
            <span className="inline-block bg-blue-300 text-white px-2 py-1 rounded-full text-sm font-semibold mb-4">Développement</span>
            <p className="text-gray-600 text-sm italic mb-4">Posté le 6 juin 2023 à 14h30</p>

                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis, quam in imperdiet posuere, eros ligula blandit risus, quis molestie arcu arcu nec purus. Mauris eget ipsum gravida nulla tincidunt laoreet. Donec in mollis enim, sed pulvinar eros. Ut pretium feugiat felis, quis mollis ante maximus sit amet. Sed hendrerit rutrum orci nec vulputate. Aliquam eget tincidunt est. Maecenas suscipit purus et nibh dignissim rhoncus.
                Maecenas convallis nisi at magna rhoncus vestibulum. Vivamus ac ligula nulla. Donec vitae tellus quis ante eleifend cursus. Cras metus libero, efficitur ac leo vitae, semper aliquet velit. Vivamus at turpis mauris. In rhoncus pretium ante facilisis tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin at nunc eros. Integer pretium erat lorem, et sodales leo scelerisque nec. Morbi hendrerit orci sit amet tellus malesuada varius. Nulla iaculis mauris ante, ac suscipit metus placerat porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed vitae justo non purus lobortis ornare. Quisque feugiat, neque ac condimentum pretium, mi dui semper nunc, eu sodales felis lacus sed ipsum.
                </p>
            </div>
            <div className="w-full mt-8">
                <h3 className="text-2xl mb-4">Commentaires</h3>
                <div className="flex justify-start items-center space-x-4">
                    <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Utilisateur" />
                    <textarea className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" placeholder="Ajouter un commentaire..." />
                </div>
                <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-lg hover:bg-blue-800 focus:outline-none focus:bg-blue-800">Publier</button>
            </div>
            <div className="w-full mt-8">
                <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Utilisateur" />
                        <div>
                            <p className="text-sm font-semibold">John Doe</p>
                            <p className="text-xs text-gray-500">Posté le 6 juin 2023 à 16h30</p>
                        </div>
                    </div>
                    <button className="text-xs text-gray-400 hover:text-gray-600 focus:outline-none">Supprimer</button>
                </div>
                <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra, diam et facilisis aliquam, arcu neque blandit dolor, a maximus diam ligula vitae risus.</p>
            </div>
            <div className="w-full mt-8">
                <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Utilisateur" />
                        <div>
                            <p className="text-sm font-semibold">John Doe</p>
                            <p className="text-xs text-gray-500">Posté le 6 juin 2023 à 16h30</p>
                        </div>
                    </div>
                    <button className="text-xs text-gray-400 hover:text-gray-600 focus:outline-none">Supprimer</button>
                </div>
                <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra, diam et facilisis aliquam, arcu neque blandit dolor, a maximus diam ligula vitae risus.</p>
            </div>
            <div className="w-full mt-8">
                <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Utilisateur" />
                        <div>
                            <p className="text-sm font-semibold">John Doe</p>
                            <p className="text-xs text-gray-500">Posté le 6 juin 2023 à 16h30</p>
                        </div>
                    </div>
                    <button className="text-xs text-gray-400 hover:text-gray-600 focus:outline-none">Supprimer</button>
                </div>
                <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra, diam et facilisis aliquam, arcu neque blandit dolor, a maximus diam ligula vitae risus.</p>
            </div>
            <div className="w-full mt-8">
                <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Utilisateur" />
                        <div>
                            <p className="text-sm font-semibold">John Doe</p>
                            <p className="text-xs text-gray-500">Posté le 6 juin 2023 à 16h30</p>
                        </div>
                    </div>
                    <button className="text-xs text-gray-400 hover:text-gray-600 focus:outline-none">Supprimer</button>
                </div>
                <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra, diam et facilisis aliquam, arcu neque blandit dolor, a maximus diam ligula vitae risus.</p>
            </div>





        </div>
    );
}
