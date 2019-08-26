
declare const document: any;

export function getElementValue<Type>(
    elementId: string,
    attributeName: string,
    defaultValue?: Type
) {

    const element: HTMLElement = document.getElementById(elementId);
    let value: string;

    try {

        if (element) {

            value = element.getAttribute(attributeName);

            return JSON.parse(value) as Type;
        }
    } catch (e) {

        return value || null;
    }

    return defaultValue;
}


export function findCsrf(): string {

    const csrfElement: HTMLInputElement = document.getElementsByName("__RequestVerificationToken")[0] as HTMLInputElement;

    if (csrfElement) {
        return csrfElement.value;
    }

    return undefined;

}
