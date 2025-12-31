/*export async function handler(event) {
  const { page = 1, page_size = 100 } = event.queryStringParameters || {};

  const url = `https://trefle.io/api/v1/plants?token=${process.env.TREFLE_TOKEN}&page=${page}&page_size=${page_size}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
*/

export async function handler(event) {
  const { page = 1, page_size = 100, id } = event.queryStringParameters || {};

  let url = `https://trefle.io/api/v1/plants?token=${process.env.TREFLE_TOKEN}`;

  if (id) {
    url = `https://trefle.io/api/v1/plants/${id}?token=${process.env.TREFLE_TOKEN}`;
  } else {
    url += `&page=${page}&page_size=${page_size}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data" }),
    };
  }
}
