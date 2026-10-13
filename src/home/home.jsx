
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, postTodo } from '../api/todos'
import UseZustand from '../components/UseZustand'
import { useForm } from 'react-hook-form'
import PrimaryButton from '../components/PrimaryButton'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import ImageList from '../components/ImageList'
import UserCard from '../components/UserCard'


const orderSchema = z.object({
    phone: z.string().min(1, 'رقم الهاتف مطلوب'),
    fullName: z.string().min(1, 'الاسم الكامل مطلوب'),
    address: z.string().min(1, 'عنوان التوصيل مطلوب'),
    mealType: z.string().min(1, 'اختر نوع الوجبة'),

    quantity: z.coerce
        .number()
        .min(1, 'يجب أن تكون الكمية 1 على الأقل')
        .finite('الكمية غير صحيحة'),

    spiceLevel: z.string().min(1, 'يرجى اختيار مستوى البهارات'),
    sideDish: z.string().min(1, 'يرجى اختيار طبق جانبي'),
})


const home = () => {
    const queryClient = useQueryClient()

    const bears = UseZustand((state) => state.bears)
    const increasePopulation = UseZustand((state) => state.increasePopulation)
    const decrease = UseZustand((state) => state.decrease)
    const removeAllBears = UseZustand((state) => state.removeAllBears)
    const updateBears = UseZustand((state) => state.updateBears)

    const query = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos,
    })

    const mutation = useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos'],
            })
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(orderSchema),
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    if (query.isPending) {
        return <p>Loading...</p>
    }

    if (query.isError) {
        return <p>Error: {query.error.message}</p>
    }

    return (
        <>
            <div>
                <UserCard name="Ahmad" age={25} isActive={true} />

            </div>
            <div>
                <ImageList />
            </div>
            <div>
                <span>Bear Counter</span>
                <p>{bears}</p>

                <button onClick={increasePopulation}>+1</button>
                <button onClick={decrease}>-1</button>
                <button onClick={removeAllBears}>Clear</button>

                {bears >= 10 && (
                    <p>لا يمكن زيادة العدد أكثر من 10</p>
                )}

                {bears <= 0 && (
                    <p>لا يمكن إنقاص العدد أقل من 0</p>
                )}
            </div>

            <div>
                <ul>
                    {query.data.map((todo) => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                </ul>

                <button
                    onClick={() => {
                        mutation.mutate({
                            title: 'do Laundry',
                            completed: false,
                            userId: 1,
                        })
                    }}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? 'Adding...' : 'Add Todo'}
                </button>

                {mutation.isError && (
                    <p>Error: {mutation.error.message}</p>
                )}

                {mutation.isSuccess && (
                    <p>Todo added successfully!</p>
                )}
            </div>

            <section>
                <div className="flex justify-center items-center p-10">
                    <span className="text-5xl">تعبئة الطلب</span>
                </div>

                <div className="flex justify-center items-center mb-15">
                    <div className="w-[800px] flex justify-center items-center rounded-[9px] shadow-[0px_0px_5px_#00000040]">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full p-5"
                        >
                            <span className="text-[#FF0000] p-3 font-bold text-2xl flex justify-center">
                                املأ النموذج لتعبئة طلبك
                            </span>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <label htmlFor="phone" className="font-bold text-[20px] mr-2">
                                        رقم الهاتف
                                    </label>

                                    <input
                                        className="w-[320px] border rounded-[8px] p-2 text-right m-2"
                                        id="phone"
                                        type="tel"
                                        placeholder="أدخل رقم الهاتف"
                                        {...register('phone')}
                                    />

                                    {errors.phone && (
                                        <p className="text-red-500">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="fullName" className="font-bold text-[20px] mr-2">
                                        الاسم الكامل
                                    </label>

                                    <input
                                        className="w-[320px] border rounded-[8px] p-2 text-right m-2"
                                        id="fullName"
                                        type="text"
                                        placeholder="أدخل الاسم الكامل"
                                        {...register('fullName')}
                                    />

                                    {errors.fullName && (
                                        <p className="text-red-500">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="address" className="font-bold text-[20px] mr-2">
                                    عنوان التوصيل
                                </label>

                                <input
                                    className="w-full border rounded-[8px] p-4 text-right m-2"
                                    id="address"
                                    type="text"
                                    placeholder="أدخل عنوان التوصيل"
                                    {...register('address')}
                                />

                                {errors.address && (
                                    <p className="text-red-500">
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <label htmlFor="mealType" className="font-bold text-[20px] mr-2">
                                        نوع الوجبة
                                    </label>

                                    <select
                                        className="w-[320px] border rounded-[8px] p-3 text-right m-2"
                                        id="mealType"
                                        {...register('mealType')}
                                    >
                                        <option value="">اختر نوع الوجبة</option>
                                        <option value="فروج مشوي كامل">فروج مشوي كامل</option>
                                        <option value="فروج نصف">فروج نصف</option>
                                        <option value="شاورما">شاورما</option>
                                        <option value="وجبة عائلية">وجبة عائلية</option>
                                    </select>

                                    {errors.mealType && (
                                        <p className="text-red-500">
                                            {errors.mealType.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="quantity" className="font-bold text-[20px] mr-2">
                                        الكمية
                                    </label>

                                    <input
                                        className="w-[320px] border rounded-[8px] p-2 text-right m-2"
                                        id="quantity"
                                        type="number"
                                        placeholder="أدخل عدد الوجبات"
                                        {...register('quantity')}
                                    />

                                    {errors.quantity && (
                                        <p className="text-red-500">
                                            {errors.quantity.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <label htmlFor="spiceLevel" className="font-bold text-[20px] mr-2">
                                        مستوى البهارات
                                    </label>

                                    <select
                                        className="w-[320px] border rounded-[8px] p-3 text-right m-2"
                                        id="spiceLevel"
                                        {...register('spiceLevel')}
                                    >
                                        <option value="عادي">عادي</option>
                                        <option value="بدون بهارات">بدون بهارات</option>
                                        <option value="خفيف">خفيف</option>
                                        <option value="متوسط">متوسط</option>
                                        <option value="حار">حار</option>
                                        <option value="حار جداً">حار جداً</option>
                                    </select>

                                    {errors.spiceLevel && (
                                        <p className="text-red-500">
                                            {errors.spiceLevel.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="sideDish" className="font-bold text-[20px] mr-2">
                                        طبق جانبي
                                    </label>

                                    <select
                                        className="w-[320px] border rounded-[8px] p-3 text-right m-2"
                                        id="sideDish"
                                        {...register('sideDish')}
                                    >
                                        <option value="">اختر طبقاً جانبياً</option>
                                        <option value="بطاطا">بطاطا</option>
                                        <option value="سلطة">سلطة</option>
                                        <option value="مخلل">مخلل</option>
                                        <option value="ثوم">ثوم</option>
                                    </select>

                                    {errors.sideDish && (
                                        <p className="text-red-500">
                                            {errors.sideDish.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <PrimaryButton
                                    type="submit"
                                    text="تأكيد الطلب"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default home
