import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenAIComponent = () => {
  const [apiResponse, setAPIResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchDataFromOpenAI = async () => {
  const apiKey = '###########################################';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  try {
    console.log('Fazendo solicitação para:', apiUrl);
    const response = await axios.post(
      apiUrl,
      {
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    console.log('Resposta da OpenAI:', response.data);
    setAPIResponse(response.data.choices[0].text);
  } catch (error) {
    console.error('Erro ao fazer a solicitação para a OpenAI:', error.response?.data || error.message);
    setError('Erro ao fazer a solicitação para a OpenAI');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDataFromOpenAI();
}, []);

return (
  <div>
    <h2>Resultados da OpenAI:</h2>
    {loading && <p>Carregando...</p>}
    {error && <p>{error}</p>}
    {apiResponse && <p>{apiResponse}</p>}
  </div>
);
};

export default OpenAIComponent;
