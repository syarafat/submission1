const assert = require('assert');

Feature('Favorite Resto');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

const emptyFavoriteRestoText = 'Empty favorite Resto';

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.seeElement('#dataRestoran');
  I.see(emptyFavoriteRestoText, '#dataRestoran');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(emptyFavoriteRestoText, '#dataRestoran');

  I.amOnPage('/#');
  I.seeElement('.card a');
  const firstRestoCardTitle = await I.grabTextFrom(locate('.card-content-title').first());
  I.click('.card-content-title');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const likedCardTitle = await I.grabTextFrom('.card-content-title');
  assert.strictEqual(firstRestoCardTitle, likedCardTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.seeElement('.card');
  I.click('.card-content-title');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('#dataRestoran');
  I.dontSeeElement('.card');
  I.dontSeeElement('.card-content-title');
});
