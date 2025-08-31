export const useGraphQLCodegen = <Data, Variables extends Record<string, unknown>>(
  query: string
): ((variables?: Variables) => Promise<Data>) => {

  return (variables?: Variables) => {
    // Try direct API call first, fallback to CORS proxy if needed
    const apiUrl = import.meta.env.VITE_TALLY_API_URL;
    const corsProxies = [
      "https://api.allorigins.win/raw?url=",
      "https://cors.bridged.cc/",
      "https://cors-anywhere.herokuapp.com/"
    ];
    
    const makeRequest = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // @ts-expect-error
            "Api-Key": import.meta.env.VITE_TALLY_API_KEY,
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });
        
        if (response.ok) {
          return response.json();
        }
        throw new Error(`HTTP ${response.status}`);
      } catch (error) {
        throw error;
      }
    };
    
    // Try direct API call first
    return makeRequest(apiUrl).catch(async (error) => {
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
    })
    .then((json) => {
      if (json?.errors) {
        console.error("error when fetching");
        return null;
      }
      return json.data;
    })
    .catch((error) => {
      console.log("Error when fetching =>", error);
      return null;
    });
  };
};
