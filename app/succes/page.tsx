"use client";

import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
  SavedDataType,
  SkillThemeType,
  NodeSelectEvent,
} from "beautiful-skill-tree";
import Link from "next/link";
import { Button } from "ra-ui-materialui";
import React from "react";

export default function Page() {
  const data: SkillType[] = [
    {
      id: "welcome-to-carbon",
      title: "Bienvenue chez Carbon IT",
      icon: "https://carbon-it.fr/wp-content/uploads/2020/11/cropped-android-chrome-192x192-1.png",
      tooltip: {
        content:
          "Nous sommes heureux de vous accueillir dans notre équipe. Vous trouverez ici les compétences que nous attendons de vous.",
      },
      children: [
        {
          id: "formation",
          title: "Je me forme",
          icon: "https://cdn-icons-png.flaticon.com/512/2133/2133081.png",
          tooltip: {
            content: "Formez-vous sur 1 formation",
          },
          children: [
            {
              id: "formation-2",
              title: "Je me forme 2",
              icon: "https://cdn-icons-png.flaticon.com/512/2133/2133081.png",
              tooltip: {
                content: "Formez-vous sur 3 formations",
              },
              children: [
                {
                  id: "formation-3",
                  title: "Je me forme 3",
                  icon: "https://cdn-icons-png.flaticon.com/512/2133/2133081.png",
                  tooltip: {
                    content: "Formez-vous sur 5 formations",
                  },
                  children: [
                    {
                      id: "formateur",
                      title: "Je forme mes collaborateurs",
                      icon: "https://cdn-icons-png.flaticon.com/512/2133/2133081.png",
                      tooltip: {
                        content:
                          "Présentez un sujet de formation à vos collaborateurs. Récompenses : Badges formateur + 5% de salaire",
                      },
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "badges",
              title: "Je me certifie",
              icon: "https://www.iconpacks.net/icons/1/free-badge-icon-1361-thumb.png",
              tooltip: {
                content: "Obtenez votre premier badges de formation",
              },
              children: [
                {
                  id: "badges-2",
                  title: "Je me certifie 2",
                  icon: "https://icons-for-free.com/iconfiles/png/512/badge+bronze+medal+prize+trophy+winner+icon-1320086097955559704.png",
                  tooltip: {
                    content:
                      "Validé un badge de niveau fer dans un langage de programmation front",
                  },
                  children: [
                    {
                      id: "badges-5",
                      title: "Je me certifie 5",
                      icon: "https://cdn2.iconfinder.com/data/icons/bitsies/128/MedalSilver-128.png",
                      tooltip: {
                        content:
                          "Validé un badge de niveau or dans un langage de programmation front",
                      },
                      children: [
                        {
                          id: "badges-6",
                          title: "Je me certifie 6",
                          icon: "https://icons-for-free.com/iconfiles/png/512/badge+gold+medal+prize+reward+trophy+icon-1320086098247761000.png",
                          tooltip: {
                            content:
                              "Validé un badge de niveau diamant dans un langage de programmation front. Récompenses : Badges développeur front + 100€ de primes",
                          },
                          children: [],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "badges-3",
                  title: "Je me certifie 3",
                  icon: "https://icons-for-free.com/iconfiles/png/512/badge+bronze+medal+prize+trophy+winner+icon-1320086097955559704.png",
                  tooltip: {
                    content:
                      "Validé un badge de niveau fer dans un langage de programmation back",
                  },
                  children: [
                    {
                      id: "badges-7",
                      title: "Je me certifie 7",
                      icon: "https://cdn2.iconfinder.com/data/icons/bitsies/128/MedalSilver-128.png",
                      tooltip: {
                        content:
                          "Validé un badge de niveau or dans un langage de programmation back",
                      },
                      children: [
                        {
                          id: "badges-8",
                          title: "Je me certifie 8",
                          icon: "https://icons-for-free.com/iconfiles/png/512/badge+gold+medal+prize+reward+trophy+icon-1320086098247761000.png",
                          tooltip: {
                            content:
                              "Validé un badge de niveau diamant dans un langage de programmation back. Récompenses : Badges développeur back + 100€ de primes",
                          },
                          children: [],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "badges-4",
                  title: "Je me certifie 4",
                  icon: "https://icons-for-free.com/iconfiles/png/512/badge+bronze+medal+prize+trophy+winner+icon-1320086097955559704.png",
                  tooltip: {
                    content: "Validé un badge de niveau fer dans un softskills",
                  },
                  children: [
                    {
                      id: "badges-9",
                      title: "Je me certifie 9",
                      icon: "https://cdn2.iconfinder.com/data/icons/bitsies/128/MedalSilver-128.png",
                      tooltip: {
                        content:
                          "Validé un badge de niveau or dans un softskills",
                      },
                      children: [
                        {
                          id: "badges-10",
                          title: "Je me certifie 10",
                          icon: "https://icons-for-free.com/iconfiles/png/512/badge+gold+medal+prize+reward+trophy+icon-1320086098247761000.png",
                          tooltip: {
                            content:
                              "Validé un badge de niveau diamant dans un softskills. Récompenses : Badges Softskillers + 100€ de primes",
                          },
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "mission",
          title: "Je pars en mission",
          icon: "https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/briefcase-512.png",
          tooltip: {
            content: "Participer à une mission dans une entreprise",
          },
          children: [],
        },
        {
          id: "detente",
          title: "Pause détente",
          icon: "https://cdn-icons-png.flaticon.com/512/987/987624.png",
          tooltip: {
            content: "Participer à un évènement Off Work",
          },
          children: [
            {
              id: "detente",
              title: "Organisation de pause détente",
              icon: "https://cdn-icons-png.flaticon.com/512/171/171021.png?w=360",
              tooltip: {
                content:
                  "Organiser un évènement Off Work. Récompense : Badges Off Work + 300€ de primes",
              },
              children: [],
            },
          ],
        },
        {
          id: "entretien",
          title: "Premier entretien annuel",
          icon: "https://cdn-icons-png.flaticon.com/512/1478/1478906.png",
          tooltip: {
            content: "Réaliser votre premier entretien annuel",
          },
          children: [],
        },
      ],
    },
  ];

  const data2: SavedDataType = {
    "welcome-to-carbon": {
      optional: false,
      nodeState: "selected",
    },
    formation: {
      optional: false,
      nodeState: "locked",
    },
    mission: {
      optional: false,
      nodeState: "locked",
    },
    detente: {
      optional: false,
      nodeState: "locked",
    },
    "formation-2": {
      optional: false,
      nodeState: "locked",
    },
  };

  const style: SkillThemeType = {
    border: "2px solid black",
    borderRadius: "4px",
    primaryFont: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    primaryFontColor: "white",
    treeBackgroundColor: "#transparent",
    disabledTreeOpacity: 0.8,
    headingFont: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    headingFontColor: "white",
    headingFontSize: "24px",
    headingHoverColor: "#35373b",
    headingHoverColorTransition: "background 0.3s ease-out",
    tooltipBackgroundColor: "white",
    tooltipFontColor: "#16181c",
    tooltipZIndex: 99999,
    nodeBackgroundColor: "#282c34",
    nodeBorderColor: "black",
    nodeAlternativeFontColor: "white",
    nodeAltenativeActiveFontColor: "white",
    nodeOverlayColor: "white",
    //nodeAlternativeActiveBackgroundColor: `red`,
    //nodeActiveBackgroundColor: `red`,
    nodeHoverBorder: "4px solid",
    nodeHoverBorderColor: `red`,
    nodeIconWidth: "64px",
    nodeMobileTextNodeHeight: "32px",
    nodeMobileTextNodeWidth: "144px",
    nodeMobileFontSize: "14px",
    nodeDesktopTextNodeHeight: "32px",
    nodeDesktopTextNodeWidth: "144px",
    nodeDesktopFontSize: "16px",
    edgeBorder: "2px solid black",
  };

  return (
    <React.Fragment>
      <div className="m-5 flex justify-end">
        <Link
          href="/succes/add"
          className="bg-carbon-blue hover:bg-carbon-blue text-white font-bold py-2 px-4 rounded"
        >
          Créé un succès
        </Link>
      </div>
      <SkillProvider>
        <SkillTreeGroup theme={style}>
          {({ skillCount }: SkillGroupDataType) => (
            <div className="text-black bg-white">
              <SkillTree
                treeId="carbon-tree-achievement"
                title="Succès débloqués chez CarbonIT"
                data={data}
              />
            </div>
          )}
        </SkillTreeGroup>
      </SkillProvider>
    </React.Fragment>
  );
}
