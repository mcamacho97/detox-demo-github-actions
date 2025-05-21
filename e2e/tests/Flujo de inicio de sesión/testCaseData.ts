export enum TestCaseVariantEnum {
    NI_HAPPY_FLOW = "NI_HAPPY_FLOW",
    NI_FLOW_2 = "NI_FLOW_2",
}

export interface TestCaseVariant {
    bank: string;
    country: string;
    customerName: string;
    passcode: string;
    productsAccountNumber: string[];
    targetAccountNumber: string;
    targetCustomerName: string;
    amountToSend: string;
    transactionDescription: string;
    favorite: boolean;
    shareVoucher: boolean;
    saveVoucher: boolean;
}

// Asociamos los valores a las claves del enum
export const TestCaseVariants: Record<TestCaseVariantEnum, TestCaseVariant> = {
    [TestCaseVariantEnum.NI_HAPPY_FLOW]: {
        bank: 'BLNI',
        country: 'Nicaragua',
        customerName: 'Mauricio',
        passcode: '010521',
        productsAccountNumber: ['117225800', '129027178', '131274212'],
        targetAccountNumber: '107043541',
        targetCustomerName: 'Angel Rafael Blandon Hurtado',
        amountToSend: '1.50',
        transactionDescription: '',
        favorite: false,
        shareVoucher: false,
        saveVoucher: false,
    },
    [TestCaseVariantEnum.NI_FLOW_2]: {
        bank: 'BLNI',
        country: 'Nicaragua',
        customerName: 'Mauricio',
        passcode: '010521',
        productsAccountNumber: ['117225800', '129027178', '131274212'],
        targetAccountNumber: '123456789',
        targetCustomerName: 'Angel Rafael Blandon Hurtado',
        amountToSend: '1.50',
        transactionDescription: '',
        favorite: false,
        shareVoucher: false,
        saveVoucher: false,
    },
};

