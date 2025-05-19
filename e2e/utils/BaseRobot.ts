import { element, by, waitFor, expect } from 'detox';
import jestExpect from 'expect';
/**
 * Clase base para los robots de Detox.
 * Proporciona métodos auxiliares para interactuar con la interfaz de usuario.
 */
const TIMEOUT = 5000;
type Direction = 'left' | 'right' | 'up' | 'down';

class BaseRobot {

    // Método auxiliar para esperar a que un elemento esté visible por ID
    protected async waitForElementById(
        elementId: string,
        timeout: number = TIMEOUT
    ): Promise<void> {
        const el = element(by.id(elementId));
        await waitFor(el).toBeVisible().withTimeout(timeout);
    }

    // Método auxiliar para validar que un elemento exista por ID
    protected async isElementExistById(
        elementId: string,
    ): Promise<void> {
        const el = element(by.id(elementId));
        await expect(el).toExist();
    }

    // Método auxiliar para esperar a que un elemento esté visible por texto
    protected async waitForElementByLabel(
        elementLabel: string,
        elementText: string,
        timeout: number = TIMEOUT
    ): Promise<void> {
        const el = element(by.label(elementLabel));
        await waitFor(el).toHaveText(elementText).withTimeout(timeout);
    }

    // Método auxiliar para esperar y tocar un botón
    protected async tapButtonById(buttonId: string) {
        const button = element(by.id(buttonId));
        await button.tap();
    }

    protected async tapButtonByIdAtIndex(buttonId: string, index: number) {
        const button = element(by.id(buttonId)).atIndex(index);
        await button.tap();
    }

    // Método auxiliar para esperar y tocar un botón por texto
    protected async tapButtonByText(buttonText: string) {
        const button = element(by.text(buttonText));
        await button.tap();
    }

    // Método auxiliar para esperar a que un elemento exista
    protected async tapButtonByLabel(buttonText: string) {
        const button = element(by.label(buttonText));
        await button.tap();
    }

    // Método auxiliar para realizar la acción de "swipe" en un elemento por ID
    protected async swipeById(elementId: string, swipeDirection: Direction, timeout: number = TIMEOUT) {
        const el = element(by.id(elementId));
        await waitFor(el).toBeVisible().withTimeout(timeout);
        await el.swipe(swipeDirection, 'fast');
    }

    // Método auxiliar para realizar la acción de "swipe" en un elemento por ID una sola vez
    protected async swipeByIdOneTime(
        elementId: string,
        swipeDirection: Direction,
        timeout: number = TIMEOUT,
    ) {
        const el = element(by.id(elementId));
        await waitFor(el).toBeVisible().withTimeout(timeout);
        await el.swipe(swipeDirection, 'fast', 0.5, NaN);
    }

    protected async tapInputById(
        elementId: string,
        inputText: string,
        timeout: number = TIMEOUT,
    ) {
        const input = element(by.id(elementId));
        await waitFor(input).toBeVisible().withTimeout(timeout);
        await input.typeText(inputText);
    }


    // Método para digitar una serie de números en el teclado numérico
    static async tapNumericKeyboard(numbers: string) {
        for (const num of numbers) {
            await element(by.text(num.toString())).tap();
        }
    }

}

export default BaseRobot;