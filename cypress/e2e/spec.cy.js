/// <reference types='cypress'/>
import { faker } from "@faker-js/faker"

const text = faker.music.songName()
const link = 'https://www.youtube.com/watch?v=nNhMjV76OQo'


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
});
