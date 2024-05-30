import z from "zod"
import { extractValidationData } from "../../common/utils/extractErrorData.js"

const entitiesSchema = z.object({
    name: z.string().min(3).max(30),
    surname: z.string().min(3).max(30),
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(8).max(25),
    bankInformation: z.string().min(6).max(40),
    entityName: z.string().min(3).max(40).optional()
})

export const validateRegisterEntities = (data) => {
    const result = entitiesSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: entitiesData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        entitiesData
    }
}

export const validatePartialEntities = (data) => {
    const result = entitiesSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: entitiesData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        entitiesData
    }
}