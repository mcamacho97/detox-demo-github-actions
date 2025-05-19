import { expect } from 'detox';

describe('Onboarding Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should render the splash screen', async () => {
    await expect(element(by.id('splashBackgroundImage'))).toBeVisible();
  });

  it('should navigate to location permission screen', async () => {
    await waitFor(element(by.id('locationPermissionScreen')))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id('locationPermissionScreen'))).toBeVisible();
  });

  it('should tap continue and accept location permission', async () => {
    await element(by.id('locationPermissionContinueButton')).tap();
    //await device.grantPermissions('android.permission.ACCESS_FINE_LOCATION');
    // await expect(element(by.id('notificationPermissionScreen'))).toBeVisible();
  });

  it('should tap continue and accept notification permission', async () => {
    await element(by.text('Continuar')).tap();
    //await device.grantPermissions('android.permission.POST_NOTIFICATIONS');
    //await expect(element(by.id('homeScreen'))).toBeVisible();
  });

  it('should tap continue and accept notification permission', async () => {
    await element(by.text('Empecemos')).tap();
    //await device.grantPermissions('android.permission.POST_NOTIFICATIONS');
    //await expect(element(by.id('homeScreen'))).toBeVisible();
  });
});
