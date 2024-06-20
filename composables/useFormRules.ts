// Create a custom hook to use in your components
// Import the i18n instance

export const useFormRules = () => {
    const { t } = useI18n()
    return {
        ruleRequired: (value: string) => !!value || t('required'),
        ruleEmail: (value: string) => {
            const pattern =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(value) || t('validEmail');
        },
        rulePassLen: (v: string) => (!!v && v.length >= 6) || t('passwordLength'),
    }
}