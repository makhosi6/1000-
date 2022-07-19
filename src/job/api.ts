const http = require("http");

export const addToDB = async (word: string, port = 3000): Promise<void> => {
  try {
    ///
    const data = JSON.stringify({
      title: word,
      timestamp: new Date().getTime(),
    });
    ///
    const options = {
      hostname: "localhost",
      port: port,
      path: "/words",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };

    const req = http.request(
      options,
      (res: {
        statusCode: any;
        on: (arg0: string, arg1: (d: any) => void) => void;
      }) => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on("data", (d: string | Uint8Array) => {
          process.stdout.write(d);
        });
      }
    );

    req.on("error", (error: any) => {
      console.error(error);
      console.log({ word });
    });

    req.write(data);
    req.end();
  } catch (error) {
    console.log(error);

    console.log({ word });

  
  }
};

