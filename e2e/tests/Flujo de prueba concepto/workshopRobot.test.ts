/**
 * Prueba para el flujo "Onboarding de cliente existente".
 *
 * Esta prueba simula el proceso de onboarding de un cliente existente en la aplicación.
 *
 * @robotName {string} "existingCustomerLoginRobot"
 * @author {string} Mauricio Camacho.
 * @date {string} 2025-04-14
 * @command {string} "pnpm detox test e2e/tests/Flujo\ de\ prueba\ concepto/workshopRobot.test.ts --configuration ios"
 */

import BaseRobot from '../BaseRobot';
import { device } from 'detox';

const robot = new BaseRobot();

describe('Flujo de Cliente existente', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      launchArgs: { waitForAppLaunch: 15000 },
      permissions: {
        location: 'inuse',
        notifications: 'YES',
        camera: 'YES',
      },
    });
  });


  it('Ingresa nombre', async () => {
    await robot.expects.waitForElementById('name_input');
    await robot.actions.tapInputById('name_input', 'Mauricio Camacho');
  });

  it('Ingresa email', async () => {
    await robot.expects.waitForElementById('email_input');
    await robot.actions.tapInputById('email_input', 'mcamacho@email.com');
  });

  it('Enviar datos', async () => {
    await robot.expects.waitForElementById('send_button');
    await robot.actions.tapButtonById('send_button')
  });

});
