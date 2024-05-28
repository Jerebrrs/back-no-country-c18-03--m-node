import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const postCampaign = z.object({
    title: z.string().min(3).max(20),
    description: z.string(),
    monetary_goal: z.string().min(1).max(10),
    image: z.string().min(5).max(30),
});


export const validatePostCampaign = (data) => {
    const result = postCampaign.safeParse(data);
    const { hasError, errorMessages, data: campaignData } = extractValidationData(result);

    return {
        hasError, errorMessages, campaignData
    }
};

export const campaignUpdate = (data) => {
    const result = postCampaign.partial().safeParse(data)

    const { hasError, errorMessages, data: campaignData } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        campaignData
    }
};