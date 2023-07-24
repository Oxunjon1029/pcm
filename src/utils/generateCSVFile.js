import Papa from 'papaparse';
export const generateCSV = (items, filename) => {
  const flattenedItems = items.map(item => ({
    _id: item._id,
    name_en: item.name.en,
    name_uz: item.name.uz,
    uztags: item.uztags.map(tag => tag.title).join(','),
    entags: item.entags.map(tag => tag.title).join(','), 
    comments: item.comments.map(comment => `${comment.content} by ${comment.userName}`).join('\n'),
    strings: item.strings.map((string) => `${string.name}:${string.value}`),// Concatenate comments into multiline string
    dates: item.dates.map((date) => `${date.name}:${date.value}`),// Concatenate comments into multiline string
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
  const csvData = Papa.unparse(flattenedItems);

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
