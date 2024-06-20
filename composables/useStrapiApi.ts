import type { ProductResponse, MetaResponse } from "@/types/product"

export default() => {

    const router = useRouter()

    // ดึง url จาก .env
    const config = useRuntimeConfig()
    const STRAPI_URL = config.public.strapi.url

    // อ่าน token จาก cookie
    const token = useCookie('token')

    // กำหนด header สำหรับการเรียก api
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`
    }

    // function สำหรับดึงข้อมูล product และเช็คว่ามี token หรือไม่
    const fetchWithTokenCheck = async <T>(url: any, options: any) => {
        const response = await useFetch(url, options)

        if(response.error.value && response.error.value.statusCode === 400){
            // หาก token หมดอายุหรือไม่ถูกต้องให้ redirect ไปหน้า login
            router.push('/')
        }

        return response
    }

    // function สำหรับดึงข้อมูล product ทั้งหมด
    const getAllProducts = async (page: number, pagesize: number) => {
        return fetchWithTokenCheck<ProductResponse & MetaResponse>(`${STRAPI_URL}/products?pagination[page]=${page}&pagination[pageSize]=${pagesize}&populate=*`, {
            method: 'GET',
            headers: headers,
            cache: 'no-cache'
        })
    }

    return {
        getAllProducts
    }
}