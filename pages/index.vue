<script setup lang="ts">

    // Import the useNuxtApp hook
    const { t } = useI18n()

    // SweetAlert2
    const { $swal } : any = useNuxtApp()

    // เรียกใช้ useCookie สำหรับเก็บค่า cookie
    const token = useCookie(
        'token', {
            // ตั้งค่า cookie ให้หมดอายุหลังจาก 1 ชั่วโมง
            maxAge: 60 * 60
        }
    )

    // เรียกใช้ useRouter สำหรับเปลี่ยนหน้า
    const router = useRouter()
    
    // การสร้างตัวแปรแบบ reactive
    // const email = reactive(
    //     {
    //         value: 'test@email.com',
    //     }
    // )

    // สร้างตัวแปรไว้ผูกกับ input และเก็บค่า
    const email = ref('')
    const password = ref('')

    // เรียกใช้ useFormRule สำหรับ validate form
    const { ruleRequired , ruleEmail, rulePassLen } = useFormRules()

    // สร้าง function สำหรับ submit form
    const submitForm = () => {
        // เช็คเงื่อนไขว่าผ่าน validate หรือไม่
        if(
            ruleRequired(email.value) == true && 
            ruleEmail(email.value) == true &&
            ruleRequired(password.value) == true &&
            rulePassLen(password.value) == true
        ){
            // ถ้าผ่านทุกเงื่อนไข ให้แสดงค่าที่กรอกใน console
            // console.log('Email:', email.value)
            // console.log('Password:', password.value)
            // เรียกใช้ตัวแปรจาก runtimeConfig
            const config = useRuntimeConfig()
            const STRAPI_URL = config.public.strapi.url

            // Login API with Strapi
            useFetch(
                `${STRAPI_URL}/auth/local`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "identifier": email.value,
                        "password": password.value
                    }),
                    onResponse({ request, response, options }) {
                        console.log(response)
                        if(response.status === 400) {
                            // alert('Login failed')
                            $swal.fire({
                                title: t('login_fail_title'),
                                text: t('login_fail_msg'),
                                icon: 'error',
                                confirmButtonText: t('ok_button')
                            })
                        } else {

                            // alert('Login success')
                            // บันทึก token ลง cookie
                            token.value = response._data.jwt

                            $swal.fire({
                                title: t('login_success_title'),
                                text: t('login_success_msg'),
                                icon: 'success',
                                confirmButtonText: t('ok_button')
                            })

                            // ส่งไปหน้า dashboard
                            router.push('/backend/dashboard')
                        }
                    }
                }
            )
        }
    }

    // เรียกใช้ตัวแปรภาษา
    const { locale } = useI18n()

    // ฟังก์ชันสลับภาษา
    const languageText = ref(locale.value === 'en' ? 'EN' : 'TH');

    const toggleLanguage = () => {
        locale.value = locale.value === 'en' ? 'th' : 'en';
        languageText.value = locale.value === 'en' ? 'EN' : 'TH';
    }

    useHead({
        title: t('login'),
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
                        <h1>{{ $t('login') }}</h1>
                        <p class="text-medium-emphasis">{{ $t('subtextlogin') }}</p>
                        <VForm class="mt-7" @submit.prevent="submitForm">
                            <div class="mt-1">
                                <VTextField 
                                    v-model="email"
                                    :rules="[ruleRequired, ruleEmail]"
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
                                    v-model="password"
                                    :rules="[ruleRequired, rulePassLen]"
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
                                    {{ $t('login') }}
                                </VBtn>
                            </div>
                        </VForm>
                        <p class="text-center mt-10">
                            <span>{{ $t('donthaveaccount') }}</span>&nbsp;
                            <NuxtLink to="/register" class="text-primary">{{ $t('register') }}</NuxtLink>
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