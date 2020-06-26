export const getEnvironmentVariable = (variableName: string): string | undefined =>
    (window as any).appSettings[variableName];
