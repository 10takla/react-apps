const selectiveАieldСhanges = (a: Record<string, any>, b: Record<string, any>) => {
return Object.entries(a).reduce((acc, [key, aValue]) => {
        if (key in b) {
            const bValue = b[key]; //21
            if (aValue instanceof Object && bValue instanceof Object) {
                acc = { ...acc, [key]: selectiveАieldСhanges(aValue, bValue) };
            } else if (typeof aValue === typeof bValue && aValue !== bValue) {
                acc = { ...acc, [key]: bValue };
            } else {
                acc = { ...acc, [key]: bValue };
            }
        } else {
            acc = { ...acc, [key]: aValue };
        }
        return acc;
    }, {} as Record<string, any>);
};

export default selectiveАieldСhanges;
