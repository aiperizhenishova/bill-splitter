import {ref, onMounted} from "vue";
import type {Dish} from '@/types/dish'

export function useDishes(){
    const dishes = ref<Dish[]>([])
    const loading = ref<boolean>(false)
    const error = ref<string>('')

    onMounted(async () => {
        loading.value = true
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/dishes`)
            dishes.value = await res.json()
        } catch (e) {
            error.value = "не удалось загрузить данные"
        } finally {
            loading.value = false
        }
    })

    return{
        dishes,
        loading,
        error
    }
}