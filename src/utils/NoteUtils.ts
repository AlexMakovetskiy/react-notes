export function getformattedDate (): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(2);

    return `${day}-${month}-${year}`;
}

export function removeDuplicates(arr: Iterable<string> ): string[] {
    return [...new Set(arr)];
}

export function getUniqueHashtags(text: string): string[] {
    const words = text.toLowerCase().split(' ');
    const tagsWithPunctuation = words.filter((word: string) => word.startsWith('#'));
    const hashtags = tagsWithPunctuation.map((word) => {
        if(word.endsWith('.') || word.endsWith('!') || word.endsWith('?') || word.endsWith(':') || word.endsWith(';') || word.endsWith(','))
            return word.slice(0, -1);
        return word;
    });

    return removeDuplicates(hashtags);
}
