import { element, by, waitFor } from 'detox';

const TIMEOUT = 5000;
type Direction = 'left' | 'right' | 'up' | 'down';
type Speed = 'fast' | 'slow';

class BaseActions {
    // Método auxiliar para esperar y tocar un botón por ID
    async tapButtonById(buttonId: string) {
        const button = element(by.id(buttonId));
        await button.tap();
    }

    // Método auxiliar para esperar y tocar un botón por texto
    async tapButtonByText(buttonText: string) {
        const button = element(by.text(buttonText));
        await button.tap();
    }

    // Método auxiliar para esperar a que un elemento exista
    async tapButtonByLabel(buttonText: string) {
        const button = element(by.label(buttonText));
        await button.tap();
    }

    // Método auxiliar para realizar la acción de "swipe" en un elemento por ID
    async swipeById(elementId: string, swipeDirection: Direction, speed: Speed = 'fast', timeout: number = TIMEOUT
    ) {
        const el = element(by.id(elementId));
        await waitFor(el).toBeVisible().withTimeout(timeout);
        await el.swipe(swipeDirection, speed);
    }

    // Método auxiliar para realizar la acción de "swipe" en un elemento por ID una sola vez
    async swipeByIdOneTime(
        elementId: string,
        swipeDirection: Direction,
        speed: Speed = 'fast',
        timeout: number = TIMEOUT
    ) {
        const el = element(by.id(elementId));
        await waitFor(el).toBeVisible().withTimeout(timeout);
        await el.swipe(swipeDirection, speed, 0.5, NaN);
    }

    // Método auxiliar para escribir texto en un campo de entrada por ID
    async tapInputById(elementId: string, inputText: string, timeout: number = TIMEOUT) {
        const input = element(by.id(elementId));
        await waitFor(input).toBeVisible().withTimeout(timeout);
        await input.typeText(inputText);
    }

    // Método para digitar una serie de números en el teclado numérico
    async tapNumericKeyboard(numbers: string) {
        for (const num of numbers) {
            await element(by.text(num.toString())).tap();
        }
    }

    async tapButtonByIdAtIndex(buttonId: string, index: number) {
        const button = element(by.id(buttonId)).atIndex(index);
        await button.tap();
    }

    async tapReturnKeyById(elementId: string) {
        const button = element(by.id(elementId));
        await button.tapReturnKey();
    }

    async swipeProducts(currency: string, attr: 'product-info-card-currency' | 'product-info-card-value' | 'product-info-card-number' = 'product-info-card-currency', balance: number = 0) {
        let found = false;
        let attempts = 0;
        const maxAttempts = 10; // Para evitar un loop infinito

        while (!found && attempts < maxAttempts) {
            const attributes = await element(by.id(attr)).getAttributes();
            const balanceAttributes = await element(by.id('product-info-card-value')).getAttributes();

            console.log("Currency Attributes: ", attributes);
            console.log("Balance Attributes: ", balanceAttributes);

            if (!('elements' in attributes) || !('elements' in balanceAttributes)) {
                console.log('No elements found');
                return;
            }

            const elementsLength = Math.min(
                attributes.elements.length,
                balanceAttributes.elements.length
            );
            console.log(`Elements Length: ${elementsLength}`);

            for (let i = 0; i < elementsLength; i++) {

                const currencyText = attributes.elements[i].text;
                const balanceText = balanceAttributes.elements[i].text;
                console.log(`Currency: ${currencyText}, Balance: ${balanceText}, Index: ${i}`);

                if (!balanceText) {
                    console.log('Balance text is undefined');
                    continue;
                }
                const numericBalance = Number(balanceText.replace(/[^0-9.-]+/g, ''));

                if (currencyText === currency && numericBalance > balance) {
                    return;
                }

                await this.swipeByIdOneTime("main-screen-scrollview", "left");
            }
        }
    }
}
export default BaseActions;