/* eslint-disable @typescript-eslint/no-explicit-any */
const resp = (status: number, message: any) => ({ status, message });

const respM = (s: number, m: any) => ({
    status: s, 
    message: { message: m }
});

export { resp, respM };