export const LOCAL_HOST = "http://127.0.0.1:5000/";

export async function requestHandler(request) {
    const response = await request
      .then((response) => {
        // console.log("response: ", response);
        if (response.status === 200){
          // console.log("response: ", response.json());
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

export async function sendFailureInfo(error){
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success: "failure",
      error_info: error,
    }),
  };

  const data = await ( await fetch(LOCAL_HOST + `reqInfo`, requestOptions)).json(); // FOR TEST REQUEST
  console.log(data);
}

export async function sendRequestInfo(){
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success: "success",
    }),
  };

  const data = await ( await fetch(LOCAL_HOST + `reqInfo`, requestOptions)).json(); // FOR TEST REQUEST
  console.log(data);
}
