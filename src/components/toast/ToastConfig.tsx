import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
    error: (props: any) => (
        <ErrorToast
            {...props}
            text1NumberOfLines={2}
            text2NumberOfLines={10} // Permite até 10 linhas
            text2Style={{
                fontSize: 14,
                flexWrap: 'wrap',
            }}
        />
    ),
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
            }}
            text1NumberOfLines={2}
            text2NumberOfLines={5}
            text2Style={{
                fontSize: 14,
                flexWrap: 'wrap',
            }}
        />
    ),
};
