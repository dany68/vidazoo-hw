export const downloadJSON = (jsonData: any, fileName: string) => {
    if (! Object.keys(jsonData).length) {
        return alert('No results available for download. Please search an another domain.')
    }

    const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);

    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
}