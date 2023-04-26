export async function requestHandler(request) {
    const response = await request
      .then((response) => {
        console.log("response: ", response);
        if (response.status === 200){
          console.log("response: ", response.json());
          return response.json();
        }
        if (response.ok && response.status === 200) {
          return response.json();
        }
        if (response.ok && (response.status === 204 || response.status === 201)) {
          return Promise.resolve(response);
        }
        if (response.status === 401) {
          return Promise.reject("Unauthorized");
        }
        return Promise.reject(response);
      })
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((data) => {
        console.log("Caught data: ", data);
        return Promise.resolve([]);
      });
    return response;
}