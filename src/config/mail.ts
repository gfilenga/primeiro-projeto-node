interface IMailConfig {
    driver: 'ethereal' | 'ses';

    defaults: {
        from: {
            name: string;
            email: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'email_exemplo@guilherme.com.br',
            name: 'Guilherme da guilherme LTDA',
        },
    },
} as IMailConfig;
