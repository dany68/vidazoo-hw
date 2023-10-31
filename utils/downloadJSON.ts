export const downloadJSON = (jsonData: any, fileName: string) => {
    if (! Object.keys(jsonData).length) {
        return alert('Empty content.')
    }

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);

    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
}