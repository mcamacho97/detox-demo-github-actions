import { element, by, waitFor, expect } from 'detox';

const TIMEOUT = 5000;

class BaseExpects {
    // Método auxiliar para esperar a que un elemento esté visible por ID
    async waitForElementById(elementId: string, timeout: number = TIMEOUT): Promise<void> {
        const el = element(by.id(elementId));
        await waitFor(el).toBeVisible().withTimeout(timeout);
    }

    // Método auxiliar para validar que un elemento exista por ID
    async isElementExistById(elementId: string): Promise<void> {
        const el = element(by.id(elementId));
        await expect(el).toExist();
    }

    // Método auxiliar para validar que un elemento exista por ID
    async waitForElementByIdAtIndex(elementId: string, index:number, timeout: number = TIMEOUT): Promise<void> {
        const el = element(by.id(elementId)).atIndex(index);
        await waitFor(el).toBeVisible().withTimeout(timeout);
    }

    // Método auxiliar para esperar a que un elemento esté visible por texto
    async waitForElementByLabel(
        elementLabel: string,
        elementText: string,
        timeout: number = TIMEOUT,
    ): Promise<void> {
        const el = element(by.label(elementLabel));
        await waitFor(el).toHaveText(elementText).withTimeout(timeout);
    }

    // Método auxiliar para esperar a que un elemento esté visible por ID
    async elementHaveText(elementId: string, elementText: string, timeout: number = TIMEOUT): Promise<void> {
        const el = element(by.id(elementId));
        await waitFor(el).toHaveText(elementText).withTimeout(timeout);
    }
}

export default BaseExpects;