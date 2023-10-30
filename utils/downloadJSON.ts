export const downloadJSON = (jsonData, fileName) => {
    const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);

    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
}