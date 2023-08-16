import {createI18n} from 'vue-i18n'
import en from './en.json'
import uz from './uz.json'
import ru from './ru.json'
import qq from './qq.json'

export const defaultlocale: string = 'qq';

const i18n: any = createI18n ({
    legacy: false,
    locale: !!localStorage.getItem('language') ? localStorage.getItem('language') : defaultlocale,
    fallbackloacle: 'qq',
    messages: {
        uz, en, ru, qq
    }
})

export default i18n