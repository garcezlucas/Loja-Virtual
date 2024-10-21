async function FetchRequest(endpoint: string, options?: RequestInit) {
  const baseURL = process.env.REACT_APP_URL_API;

  const headers = new Headers();

  if (options?.headers) {
    const additionalHeaders = options.headers as Record<string, string>;
    for (const key in additionalHeaders) {
      if (Object.prototype.hasOwnProperty.call(additionalHeaders, key)) {
        headers.append(key, additionalHeaders[key]);
      }
    }
  }

  if (!(options?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
}

export default FetchRequest;
