let currentDate = new Date().getTime();

export const dateValidation = (val: string): boolean => {
    return currentDate >= new Date(val).getTime();
};
