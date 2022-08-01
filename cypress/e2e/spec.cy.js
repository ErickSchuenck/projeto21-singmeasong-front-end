/// <reference types='cypress'/>
import { faker } from "@faker-js/faker"

const text = faker.music.songName()
const link = 'https://www.youtube.com/watch?v=nNhMjV76OQo'

// FIXME // not working right

// beforeEach(() => {
//   cy.resetDatabase();
// });

describe("Home page", () => {

  const musicName = text;

  it('should create recommendation', () => {
    cy.visit('http://localhost:3000');
    cy.get("#createRecommendationNameInput").type(`${musicName}`);
    cy.get("#createRecommendationLinkInput").type(link);
    cy.wait(1000);
    cy.get("#button").click();
  });

  it("should alert when registering an existing recommendation", () => {
    cy.get("#createRecommendationNameInput").type(`${musicName}`);
    cy.get("#createRecommendationLinkInput").type(link);
    cy.wait(1000);
    cy.get("#button").click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Error creating recommendation!')
    })
  });

  it("should alert when trying to register an invalid recommendation", () => {
    cy.get("#createRecommendationNameInput").type(`${musicName}`);
    cy.get("#createRecommendationLinkInput").type(link);
    cy.wait(1000);
    cy.get("#button").click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Error creating recommendation!')
    })
  });

  it("should upvote recommendation", () => {
    cy.get("#upvoteButton").first().click();
    cy.contains(musicName)
      .get("article")
      .within(() => {
        cy.get("#upvotes").first().should("have.text", "1")
      });
  });

  it("should downvote recommendation", () => {
    cy.get("#downvoteButton").first().click();
    cy.contains(musicName)
      .get("article")
      .within(() => {
        cy.get("#upvotes").first().should("have.text", "0")
      });
  });

  it("should exclude recommendation", () => {
    for (let i = 0; i < 6; i++) {
      cy.get("#downvoteButton").first().click();
    }

    // this line below only works if database starts empty, should be fixed
    cy.contains("No recommendations yet! Create your own :)");
  });
});

describe('Random', () => {
  const musicName = text;

  it('should create a recommendation to be shown in the random recommendation suite', () => {
    // cy.visit('http://localhost:3000');
    cy.get("#createRecommendationNameInput").type(`${musicName}`);
    cy.get("#createRecommendationLinkInput").type(link);
    cy.wait(1000);
    cy.get("#button").click();
  });

  it('should show a random recommendation', () => {
    cy.visit('http://localhost:3000/random');
    cy.intercept('GET', '/recommendations/random').as('randomRecommendation');
    cy.wait('@randomRecommendation');
    cy.get('article').should('have.length', 1);
  });

  it("should exclude the random recommendation", () => {
    cy.visit('http://localhost:3000');
    cy.wait(1000);
    for (let i = 0; i < 6; i++) {
      cy.get("#downvoteButton").click();
    }
  });
});
