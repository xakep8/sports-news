import { API_ENDPOINT } from "../../config/constants";
import {SetPreferences} from "../../types/user";
import { UserLogin } from "../../types/user";
import { UserSignup } from "../../types/user";
import { UserUpdate } from "../../types/user";

type requestType = "GET" | "POST" | "PATCH";

type payloadType =
  | UserLogin
  | UserSignup
  | UserUpdate
  | SetPreferences
  | object;

export const request = async (
  endpoint: string,
  method: requestType = "GET",
  data: payloadType = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `${Object.keys(data)
          .map((key) => `${key}=${data[key as keyof payloadType]}`)
          .join("&")}`
      : "";

    url = `${API_ENDPOINT}${endpoint}?${requestParams}`;
    payload = "";
  } else {
    url = `${API_ENDPOINT}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  const token = localStorage.getItem("authToken");
  const auth = token ? token : "Token ";
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : undefined,
  });
  if (response.ok) {
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      return {};
    }
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};

export const getMatches = async () => {
  return await request("/matches", "GET");
};

export const getMatch = async (id: number) => {
  return await request(`/matches/${id}`, "GET");
};

export const setPreferences = async (data: SetPreferences) => {
  return await request("/user/preferences", "PATCH", data);
};