import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DocumentChatApp/);
});

test('has logo', async ({page}) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('img')

    const isImageVisible = await page.$eval('img', (img) => {
        const { width, height } = img.getBoundingClientRect();
        return !!(width && height);
      });

      await expect(isImageVisible).toBeTruthy();
});

test('has input textbox', async ({page}) => {
    await page.goto('http://localhost:3000');

    const elementId = 'username';
    const existence = await page.$(`#${elementId}`);

    await expect(existence).toBeTruthy();

});

test('has input login button', async ({page}) => {
  await page.goto('http://localhost:3000');

  const elementId = 'login';
  const existence = await page.$(`#${elementId}`);

  await expect(existence).toBeTruthy();

});

test ('has placeholder', async ({page}) => {
  await page.goto('http://localhost:3000');

   // Get the entire page content
const pageContent = await page.textContent('body');

// Text to check for within the page content
const textToFind = 'Welcome';

// Check if the text exists within the page content
const isTextPresent = pageContent!.includes(textToFind);

await expect(isTextPresent).toBeTruthy();
})