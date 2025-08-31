export async function tallyFetch<T>(query: string, variables?: Record<string, any>) {
  const apiUrl = import.meta.env.VITE_TALLY_API_URL || 'https://api.tally.xyz/query';
  const apiKey = import.meta.env.VITE_TALLY_API_KEY;
  
  if (!apiKey) {
    throw new Error('VITE_TALLY_API_KEY is required');
  }

  // Try direct API call first, fallback to CORS proxy if needed
  const corsProxies = [
    "https://api.allorigins.win/raw?url=",
    "https://cors.bridged.cc/",
    "https://cors-anywhere.herokuapp.com/"
  ];
  
  const makeRequest = async (url: string) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': apiKey
        },
        body: JSON.stringify({ query, variables })
      });
      
      const text = await res.text();
      if (!res.ok) throw new Error(`Tally ${res.status}: ${text}`);
      
      const json = JSON.parse(text);
      if (json.errors?.length) throw new Error(JSON.stringify(json.errors));
      
      return json.data as T;
    } catch (error) {
      throw error;
    }
  };
  
  // Try direct API call first
  try {
    return await makeRequest(apiUrl);
  } catch (error) {
    console.log("Direct API call failed, trying CORS proxies...");
    
    // Try each CORS proxy in sequence
    for (const proxy of corsProxies) {
      try {
        const proxyUrl = proxy + apiUrl;
        console.log(`Trying proxy: ${proxy}`);
        return await makeRequest(proxyUrl);
      } catch (proxyError) {
        console.log(`Proxy ${proxy} failed:`, proxyError);
        continue;
      }
    }
    
    // If all proxies fail, throw the original error
    throw new Error("All CORS proxies failed");
  }
}
