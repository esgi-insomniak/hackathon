"use client";

import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
  SavedDataType,
  SkillThemeType,
} from "beautiful-skill-tree";
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
              children: [],
            },
          ],
        },
        {
          id: "mission",
          title: "Je pars en mission",
          icon: "https://static.thenounproject.com/png/4498804-200.png",
          tooltip: {
            content: "Participer à une mission dans une entreprise",
          },
          children: [],
        },
        {
          id: "detente",
          title: "Pause détente",
          icon: "https://cdn-icons-png.flaticon.com/512/1014/1014393.png",
          tooltip: {
            content: "Participer à un évènement Off Work",
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
    backgroundColor: "#fff",
    border: "1px solid #000",
    borderRadius: "0.5rem",
    primaryFont: "Roboto, sans-serif",
    primaryFontColor: "#000",
    treeBackgroundColor: "#fff",
    //disabledTreeOpacity: 0.5,
    headingFont: "Roboto, sans-serif",
    headingFontColor: "#000",
    headingFontSize: "1.5rem",
    headingHoverColor: "#000",
    headingHoverColorTransition: "0.2s ease-in-out",
    tooltipBackgroundColor: "#000",
    tooltipFontColor: "#fff",
    // tooltipZIndex: 100,
    nodeBackgroundColor: "#fff",
    nodeBorderColor: "#000",
    nodeAlternativeFontColor: "#000",
    nodeAltenativeActiveFontColor: "#000",
    nodeOverlayColor: "#fff",
    //nodeAlternativeActiveBackgroundColor: "#F00",
    //nodeActiveBackgroundColor: "#F00",
    nodeHoverBorder: "1px solid #000",
    nodeHoverBorderColor: "#000",
    nodeIconWidth: "2rem",
    //nodeMobileTextNodeHeight: "2rem",
    //nodeMobileTextNodeWidth: "2rem",
    //nodeMobileFontSize: "1rem",
    //nodeDesktopTextNodeHeight: "2rem",
    //nodeDesktopTextNodeWidth: "2rem",
    //nodeDesktopFontSize: "2rem",
    edgeBorder: "2px solid #000",
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <React.Fragment>
      <SkillProvider>
        <SkillTreeGroup theme={style}>
            {({ skillCount }: SkillGroupDataType) => (
              // Your content here
              <div
                className="text-black bg-white"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                //style={{ pointerEvents: isHovered ? "none" : "auto" }}
              >
                <SkillTree
                  treeId="carbon-tree-achievement"
                  title="Succès débloqués chez CarbonIT"
                  data={data}
                  savedData={data2}
                />
              </div>
            )}
        </SkillTreeGroup>
      </SkillProvider>
    </React.Fragment>
  );
}
