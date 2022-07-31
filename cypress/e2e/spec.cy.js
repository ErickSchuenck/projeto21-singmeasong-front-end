/// <reference types='cypress'/>
import { faker } from "@faker-js/faker"

const text = faker.music.songName()
const link = 'https://www.youtube.com/watch?v=nNhMjV76OQo'


describe("Home page", () => {

  it('should create recommendation', () => {
    cy.visit('http://localhost:3000');
    cy.get("#createRecommendationNameInput").type(`${text}`);
    cy.get("#createRecommendationLinkInput").type(link);
    cy.wait(1000);
    cy.get("#button").click();
  });

  it("should return an alert when registering an existing recommendation", () => {
  });
});