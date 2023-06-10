// import all json file from fixtures
const users = require("./fixtures/user.json");
const event = require("./fixtures/event.json");
const formations = require("./fixtures/formations.json");
const mission = require("./fixtures/mission.json");
const quiz_answer = require("./fixtures/quiz_answer.json");
const quizz_question = require("./fixtures/quizz_question.json");
const quizz = require("./fixtures/quizz.json");
const roadmap = require("./fixtures/roadmap.json");
const skill_levels = require("./fixtures/skill_levels.json");
const skills = require("./fixtures/skills.json");
const { randomInt } = require("crypto");

import("pocketbase")
  .then((module) => {
    const PocketBase = module.default;
    const pb = new PocketBase("http://localhost:8090");
    let quizzAnswerId = [];

    async function createUser(users, missions, defaultSkill) {
      let userId;
      for (const user of users) {
        try {
          user.missions = [
            missions[randomInt(0, 2)],
            missions[randomInt(0, 2)],
            missions[randomInt(0, 2)],
          ];
          user.defaultSkills = [defaultSkill[randomInt(0, 4)]];
          const createdRecord = await pb
            .collection("users")
            .create(user, { $autoCancel: false });
          userId = createdRecord.id;
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
      return userId;
    }

    async function createEvent(event, userId) {
      for (const singleEvent of event) {
        singleEvent.author = userId;
        pb.collection("events")
          .create(singleEvent, { $autoCancel: false })
          .then((createdRecord) => {
            //          console.log("Created event:", createdRecord);
          })
          .catch((error) => {
            //console.error("Error creating event:", error);
          });
      }
    }

    async function createMission(mission) {
      let missionId = [];
      for (const singleMission of mission) {
        try {
          const createdRecord = await pb
            .collection("missions")
            .create(singleMission, { $autoCancel: false });
          missionId.push(createdRecord.id);
        } catch (error) {
          console.error("Error creating mission:", error);
        }
      }
      return missionId;
    }

    async function createQuizAnswer(quiz_answer, quizzAnswerId) {
      for (const quiz_a of quiz_answer) {
        try {
          const createdRecord = await pb
            .collection("quizz_answers")
            .create(quiz_a, { $autoCancel: false });
          quizzAnswerId.push(createdRecord.id);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
      return quizzAnswerId;
    }

    async function createQuizQuestion(quizz_question, quizzAnswerId) {
      let quizzQuestionId = [];
      for (const quiz_q of quizz_question) {
        try {
          quiz_q.field = [quizzAnswerId[0], quizzAnswerId[1], quizzAnswerId[2]];
          const createdRecord = await pb
            .collection("quizz_questions")
            .create(quiz_q, { $autoCancel: false });
          quizzQuestionId.push(createdRecord.id);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
      return quizzQuestionId;
    }

    async function createQuizz(quizz, quizzQuestionId) {
      let quizId;
      for (const quiz of quizz) {
        try {
          quiz.questions = [
            quizzQuestionId[0],
            quizzQuestionId[1],
            quizzQuestionId[2],
          ];
          const createdRecord = await pb
            .collection("quizz")
            .create(quiz, { $autoCancel: false });
          quizId = createdRecord.id;
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
      return quizId;
    }

    async function createFormation(formations, quizId) {
      let formationId = [];
      for (const formation of formations) {
        try {
          formation.quizz = quizId;
          const createdRecord = await pb
            .collection("formations")
            .create(formation, { $autoCancel: false });
          formationId.push(createdRecord.id);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
      return formationId;
    }

    async function createRoadmap(roadmap, formationId, quizId) {
      for (const road of roadmap) {
        try {
          road.formations = [formationId[2]];
          road.quizz = quizId;
          console.log(road);
          const createdRecord = await pb
            .collection("roadmaps")
            .create(road, { $autoCancel: false });
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    }

    createQuizAnswer(quiz_answer, quizzAnswerId).then((quizzAnswerId) => {
      console.log("QuizzAnswerId : " + quizzAnswerId);
      createQuizQuestion(quizz_question, quizzAnswerId).then(
        (quizzQuestionId) => {
          quizzQuestionId = quizzQuestionId;
          console.log("QuizzQuestionId : " + quizzQuestionId);
          createQuizz(quizz, quizzQuestionId).then((quizId) => {
            quizId = quizId;
            console.log("QuizId : " + quizId);
            createFormation(formations, quizId).then((formationId) => {
              formationId = formationId;
              console.log("FormationId : " + formationId);
              createRoadmap(roadmap, formationId, quizId).then(() => {
                console.log("Roadmap created");
              });
            });
          });
        }
      );
    });

    async function createSkillLevel(skill_levels) {
      let skillId = [];
      for (const skill_lvl of skill_levels) {
        try {
          const createdRecord = await pb
            .collection("skill_levels")
            .create(skill_lvl, { $autoCancel: false });
          skillId.push(createdRecord.id);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
      return skillId;
    }

    async function createSkill(skills, skillId) {
      let skillIdArray = [];
      for (const skill of skills) {
        skill.skill_level = [skillId[randomInt(0, 4)]];
        const createdRecord = await pb
          .collection("skills")
          .create(skill, { $autoCancel: false });
        skillIdArray.push(createdRecord.id);
      }
      return skillIdArray;
    }

    createSkillLevel(skill_levels).then((skillId) => {
      console.log("SkillId : " + skillId);
      createSkill(skills, skillId).then((skillIdArray) => {
        skillId = skillIdArray;
        console.log("SkillId : " + skillId);
        createMission(mission).then((missionId) => {
          missionId = missionId;
          console.log("MissionId : " + missionId);
          createUser(users, missionId, skillId).then((userId) => {
            userId = userId;
            console.log("UserId : " + userId);
            createEvent(event, userId).then(() => {
              console.log("Event created");
            });
          });
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error importing pocketbase:", error);
  });
