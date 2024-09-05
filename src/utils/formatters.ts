export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Formata a data no formato "dia de mês por extenso de ano"
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formattedDate;
}