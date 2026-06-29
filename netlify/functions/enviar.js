exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyCBMGe7nYLZQywEKhMrQmo6j3HnfU4E7HLmTm-21JEVs0PHzQObwwpvtWHX1Z5gUDvfQ/exec";

  try {
    const payload = event.body;

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      redirect: 'follow'
    });

    const text = await response.text();
    console.log('Apps Script response:', text);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true, response: text })
    };

  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
