<script setup lang="ts">

// Import the useNuxtApp hook
const { t } = useI18n()

// เรียกใช้ตัวแปรภาษา
const { locale } = useI18n()

// ฟังก์ชันสลับภาษา
const languageText = ref(locale.value === 'en' ? 'EN' : 'TH');

const toggleLanguage = () => {
    locale.value = locale.value === 'en' ? 'th' : 'en';
    languageText.value = locale.value === 'en' ? 'EN' : 'TH';
}

useHead({
    title: t('register'),
    meta: [
        {
            name: 'description',
            content: 'Login page'
        }
    ]
})

</script>

<template>
    <VContainer fluid class="fill-height pa-0">
        <VBtn icon class="language-switch-btn" @click="toggleLanguage">
            <v-icon
                color="primary"
                icon="mdi-web"
                size="large"
            ></v-icon>&nbsp;
            {{ languageText }}
        </VBtn>
        <VRow no-gutters align="center" justify="center" class="fill-height">
            <VCol class="hidden-sm-and-down fill-height" md="6" lg="6">
                <VImg
                    src="https://wallpaper.dog/large/5557744.jpg"
                    cover
                    class="h-100 rounded-xl rounded-ts-0 rounded-bs-0 d-flex align-center justify-center"
                >
                    <div class="text-center w-50 text-white mx-auto">
                        <h1 class="mb-4">{{ $t('welcome') }}</h1>
                        <p class="mb-4">{{ $t('intro_login') }}</p>
                    </div>
                </VImg>
            </VCol>
            <VCol cols="12" md="6" lg="6" sm="6">
                <VRow no-gutters align="center" justify="center">
                    <VCol cols="12" md="6" class="pa-3">
                        <h1>{{ $t('register') }}</h1>
                        <p class="text-medium-emphasis">{{ $t('subtextresiger') }}</p>
                        <VForm @submit.prevent="" class="mt-7">
                            <div class="mt-1">
                                <VTextField 
                                    :label="$t('username')" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-account"
                                    id="username"
                                    name="username"
                                    type="username"
                                />
                            </div>
                            <div class="mt-1">
                                <VTextField 
                                    :label="$t('email')" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-email"
                                    id="email"
                                    name="email"
                                    type="email"
                                />
                            </div>
                            <div class="mt-1">
                                <VTextField 
                                    :label="$t('password')" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-lock"
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div class="mt-5 text-center">
                                <VBtn type="submit" 
                                    block
                                    min-height="44" 
                                    class="gradient primary"
                                    >
                                    {{ $t('register') }}
                                </VBtn>
                            </div>
                        </VForm>
                        <p class="text-center mt-10">
                            <span>{{ $t('alreadyhaveaccount') }} </span>&nbsp;
                            <NuxtLink to="/" class="text-primary">{{ $t('login') }}</NuxtLink>
                        </p>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>
    .language-switch-btn {
        overflow: hidden;
        width: 60px !important;
        position: absolute;
        top: 16px;
        right: 24px;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>