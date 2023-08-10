import { configs, test } from '@utils/test/playwright';
import { expect } from '@playwright/test';

configs({ modes: ['ios'], directions: ['ltr'] }).forEach(({ title, config }) => {
  test.describe.only(title('datetime: cancel method'), () => {
    test('should emit ionCancel', async ({ page }) => {
      await page.setContent(
        `
        <ion-datetime></ion-datetime>
      `,
        config
      );

      const ionCancel = await page.spyOnEvent('ionCancel');
      const datetime = page.locator('ion-datetime');

      await datetime.evaluate((el: HTMLIonDatetimeElement) => el.cancel());

      await ionCancel.next();
    });

    test('parent overlay should be dismissed when true is passed', async ({ page }) => {
      await page.setContent(
        `
        <ion-modal>
          <ion-datetime></ion-datetime>
        </ion-modal>
      `,
        config
      );

      const ionModalDidPresent = await page.spyOnEvent('ionModalDidPresent');
      const ionModalDidDismiss = await page.spyOnEvent('ionModalDidDismiss');

      const datetime = page.locator('ion-datetime');
      const modal = page.locator('ion-modal');

      await modal.evaluate((el: HTMLIonModalElement) => el.present());

      await ionModalDidPresent.next();

      await datetime.evaluate((el: HTMLIonDatetimeElement) => el.cancel(true));

      await ionModalDidDismiss.next();
    });

    test('should reset the internal state of datetime', async ({ page }) => {
      await page.setContent(
        `
        <ion-datetime value="2023-06-06T16:30" show-default-buttons="true"></ion-datetime>
      `,
        config
      );

      const datetime = page.locator('ion-datetime');

      const day = datetime.locator('.calendar-day[data-month="6"][data-day="1"][data-year="2023"]');
      await day.click();
      await page.waitForChanges();

      await expect(day).toHaveClass(/calendar-day-active/);

      await datetime.evaluate((el: HTMLIonDatetimeElement) => el.cancel());
      await page.waitForChanges();

      await expect(day).not.toHaveClass(/calendar-day-active/);
    });
  });
});
